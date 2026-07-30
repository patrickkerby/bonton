<?php
/**
 * Email Header
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-header.php.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates/Emails
 * @version 10.0.0
 */

use Automattic\WooCommerce\Utilities\FeaturesUtil;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$email_improvements_enabled = FeaturesUtil::feature_is_enabled( 'email_improvements' );
$store_name                 = $store_name ?? get_bloginfo( 'name', 'display' );
$logo_image_width           = absint( get_option( 'woocommerce_email_header_image_width', 120 ) );
if ( $logo_image_width < 1 ) {
	$logo_image_width = 120;
}

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
	<body bgcolor="#f3f3f0" <?php echo is_rtl() ? 'rightmargin' : 'leftmargin'; ?>="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin:0;padding:0;background-color:#f3f3f0 !important;">
		<table width="100%" id="outer_wrapper" border="0" cellpadding="0" cellspacing="0" bgcolor="#f3f3f0" style="background-color:#f3f3f0 !important;margin:0;padding:0;width:100%;">
			<tr>
				<td><!-- Deliberately empty to support consistent sizing and layout across multiple email clients. --></td>
				<td width="600" bgcolor="#f3f3f0" style="background-color:#f3f3f0 !important;">
					<div id="wrapper" dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>" style="background-color:#f3f3f0 !important;">
						<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="inner_wrapper" bgcolor="#f3f3f0" style="background-color:#f3f3f0 !important;">
							<tr>
								<td align="center" valign="top" bgcolor="#f3f3f0" style="background-color:#f3f3f0 !important;">
									<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_container" bgcolor="#ffffff" style="background-color:#ffffff !important;border:1px solid #e5e5e5;border-radius:3px;">
										<tr>
											<td align="center" valign="top" bgcolor="#ffffff" style="background-color:#ffffff !important;">
												<?php
												$img = get_option( 'woocommerce_email_header_image' );
												if ( apply_filters( 'woocommerce_is_email_preview', false ) ) {
													$img_transient = get_transient( 'woocommerce_email_header_image' );
													$img           = false !== $img_transient ? $img_transient : $img;
												}

												if ( $img ) :
													?>
													<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff !important;">
														<tr>
															<td id="template_header_image" align="center" bgcolor="#ffffff" style="background-color:#ffffff !important;padding:24px 32px 0;text-align:center;">
																<img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $store_name ); ?>" width="<?php echo esc_attr( $logo_image_width ); ?>" style="display:block;margin:0 auto;max-width:<?php echo esc_attr( $logo_image_width ); ?>px;width:<?php echo esc_attr( $logo_image_width ); ?>px;height:auto;border:0;" />
															</td>
														</tr>
													</table>
												<?php elseif ( $email_improvements_enabled ) : ?>
													<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff !important;">
														<tr>
															<td id="template_header_image" align="center" bgcolor="#ffffff" style="background-color:#ffffff !important;padding:24px 32px 0;text-align:center;">
																<p class="email-logo-text" style="margin:0;color:#53C999;font-size:18px;"><?php echo esc_html( $store_name ); ?></p>
															</td>
														</tr>
													</table>
												<?php endif; ?>
												<!-- Header -->
												<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" bgcolor="#ffffff" style="background-color:#ffffff !important;">
													<tr>
														<td id="header_wrapper" bgcolor="#ffffff" style="background-color:#ffffff !important;padding:<?php echo $email_improvements_enabled ? '20px 32px 0' : '36px 48px'; ?>;">
															<h1 style="margin:0;word-break:normal;white-space:normal;color:#3c3c3c !important;"><?php echo esc_html( $email_heading ); ?></h1>
														</td>
													</tr>
												</table>
												<!-- End Header -->
											</td>
										</tr>
										<tr>
											<td align="center" valign="top" bgcolor="#ffffff" style="background-color:#ffffff !important;">
												<!-- Body -->
												<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_body" bgcolor="#ffffff" style="background-color:#ffffff !important;">
													<tr>
														<td valign="top" id="body_content" bgcolor="#ffffff" style="background-color:#ffffff !important;">
															<!-- Content -->
															<table border="0" cellpadding="20" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff !important;">
																<tr>
																	<td valign="top" id="body_content_inner_cell" bgcolor="#ffffff" style="background-color:#ffffff !important;color:#575757 !important;">
																		<div id="body_content_inner" style="color:#575757 !important;">
