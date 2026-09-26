# Ashish Sharma Portfolio

This is a Next.js App Router portfolio powered by the public WordPress REST API.
The homepage loads the live project, service, experience, education, and testimonial
content from the site's `custom/v1` endpoints. Project detail pages use the
`custom/v1/portfolio/{slug}` endpoint.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. To use another WordPress installation, set
`WORDPRESS_API_URL` to its REST API root (copy `.env.example` to `.env.local`).
The default points to the WordPress site provided for this portfolio. The value
can also point directly to the `custom/v1` API endpoint.

## Production

```bash
npm run build
npm start
```

The contact form sends the submitted fields through the Next.js API route to
the WordPress `custom/v1/contact` endpoint.
"# portfolio" 
