import { MessageCircle, Zap, MapPin, Camera, Check, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

type Language = 'fr' | 'ar';

const translations = {
  fr: {
    nav: {
      examples: 'Exemples',
      process: 'Fonctionnement',
      pricing: 'Tarifs',
      faq: 'FAQ',
      contact: 'Contact'
    },
    hero: {
      title: 'Mawjouud – Soyez présent en ligne',
      description: 'Créez un site simple et officiel avec tout ce dont votre entreprise a besoin: adresse, Google Maps, WhatsApp, photos et prix. Un seul lien à partager sur Facebook, Instagram et WhatsApp.',
      cta: 'Commencer maintenant'
    },
    benefits: {
      title: 'Pourquoi Mawjouud ?',
      items: [
        { title: 'Rapide', desc: 'Votre site professionnel prêt en quelques jours' },
        { title: 'Simplifié', desc: 'Interface intuitive, pas besoin de connaissances techniques' },
        { title: 'Complet', desc: 'Tout ce dont vous avez besoin en un seul endroit' },
        { title: 'Abordable', desc: 'Prix adaptés aux petites entreprises tunisiennes' }
      ]
    },
    examples: {
      title: 'Exemples de templates',
      subtitle: 'Voyez comment Mawjouud fonctionne pour différents types d\'entreprises',
      items: [
        { name: 'Barbier', desc: 'Horaires, services, photos, réservation WhatsApp' },
        { name: 'Restaurant', desc: 'Menu, photos, localisation, commandes en ligne' },
        { name: 'Artisan', desc: 'Portfolio, services, galerie photos, tarifs' },
        { name: 'Location de voitures', desc: 'Catalogue, prix, contact direct, disponibilité' }
      ]
    },
    pricing: {
      title: 'Tarifs transparents',
      subtitle: 'Formules adaptées à votre entreprise',
      express: {
        name: 'Express',
        pages: '1 page',
        price: '350',
        features: ['Site vitrine minimaliste', 'Nom de domaine personnalisé', 'Contact WhatsApp intégré', 'Responsive mobile', 'Hébergement gratuit']
      },
      pro: {
        name: 'Pro',
        pages: '3 pages',
        price: '600',
        features: ['Site professionnel complet', 'Nom de domaine', 'Google Maps intégré', 'Galerie photos', 'Formulaire de contact', 'Support prioritaire']
      },
      premium: {
        name: 'Premium',
        pages: '5 pages',
        price: '1000',
        features: ['Site e-commerce simple', 'Jusqu\'à 50 produits', 'Panier d\'achat', 'Paiement en ligne', 'Gestion des stocks basique', 'Support dédié']
      },
      maintenance: 'Maintenance optionnelle: 30 DT/mois'
    },
    process: {
      title: 'Comment ça marche ?',
      steps: [
        { num: 1, title: 'Contactez-nous', desc: 'Envoyez-nous vos informations et besoins via WhatsApp ou email' },
        { num: 2, title: 'Création rapide', desc: 'Nous créons votre site en quelques jours' },
        { num: 3, title: 'Lancement', desc: 'Votre site est en ligne et visible sur Google' }
      ]
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: 'Que comprend le prix ?',
          a: 'Le prix inclut le design, l\'hébergement, le nom de domaine et le support technique. Pas de frais cachés.'
        },
        {
          q: 'Puis-je modifier mon site après sa création ?',
          a: 'Oui, vous pouvez demander des modifications à tout moment. Notre équipe support vous aide rapidement.'
        },
        {
          q: 'Mon site sera-t-il visible sur Google ?',
          a: 'Oui, nous optimisons votre site pour les moteurs de recherche. Il apparaîtra dans les résultats Google.'
        },
        {
          q: 'Quel est le délai de création ?',
          a: 'Entre 3 à 7 jours selon la complexité. Les tarifs Express sont les plus rapides.'
        },
        {
          q: 'Y a-t-il d\'autres frais après l\'achat ?',
          a: 'Non, sauf si vous souhaitez le forfait maintenance (30 DT/mois) pour les mises à jour régulières.'
        }
      ]
    },
    contact: {
      title: 'Prêt à démarrer ?',
      subtitle: 'Contactez-nous pour créer votre présence en ligne dès aujourd\'hui',
      whatsapp: 'WhatsApp',
      phone: 'Téléphone',
      email: 'Email'
    },
    footer: {
      company: 'Mawjouud by Synaptech',
      tagline: 'Votre partenaire pour établir votre présence en ligne en Tunisie',
      rights: 'Tous droits réservés'
    }
  },
  ar: {
    nav: {
      examples: 'أمثلة',
      process: 'كيفاش نخدمو',
      pricing: 'الأسعار',
      faq: 'أسئلة شائعة',
      contact: 'تواصل'
    },
    hero: {
      title: 'موجود – خليك موجود أونلاين',
      description: 'نعملك موقع صغير و رسمي فيه كل شيء: العنوان، Google Maps، واتساب، الصور و الأسعار. رابط واحد تنجم تبعثو لأي حريف على فيسبوك، إنستغرام و واتساب.',
      cta: 'ابدأ الآن'
    },
    benefits: {
      title: 'علاش موجود ؟',
      items: [
        { title: 'سريع', desc: 'الموقع تاعك جاهز في بضعة أيام' },
        { title: 'بسيط', desc: 'سهل الاستعمال، ما تحتاج تقنيات معقدة' },
        { title: 'شامل', desc: 'كل حاجة تحتاجها في مكان واحد' },
        { title: 'رخيص', desc: 'الأسعار معقولة للمشاريع الصغرى' }
      ]
    },
    examples: {
      title: 'أمثلة من المواقع',
      subtitle: 'شوف كيفاش موجود يخدم للأنواع المختلفة من الأعمال',
      items: [
        { name: 'الحلاق', desc: 'الأوقات، الخدمات، الصور، الحجز عبر واتساب' },
        { name: 'المطعم', desc: 'القائمة، الصور، الموقع، الطلبات أونلاين' },
        { name: 'الحرفي', desc: 'أعمالك السابقة، الخدمات، المعرض، الأسعار' },
        { name: 'كراء السيارات', desc: 'السيارات، الأسعار، التواصل المباشر، التوفر' }
      ]
    },
    pricing: {
      title: 'الأسعار شفافة',
      subtitle: 'صيغ معدلة حسب احتياجات عملك',
      express: {
        name: 'Express',
        pages: 'صفحة واحدة',
        price: '350',
        features: ['موقع بسيط جداً', 'نطاق شخصي', 'واتساب المدمج', 'متوافق مع الجوال', 'استضافة مجانية']
      },
      pro: {
        name: 'Pro',
        pages: '3 صفحات',
        price: '600',
        features: ['موقع احترافي', 'نطاق مخصص', 'خرائط جوجل', 'معرض صور', 'نموذج اتصال', 'دعم أولوية']
      },
      premium: {
        name: 'Premium',
        pages: '5 صفحات',
        price: '1000',
        features: ['متجر بسيط', 'حتى 50 منتج', 'سلة التسوق', 'الدفع أونلاين', 'إدارة المخزون', 'دعم مخصص']
      },
      maintenance: 'الصيانة الاختيارية: 30 د/شهر'
    },
    process: {
      title: 'كيفاش يتم العمل ؟',
      steps: [
        { num: 1, title: 'اتصل بنا', desc: 'ابعث لنا معلومات عملك عبر واتساب أو إيميل' },
        { num: 2, title: 'الإنشاء', desc: 'نخلق الموقع تاعك في بضعة أيام' },
        { num: 3, title: 'الإطلاق', desc: 'الموقع تاعك متاح أونلاين و ظاهر في جوجل' }
      ]
    },
    faq: {
      title: 'أسئلة شائعة',
      items: [
        {
          q: 'شنية الخدمات المتضمنة بالسعر؟',
          a: 'السعر يتضمن التصميم، الاستضافة، النطاق والدعم التقني. ما فما تكاليف مخفية.'
        },
        {
          q: 'يمكنني تعديل موقعي بعد الإنشاء؟',
          a: 'نعم، تقدر طلب تعديلات في أي وقت. فريقنا يساعدك بسرعة.'
        },
        {
          q: 'الموقع يظهر في جوجل؟',
          a: 'نعم، نعمل على تحسين الموقع لمحركات البحث. يظهر في نتائج جوجل.'
        },
        {
          q: 'قد يستغرق الوقت إنشاء الموقع؟',
          a: 'من 3 إلى 7 أيام حسب التعقيد. الصيغة Express أسرع.'
        },
        {
          q: 'في تكاليف إضافية بعد الشراء؟',
          a: 'لا، إلا إذا اخترت صيانة (30 د/شهر) للتحديثات المنتظمة.'
        }
      ]
    },
    contact: {
      title: 'جاهز تبدا ؟',
      subtitle: 'اتصل بنا لإنشاء موقعك أونلاين اليوم',
      whatsapp: 'واتساب',
      phone: 'هاتف',
      email: 'إيميل'
    },
    footer: {
      company: 'موجود بـ Synaptech',
      tagline: 'شريكك لإنشاء حضور رقمي في تونس',
      rights: 'جميع الحقوق محفوظة'
    }
  }
};

