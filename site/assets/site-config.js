/* =====================================================================
   GECE WEBSITE - CENTRAL SETTINGS
   ---------------------------------------------------------------------
   Change a value here and every page of the site updates automatically.
   Nothing else needs to be edited for: logo, email, addresses, phone,
   founding year, company name and the milestones list.

   After editing, save the file and refresh the browser (Ctrl + F5).
   ===================================================================== */
window.GECE_SITE = {

  /* ---------- Company ---------- */
  companyName:  "Global Energy Consulting Engineers Pvt. Ltd.",
  shortName:    "GECE",
  foundedYear:  1995,          // "years of experience" is calculated from this
  websiteUrl:   "https://www.geceindia.com",
  strapline:    "Power-sector software, consulting and GIS services",

  /* ---------- Logo ----------
     To change the logo: put the new file in assets/brand/ and change the
     path below (or simply overwrite assets/brand/logo.svg).
     The original V1 logo is kept at assets/brand/logo-original-v1.png   */
  logo: {
    src:    "assets/brand/logo.svg",
    alt:    "Global Energy Consulting Engineers",
    height: 60                 // display height in the header, in pixels
  },
  favicon: "assets/brand/favicon.svg",

  /* ---------- Contact ---------- */
  email: "gece@geceindia.com",
  phone: "",                   // leave "" to hide the phone everywhere

  /* ---------- Addresses ----------
     Shown on the Contact page only.
     Each line of an address is one entry in the list.                    */
  registeredOffice: {
    label: "Registered Office",
    lines: [
      "Plot No. 68, Manasa Hills, Budvel",
      "Rajendra Nagar",
      "Hyderabad - 500030, India"
    ]
  },

  /* CORPORATE OFFICE - currently hidden.
     When the new corporate address is available, replace the empty list
     below with the address lines, for example:
         lines: ["Building name, Floor", "Street, Area", "Hyderabad - 5000xx, India"]
     The address will then appear on the Contact page.                    */
  corporateOffice: {
    label: "Corporate Office",
    lines: []
  },

  /* ---------- Figures shown on the site ----------
     Change a number here and it updates on every page that shows it
     (home page counters, About page, GIS pages).
     Two figures need no entry because they are worked out automatically:
       - years of experience  = current year minus foundedYear
       - number of products   = number of links under "Products" in site-nav.js */
  businessStreams: ["Software products and IT services", "Consultancy services", "GIS services"],
  trackRecord: {
    networkKm:        280000,   // km of network surveyed by GPS
    gpsSurveyTowns:   770,      // towns covered by GPS survey
    largeCities:      14,       // large cities surveyed in part or whole
    gisDatabaseTowns: 1050,     // towns with a GIS database built
    digitalMapTowns:  280,      // towns digitally mapped
    assetsMillion:    3,        // asset elements recorded, in millions
    customersMillion: 5         // customers identified and located, in millions
  },

  /* ---------- Enquiry form ----------
     ""  = the form opens the visitor's email program (works anywhere).
     URL = the form is posted to that address (for example a form service
           or your own IIS handler) and the visitor stays on the page.    */
  formEndpoint: "",

  /* ---------- Milestones (About page, "Our journey") ----------
     Add, remove or reorder entries. "year" can be left "" if not known.  */
  milestones: [
    { year: "1995", title: "GECE is founded",
      text: "Established to serve energy enterprises with software products and consulting services." },
    { year: "", title: "First GPS-based utility mapping in India",
      text: "GECE executes the first electrical utility mapping assignment in India using GPS technology." },
    { year: "", title: "First Total Station land-based mapping",
      text: "The first land-based mapping for an electrical utility using Total Station equipment." },
    { year: "", title: "First distribution automation project in India",
      text: "Distribution automation for Hyderabad city, integrating SCADA with GIS and asset management systems." },
    { year: "", title: "The POWER suite of workstations",
      text: "A family of off-the-shelf products covering network, asset, customer, metering and operations functions." },
    { year: "", title: "Work across India, the Middle East and Africa",
      text: "GIS, software and consulting assignments delivered for utilities in several countries." },
    { year: "Today", title: "Smart metering, analytics and AI",
      text: "Extending three decades of utility domain knowledge into smart-meter data, analytics and AI-assisted operations." }
  ]
};
