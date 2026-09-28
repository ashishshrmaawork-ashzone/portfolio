<?php
/**
 * Plugin Name: Ashish Portfolio CMS
 * Description: Manage the portfolio site's shared copy and expose it to the Next.js frontend.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Ashish Sharma
 */

defined( 'ABSPATH' ) || exit;

const ASHISH_PORTFOLIO_CMS_OPTION = 'ashish_portfolio_cms_settings';
const ASHISH_PORTFOLIO_CMS_SUBMISSION_TYPE = 'portfolio_enquiry';

function ashish_portfolio_cms_register_submission_type() {
	register_post_type(
		ASHISH_PORTFOLIO_CMS_SUBMISSION_TYPE,
		array(
			'labels'       => array(
				'name'          => 'Contact submissions',
				'singular_name' => 'Contact submission',
				'menu_name'     => 'Contact submissions',
				'view_item'     => 'View submission',
				'search_items'  => 'Search submissions',
			),
			'public'       => false,
			'show_ui'      => true,
			'show_in_menu' => 'ashish-portfolio-cms',
			'supports'     => array( 'title', 'editor' ),
			'capability_type' => 'post',
			'map_meta_cap' => true,
		)
	);
}
add_action( 'init', 'ashish_portfolio_cms_register_submission_type' );

function ashish_portfolio_cms_add_submission_meta_box() {
	add_meta_box(
		'ashish-portfolio-submission-details',
		'Sender details',
		'ashish_portfolio_cms_render_submission_meta_box',
		ASHISH_PORTFOLIO_CMS_SUBMISSION_TYPE,
		'side'
	);
}
add_action( 'add_meta_boxes_' . ASHISH_PORTFOLIO_CMS_SUBMISSION_TYPE, 'ashish_portfolio_cms_add_submission_meta_box' );

function ashish_portfolio_cms_render_submission_meta_box( $post ) {
	$fields = array(
		'Type'    => '_portfolio_enquiry_type',
		'Name'    => '_portfolio_enquiry_name',
		'Email'   => '_portfolio_enquiry_email',
		'Phone'   => '_portfolio_enquiry_phone',
		'Subject' => '_portfolio_enquiry_subject',
	);
	echo '<dl>';
	foreach ( $fields as $label => $meta_key ) {
		$value = get_post_meta( $post->ID, $meta_key, true );
		echo '<dt><strong>' . esc_html( $label ) . '</strong></dt>';
		echo '<dd>' . esc_html( '' !== $value ? $value : 'Not provided' ) . '</dd>';
	}
	echo '</dl>';
}

