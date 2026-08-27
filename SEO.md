# SEO and discoverability guide

This repository includes a crawlable HTML description, Open Graph and Twitter metadata,
JSON-LD structured data, a branded favicon, and a `robots.txt` file for the frontend.

## Before publishing

1. Replace `yourusername` in the README badge link with the real GitHub owner and repository.
2. Deploy the frontend to a stable HTTPS URL.
3. Add the production URL as `og:url` and a canonical link in `frontend/index.html`.
4. Replace the comment in `frontend/public/robots.txt` with a real sitemap URL.
5. Create a 1200 × 630 pixel social preview image and reference it with `og:image` and
   `twitter:image`.
6. Register the production URL with Google Search Console or another webmaster tool.

## Content guidelines

- Keep answers and policy summaries accurate, dated, and linked to their official sources.
- Do not promise perfect accuracy or “zero hallucinations”; explain that users should verify
  time-sensitive information against the cited GOV.UK page.
- Add short, task-focused examples when new policy categories are indexed.
- Ask contributors to star the project only when the project has genuinely helped them.

## Recommended repository topics

`rag` · `retrieval-augmented-generation` · `government` · `uk-government` · `govuk` ·
`policy` · `question-answering` · `semantic-search` · `typescript` · `react` · `postgresql`