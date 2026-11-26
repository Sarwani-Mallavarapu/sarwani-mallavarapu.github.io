/* =====================================================================
   GECE WEBSITE - MENUS
   The header menu and the footer links on every page are built from this
   file. Add, remove or rename a link here and all pages follow.
   ===================================================================== */
window.GECE_NAV = [
  { label: "About", items: [
      { group: "Company", links: [
        ["about.html", "Who we are"],
        ["about.html#journey", "Our journey since 1995"],
        ["industries.html", "Industries we serve"],
        ["certifications.html", "Certifications"],
        ["clients.html", "Clients"]
      ]}
  ]},
  { label: "Products", href: "products.html", wide: true, items: [
      { group: "Network & GIS", links: [
        ["powergis.html", "POWERGIS", "Geographic information system"],
        ["powernet.html", "POWERNET", "Distribution network studies"],
        ["powertrans.html", "POWERTRANS", "Transmission network studies"]
      ]},
      { group: "Assets & projects", links: [
        ["powerasset.html", "POWERASSET", "Asset management"],
        ["powerproject.html", "POWERPROJECT", "Project estimation and tracking"]
      ]},
      { group: "Metering, billing & audit", links: [
        ["powermbc.html", "POWERMBC", "Metering, billing and collection"],
        ["poweramr.html", "POWERAMR", "Automatic meter reading"],
        ["poweraudit.html", "POWERAUDIT", "Energy accounting and audit"]
      ]},
      { group: "Customer & operations", links: [
        ["powercustomer.html", "POWERCUSTOMER", "New customer management"],
        ["powertcm.html", "POWERTCM", "Trouble call management"],
        ["powerdas.html", "POWERDAS", "Distribution automation"],
        ["powerems.html", "POWEREMS", "Energy management"],
        ["smart-device-mobile-applications.html", "POWERMOBILE", "Field mobile applications"]
      ]}
  ]},
  { label: "Services", href: "solutions.html", wide: true, items: [
      { group: "IT services", href: "it-services.html", links: [
        ["web-app-development.html", "Web application development"],
        ["cloud.html", "Cloud"],
        ["smart-grid.html", "Database management services"],
        ["dataAnalytics.html", "Data analytics"],
        ["data-center.html", "Data centres"],
        ["scada.html", "SCADA automation"],
        ["crm.html", "Customer relationship management"],
        ["customerBilling.html", "Billing and collection"],
        ["customerAudit.html", "Customer audit & theft detection"]
      ]},
      { group: "Consultancy", href: "consultancy.html", links: [
        ["long-term-load-forecast.html", "Load forecast & master plan"],
        ["technical-loss-management.html", "AT&C loss reduction"],
        ["enterprise-asset-management.html", "Enterprise asset management"],
        ["power-evacuation-studies.html", "Power evacuation studies"],
        ["project-management.html", "Project management"],
        ["smart-grids.html", "Smart grids & microgrid"],
        ["power-trading.html", "Power market"],
        ["open-access.html", "Open access"],
        ["renewable-energy.html", "Renewable energy"],
        ["demand-side-management.html", "Demand side management"]
      ]},
      { group: "GIS services", href: "gis-services.html", links: [
        ["gps-mapping.html", "GPS mapping"],
        ["enterprise-gis.html", "Enterprise GIS"],
        ["data-conversion-migration-and-maintenance.html", "Data conversion & migration"],
        ["data-model-development.html", "Data model development"],
        ["photogrammetry-and-satellite-image-processing.html", "Photogrammetry & satellite imagery"]
      ]},
      { group: "Focus areas", links: [
        ["smart-meter-solutions.html", "Smart meter solutions"],
        ["ai-for-utilities.html", "AI for utilities"],
        ["insights.html", "Insights"]
      ]}
  ]},
  { label: "Industries", href: "industries.html", items: [
      { group: "Sectors we serve", links: [
        ["industries.html#power", "Power", "Generation, transmission and distribution"],
        ["industries.html#gas", "Gas", "City gas distribution networks"],
        ["industries.html#water", "Water", "Water supply utilities"],
        ["industries.html#sewerage", "Sewerage", "Sewer networks and pumping"],
        ["industries.html#urban-planning", "Urban planning", "Municipal and planning bodies"]
      ]}
  ]},
  { label: "Clients", href: "clients.html" },
  { label: "Contact", href: "contact.html" }
];
