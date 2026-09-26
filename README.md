# Ashish Sharma Portfolio

The original design in html/index.html is the source for the deployed homepage.
Next.js serves this HTML and provides API routes for live WordPress content.
Services, projects (all pages), work experience, education and testimonials load
independently so an unavailable API cannot crash the entire homepage.
Project details use the same original HTML design and live project data.
Contact and quote forms submit through /api/contact.
The blog remains the existing local content; no blog API was supplied.

## Local development

Run npm install, then npm run dev. Open http://localhost:3000.
Use the local server to test the API proxy and forms. Opening html/index.html
directly uses the public WordPress API and depends on its browser CORS settings.

## WordPress

Copy .env.example to .env.local if needed. WORDPRESS_API_URL accepts the REST
root (ending in /wp-json) or the custom API base (ending in /custom/v1).
Default: https://reactapp.kgkrealty.com/ashportfolio/wp-json

## Deployment

Use the Next.js framework preset, repository root as Root Directory, and
npm run build as the build command on Vercel. Leave Output Directory at its
default. Set WORDPRESS_API_URL if overriding the default, then redeploy.
The prebuild/predev scripts copy html/ into the ignored public/original/
directory. Edit html/ rather than the generated copy.

## Validation

Run npm run build. Read-only content requests are safe to test; successful
form submissions deliver real messages and should only be tested deliberately.
