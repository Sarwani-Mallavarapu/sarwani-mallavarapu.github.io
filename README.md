# GECE website (V4)

V2's design as the base, with V1's products, consultancy, GIS services and legacy restored.
Static HTML, CSS and JavaScript. No database and no build step.

## What is in this folder

| Item | What it is |
|---|---|
| `site/` | The website. This folder is what goes on the web server. |
| `START_PREVIEW.bat` | Double-click to preview the site on this computer, redirects included. |
| `preview_server.py` | The small Python program the preview uses. |
| `URL_MAP.md` | Every old V1 address and where it goes now. |
| `PENDING_CLIENT_REFERENCES.md` | V1 text that names clients, agencies or certificates, held back until confirmed. |

## Preview on this computer

1. Double-click `START_PREVIEW.bat` (needs Python, which is already on a developer machine).
2. The browser opens `http://127.0.0.1:8000/`. Keep the black window open while previewing.
3. Try an old address such as `http://127.0.0.1:8000/aboutus.html` to see a redirect work.

Opening `site/index.html` directly also works, but redirects then use the slower fallback pages.

## Changing things in one place

Everything below is in **`site/assets/site-config.js`**. Edit, save, refresh the browser (Ctrl + F5).

| To change | Edit |
|---|---|
| Logo | `logo.src` (or overwrite `assets/brand/logo.svg` with a file of the same name) |
| Logo size in the header | `logo.height` |
| Browser tab icon | `favicon` |
| Email address | `email` |
| Phone number | `phone` (empty = hidden everywhere) |
| Registered office address | `registeredOffice.lines` (shown on the Contact page only) |
| Corporate office address | `corporateOffice.lines` (empty = hidden; fill it in and it appears on the Contact page) |
| Founding year and "years of experience" | `foundedYear` (years and "three decades" wording are worked out from it) |
| Track-record figures (km surveyed, towns, customers, assets) | `trackRecord` |
| Number of products shown in text | automatic: counted from the Products menu in `site-nav.js` |
| Company name | `companyName` |
| "Our journey" milestones | `milestones` |
| Where the enquiry form is sent | `formEndpoint` |

Other single places:

| To change | Edit |
|---|---|
| Menu and footer links | `site/assets/site-nav.js` |
| Colours and fonts | the `:root` block at the top of `site/assets/site.css` |
| Photographs | replace the file in `site/assets/images/` with a new one of the same name |
| Redirects | the list in `site/web.config` |

### Images and where they are used

All images are in `site/assets/`. Replace a file with another of the same name and every page that uses it updates.

| File | Used for |
|---|---|
| `brand/logo.svg` | Header logo (V1 logo, redrawn sharp, without the ISO line) |
| `brand/logo-original-v1.png` | The original V1 logo, kept unchanged. To use it, set `logo.src` to this path. |
| `brand/logo-mark.svg` | The symbol on its own |
| `brand/favicon.svg` | Browser tab icon |
| `images/hero-power.jpg` | Home page banner, About banner |
| `images/switchgear.jpg` | Products banner, home "Who we are" |
| `images/substation-wide.jpg` | Default banner for inner pages |
| `images/gis-mobile.jpg`, `survey-instrument.jpg`, `network-map.jpg`, `africa.jpg` | GIS pages |
| `images/smart-grid.jpg`, `analysis.jpg`, `devices.jpg`, `globe.jpg` | Service and solution pages |
| `images/industries/power.jpg` | Industries page, Power (V1 photo) |
| `images/industries/gas.jpg`, `water.jpg`, `sewerage.jpg`, `urban-planning.jpg` | Industries page. **Placeholders** marked "Photo to be supplied": replace each with a real photo of the same name (landscape, about 1600 × 1000 px) |
| `images/clients/` | The 46 client logos from V1. **Not displayed** until approved. |
| `images/certifications/` | OGC compliance certificates for POWERGIS 8.0, shown on `certifications.html`. Oracle (expired) and ISO images were moved to `archive/removed-certificates/`. |

## Changes in V4

- "Discuss a project" button removed from the header, and the "Start a conversation" band removed from the bottom of every page.
- Email changed to gece@geceindia.com (one setting in `site-config.js`).
- Addresses removed from the footer and the About page; they now appear on the Contact page only.
- ® mark added to every product name (POWERGIS®, POWERNET® and the rest) in page text, headings, menus, footer and page titles. It is added automatically: a product name typed without ® in a page or in `site-nav.js` still shows the mark.
- Industries page rewritten around five sectors: Power, Gas, Water, Sewerage and Urban planning, with a sector bar and an Industries menu. Only Power states project experience; the other four describe how GECE's services apply.

## Pages left blank on purpose

- `certifications.html` shows the OGC certificate only. `clients.html` shows a "coming soon" note. Each file has a comment marking where the content goes.
- Both are marked "noindex" so search engines skip them until they have content. Remove that when you fill them (search the file for `noindex`).

## Moving to Windows / IIS

1. Copy the **contents of `site/`** to the web root of the IIS site.
2. Install the IIS **URL Rewrite** module. `web.config` needs it; without it IIS shows error 500.19.
3. The redirects assume the site sits at the root of the domain, not in a sub-folder.
4. `web.config` has not been run on a real IIS server yet. Test these on staging: an old address (`/aboutus.html`), a missing page (should show the 404 page) and the fonts.
5. Before going live, delete `assets/images/clients/` if its content is still not approved. They are not linked from any page, but they would be reachable by direct address.
6. Do not copy V1's `net2ftp-*.zip`, `citrix-verification-code`, `Samples/` or `Test.html` to the new server.

## The enquiry form

With `formEndpoint` empty, the form opens the visitor's email program with the message filled in. To have it send directly, set `formEndpoint` to a form service address or to your own server handler.

## Fonts

Open Sans and Source Serif 4 are stored in `site/assets/fonts/` (SIL Open Font License), so the site makes no calls to outside servers.