function ashish_portfolio_cms_fields() {
	return array(
		'Branding' => array(
			'site_name'        => array( 'Site name', 'text', 'Ashish Sharma' ),
			'site_tagline'     => array( 'Site tagline', 'text', 'Full Stack Developer' ),
			'site_description' => array( 'SEO description', 'textarea', 'Ashish Sharma builds fast, useful and modern digital products with PHP, WordPress, JavaScript, React and Next.js.' ),
			'logo_url'         => array( 'Logo image URL', 'url', '' ),
			'footer_logo_url'  => array( 'Footer logo image URL', 'url', '' ),
			'favicon_url'      => array( 'Favicon image URL', 'url', '' ),
			'hero_image_url'   => array( 'Hero image URL', 'url', '' ),
		),
		'Home page' => array(
			'home_eyebrow'          => array( 'Hero eyebrow', 'text', 'Welcome to my world' ),
			'home_name'             => array( 'Hero name', 'text', 'Ashish Sharma' ),
			'home_roles'            => array( 'Rotating job titles (one per line)', 'textarea', "Developer.\nProfessional Coder.\nWeb Developer." ),
			'home_intro'            => array( 'Hero introduction', 'textarea', 'I build reliable digital experiences across PHP, WordPress, JavaScript, React, Next.js and server handling — from a clean interface to a dependable deployment.' ),
			'terminal_user'         => array( 'Terminal prompt', 'text', 'ashish@dev:~' ),
			'terminal_command'      => array( 'Terminal command', 'text', 'build --fast --secure --scalable' ),
			'terminal_status'       => array( 'Terminal status', 'text', 'ready for your next project' ),
			'primary_cta'           => array( 'Primary button', 'text', 'View my work' ),
			'secondary_cta'         => array( 'Secondary button', 'text', 'Start a project' ),
			'home_stats'            => array( 'Hero highlights (value|label, one per line)', 'textarea', "10+|Years experience\n50+|Projects delivered\n24/7|Technical support" ),
			'facebook_url'          => array( 'Facebook URL', 'url', '' ),
			'instagram_url'         => array( 'Instagram URL', 'url', '' ),
			'linkedin_url'          => array( 'LinkedIn URL', 'url', '' ),
			'github_url'            => array( 'GitHub URL', 'url', '' ),
		),
		'Section headings' => array(
			'services_eyebrow'      => array( 'Services eyebrow', 'text', 'Features' ),
			'services_title'        => array( 'Services title', 'text', 'What I Do' ),
			'portfolio_eyebrow'     => array( 'Portfolio eyebrow', 'text', 'Visit my portfolio and keep your feedback' ),
			'portfolio_title'       => array( 'Portfolio title', 'text', 'My Portfolio' ),
			'resume_eyebrow'        => array( 'Resume eyebrow', 'text', '10+ Years of Experience' ),
			'resume_title'          => array( 'Resume title', 'text', 'My Resume' ),
			'testimonials_eyebrow'  => array( 'Testimonials eyebrow', 'text', 'Client testimonials' ),
			'testimonials_title'    => array( 'Testimonials title', 'text', 'Good work. Great partnerships.' ),
			'testimonials_intro'    => array( 'Testimonials introduction', 'textarea', 'A space for client stories, shared experiences and the details that make a difference.' ),
			'contact_eyebrow'       => array( 'Contact eyebrow', 'text', 'Contact' ),
			'contact_title'         => array( 'Contact title', 'text', "Let's build something great." ),
			'contact_availability'  => array( 'Availability message', 'text', 'Available for freelance projects' ),
			'contact_intro_title'   => array( 'Contact introduction heading', 'text', 'Your idea. Our next project.' ),
			'contact_intro'         => array( 'Contact introduction', 'textarea', 'Need a website, an application or a better experience for your users? Tell me what you have in mind.' ),
			'blog_eyebrow'          => array( 'Blog eyebrow', 'text', "THE DEVELOPER'S NOTEBOOK" ),
			'blog_title'            => array( 'Blog title', 'text', 'Ideas for better digital experiences.' ),
			'blog_intro'            => array( 'Blog introduction', 'textarea', 'Notes on planning, design and the details that make a website work.' ),
		),
		'About section' => array(
			'about_eyebrow' => array( 'About eyebrow', 'text', 'A little about me' ),
			'about_title'   => array( 'About heading', 'text', 'Building useful digital experiences.' ),
			'about_intro'   => array( 'About introduction', 'textarea', 'I am a full stack developer who enjoys turning complex problems into fast, dependable products.' ),
			'about_detail'  => array( 'About details', 'textarea', 'From early planning and interface development through deployment and ongoing support, I help teams build web experiences that work well for the people who use them.' ),
			'about_image_url' => array( 'About image URL', 'url', '' ),
			'about_image_alt' => array( 'About image description', 'text', '' ),
			'about_highlights' => array( 'About highlights (one per line)', 'textarea', "Full stack web development\nWordPress and custom applications\nPerformance and deployment" ),
		),
		'Navigation' => array(
			'nav_home'      => array( 'Home link label', 'text', 'Home' ),
			'nav_about'     => array( 'About link label', 'text', 'About' ),
			'nav_services'  => array( 'Services link label', 'text', 'Features' ),
			'nav_portfolio' => array( 'Portfolio link label', 'text', 'Portfolio' ),
			'nav_resume'    => array( 'Resume link label', 'text', 'Resume' ),
			'nav_blog'      => array( 'Blog link label', 'text', 'Blog' ),
			'nav_contact'   => array( 'Contact link label', 'text', 'Contact' ),
			'nav_quote'     => array( 'Quote button label', 'text', 'Get a Quote' ),
		),
		'Contact and footer' => array(
			'contact_email'        => array( 'Contact email', 'text', 'ashishsharmaaa@outlook.com' ),
			'contact_phone'        => array( 'Contact phone', 'text', '+91 99286 86337' ),
			'whatsapp_url'         => array( 'WhatsApp URL', 'url', 'https://wa.me/919928686337' ),
			'notification_email'   => array( 'Enquiry notification email', 'text', 'ashishshrmaa@outlook.com' ),
			'footer_description'   => array( 'Footer introduction', 'textarea', 'Building fast, secure and scalable digital experiences from idea to deployment.' ),
			'footer_cta'           => array( 'Footer call to action', 'text', 'Let’s work together' ),
			'footer_explore_heading' => array( 'Footer explore heading', 'text', 'Explore' ),
			'footer_services_heading' => array( 'Footer services heading', 'text', 'Services' ),
			'footer_contact_heading' => array( 'Footer contact heading', 'text', 'Connect' ),
			'footer_services'      => array( 'Footer service links (one per line)', 'textarea', "Web Development\nPerformance Optimization\nServer Handling\nWebsite Maintenance" ),
			'copyright'            => array( 'Copyright text', 'text', '© 2026 Ashish Sharma. All rights reserved.' ),
		),
	);
}

