<?php

namespace App\Helpers;

/**
 * Spreadsheet round-trip for limited-menu categories.
 *
 * Columns come from saved ACF periods, so a new menu is a new column after save.
 * Import only adds or removes those categories.
 */
class LimitedMenuChecklist
{
    const EXPORT_ACTION = 'bonton_limited_menu_csv_export';
    const IMPORT_ACTION = 'bonton_limited_menu_csv_import';
    const RESULT_TRANSIENT = 'bonton_lm_csv_result_';
    const UPLOAD_FORM_ID = 'bonton-limited-menu-csv';

    private static $uploadFormNeeded = false;

    public static function register(): void
    {
        add_action('acf/render_field/key=field_69e5a1b04c12', [self::class, 'renderTools']);
        add_action('admin_footer', [self::class, 'renderUploadForm']);
        add_action('admin_post_' . self::EXPORT_ACTION, [self::class, 'export']);
        add_action('admin_post_' . self::IMPORT_ACTION, [self::class, 'import']);
        add_action('admin_notices', [self::class, 'renderResultNotice']);
    }

    public static function renderTools(): void
    {
        if (!is_admin() || !self::userCanEdit()) {
            return;
        }

        $columns = self::columns();
        $export_url = wp_nonce_url(
            admin_url('admin-post.php?action=' . self::EXPORT_ACTION),
            self::EXPORT_ACTION
        );

        echo '<div class="bonton-limited-menu-csv" style="margin:0 0 16px;padding:12px 14px;background:#fff;border:1px solid #dcdcde;border-left:4px solid #2271b1;">';
        echo '<p style="margin:0 0 8px;"><strong>Product checklist</strong></p>';

        if (!$columns) {
            echo '<p style="margin:0;">Add a menu title and click Update. A category is created from that title and becomes a spreadsheet column. Or choose an existing category, such as Bakery.</p>';
            echo '</div>';
            return;
        }

        echo '<p style="margin:0 0 12px;">Download every published product. Each saved limited menu is a column. Mark <strong>Yes</strong> or <strong>No</strong> in Excel, then upload the sheet here. This only adds or removes those menu categories. A blank cell is left unchanged. Add a title and click Update, then download a fresh sheet.</p>';
        self::$uploadFormNeeded = true;
        echo '<p style="margin:0 0 12px;"><a class="button button-primary" href="' . esc_url($export_url) . '">Download CSV</a></p>';
        echo '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0;">';
        echo '<input type="file" id="bonton-limited-menu-csv-file" accept=".csv,text/csv">';
        echo '<button type="button" class="button" id="bonton-limited-menu-csv-submit">Update products from CSV</button>';
        echo '</div>';
        echo '</div>';
    }

    /**
     * The file field sits inside the ACF options form. It stays out of that submit
     * so Update on the rest of the page does not ask for a CSV.
     */
    public static function renderUploadForm(): void
    {
        if (!self::$uploadFormNeeded) {
            return;
        }

        echo '<form id="' . esc_attr(self::UPLOAD_FORM_ID) . '" method="post" enctype="multipart/form-data" action="' . esc_url(admin_url('admin-post.php')) . '" style="display:none;">';
        wp_nonce_field(self::IMPORT_ACTION);
        echo '<input type="hidden" name="action" value="' . esc_attr(self::IMPORT_ACTION) . '">';
        echo '</form>';
        echo '<script>
        (function () {
          var fileInput = document.getElementById("bonton-limited-menu-csv-file");
          var uploadForm = document.getElementById("' . esc_js(self::UPLOAD_FORM_ID) . '");
          var uploadButton = document.getElementById("bonton-limited-menu-csv-submit");
          var optionsForm = document.getElementById("post");
          if (!fileInput || !uploadForm) {
            return;
          }
          if (optionsForm) {
            optionsForm.addEventListener("submit", function () {
              fileInput.disabled = true;
            });
          }
          if (!uploadButton) {
            return;
          }
          uploadButton.addEventListener("click", function () {
            if (!fileInput.files || !fileInput.files.length) {
              window.alert("Choose a CSV file to upload.");
              return;
            }
            fileInput.disabled = false;
            fileInput.name = "limited_menu_csv";
            uploadForm.appendChild(fileInput);
            uploadForm.submit();
          });
        }());
        </script>';
    }

