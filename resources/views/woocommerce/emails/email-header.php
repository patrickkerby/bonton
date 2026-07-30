<?php
/**
 * Email Header
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-header.php.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 10.0.0
 */

use Automattic\WooCommerce\Utilities\FeaturesUtil;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$email_improvements_enabled = FeaturesUtil::feature_is_enabled( 'email_improvements' );
$store_name                 = $store_name ?? get_bloginfo( 'name', 'display' );
$bg                         = get_option( 'woocommerce_email_background_color', '#fcfcfc' );
$body                       = get_option( 'woocommerce_email_body_background_color', '#ffffff' );
$text                       = get_option( 'woocommerce_email_text_color', '#4b4b4b' );
$link_color                 = '#53C999';

/**
 * Force light backgrounds in dark-mode clients (Spark, Gmail, Apple Mail).
 *
 * @param string $color Hex background color.
 */
$force_light_bg = static function ( $color ) {
	return sprintf(
		'background-color:%1$s !important;background-image:linear-gradient(%1$s,%1$s) !important;',
		esc_attr( $color )
	);
};

$heading_style = sprintf(
	'margin:0;color:%1$s !important;background-color:transparent !important;font-family:Georgia,\'Times New Roman\',serif;font-size:32px;font-weight:700;line-height:120%%;word-break:normal;white-space:normal;',
	esc_attr( $text )
);

$body_text_style = sprintf(
	'color:%1$s !important;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:150%%;',
	esc_attr( $text )
);

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>" />
		<meta content="width=device-width, initial-scale=1.0" name="viewport">
		<meta name="color-scheme" content="light only">
		<meta name="supported-color-schemes" content="light">
		<title><?php echo esc_html( $store_name ); ?></title>
	</head>
	<body <?php echo is_rtl() ? 'rightmargin' : 'leftmargin'; ?>="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="<?php echo esc_attr( $bg ); ?>" style="margin:0;padding:0;<?php echo esc_attr( $force_light_bg( $bg ) ); ?>;">
		<table width="100%" id="outer_wrapper" border="0" cellpadding="0" cellspacing="0" bgcolor="<?php echo esc_attr( $bg ); ?>" style="<?php echo esc_attr( $force_light_bg( $bg ) ); ?>;">
			<tr>
				<td><!-- Deliberately empty to support consistent sizing and layout across multiple email clients. --></td>
				<td width="600" bgcolor="<?php echo esc_attr( $bg ); ?>" style="<?php echo esc_attr( $force_light_bg( $bg ) ); ?>">
					<div id="wrapper" dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
						<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="inner_wrapper" bgcolor="<?php echo esc_attr( $email_improvements_enabled ? $body : $bg ); ?>" style="<?php echo esc_attr( $force_light_bg( $email_improvements_enabled ? $body : $bg ) ); ?>">
							<tr>
								<td align="center" valign="top">
									<?php
									$img = get_option( 'woocommerce_email_header_image' );
									if ( apply_filters( 'woocommerce_is_email_preview', false ) ) {
										$img_transient = get_transient( 'woocommerce_email_header_image' );
										$img           = false !== $img_transient ? $img_transient : $img;
									}

									if ( $email_improvements_enabled ) :
										?>
										<table border="0" cellpadding="0" cellspacing="0" width="100%">
											<tr>
												<td id="template_header_image" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
													<?php
													if ( $img ) {
														echo '<p style="margin-top:0;"><img src="' . esc_url( $img ) . '" alt="' . esc_attr( $store_name ) . '" /></p>';
													} else {
														echo '<p class="email-logo-text">' . esc_html( $store_name ) . '</p>';
													}
													?>
												</td>
											</tr>
										</table>
									<?php else : ?>
										<div id="template_header_image">
											<?php
											if ( $img ) {
												echo '<p style="margin-top:0;"><img src="' . esc_url( $img ) . '" alt="' . esc_attr( $store_name ) . '" /></p>';
											}
											?>
										</div>
									<?php endif; ?>
									<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_container" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
										<tr>
											<td align="center" valign="top" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
												<!-- Header -->
												<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
													<tr>
														<td id="header_wrapper" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
															<h1 style="<?php echo esc_attr( $heading_style ); ?>"><?php echo esc_html( $email_heading ); ?></h1>
														</td>
													</tr>
												</table>
												<!-- End Header -->
											</td>
										</tr>
										<tr>
											<td align="center" valign="top" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
												<!-- Body -->
												<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_body" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
													<tr>
														<td valign="top" id="body_content" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
															<!-- Content -->
															<table border="0" cellpadding="20" cellspacing="0" width="100%">
																<tr>
																	<td valign="top" id="body_content_inner_cell" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
																		<div id="body_content_inner" style="<?php echo esc_attr( $body_text_style ); ?>">
