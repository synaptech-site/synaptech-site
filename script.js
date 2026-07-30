(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const year = document.getElementById('year');
  const form = document.getElementById('whatsapp-form');

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.classList.remove('active');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open menu' : 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open
        ? (document.documentElement.lang === 'en' ? 'Close menu' : 'Fermer le menu')
        : (document.documentElement.lang === 'en' ? 'Open menu' : 'Ouvrir le menu'));
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  }

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const company = String(data.get('company') || '').trim();
      const need = String(data.get('need') || '').trim();
      const message = String(data.get('message') || '').trim();
      if (!name || !need) return;

      const isEnglish = document.documentElement.lang === 'en';
      const lines = isEnglish
        ? [`Hello Synaptech,`, `My name is ${name}.`, company ? `Company: ${company}` : '', `Main need: ${need}`, message ? `Details: ${message}` : '', `Could you please contact me?`]
        : [`Bonjour Synaptech,`, `Je m'appelle ${name}.`, company ? `Entreprise : ${company}` : '', `Besoin principal : ${need}`, message ? `Détails : ${message}` : '', `Pouvez-vous me recontacter ?`];
      const url = `https://wa.me/21622961115?text=${encodeURIComponent(lines.filter(Boolean).join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }
})();