    public static function export(): void
    {
        if (!self::userCanEdit()) {
            wp_die(esc_html__('Sorry, you are not allowed to do that.'));
        }
        check_admin_referer(self::EXPORT_ACTION);

        $columns = self::columns();
        if (!$columns) {
            wp_die(esc_html__('Save a limited menu with a menu category before downloading the checklist.'));
        }

        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="limited-menu-products.csv"');

        $out = fopen('php://output', 'w');
        if ($out === false) {
            wp_die(esc_html__('Could not create the spreadsheet.'));
        }

        fwrite($out, "\xEF\xBB\xBF");
        $header = ['product_id', 'name'];
        foreach ($columns as $column) {
            $header[] = $column['header'];
        }
        fputcsv($out, $header);

        foreach (self::publishedProductIds() as $product_id) {
            $row = [$product_id, get_the_title($product_id)];
            foreach ($columns as $column) {
                $row[] = has_term((int) $column['category_id'], 'product_cat', $product_id) ? 'Yes' : 'No';
            }
            fputcsv($out, $row);
        }

        fclose($out);
        exit;
    }

    public static function import(): void
    {
        if (!self::userCanEdit()) {
            wp_die(esc_html__('Sorry, you are not allowed to do that.'));
        }
        check_admin_referer(self::IMPORT_ACTION);

        $redirect = admin_url('admin.php?page=bonton-general-settings');

        if (empty($_FILES['limited_menu_csv']['tmp_name']) || !is_uploaded_file($_FILES['limited_menu_csv']['tmp_name'])) {
            self::redirectWithResult($redirect, 'error', 'Choose a CSV file to upload.');
        }

        $handle = fopen($_FILES['limited_menu_csv']['tmp_name'], 'r');
        if ($handle === false) {
            self::redirectWithResult($redirect, 'error', 'Could not read that CSV file.');
        }

        $header = fgetcsv($handle);
        if (!$header) {
            fclose($handle);
            self::redirectWithResult($redirect, 'error', 'That CSV file is empty.');
        }

        $header[0] = preg_replace('/^\xEF\xBB\xBF/', '', (string) $header[0]);
        $product_index = null;
        $menu_columns = [];
        foreach ($header as $index => $label) {
            $label = trim((string) $label);
            if (strtolower($label) === 'product_id' || strtolower($label) === 'id') {
                $product_index = (int) $index;
                continue;
            }
            if (preg_match('/\[#(\d+)\]\s*$/', $label, $matches)) {
                $menu_columns[(int) $index] = (int) $matches[1];
            }
        }

        if ($product_index === null || !$menu_columns) {
            fclose($handle);
            self::redirectWithResult($redirect, 'error', 'This sheet is missing product_id or limited-menu columns. Download a fresh CSV from this page.');
        }

        $known_categories = [];
        foreach (self::columns() as $column) {
            $known_categories[(int) $column['category_id']] = true;
        }

        $added = 0;
        $removed = 0;
        $products = 0;
        $skipped = 0;

        while (($row = fgetcsv($handle)) !== false) {
            $product_id = isset($row[$product_index]) ? (int) $row[$product_index] : 0;
            if ($product_id <= 0 || get_post_type($product_id) !== 'product' || get_post_status($product_id) !== 'publish') {
                if ($product_id > 0 || (isset($row[$product_index]) && trim((string) $row[$product_index]) !== '')) {
                    $skipped++;
                }
                continue;
            }

            $changed = false;
            foreach ($menu_columns as $index => $category_id) {
                if (empty($known_categories[$category_id])) {
                    continue;
                }
                $value = isset($row[$index]) ? strtolower(trim((string) $row[$index])) : '';
                if ($value === '') {
                    continue;
                }

                $on_menu = has_term($category_id, 'product_cat', $product_id);
                if (in_array($value, ['yes', 'y', '1', 'true'], true)) {
                    if (!$on_menu) {
                        $result = wp_set_object_terms($product_id, [$category_id], 'product_cat', true);
                        if (!is_wp_error($result)) {
                            $added++;
                            $changed = true;
                        }
                    }
                } elseif (in_array($value, ['no', 'n', '0', 'false'], true)) {
                    if ($on_menu) {
                        $result = wp_remove_object_terms($product_id, [$category_id], 'product_cat');
                        if (!is_wp_error($result)) {
                            $removed++;
                            $changed = true;
                        }
                    }
                }
            }

            if ($changed) {
                $products++;
                clean_object_term_cache($product_id, 'product');
            }
        }

        fclose($handle);

        if ($added === 0 && $removed === 0) {
            $message = 'No product categories were changed.';
            if ($skipped > 0) {
                $message .= ' Skipped ' . $skipped . ' ' . ($skipped === 1 ? 'row' : 'rows') . '.';
            }
            self::redirectWithResult($redirect, 'warning', $message);
        }

        $message = 'Updated ' . $products . ' ' . ($products === 1 ? 'product' : 'products') . '. Added ' . $added . ', removed ' . $removed . '.';
        if ($skipped > 0) {
            $message .= ' Skipped ' . $skipped . ' ' . ($skipped === 1 ? 'row' : 'rows') . '.';
        }
        self::redirectWithResult($redirect, 'success', $message);
    }