function ashish_portfolio_cms_defaults() {
	$defaults = array();
	foreach ( ashish_portfolio_cms_fields() as $fields ) {
		foreach ( $fields as $key => $field ) {
			$defaults[ $key ] = $field[2];
		}
	}
	return $defaults;
}

function ashish_portfolio_cms_sanitize( $input ) {
	$input = is_array( $input ) ? $input : array();
	$clean = array();
	foreach ( ashish_portfolio_cms_fields() as $fields ) {
		foreach ( $fields as $key => $field ) {
			$value = isset( $input[ $key ] ) && is_string( $input[ $key ] ) ? $input[ $key ] : '';
			$clean[ $key ] = 'url' === $field[1] ? esc_url_raw( trim( $value ) ) : ( 'textarea' === $field[1] ? sanitize_textarea_field( $value ) : sanitize_text_field( $value ) );
		}
	}
	return $clean;
}

function ashish_portfolio_cms_register_settings() {
	register_setting(
		'ashish-portfolio-cms',
		ASHISH_PORTFOLIO_CMS_OPTION,
		array(
			'type'              => 'array',
			'sanitize_callback' => 'ashish_portfolio_cms_sanitize',
			'default'           => ashish_portfolio_cms_defaults(),
		)
	);
}
add_action( 'admin_init', 'ashish_portfolio_cms_register_settings' );

function ashish_portfolio_cms_add_menu() {
	add_menu_page(
		'Portfolio Content',
		'Portfolio Content',
		'manage_options',
		'ashish-portfolio-cms',
		'ashish_portfolio_cms_render_page',
		'dashicons-edit-page',
		26
	);
}
add_action( 'admin_menu', 'ashish_portfolio_cms_add_menu' );

function ashish_portfolio_cms_render_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$settings = wp_parse_args( get_option( ASHISH_PORTFOLIO_CMS_OPTION, array() ), ashish_portfolio_cms_defaults() );
	?>
	<div class="wrap">
		<h1>Portfolio Content</h1>
		<p>Edit shared site copy here. Manage projects, services, work experience, education, testimonials and blog articles in their WordPress content screens.</p>
		<form action="options.php" method="post">
			<?php settings_fields( 'ashish-portfolio-cms' ); ?>
			<?php foreach ( ashish_portfolio_cms_fields() as $group => $fields ) : ?>
				<h2><?php echo esc_html( $group ); ?></h2>
				<table class="form-table" role="presentation"><tbody>
					<?php foreach ( $fields as $key => $field ) : ?>
						<tr>
							<th scope="row"><label for="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $field[0] ); ?></label></th>
							<td>
								<?php if ( 'textarea' === $field[1] ) : ?>
									<textarea class="large-text" rows="3" id="<?php echo esc_attr( $key ); ?>" name="<?php echo esc_attr( ASHISH_PORTFOLIO_CMS_OPTION . '[' . $key . ']' ); ?>"><?php echo esc_textarea( $settings[ $key ] ); ?></textarea>
								<?php else : ?>
									<input class="regular-text" type="<?php echo esc_attr( $field[1] ); ?>" id="<?php echo esc_attr( $key ); ?>" name="<?php echo esc_attr( ASHISH_PORTFOLIO_CMS_OPTION . '[' . $key . ']' ); ?>" value="<?php echo esc_attr( $settings[ $key ] ); ?>">
								<?php endif; ?>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody></table>
			<?php endforeach; ?>
			<?php submit_button( 'Save portfolio content' ); ?>
		</form>
	</div>
	<?php
}

function ashish_portfolio_cms_register_api() {
	register_rest_route(
		'custom/v1',
		'/site-settings',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'permission_callback' => '__return_true',
			'callback'            => function () {
				$settings = wp_parse_args( get_option( ASHISH_PORTFOLIO_CMS_OPTION, array() ), ashish_portfolio_cms_defaults() );
				return rest_ensure_response( $settings );
			},
		)
	);
	register_rest_route(
		'custom/v1',
		'/messages',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'permission_callback' => '__return_true',
			'callback'            => 'ashish_portfolio_cms_save_message',
			'args'                => array(
				'name'    => array( 'required' => true, 'type' => 'string' ),
				'email'   => array( 'required' => true, 'type' => 'string' ),
				'phone'   => array( 'required' => false, 'type' => 'string' ),
				'subject' => array( 'required' => false, 'type' => 'string' ),
				'message' => array( 'required' => true, 'type' => 'string' ),
				'type'    => array( 'required' => false, 'type' => 'string' ),
			),
		)
	);
}
add_action( 'rest_api_init', 'ashish_portfolio_cms_register_api' );

