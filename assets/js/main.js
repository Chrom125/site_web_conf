// Traductions (ajout des nouvelles clés pour "Qui sommes nous ?")
const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.inscription': 'Inscription',
    'nav.programme': 'Programme',
    'nav.whoweare': 'Qui sommes-nous ?',
    'nav.localisation': 'Localisation',
    'nav.contact': 'Contact',
    'home.title': 'JC2B',
  'home.message': 'La Junior Conference aura lieu le 13 novembre 2025 à Gif-sur-Yvette. Organisée par les étudiants du Master AMII2B de Paris-Saclay, cet événement a pour vocation de rassembler étudiants, chercheurs académiques et acteurs de l’industrie autour des avancées les plus récentes en bioinformatique. Cette journée sera l’occasion de mettre en valeur les recherches de jeunes scientifiques, de renforcer les liens entre les différentes formations de master du campus et de favoriser les échanges entre étudiants et chercheurs confirmés. Elle offrira également un espace privilégié pour rencontrer de futurs stagiaires et doctorants.',
  'inscription.title': 'Inscription',
  'inscription.text': "Dernier délai d'inscription : 20 octobre.",
  'programme.title': 'Programme',
  'programme.text': '2 conférenciers (keynote) sur un thème général : "AI and predictive models in bioinformatics" et plusieurs présentations sélectionnées de jeunes chercheurs, doctorants et post-doctorants.',
  'programme.text_1': 'Ainsi que des présentations orales et posters sélectionnés.', 
  'whoweare.title': 'Qui sommes-nous ?',
  'whoweare.text_1': 'Nous sommes les étudiants du Master AMII2B (Analyse, Modélisation et Ingénierie de l’Information Biologique et Médicale) de l’Université Paris-Saclay. Nous avons voulu lancer un rendez‑vous qui sorte un peu de l’ordinaire : un moment de partage, de découvertes et de rencontres, à la fois scientifique et convivial. Une conférence pensée par des étudiants, pour les étudiants et les chercheurs.',
    'whoweare.text_2': "Pour plus d’informations sur notre formation :",
    'whoweare.text_3': "Nous tenons à remercier chaleureusement Anne Lopes et Daniel Gautheret, qui nous accompagnent et nous soutiennent dans cette organisation.",
    'localisation.title': 'Localisation',
    'localisation.text': 'Adresse, carte ou informations de localisation ici.',
    'contact.title': 'Contact',
    'contact.text': 'Adresse mail : jc2b.paris.saclay@gmail.com',
    'countdown.label': 'jours restants',
    'countdown.until': "jusqu'à JC2B",
    'countdown.past': "L'événement est passé",
    'lang.button': 'FR'
  },
  en: {
    'nav.home': 'Home',
    'nav.inscription': 'Registration',
    'nav.programme': 'Program',
    'nav.whoweare': 'Who we are',
    'nav.localisation': 'Location',
    'nav.contact': 'Contact',
    'home.title': 'JC2B',
    'home.message': "The Junior Conference will take place on November 13, 2025, in Gif-sur-Yvette. Organized by students in the AMII2B Master's program at Paris-Saclay, this event aims to bring together students, academic researchers, and industry players to discuss the latest advances in bioinformatics. This day will be an opportunity to showcase the research of young scientists, strengthen ties between the various master's programs on campus, and promote exchanges between students and experienced researchers. It will also provide a unique opportunity to meet future interns and doctoral students.",
    'inscription.title': 'Registration',
    'inscription.text': 'Deadline is October 20.',
    'programme.title': 'Program',
  'programme.text': '2 keynote speakers on a general theme: "AI and predictive models in bioinformatics" and several selected talks from young researchers, PhD students and postdocs.',
  'programme.text_1': 'As well as selected oral and poster presentations.',
  'whoweare.title': 'Who we are',
  'whoweare.text_1': '"We are students from the AMII2B (Analysis, Modeling and Engineering of Biological and Medical Information) Master\'s program at the University of Paris-Saclay, and we wanted to create an event that is a bit out of the ordinary: a moment of sharing, discovery, and meeting, both scientific and convivial. A conference designed by students, for students and researchers."',
    'whoweare.text_2': 'For more information about our program:',
    'whoweare.text_3': 'We would like to warmly thank Anne Lopes and Daniel Gautheret, who support us in this organization.',
    'localisation.title': 'Location',
    'localisation.text': 'Address, map or location details here.',
    'contact.title': 'Contact',
  'contact.text': 'Email address: jc2b.paris.saclay@gmail.com',
    'countdown.label': 'days remaining',
    'countdown.until': 'until JC2B',
    'countdown.past': 'event passed',
    'lang.button': 'EN'
  }
};

