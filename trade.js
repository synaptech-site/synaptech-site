/* Trade site: progressive enhancements only. No credentials, no tracking, no hidden submission. */
(() => {
  'use strict';
  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const isEn = lang === 'en';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const header = $('.site-header');
  const menuButton = $('.nav-toggle');
  const nav = $('#nav');
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 7);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  const closeNav = () => {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', isEn ? 'Open menu' : 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? (isEn ? 'Close menu' : 'Fermer le menu') : (isEn ? 'Open menu' : 'Ouvrir le menu'));
    document.body.classList.toggle('menu-open', open);
  });
  $$('a', nav).forEach(a => a.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth > 920) closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  // Product SVG artwork is bundled locally and used if an optional editorial photo is inaccessible.
  $$('.swap-fallback').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = img.getAttribute('data-fallback');
      if (fallback && img.getAttribute('src') !== fallback) img.setAttribute('src', fallback);
    });
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });

  // Avoid hiding any content without IntersectionObserver support.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .06, rootMargin: '0px 0px 90px 0px' });
    $$('.reveal').forEach(el => observer.observe(el));
  }

  const form = $('#trade-form');
  const status = $('#form-status');
  const title = $('#form-heading');
  const subtitle = $('#form-subheading');
  const tabs = $$('.form-tab');
  let activeRole = 'buyer';
  const content = isEn
    ? { buyer: 'Your buying requirements', supplier: 'Your supplier profile', readyEmail: 'Your email application should open with a prepared message. Please confirm sending it.', readyWa: 'WhatsApp should open with the prepared message. Please press Send there.', required: 'Please check the required fields and privacy confirmation.', copyHint: 'If no application opens, contact us directly at hello@synaptech.tn.', subjectBuyer: 'Buying enquiry', subjectSupplier: 'Supplier introduction' }
    : { buyer: 'Votre demande d’achat', supplier: 'Votre offre fournisseur', readyEmail: 'Votre messagerie doit s’ouvrir avec le message préparé. Confirmez son envoi.', readyWa: 'WhatsApp doit s’ouvrir avec le message préparé. Cliquez ensuite sur Envoyer.', required: 'Vérifiez les champs obligatoires et le consentement.', copyHint: 'Si aucune application ne s’ouvre, contactez-nous directement à hello@synaptech.tn.', subjectBuyer: 'Demande d’achat', subjectSupplier: 'Présentation fournisseur' };

  function setRole(role) {
    activeRole = role === 'supplier' ? 'supplier' : 'buyer';
    tabs.forEach(tab => {
      const active = tab.dataset.role === activeRole;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    form.elements.role.value = activeRole;
    title.textContent = content[activeRole];
    subtitle.textContent = subtitle.dataset[activeRole] || '';
    $$('.buyer-only, .supplier-only', form).forEach(block => {
      const shouldHide = block.classList.contains(activeRole === 'buyer' ? 'supplier-only' : 'buyer-only');
      block.classList.toggle('is-hidden', shouldHide);
      $$('input, select, textarea', block).forEach(field => { field.disabled = shouldHide; });
    });
    if (status) status.textContent = '';
  }
  tabs.forEach(tab => tab.addEventListener('click', () => setRole(tab.dataset.role)));
  $$('[data-audience]').forEach(link => link.addEventListener('click', () => {
    setRole(link.dataset.audience);
    if (link.dataset.product) {
      const field = form.elements.product;
      if (field && $$('option', field).some(opt => opt.value === link.dataset.product)) field.value = link.dataset.product;
    }
  }));
  setRole('buyer');

  function getMessage() {
    const data = new FormData(form);
    const fields = isEn
      ? [['Name','full_name'], ['Company','company'], ['Email','email'], ['Country','country'], ['Product','product'], [activeRole === 'buyer' ? 'Required quantity' : 'Export capacity',activeRole === 'buyer' ? 'quantity' : 'capacity'], [activeRole === 'buyer' ? 'Destination' : 'Website',activeRole === 'buyer' ? 'destination' : 'website'], [activeRole === 'buyer' ? 'Preferred Incoterm' : 'Certifications',activeRole === 'buyer' ? 'incoterm' : 'certificates'], ['Details','details']]
      : [['Nom','full_name'], ['Entreprise','company'], ['E-mail','email'], ['Pays','country'], ['Produit','product'], [activeRole === 'buyer' ? 'Quantité souhaitée' : 'Capacité export',activeRole === 'buyer' ? 'quantity' : 'capacity'], [activeRole === 'buyer' ? 'Destination' : 'Site web',activeRole === 'buyer' ? 'destination' : 'website'], [activeRole === 'buyer' ? 'Incoterm préféré' : 'Certifications',activeRole === 'buyer' ? 'incoterm' : 'certificates'], ['Précisions','details']];
    const header = isEn ? `Hello Synaptech Global Trade,\n\n${activeRole === 'buyer' ? 'I would like to submit a buying request.' : 'I would like to introduce my supplier company.'}` : `Bonjour Synaptech Global Trade,\n\n${activeRole === 'buyer' ? 'Je souhaite soumettre une demande d’achat.' : 'Je souhaite présenter mon entreprise fournisseur.'}`;
    const values = fields.map(([label,key]) => {
      const value = String(data.get(key) || '').trim();
      return value ? `${label} : ${value}` : null;
    }).filter(Boolean);
    return `${header}\n\n${values.join('\n')}\n\n${isEn ? 'Kind regards' : 'Cordialement'}`;
  }
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      status.textContent = content.required;
      return;
    }
    const message = getMessage();
    const channel = event.submitter?.dataset.channel === 'whatsapp' ? 'whatsapp' : 'email';
    if (channel === 'whatsapp') {
      const url = 'https://wa.me/21622961115?text=' + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener,noreferrer');
      status.textContent = content.readyWa + ' ' + content.copyHint;
    } else {
      const subject = 'Synaptech Global Trade — ' + (activeRole === 'buyer' ? content.subjectBuyer : content.subjectSupplier) + ' — ' + String(form.elements.company.value).trim();
      const url = 'mailto:hello@synaptech.tn?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);
      status.textContent = content.readyEmail + ' ' + content.copyHint;
      window.location.href = url;
    }
  });
})();