function ashish_portfolio_cms_save_message( WP_REST_Request $request ) {
	$name    = sanitize_text_field( trim( $request->get_param( 'name' ) ) );
	$email   = sanitize_email( trim( $request->get_param( 'email' ) ) );
	$phone   = sanitize_text_field( trim( (string) $request->get_param( 'phone' ) ) );
	$subject = sanitize_text_field( trim( (string) $request->get_param( 'subject' ) ) );
	$message = sanitize_textarea_field( trim( $request->get_param( 'message' ) ) );
	$type    = 'quote' === $request->get_param( 'type' ) ? 'Quote request' : 'Contact message';

	if ( '' === $name || '' === $message || ! is_email( $email ) ) {
		return new WP_Error( 'invalid_enquiry', 'Please enter your name, a valid email address and a message.', array( 'status' => 400 ) );
	}
	if ( strlen( $name ) > 200 || strlen( $email ) > 320 || strlen( $phone ) > 80 || strlen( $subject ) > 200 || strlen( $message ) > 10000 ) {
		return new WP_Error( 'enquiry_too_long', 'One or more enquiry fields exceed the allowed length.', array( 'status' => 400 ) );
	}

	$settings  = wp_parse_args( get_option( ASHISH_PORTFOLIO_CMS_OPTION, array() ), ashish_portfolio_cms_defaults() );
	$recipient = sanitize_email( $settings['notification_email'] );
	if ( ! is_email( $recipient ) ) {
		return new WP_Error( 'notification_email_missing', 'The portfolio notification email address is not configured.', array( 'status' => 503 ) );
	}

	$rate_key       = 'ashish_portfolio_enquiry_' . hash( 'sha256', strtolower( $email ) );
	$attempts       = (int) get_transient( $rate_key );
	if ( $attempts >= 5 ) {
		return new WP_Error( 'enquiry_rate_limited', 'Too many enquiries were sent. Please try again later.', array( 'status' => 429 ) );
	}
	set_transient( $rate_key, $attempts + 1, 10 * MINUTE_IN_SECONDS );

	$title = sprintf( '%s: %s', $type, $name );
	if ( '' !== $subject ) {
		$title .= ' — ' . $subject;
	}
	$post_id = wp_insert_post(
		array(
			'post_type'    => ASHISH_PORTFOLIO_CMS_SUBMISSION_TYPE,
			'post_status'  => 'private',
			'post_title'   => $title,
			'post_content' => $message,
		),
		true
	);
	if ( is_wp_error( $post_id ) ) {
		error_log( 'Portfolio enquiry could not be stored: ' . $post_id->get_error_message() );
		return new WP_Error( 'enquiry_storage_failed', 'Your enquiry could not be stored. Please try again later.', array( 'status' => 500 ) );
	}

	update_post_meta( $post_id, '_portfolio_enquiry_name', $name );
	update_post_meta( $post_id, '_portfolio_enquiry_email', $email );
	update_post_meta( $post_id, '_portfolio_enquiry_phone', $phone );
	update_post_meta( $post_id, '_portfolio_enquiry_subject', $subject );
	update_post_meta( $post_id, '_portfolio_enquiry_type', $type );

	$body = implode(
		"\n",
		array(
			'Type: ' . $type,
			'Name: ' . $name,
			'Email: ' . $email,
			'Phone: ' . ( '' !== $phone ? $phone : 'Not provided' ),
			'Subject: ' . ( '' !== $subject ? $subject : 'Not provided' ),
			'',
			$message,
			'',
			'Submission ID: ' . $post_id,
		)
	);
	$sent = wp_mail(
		$recipient,
		sprintf( '[Portfolio] %s%s', $type, '' !== $subject ? ': ' . $subject : '' ),
		$body,
		array( 'Reply-To: ' . $name . ' <' . $email . '>' )
	);
	if ( ! $sent ) {
		error_log( 'Portfolio enquiry ' . $post_id . ' was stored, but its email notification failed.' );
		return new WP_Error( 'enquiry_email_failed', 'Your enquiry was saved, but its email notification could not be delivered. Please email Ashish directly.', array( 'status' => 502 ) );
	}

	return rest_ensure_response(
		array(
			'success' => true,
			'message' => 'Thank you. Your enquiry has been received.',
		)
	);
}
