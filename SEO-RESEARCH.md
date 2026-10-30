# Keepur SEO and AI search implementation

Research date: 18 September 2026. This is qualitative search-intent research from public search results and vendor pages, not measured keyword volumes, difficulty scores, or ranking forecasts.

## Keyword map

| Intent | Search phrases | Primary page |
| --- | --- | --- |
| Buy or compare retail POS | POS software Bangladesh, point of sale software Bangladesh, retail POS software, POS system for small shops | /pos-software-bangladesh |
| Organize a shop | shop management software Bangladesh, retail shop software, দোকান ম্যানেজমেন্ট সফটওয়্যার | /shop-management-software |
| Manage stock | inventory management software Bangladesh, stock management software, retail inventory software | /inventory-management-software |
| Manage branches | multi-store POS, multi-branch shop management, multiple store inventory | /multi-store-pos |
| Compare cost | POS software price in Bangladesh, retail billing software price, POS subscription BDT | /#pricing |
| Product discovery | web-based POS and shop management software Bangladesh | / |

English phrases reflect repeated themes in current local vendor results. Bengali wording is a local-language candidate; volume has not been validated. Since 2026-10-30 the site has a full Bangla version under `/bn` (home, contact, four solution pages) with `en`/`bn`/`x-default` hreflang alternates, `bn_BD` Open Graph locale, Bangla FAQ schema, and both languages in sitemap.xml. Prioritize retail software searches rather than generic POS machine/payment terminal searches. Do not target restaurant, pharmacy compliance, NBR/VAT certification, offline functionality, hardware packages, or AI product capabilities without confirming that the product supports them.

## Research sources

- https://www.nexchar.com/pos-bd — POS, billing, inventory, barcode and reporting vocabulary.
- https://itliner.com/retail-shops.html — retail shop and stock-management intent.
- https://mondaypos.com/pricing — Bangladesh pricing and outlet-comparison intent.
- https://dokani.org/ — shop-owner and multi-store terminology.
- https://developers.google.com/search/docs/appearance/ai-features — ordinary SEO remains the foundation for AI Overviews and AI Mode; no special schema or AI file is required.
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies — markup must accurately represent page content.
- https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a — crawlability, clear content and sitemaps support Bing and AI-powered search.
- https://developers.openai.com/api/docs/bots — OAI-SearchBot supports search discovery; crawler access does not guarantee visibility.

## Implemented

Descriptive titles, descriptions and canonicals; consistent Open Graph cards; four static, internally linked solution pages; visible native-detail FAQs with server-rendered answers and matching schema; Organization, SoftwareApplication and breadcrumb structured data; robots.txt and sitemap.xml. Removed generic social-network homepage links and an unverified static price from schema. Replaced unsupported homepage usage counters with product capability labels. Redirect-only login/signup pages are excluded from the sitemap. Public crawling is allowed, including search bots that honor the generic robots rules. No new AI-training-specific policy is introduced.

FAQ schema describes visible content; commercial software sites should not expect Google FAQ rich results. No fake reviews or ratings are added. No keyword meta tags or hidden keyword lists are added.

## After deployment

1. Verify https://keepur.app/robots.txt and https://keepur.app/sitemap.xml are served and all listed pages return 200 with their own canonicals.
2. Verify the site in Google Search Console and Bing Webmaster Tools, then submit the sitemap. This requires the owner's account access.
3. Check rendered pages with Google URL Inspection and structured data with Rich Results Test/Schema Markup Validator. Software schema is descriptive; rich-result eligibility is not promised.
4. Check hosting/CDN robots and firewall policies: website files cannot override platform-level crawler blocks.
5. Measure relevant queries, impressions, clicks and conversions. Track AI referrals/citations where tools expose them. Keyword priority should be refined with actual Search Console data.

These changes improve discoverability; rankings and AI recommendations are determined by search systems and cannot be guaranteed. Prices remain sourced from the live plan service rather than repeated as fixed editorial claims.