interface FAQItem {
  q: string;
  a: string;
}

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const t = translations[lang];
  const whatsappLink = `https://wa.me/21622961115?text=${encodeURIComponent(lang === 'fr' ? 'Salut Synaptech, je veux un site Mawjouud' : 'سلام Synaptech، نحب موقع موجود')}`;

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Mawjouud by Synaptech',
      description: 'Création de sites web abordables pour petites entreprises en Tunisie',
      url: 'https://mawjouud.tn',
      telephone: '+21622961115',
      email: 'hello@synaptech.tn',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TN',
        addressLocality: 'Tunis'
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Mawjouud" className="h-10 w-auto" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#examples" className="text-gray-700 hover:text-emerald-600 transition">{t.nav.examples}</a>
              <a href="#process" className="text-gray-700 hover:text-emerald-600 transition">{t.nav.process}</a>
              <a href="#pricing" className="text-gray-700 hover:text-emerald-600 transition">{t.nav.pricing}</a>
              <a href="#faq" className="text-gray-700 hover:text-emerald-600 transition">{t.nav.faq}</a>
              <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition">
                {lang === 'fr' ? 'العربية' : 'Français'}
              </button>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>{t.nav.contact}</span>
              </a>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <a href="#examples" className="block text-gray-700 hover:text-emerald-600">{t.nav.examples}</a>
              <a href="#process" className="block text-gray-700 hover:text-emerald-600">{t.nav.process}</a>
              <a href="#pricing" className="block text-gray-700 hover:text-emerald-600">{t.nav.pricing}</a>
              <a href="#faq" className="block text-gray-700 hover:text-emerald-600">{t.nav.faq}</a>
              <button onClick={() => { setLang(lang === 'fr' ? 'ar' : 'fr'); setMobileMenuOpen(false); }} className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded">
                {lang === 'fr' ? 'العربية' : 'Français'}
              </button>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block bg-emerald-600 text-white px-6 py-2 rounded-lg text-center font-semibold">
                {t.nav.contact}
              </a>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-16">
        <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t.hero.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition shadow-lg flex items-center justify-center space-x-2">
                  <MessageCircle className="w-6 h-6" />
                  <span>{t.hero.cta}</span>
                </a>
                <a href="#examples" className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-emerald-600">
                  {t.nav.examples}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t.benefits.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.benefits.items.map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-emerald-50 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t.examples.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.examples.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.examples.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    {idx === 0 && <Zap className="w-6 h-6 text-teal-600" />}
                    {idx === 1 && <MapPin className="w-6 h-6 text-teal-600" />}
                    {idx === 2 && <Camera className="w-6 h-6 text-teal-600" />}
                    {idx === 3 && <MessageCircle className="w-6 h-6 text-teal-600" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t.process.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {t.process.steps.map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t.pricing.title}
              </h2>
              <p className="text-xl text-gray-600">{t.pricing.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
              {[t.pricing.express, t.pricing.pro, t.pricing.premium].map((plan, idx) => (
                <div key={idx} className={`rounded-xl p-8 transition ${idx === 1 ? 'border-2 border-emerald-600 relative hover:shadow-xl bg-white' : 'border-2 border-gray-200 hover:shadow-lg bg-white'}`}>
                  {idx === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {lang === 'fr' ? 'Populaire' : 'الأكثر استعمالاً'}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-1 text-sm">{plan.pages}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600"> DT/{lang === 'fr' ? 'an' : 'سنة'}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={`w-full py-3 rounded-lg font-semibold transition ${idx === 1 ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    {lang === 'fr' ? 'Choisir' : 'اختر'}
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center text-gray-600 text-sm">
              {t.pricing.maintenance}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t.faq.title}
              </h2>
            </div>

            <div className="space-y-4">
              {(t.faq.items as FAQItem[]).map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transition ${expandedFAQ === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-200">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t.contact.title}
            </h2>
            <p className="text-xl text-emerald-50 mb-8">
              {t.contact.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg flex items-center justify-center space-x-2">
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp</span>
              </a>
              <a href="tel:+21622961115" className="bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-800 transition shadow-lg">
                +216 22 961 115
              </a>
              <a href="mailto:hello@synaptech.tn" className="bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-800 transition shadow-lg">
                hello@synaptech.tn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img src="/logo.png" alt="Mawjouud" className="h-10 w-auto mb-4" />
              <p className="text-gray-400">
                {t.footer.tagline}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-white font-semibold mb-4">{lang === 'fr' ? 'Contact' : 'تواصل'}</h3>
              <ul className="space-y-2">
                <li><a href="tel:+21622961115" className="hover:text-emerald-500 transition">+216 22 961 115</a></li>
                <li><a href="mailto:hello@synaptech.tn" className="hover:text-emerald-500 transition">hello@synaptech.tn</a></li>
                <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {t.footer.company}. {t.footer.rights}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
