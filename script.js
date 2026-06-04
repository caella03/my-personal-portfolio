// Theme toggle and simple language switcher
const themeToggle = document.getElementById('theme-toggle');
const langBtn = document.getElementById('lang-btn');

// Persist theme choice
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

function applyTheme(theme){
    if(theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    // only update the toggle text if the element exists
    if(themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
}

// apply theme safely
try{ applyTheme(currentTheme); } catch(e) { console.warn('applyTheme failed', e); }

if(themeToggle){
    themeToggle.addEventListener('click', () => {
        currentTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });

    // Accessibility: keyboard toggle
    themeToggle.addEventListener('keyup', (e) => { if(e.key === 'Enter') themeToggle.click(); });
}

// Simple i18n (EN/FR example). Expand as needed.
const strings = {
    en: {
        heroTag: '👋 Welcome To My Portfolio',
        heroTitle: "Hi, I'm <span>ISIMBI Caella</span>",
        heroSubtitle: 'Frontend Developer • UI/UX Enthusiast • Creative Problem Solver',
        heroText: 'Passionate about building beautiful websites, modern user interfaces, and digital experiences that solve real-world problems.',
        viewProjects: 'View Projects',
        downloadCV: 'Download CV',
        aboutHeading: 'About Me',
        aboutIntro: 'I am ISIMBI Caella, a passionate software developer who enjoys creating responsive websites, learning new technologies, and building innovative digital solutions.',
        aboutMore: 'I specialize in front-end development (HTML, CSS, JavaScript) and modern frameworks. I love turning ideas into usable interfaces with attention to accessibility, performance, and delightful interactions. Outside of coding, I enjoy photography and exploring design trends.',
        aboutPoint1: 'Responsive web design',
        aboutPoint2: 'UI/UX design thinking',
        aboutPoint3: 'Performance & accessibility',
        skillsHeading: 'Skills',
        educationHeading: 'Education',
        edu1Title: 'Software Development Studies',
        edu1Text: 'Learning programming, databases, web development and software engineering.',
        edu2Title: 'Continuous Learning',
        edu2Text: 'Exploring Vue.js, Tailwind CSS, UI/UX design and modern technologies.'
    },
    fr: {
        heroTag: '👋 Bienvenue sur mon portfolio',
        heroTitle: "Salut, je suis <span>ISIMBI Caella</span>",
        heroSubtitle: 'Développeuse Frontend • Passionnée UI/UX • Résolveuse créative',
        heroText: 'Passionnée par la création de jolis sites web, d\'interfaces modernes et d\'expériences numériques qui résolvent de vrais problèmes.',
        viewProjects: 'Voir les projets',
        downloadCV: 'Télécharger le CV',
        aboutHeading: 'À propos de moi',
        aboutIntro: 'Je suis ISIMBI Caella, une développeuse passionnée qui aime créer des sites web responsives, apprendre de nouvelles technologies et construire des solutions numériques innovantes.',
        aboutMore: 'Je me spécialise en développement front-end (HTML, CSS, JavaScript) et frameworks modernes. J\'aime transformer les idées en interfaces utilisables en prêtant attention à l\'accessibilité, la performance et des interactions agréables.',
        aboutPoint1: 'Design web responsive',
        aboutPoint2: 'Pensée UI/UX',
        aboutPoint3: 'Performance & accessibilité',
        skillsHeading: 'Compétences',
        educationHeading: 'Éducation',
        edu1Title: 'Études en développement logiciel',
        edu1Text: 'Apprentissage de la programmation, des bases de données, du développement web et de l\'ingénierie logicielle.',
        edu2Title: 'Apprentissage continu',
        edu2Text: "Exploration de Vue.js, Tailwind CSS, UI/UX et des technologies modernes."
    }
};

themeToggle.addEventListener('keyup', (e) => { if(e.key === 'Enter') themeToggle.click(); });

let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang){
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
        const key = node.getAttribute('data-i18n');
        if(strings[lang] && strings[lang][key]){
            node.innerHTML = strings[lang][key];
        }
    });
    if(langBtn) langBtn.textContent = lang.toUpperCase();
    localStorage.setItem('lang', lang);
}

try{ applyLang(currentLang); } catch(e){ console.warn('applyLang failed', e); }

if(langBtn){
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        applyLang(currentLang);
    });

    // Accessibility: keyboard toggle
    langBtn.addEventListener('keyup', (e) => { if(e.key === 'Enter') langBtn.click(); });
}

// Ensure 'Download CV' triggers a download even if cv.pdf is missing.
const downloadCvLink = document.getElementById('download-cv');
if(downloadCvLink){
    downloadCvLink.addEventListener('click', async (e) => {
        const href = downloadCvLink.getAttribute('href');
        try{
            // Try a HEAD request to check existence
            const res = await fetch(href, { method: 'HEAD' });
            if(res.ok) return; // let browser handle download
        }catch(err){
            // fall through to fallback
        }

        // If we get here, the file likely doesn't exist; prevent default and create fallback
        e.preventDefault();
        const fallbackText = `ISIMBI Caella\nFrontend Developer\nEmail: caellaisimbi28@gmail.com\nPortfolio: https://github.com/caella03`;
        const blob = new Blob([fallbackText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ISIMBI-Caella-CV.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });
}