// Langue courante (par défaut fr ou via localStorage)
let currentLang = localStorage.getItem('lang') || 'fr';

// chemins vers les images de drapeau et labels lisibles
const flags = {
  fr: 'assets/flags/drapeau_fr.png',
  en: 'assets/flags/drapeau_en.png'
};
const langLabels = { fr: 'Français', en: 'English' };

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const text = (translations[lang] && translations[lang][key]) ? translations[lang][key] : '';
    el.textContent = text;
  });

  // Met à jour les boutons de drapeau: ajoute/enlève la classe selected et aria-pressed
  document.querySelectorAll('.lang-option').forEach(btn => {
    const isSelected = btn.dataset.lang === lang;
    btn.classList.toggle('selected', isSelected);
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    // mettre un title/aria-label accessible
    btn.setAttribute('aria-label', langLabels[btn.dataset.lang] || btn.dataset.lang);
  });
}

// Garder toggleLang si utile ailleurs (optionnel)
function toggleLang() {
  setLang(currentLang === 'fr' ? 'en' : 'fr');
}

function showTab(id) {
  document.querySelectorAll('.tab').forEach(function(sec) {
    sec.classList.remove('active');
  });
  document.querySelectorAll('.sidebar button').forEach(function(btn) {
    btn.classList.remove('active');
  });
  var section = document.getElementById(id);
  if (section) section.classList.add('active');
  var btn = document.getElementById('btn-' + id);
  if (btn) btn.classList.add('active');
}

// Appliquer la langue au chargement (mettra aussi l'état sélectionné)
// Wrap in DOMContentLoaded to be safe when loading with defer
function init() {
  setLang(currentLang);
  // Mobile nav toggle wiring
  const navToggle = document.getElementById('nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (navToggle && sidebar) {
    // Toggle .open class to show/hide the sidebar on mobile
    navToggle.addEventListener('click', function() {
      const isOpen = sidebar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Make nav buttons scroll to their section instead of toggling visibility
    sidebar.querySelectorAll('button[id^="btn-"]').forEach(btn => {
      const id = btn.id.replace('btn-', '');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // On mobile, close the sidebar after navigation
        if (window.matchMedia('(max-width: 800px)').matches) {
          sidebar.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Ensure the sidebar is visible on desktop when resizing from mobile
    window.addEventListener('resize', function() {
      if (!window.matchMedia('(max-width: 800px)').matches) {
        // Remove mobile-only class so desktop shows permanent sidebar
        sidebar.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Observe sections to update active button in sidebar as the user scrolls
    const sections = document.querySelectorAll('.tab');
    const options = { root: null, rootMargin: '0px 0px -50% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const btn = document.getElementById('btn-' + id);
        if (btn) {
          if (entry.isIntersecting) {
            document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
        }
      });
    }, options);
    sections.forEach(s => observer.observe(s));
  }

  // Countdown: days until 13 November 2025
  function updateCountdown() {
    const el = document.getElementById('countdown-days');
  const label = document.querySelector('[data-i18n-key="countdown.label"]');
  const until = document.querySelector('[data-i18n-key="countdown.until"]');
    if (!el) return;

    const today = new Date();
    // Target at start of day local time
    const target = new Date(2025, 10, 13); // months are 0-based: 10 = November

    // Compute difference in days (floor)
    const msPerDay = 24 * 60 * 60 * 1000;
    const diffMs = target.setHours(0,0,0,0) - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const days = Math.ceil(diffMs / msPerDay);

    if (diffMs <= 0) {
      el.textContent = '0';
      if (label) {
        label.textContent = (translations[currentLang] && translations[currentLang]['countdown.past']) || 'événement terminé';
      }
      if (until) {
        until.textContent = '';
      }
      return;
    }

    el.textContent = String(days);
    if (label) {
      label.textContent = (translations[currentLang] && translations[currentLang]['countdown.label']) || 'jours restants';
    }
    if (until) {
      until.textContent = (translations[currentLang] && translations[currentLang]['countdown.until']) || "jusqu'à JC2B";
    }
  }

  // Update immediately, then once per hour to be safe (daily would also work but hourly ensures day boundary accuracy)
  updateCountdown();
  setInterval(updateCountdown, 60 * 60 * 1000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
