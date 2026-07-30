<?php
/**
 * Email Styles
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-styles.php.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates/Emails
 * @version 4.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Automattic\WooCommerce\Utilities\FeaturesUtil;

$email_improvements_enabled = class_exists( FeaturesUtil::class )
	&& FeaturesUtil::feature_is_enabled( 'email_improvements' );

// Load colors.
$bg        = get_option( 'woocommerce_email_background_color' );
$body      = get_option( 'woocommerce_email_body_background_color' );
$base      = get_option( 'woocommerce_email_base_color' );
$base_text = wc_light_or_dark( $base, '#202020', '#ffffff' );
$text      = get_option( 'woocommerce_email_text_color' );

$header_bg   = $email_improvements_enabled ? $body : $base;
$header_text = $email_improvements_enabled ? $text : $base_text;
$h1_color    = $header_text;

// Pick a contrasting color for links.
$link_color = wc_hex_is_light( $base ) ? $base : $base_text;

if ( wc_hex_is_light( $body ) ) {
	$link_color = wc_hex_is_light( $base ) ? $base_text : $base;
}

if ( $email_improvements_enabled ) {
	$link_color = '#53C999';
}

$bg_darker_10    = wc_hex_darker( $bg, 10 );
$body_darker_10  = wc_hex_darker( $body, 10 );
$base_lighter_20 = wc_hex_lighter( $base, 20 );
$base_lighter_40 = wc_hex_lighter( $base, 40 );
$text_lighter_20 = wc_hex_lighter( $text, 20 );
$text_lighter_40 = wc_hex_lighter( $text, 40 );

$email_font = 'Georgia, "Times New Roman", serif, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif';

// !important; is a gmail hack to prevent styles being stripped if it doesn't like something.
// body{padding: 0;} ensures proper scale/positioning of the email in the iOS native email app.
?>
:root {
	color-scheme: light only;
	supported-color-schemes: light;
}

body {
	background-color: <?php echo esc_attr( $bg ); ?>;
	padding: 0;
	text-align: center;
}

#wrapper {
	background-color: <?php echo esc_attr( $bg ); ?>;
	margin: 0;
	padding: 70px 0;
	-webkit-text-size-adjust: none !important;
	width: 100%;
}

#template_container {
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) !important;
	background-color: <?php echo esc_attr( $body ); ?>;
	border: 1px solid <?php echo esc_attr( $bg_darker_10 ); ?>;
	border-radius: 3px !important;
}

#template_header {
	background-color: <?php echo esc_attr( $header_bg ); ?>;
	border-radius: 3px 3px 0 0 !important;
	color: <?php echo esc_attr( $header_text ); ?>;
	border-bottom: 0;
	font-weight: bold;
	line-height: 100%;
	vertical-align: middle;
	font-family: <?php echo esc_attr( $email_font ); ?>;
	width: 100% !important;
}

#template_header h1,
#template_header h1 a {
	color: <?php echo esc_attr( $h1_color ); ?> !important;
	background-color: inherit;
}

#template_header_image {
	background-color: #ffffff !important;
	padding: 24px 32px 0;
	text-align: center;
}

#template_header_image p {
	margin: 0;
}

#template_header_image img {
	display: block;
	margin: 0 auto;
	max-width: 100%;
	height: auto;
}

.email-logo-text {
	color: <?php echo esc_attr( $link_color ); ?>;
	font-family: <?php echo esc_attr( $email_font ); ?>;
	font-size: 18px;
}

.hr {
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	margin: 16px 0;
}

.hr-top {
	margin-top: 32px;
}

.hr-bottom {
	margin-bottom: 32px;
}

#template_footer td {
	padding: 0;
	border-radius: 6px;
}

#template_footer #credit {
	border: 0;
	color: <?php echo esc_attr( $text_lighter_40 ); ?>;
	font-family: <?php echo esc_attr( $email_font ); ?>;
	font-size: 12px;
	line-height: 150%;
	text-align: center;
	padding: 24px 0;
}

#template_footer #credit p {
	margin: 0 0 16px;
}

#body_content {
	background-color: <?php echo esc_attr( $body ); ?>;
}

#body_content table td {
	padding: 48px 48px 32px;
}

#body_content table td td {
	padding: 12px;
}

#body_content table td th {
	padding: 12px;
}

#body_content td ul.wc-item-meta {
	font-size: small;
	margin: 1em 0 0;
	padding: 0;
	list-style: none;
}

#body_content td ul.wc-item-meta li {
	margin: 0.5em 0 0;
	padding: 0;
}

#body_content td ul.wc-item-meta li p {
	margin: 0;
}

#body_content p {
	margin: 0 0 16px;
}

#body_content_inner {
	color: <?php echo esc_attr( $text_lighter_20 ); ?>;
	font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
	font-size: 14px;
	line-height: 150%;
	text-align: <?php echo is_rtl() ? 'right' : 'left'; ?>;
}

.td {
	color: <?php echo esc_attr( $text_lighter_20 ); ?>;
	border: 1px solid <?php echo esc_attr( $body_darker_10 ); ?>;
	vertical-align: middle;
}

.address {
	padding: 12px;
	color: <?php echo esc_attr( $text_lighter_20 ); ?>;
	border: 1px solid <?php echo esc_attr( $body_darker_10 ); ?>;
}

.text {
	color: <?php echo esc_attr( $text ); ?>;
	font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
}

.link {
	color: #53C999;
}

#header_wrapper {
	padding: <?php echo $email_improvements_enabled ? '20px 32px 0' : '36px 48px'; ?>;
}

h1 {
	color: <?php echo esc_attr( $h1_color ); ?> !important;
	font-family: <?php echo esc_attr( $email_font ); ?>;
	font-size: <?php echo $email_improvements_enabled ? '32px' : '30px'; ?>;
	font-weight: <?php echo $email_improvements_enabled ? 700 : 600; ?>;
	line-height: <?php echo $email_improvements_enabled ? '120%' : '150%'; ?>;
	margin: 0;
	text-align: <?php echo is_rtl() ? 'right' : 'left'; ?>;
	word-break: normal !important;
	white-space: normal !important;
	<?php if ( ! $email_improvements_enabled ) : ?>
	text-shadow: 0 1px 0 <?php echo esc_attr( $base_lighter_20 ); ?>;
	<?php endif; ?>
}

h2 {
	color: <?php echo esc_attr( $text ); ?>;
	display: block;
	font-family: <?php echo esc_attr( $email_font ); ?>;
	font-size: 18px;
	font-weight: bold;
	line-height: 130%;
	margin: 0 0 18px;
	text-align: <?php echo is_rtl() ? 'right' : 'left'; ?>;
}

h3 {
	color: <?php echo esc_attr( $base ); ?>;
	display: block;
	font-family: <?php echo esc_attr( $email_font ); ?>;
	font-size: 16px;
	font-weight: bold;
	line-height: 130%;
	margin: 16px 0 8px;
	text-align: <?php echo is_rtl() ? 'right' : 'left'; ?>;
}

a {
	color: <?php echo esc_attr( $link_color ); ?>;
	font-weight: normal;
	text-decoration: underline;
}

img {
	border: none;
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	height: auto;
	outline: none;
	text-decoration: none;
	text-transform: capitalize;
	vertical-align: middle;
	margin-<?php echo is_rtl() ? 'left' : 'right'; ?>: 10px;
	max-width: 100%;
}