    public static function renderResultNotice(): void
    {
        if (!is_admin() || !isset($_GET['page']) || $_GET['page'] !== 'bonton-general-settings') {
            return;
        }

        $result = get_transient(self::RESULT_TRANSIENT . get_current_user_id());
        if (!is_array($result) || empty($result['message'])) {
            return;
        }
        delete_transient(self::RESULT_TRANSIENT . get_current_user_id());

        $type = in_array($result['type'] ?? '', ['error', 'warning', 'success'], true) ? $result['type'] : 'success';
        echo '<div class="notice notice-' . esc_attr($type) . ' is-dismissible"><p>' . esc_html($result['message']) . '</p></div>';
    }

    /**
     * One column per saved menu category. Disabled periods are included so products
     * can be assigned before the menu is turned on.
     *
     * @return array<int, array{category_id:int,title:string,header:string}>
     */
    public static function columns(): array
    {
        if (!function_exists('get_field')) {
            return [];
        }

        $rows = get_field('limited_menu_periods', 'option');
        if (!is_array($rows)) {
            return [];
        }

        $columns = [];
        $seen = [];
        foreach ($rows as $row) {
            if (!is_array($row)) {
                continue;
            }
            $category_id = self::categoryIdFromRow($row);
            if ($category_id <= 0 || isset($seen[$category_id])) {
                continue;
            }
            $term = get_term($category_id, 'product_cat');
            if (!$term || is_wp_error($term)) {
                continue;
            }

            $title = trim((string) ($row['title'] ?? ''));
            if ($title === '') {
                $title = $term->name;
            }

            $seen[$category_id] = true;
            $columns[] = [
                'category_id' => $category_id,
                'title' => $title,
                'header' => $title . ' [#' . $category_id . ']',
            ];
        }

        return $columns;
    }

    /**
     * @return int[]
     */
    private static function publishedProductIds(): array
    {
        $ids = get_posts([
            'post_type' => 'product',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
            'fields' => 'ids',
            'no_found_rows' => true,
        ]);

        return array_map('intval', is_array($ids) ? $ids : []);
    }

    private static function categoryIdFromRow(array $row): int
    {
        $value = $row['menu_category'] ?? 0;
        if (is_object($value) && isset($value->term_id)) {
            return (int) $value->term_id;
        }
        if (is_array($value)) {
            if (isset($value['term_id'])) {
                return (int) $value['term_id'];
            }
            $value = reset($value);
        }

        return (int) $value;
    }

    private static function userCanEdit(): bool
    {
        return current_user_can('edit_products');
    }

    private static function redirectWithResult(string $redirect, string $type, string $message): void
    {
        set_transient(self::RESULT_TRANSIENT . get_current_user_id(), [
            'type' => $type,
            'message' => $message,
        ], MINUTE_IN_SECONDS);
        wp_safe_redirect($redirect);
        exit;
    }
}
