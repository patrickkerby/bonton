<?php
/**
 * Email Footer
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-footer.php.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 10.0.0
 */

defined( 'ABSPATH' ) || exit;

$email = $email ?? null;
$bg    = get_option( 'woocommerce_email_background_color', '#fcfcfc' );
$body  = get_option( 'woocommerce_email_body_background_color', '#ffffff' );

$force_light_bg = static function ( $color ) {
	return sprintf(
		'background-color:%1$s !important;background-image:linear-gradient(%1$s,%1$s) !important;',
		esc_attr( $color )
	);
};

?>
																		</div>
																	</td>
																</tr>
															</table>
															<!-- End Content -->
														</td>
													</tr>
												</table>
												<!-- End Body -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td align="center" valign="top" bgcolor="<?php echo esc_attr( $bg ); ?>" style="<?php echo esc_attr( $force_light_bg( $bg ) ); ?>">
									<!-- Footer -->
									<table border="0" cellpadding="10" cellspacing="0" width="100%" id="template_footer" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
										<tr>
											<td valign="top" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
												<table border="0" cellpadding="10" cellspacing="0" width="100%">
													<tr>
														<td colspan="2" valign="middle" id="credit" bgcolor="<?php echo esc_attr( $body ); ?>" style="<?php echo esc_attr( $force_light_bg( $body ) ); ?>">
															<?php
															$email_footer_text = get_option( 'woocommerce_email_footer_text' );
															if ( apply_filters( 'woocommerce_is_email_preview', false ) ) {
																$text_transient    = get_transient( 'woocommerce_email_footer_text' );
																$email_footer_text = false !== $text_transient ? $text_transient : $email_footer_text;
															}
															echo wp_kses_post(
																wpautop(
																	wptexturize(
																		apply_filters( 'woocommerce_email_footer_text', $email_footer_text, $email )
																	)
																)
															);
															?>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
									<!-- End Footer -->
								</td>
							</tr>
						</table>
					</div>
				</td>
				<td><!-- Deliberately empty to support consistent sizing and layout across multiple email clients. --></td>
			</tr>
		</table>
	</body>
</html>
