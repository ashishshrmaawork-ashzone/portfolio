# Ashish Sharma Portfolio

The website is a Next.js React application. Pages use extensionless routes:
`/`, `/projects`, `/projects/[slug]`, `/blog` and `/blog/[slug]`. WordPress
supplies editable site content; static design assets live in `public/assets/`.

## Local development

Run `npm install`, then `npm run dev` and open http://localhost:3000. Set
`WORDPRESS_API_URL` in `.env.local` only if the WordPress REST root differs
from the default in `.env.example`.

## WordPress content management

Install and activate the plugin in
`wordpress-plugin/ashish-portfolio-cms/` on the WordPress site configured by
`WORDPRESS_API_URL`. In WordPress Admin, use **Portfolio Content** to edit
branding, homepage copy, the About section, navigation, contact information,
social links and footer text.

Manage projects, services, work experience, education and testimonials in
their existing WordPress content screens. Published WordPress posts appear at
`/blog`; add a featured image and category in Posts to populate article cards.
The default WordPress “Hello world!” post is excluded.

The plugin exposes site copy at
`/wp-json/custom/v1/site-settings`. It also provides a public submission
endpoint for the portfolio forms. Every valid contact or quote request is
saved in WordPress as a private **Contact submission**, including its name,
email, phone, request type and message. Editors can review submissions from
**Portfolio Content → Contact submissions**. WordPress sends a notification to
the configurable **Enquiry notification email**, initially
`ashishshrmaa@outlook.com`. Configure a working WordPress mail/SMTP transport
on the WordPress host so notifications can be delivered. A mail delivery
failure is reported to the visitor; the request remains saved for review.

Install by copying the plugin folder to
`wp-content/plugins/ashish-portfolio-cms/` on the WordPress server and
activating it under **Plugins**. The plugin must be activated before the
settings endpoint and contact/quote storage are available.

## Deployment

Deploy this repository using the Next.js preset with the repository root as
the project root and `npm run build` as the build command. Configure
`WORDPRESS_API_URL`, install the WordPress plugin on the API site, and make
sure WordPress can send mail to the notification address. Legacy `.html`
routes redirect to their extensionless React routes.

## Validation

Run `npm run lint` and `npm run build`. Avoid submitting test enquiries on the
live site because successful submissions are stored and email notifications
are sent.
