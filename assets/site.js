/* GECE website behaviour. Settings live in site-config.js and site-nav.js - edit those, not this file. */
(function () {
  'use strict';
  var C = window.GECE_SITE || {};
  var NAV = window.GECE_NAV || [];
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };
  var years = new Date().getFullYear() - (C.foundedYear || 1995);
  var WORDS = ['', 'one decade', 'two decades', 'three decades', 'four decades', 'five decades', 'six decades', 'seven decades', 'eight decades', 'nine decades'];
  var decades = WORDS[Math.min(9, Math.max(1, Math.floor(years / 10)))];
  var cap = function (t) { return t.charAt(0).toUpperCase() + t.slice(1); };
  var num = function (v) { return Number(v).toLocaleString('en-US'); };
  // number of products = number of links under "Products" in site-nav.js
  var productCount = (NAV.filter(function (m) { return m.label === 'Products'; })[0] || { items: [] }).items
    .reduce(function (n, g) { return n + g.links.length; }, 0);
  var TR = C.trackRecord || {};
  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var hasLines = function (o) { return o && o.lines && o.lines.length > 0; };
  // adds the registered mark to product names (POWERGIS, POWERNET, ...) in menus and footer
  var reg = function (t) { return esc(t).replace(/\b(POWER[A-Z]{2,})\b®?/g, '$1<sup class="reg">®</sup>'); };
  var addressHtml = function (o) { return o.lines.map(esc).join('<br>'); };

  /* ---------- Header ---------- */
  function renderHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    var logo = C.logo || {};
    var menu = NAV.map(function (m, i) {
      if (!m.items) {
        return '<li class="nav-item"><a class="nav-link" href="' + esc(m.href) + '">' + esc(m.label) + '</a></li>';
      }
      var groups = m.items.map(function (g) {
        var head = g.href ? '<a class="menu-group-title" href="' + esc(g.href) + '">' + esc(g.group) + ' <span aria-hidden="true">›</span></a>'
                          : '<span class="menu-group-title">' + esc(g.group) + '</span>';
        var links = g.links.map(function (l) {
          return '<li><a href="' + esc(l[0]) + '"><span class="menu-name">' + reg(l[1]) + '</span>' + (l[2] ? '<span class="menu-desc">' + esc(l[2]) + '</span>' : '') + '</a></li>';
        }).join('');
        return '<div class="menu-group">' + head + '<ul>' + links + '</ul></div>';
      }).join('');
      var all = m.href ? '<a class="menu-all" href="' + esc(m.href) + '">View all ' + esc(m.label.toLowerCase()) + ' →</a>' : '';
      return '<li class="nav-item has-menu' + (m.wide ? ' is-wide' : '') + '">' +
        '<button class="nav-link" type="button" aria-expanded="false" aria-controls="menu-' + i + '">' + esc(m.label) + '<span class="caret" aria-hidden="true"></span></button>' +
        '<div class="menu cols-' + m.items.length + '" id="menu-' + i + '"><div class="menu-inner">' + groups + '</div>' + all + '</div></li>';
    }).join('');

    el.innerHTML =
      '<div class="topbar"><div class="container">' +
        '<span><strong>Since ' + esc(C.foundedYear) + '</strong> &nbsp;·&nbsp; ' + esc(C.strapline) + '</span>' +
        '<span class="top-extra"><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>' + (C.phone ? ' &nbsp;·&nbsp; <a href="tel:' + esc(C.phone.replace(/[^+\d]/g, '')) + '">' + esc(C.phone) + '</a>' : '') + '</span>' +
      '</div></div>' +
      '<div class="site-header"><div class="container nav-wrap">' +
        '<a class="brand" href="index.html" aria-label="' + esc(C.shortName) + ' home"><img src="' + esc(logo.src) + '" alt="' + esc(logo.alt) + '" style="height:' + (logo.height || 52) + 'px"></a>' +
        '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span><span></span><span></span></button>' +
        '<nav id="primary-nav" class="primary-nav" aria-label="Main"><ul class="nav-list">' + menu + '</ul></nav>' +
      '</div></div>';

    // mark the active section
    el.querySelectorAll('.nav-item').forEach(function (item) {
      var hit = Array.prototype.some.call(item.querySelectorAll('a'), function (a) {
        return (a.getAttribute('href') || '').split('#')[0].toLowerCase() === current;
      });
      if (hit) item.classList.add('active');
    });

    var toggle = el.querySelector('.menu-toggle');
    var nav = el.querySelector('.primary-nav');
    var closeAll = function (except) {
      el.querySelectorAll('.has-menu.open').forEach(function (n) {
        if (n !== except) { n.classList.remove('open'); n.querySelector('.nav-link').setAttribute('aria-expanded', 'false'); }
      });
    };
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
    el.querySelectorAll('.has-menu > .nav-link').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var item = btn.parentNode, open = !item.classList.contains('open');
        closeAll(item);
        item.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
    document.addEventListener('click', function (e) { if (!el.contains(e.target)) closeAll(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    var col = function (title, links) {
      return '<div class="footer-col"><h4>' + esc(title) + '</h4>' + links.map(function (l) { return '<a href="' + esc(l[0]) + '">' + reg(l[1]) + '</a>'; }).join('') + '</div>';
    };
    var find = function (label) { return (NAV.filter(function (m) { return m.label === label; })[0] || { items: [] }).items; };
    var products = [].concat.apply([], find('Products').map(function (g) { return g.links; })).slice(0, 9);
    var services = find('Services').filter(function (g) { return g.href; }).map(function (g) { return [g.href, g.group]; })
      .concat([['smart-meter-solutions.html', 'Smart meter solutions'], ['ai-for-utilities.html', 'AI for utilities'], ['solutions.html', 'All solutions']]);
    var company = [['about.html', 'About GECE'], ['industries.html', 'Industries'], ['clients.html', 'Clients'], ['certifications.html', 'Certifications'], ['insights.html', 'Insights'], ['sitemap.html', 'Site map'], ['contact.html', 'Contact']];
    el.innerHTML =
      '<div class="site-footer"><div class="container"><div class="footer-grid">' +
        '<div class="footer-brand"><div class="footer-name">' + esc(C.companyName) + '</div>' +
        '<p>Software products, consulting and GIS services for utilities since ' + esc(C.foundedYear) + '.</p>' +
        '<p class="footer-addr"><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>' + (C.phone ? '<br>' + esc(C.phone) : '') + '</p></div>' +
        col('Products', products.map(function (l) { return [l[0], l[1]]; }).concat([['products.html', 'All products']])) +
        col('Services', services) +
        col('Company', company) +
      '</div><div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' ' + esc(C.companyName) + ' All rights reserved.</span><span>Established ' + esc(C.foundedYear) + '</span></div></div></div>' +
      '<a class="back-top" href="#top" aria-label="Back to top">↑</a>';
  }

  /* ---------- Values taken from site-config.js ---------- */
  function fillPlaceholders(root) {
    var map = {
      'email': C.email, 'company': C.companyName, 'short-name': C.shortName, 'founded': C.foundedYear,
      'years': years, 'decades': decades, 'Decades': cap(decades), 'product-count': productCount,
      'streams': (C.businessStreams || []).length || 3, 'phone': C.phone, 'website': (C.websiteUrl || '').replace(/^https?:\/\//, '')
    };
    Object.keys(TR).forEach(function (k) { map['tr-' + k] = num(TR[k]); });
    root.querySelectorAll('[data-count-key]').forEach(function (n) {
      var key = n.getAttribute('data-count-key');
      var v = key === 'founded' ? C.foundedYear : TR[key];
      if (v != null) { n.setAttribute('data-count', v); n.textContent = n.hasAttribute('data-plain') ? String(v) : num(v); }
    });
    root.querySelectorAll('[data-site]').forEach(function (n) {
      var k = n.getAttribute('data-site');
      if (k === 'registered-address') { n.innerHTML = addressHtml(C.registeredOffice); return; }
      if (k === 'corporate-address') { if (hasLines(C.corporateOffice)) n.innerHTML = addressHtml(C.corporateOffice); return; }
      if (k === 'milestones') { n.innerHTML = (C.milestones || []).map(function (m) {
        return '<li class="timeline-item reveal"><span class="timeline-year">' + esc(m.year || 'Milestone') + '</span><div><h3>' + esc(m.title) + '</h3><p>' + esc(m.text) + '</p></div></li>'; }).join(''); return; }
      if (map[k] != null && map[k] !== '') n.textContent = map[k];
    });
    root.querySelectorAll('[data-site-href]').forEach(function (n) {
      var k = n.getAttribute('data-site-href');
      if (k === 'email') n.setAttribute('href', 'mailto:' + C.email);
      if (k === 'website') n.setAttribute('href', C.websiteUrl);
    });
    root.querySelectorAll('[data-site-show]').forEach(function (n) {
      var k = n.getAttribute('data-site-show');
      var show = (k === 'corporate-office' && hasLines(C.corporateOffice)) || (k === 'phone' && !!C.phone);
      n.hidden = !show;
    });
    root.querySelectorAll('[data-count="years"]').forEach(function (n) { n.setAttribute('data-count', years); });
    var fav = document.querySelector('link[rel="icon"]');
    if (fav && C.favicon) fav.setAttribute('href', C.favicon);
  }

  /* ---------- Interactions ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (n) { n.classList.add('in'); }); return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (n) { io.observe(n); });
  }

  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    var fmt = function (v) { return Math.round(v).toLocaleString('en-US'); };
    var run = function (n) {
      var target = parseFloat(n.getAttribute('data-count')), plain = n.hasAttribute('data-plain');
      var show = function (v) { n.textContent = plain ? String(Math.round(v)) : fmt(v); };
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { show(target); return; }
      var start = null, dur = 1400, from = plain ? target - 30 : 0;
      var step = function (t) {
        if (!start) start = t;
        var p = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - p, 3);
        show(from + (target - from) * e);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
      var tabs = wrap.querySelectorAll('[role="tab"]'), panels = wrap.querySelectorAll('[role="tabpanel"]');
      var select = function (tab, focus) {
        tabs.forEach(function (t) { var on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
        panels.forEach(function (p) { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
        if (focus) tab.focus();
      };
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
          if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
        });
      });
    });
  }

  function initFilter() {
    document.querySelectorAll('[data-filter-group]').forEach(function (group) {
      var buttons = group.querySelectorAll('[data-filter]');
      var items = document.querySelectorAll(group.getAttribute('data-filter-group'));
      var status = group.parentNode.querySelector('[data-filter-status]');
      if (status) status.textContent = items.length + ' products shown';
      buttons.forEach(function (b) {
        b.addEventListener('click', function () {
          var f = b.getAttribute('data-filter'), shown = 0;
          buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          items.forEach(function (it) {
            var ok = f === 'all' || it.getAttribute('data-cat') === f;
            it.hidden = !ok; if (ok) shown++;
          });
          if (status) status.textContent = shown + (shown === 1 ? ' product' : ' products') + ' shown';
        });
      });
    });
  }

  function initForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    var note = form.querySelector('.notice');
    var say = function (msg, bad) { if (note) { note.textContent = msg; note.classList.add('show'); note.classList.toggle('error', !!bad); } };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      if (C.formEndpoint) {
        say('Sending your enquiry…');
        fetch(C.formEndpoint, { method: 'POST', body: d, headers: { 'Accept': 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error(); form.reset(); say('Thank you. Your enquiry has been sent and we will reply by email.'); })
          .catch(function () { say('The enquiry could not be sent. Please email ' + C.email + ' directly.', true); });
        return;
      }
      var subject = 'GECE website enquiry: ' + (d.get('topic') || 'General enquiry');
      var body = 'Name: ' + d.get('name') + '\nOrganization: ' + (d.get('company') || '') + '\nEmail: ' + d.get('email') + '\nArea of interest: ' + d.get('topic') + '\n\n' + d.get('message');
      say('Opening your email program with the enquiry ready to send. If nothing opens, please email ' + C.email + ' directly.');
      window.location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  function initScroll() {
    var top = document.querySelector('.back-top');
    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (top) top.classList.toggle('show', y > 700);
      document.body.classList.toggle('scrolled', y > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  function addOrgData() {
    if (current !== 'index.html') return;
    var org = { '@context': 'https://schema.org', '@type': 'Organization', name: C.companyName, alternateName: C.shortName, url: C.websiteUrl,
      foundingDate: String(C.foundedYear), email: C.email, logo: C.websiteUrl + '/' + (C.logo || {}).src,
      address: { '@type': 'PostalAddress', streetAddress: C.registeredOffice.lines.slice(0, -1).join(', '), addressLocality: 'Hyderabad', addressCountry: 'IN' } };
    var s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(org); document.head.appendChild(s);
  }

  function initSpy() {
    var bar = document.querySelector('[data-spy]');
    if (!bar || !('IntersectionObserver' in window)) return;
    var links = bar.querySelectorAll('a[href^="#"]');
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var a = byId[e.target.id]; if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var t = document.getElementById(id); if (t) io.observe(t); });
  }

  window.GECE = { header: renderHeader, footer: renderFooter };
  document.addEventListener('DOMContentLoaded', function () {
    fillPlaceholders(document);
    initReveal(); initCounters(); initTabs(); initFilter(); initForm(); initScroll(); addOrgData(); initSpy();
  });
})();
