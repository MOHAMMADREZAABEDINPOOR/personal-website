// ===== Loading Screen Management =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressText = document.querySelector('.progress-text');
    const progressFill = document.querySelector('.progress-fill');
    const loadingTitle = document.querySelector('.loading-title');
    const loadingSubtitle = document.querySelector('.loading-subtitle');
    
    if (!loadingScreen) return;
    
    let progress = 0;
    const loadingSteps = [
        { key: 'loading.steps.initializing', progress: 20 },
        { key: 'loading.steps.loading_assets', progress: 40 },
        { key: 'loading.steps.preparing_content', progress: 60 },
        { key: 'loading.steps.finalizing', progress: 80 },
        { key: 'loading.steps.ready', progress: 100 }
    ];
    
    let currentStep = 0;
    
    function updateProgress() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            progress = step.progress;
            
            if (progressText) {
                progressText.textContent = `${progress}%`;
            }
            
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
            
            // Update loading text with translations
            if (loadingSubtitle && translations[currentLang]?.loading?.steps) {
                const stepKey = step.key.split('.').pop();
                const translatedText = translations[currentLang].loading.steps[stepKey];
                if (translatedText) {
                    loadingSubtitle.textContent = translatedText;
                }
            }
            
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
                setTimeout(updateProgress, 600);
            } else {
                // Loading complete
                setTimeout(hideLoadingScreen, 800);
            }
        }
    }
    
    // Update title and subtitle with translations
    if (loadingTitle && translations[currentLang]?.loading?.title) {
        loadingTitle.textContent = translations[currentLang].loading.title;
    }
    if (loadingSubtitle && translations[currentLang]?.loading?.subtitle) {
        loadingSubtitle.textContent = translations[currentLang].loading.subtitle;
    }
    
    // Start loading animation
    setTimeout(updateProgress, 500);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 800);
    }
}

// ===== Global Variables =====
let currentLang = 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';
let translations = {}; // Global variable for translations

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const langToggle = document.getElementById('lang-toggle');
const themeToggle = document.getElementById('theme-toggle');
const skillModal = document.getElementById('skill-modal');
const skillModalClose = document.querySelector('.skill-modal-close');

// ===== Logo Update Function =====
function updateLogo() {
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
        if (currentTheme === 'dark') {
            logoImg.src = './assets/images/logo2.png';
        } else {
            logoImg.src = './assets/images/logo1.png';
        }
        console.log('Logo updated for theme:', currentTheme);
    }
}

// ===== Load Translations =====
async function loadTranslations() {
    const languages = ['fa', 'en', 'de', 'fr', 'es'];
    
    for (const lang of languages) {
        try {
            const response = await fetch(`./locales/${lang}.json`);
            if (response.ok) {
                translations[lang] = await response.json();
                console.log(`Loaded translations for ${lang}`);
            } else {
                console.warn(`Failed to load translations for ${lang}`);
            }
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
        }
    }
    
    // Fallback to hardcoded translations if JSON files fail to load
    if (!translations.fa) {
        translations.fa = {
            'nav.home': 'خانه',
            'nav.about': 'درباره',
            'nav.skills': 'مهارت‌ها',
            'nav.projects': 'پروژه‌ها',
            'nav.achievements': 'افتخارات',
            'nav.education': 'تحصیلات',
            'nav.contact': 'تماس',
            'hero.badge': 'کاوشگر هوش مصنوعی و وب',
            'hero.name': 'محمدرضا عابدین‌پور',
            'hero.title': 'دانش‌آموز پایه دوازدهم | علاقه‌مند به هوش مصنوعی و برنامه‌نویسی | جویای کارآموزی',
            'hero.description': 'دانش‌آموز کنجکاو با علاقه به AI و وب؛ من از سال 2021 برنامه‌نویسی می‌کنم؛ تمرکز روی پروژه‌های کوچک کاربردی و یادگیری مستمر.',
            'hero.contact': 'تماس با من',
            'hero.view': 'مشاهده رزومه',
            'hero.download': 'دانلود رزومه',
            'hero.metric.experience': 'سال تجربه',
            'hero.metric.projects': 'پروژه عملی',
            'hero.metric.availability': 'آماده همکاری',
            'about.title': 'درباره من',
            'skills.title': 'مهارت‌ها',
            'projects.title': 'پروژه‌ها',
            'achievements.title': 'افتخارات',
            'education.title': 'تحصیلات',
            'contact.title': 'تماس با من',
            'footer.copyright': '© 2024 محمدرضا عابدین‌پور. تمام حقوق محفوظ است.'
        };
    }
    
    if (!translations.en) {
        translations.en = {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.achievements': 'Achievements',
            'nav.education': 'Education',
            'nav.contact': 'Contact',
            'hero.badge': 'AI & Web Explorer',
            'hero.name': 'Mohammadreza Abedinpour',
            'hero.title': '12th Grade Student | AI & Programming Enthusiast | Seeking Internship',
            'hero.description': 'Curious student passionate about AI and web development; I\'ve been programming since 2021; focused on practical projects and continuous learning.',
            'hero.contact': 'Contact Me',
            'hero.view': 'View Resume',
            'hero.download': 'Download Resume',
            'hero.metric.experience': 'Years Experience',
            'hero.metric.projects': 'Practical Projects',
            'hero.metric.availability': 'Ready to Collaborate',
            'about.title': 'About Me',
            'skills.title': 'Skills',
            'projects.title': 'Projects',
            'achievements.title': 'Achievements',
            'education.title': 'Education',
            'contact.title': 'Contact Me',
            'footer.copyright': '© 2024 Mohammadreza Abedinpour. All rights reserved.'
        };
    }
}

// ===== Theme Management =====
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    updateLogo();
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    console.log('Theme toggled to:', newTheme);
}

// ===== Language Management =====
function updateLanguageElements() {
    if (translations[currentLang]) {
        updateTextContent(translations[currentLang]);
    }
    updateLanguageToggle();
    updateTextAlignment();
}

function updateTextContent(langData) {
    // Update navigation
    updateElementText('[data-key="nav.home"]', langData.nav?.home);
    updateElementText('[data-key="nav.about"]', langData.nav?.about);
    updateElementText('[data-key="nav.skills"]', langData.nav?.skills);
    updateElementText('[data-key="nav.projects"]', langData.nav?.projects);
    updateElementText('[data-key="nav.achievements"]', langData.nav?.achievements);
    updateElementText('[data-key="nav.education"]', langData.nav?.education);
    updateElementText('[data-key="nav.contact"]', langData.nav?.contact);
    
    // Update hero section
    updateElementText('[data-key="hero.badge"]', langData.hero?.badge);
    updateElementText('[data-key="hero.name"]', langData.hero?.name);
    updateElementText('[data-key="hero.title"]', langData.hero?.title);
    updateElementText('[data-key="hero.description"]', langData.hero?.description);
    updateElementText('[data-key="hero.contact"]', langData.hero?.contact);
    updateElementText('[data-key="hero.view"]', langData.hero?.view);
    updateElementText('[data-key="hero.download"]', langData.hero?.download);
    updateElementText('[data-key="hero.metric.experience"]', langData.hero?.metric?.experience);
    updateElementText('[data-key="hero.metric.projects"]', langData.hero?.metric?.projects);
    updateElementText('[data-key="hero.metric.certificates"]', langData.hero?.metric?.certificates);
    
    // Update section titles
    updateElementText('[data-key="about.title"]', langData.about?.title);
    updateElementText('[data-key="skills.title"]', langData.skills?.title);
    updateElementText('[data-key="projects.title"]', langData.projects?.title);
    updateElementText('[data-key="achievements.title"]', langData.achievements?.title);
    updateElementText('[data-key="education.title"]', langData.education?.title);
    updateElementText('[data-key="contact.title"]', langData.contact?.title);
    
    // Update about section
    updateElementText('[data-key="about.text.intro"]', langData.about?.text?.intro);
    updateElementText('[data-key="about.text.experience"]', langData.about?.text?.experience);
    updateElementText('[data-key="about.stats.heading"]', langData.about?.stats?.heading);
    updateElementText('[data-key="about.stats.experience"]', langData.about?.stats?.experience);
    updateElementText('[data-key="about.stats.projects"]', langData.about?.stats?.projects);
    updateElementText('[data-key="about.stats.certificates"]', langData.about?.stats?.certificates);
    
    // Update ethics section
    updateElementText('[data-key="about.ethics.heading"]', langData.about?.ethics?.heading);
    updateElementText('[data-key="about.ethics.learning.title"]', langData.about?.ethics?.learning?.title);
    updateElementText('[data-key="about.ethics.learning.description"]', langData.about?.ethics?.learning?.description);
    updateElementText('[data-key="about.ethics.teamwork.title"]', langData.about?.ethics?.teamwork?.title);
    updateElementText('[data-key="about.ethics.teamwork.description"]', langData.about?.ethics?.teamwork?.description);
    updateElementText('[data-key="about.ethics.innovation.title"]', langData.about?.ethics?.innovation?.title);
    updateElementText('[data-key="about.ethics.innovation.description"]', langData.about?.ethics?.innovation?.description);
    
    // Update skills section
    updateElementText('[data-key="skills.experience_text"]', langData.skills?.experience_text);
    
    // Update sliding skills
    if (langData.skills?.sliding) {
        updateElementText('[data-key="skills.sliding.python"]', langData.skills.sliding.python);
        updateElementText('[data-key="skills.sliding.web"]', langData.skills.sliding.web);
        updateElementText('[data-key="skills.sliding.ai"]', langData.skills.sliding.ai);
        updateElementText('[data-key="skills.sliding.telegram"]', langData.skills.sliding.telegram);
        updateElementText('[data-key="skills.sliding.django"]', langData.skills.sliding.django);
        updateElementText('[data-key="skills.sliding.sql"]', langData.skills.sliding.sql);
        updateElementText('[data-key="skills.sliding.git"]', langData.skills.sliding.git);
        updateElementText('[data-key="skills.sliding.prompt"]', langData.skills.sliding.prompt);
        updateElementText('[data-key="skills.sliding.scraping"]', langData.skills.sliding.scraping);
        updateElementText('[data-key="skills.sliding.deployment"]', langData.skills.sliding.deployment);
        updateElementText('[data-key="skills.sliding.arduino"]', langData.skills.sliding.arduino);
        updateElementText('[data-key="skills.sliding.flutter"]', langData.skills.sliding.flutter);
        updateElementText('[data-key="skills.sliding.photoshop"]', langData.skills.sliding.photoshop);
        updateElementText('[data-key="skills.sliding.video"]', langData.skills.sliding.video);
        updateElementText('[data-key="skills.sliding.ui"]', langData.skills.sliding.ui);
        updateElementText('[data-key="skills.sliding.office"]', langData.skills.sliding.office);
    }
    
    // Update achievements section
    updateElementText('[data-key="achievements.sharif.title"]', langData.achievements?.sharif?.title);
    updateElementText('[data-key="achievements.sharif.ranking"]', langData.achievements?.sharif?.ranking);
    updateElementText('[data-key="achievements.sharif.description"]', langData.achievements?.sharif?.description);
    updateElementText('[data-key="achievements.sharif.rank_iran"]', langData.achievements?.sharif?.rank_iran);
    updateElementText('[data-key="achievements.sharif.rank_global"]', langData.achievements?.sharif?.rank_global);
    updateElementText('[data-key="achievements.certificate.details"]', langData.achievements?.certificate?.details);
    
    // Update education section
    updateElementText('[data-key="education.highschool.title"]', langData.education?.highschool?.title);
    updateElementText('[data-key="education.highschool.subtitle"]', langData.education?.highschool?.subtitle);
    updateElementText('[data-key="education.highschool.description"]', langData.education?.highschool?.description);
    
    // Update projects section
    updateElementText('[data-key="projects.cards.chatbot.title"]', langData.projects?.cards?.chatbot?.title);
    updateElementText('[data-key="projects.cards.chatbot.description"]', langData.projects?.cards?.chatbot?.description);
    updateElementText('[data-key="projects.cards.blog.title"]', langData.projects?.cards?.blog?.title);
    updateElementText('[data-key="projects.cards.blog.description"]', langData.projects?.cards?.blog?.description);
    updateElementText('[data-key="projects.cards.telegram-agent.title"]', langData.projects?.cards?.['telegram-agent']?.title);
    updateElementText('[data-key="projects.cards.telegram-agent.description"]', langData.projects?.cards?.['telegram-agent']?.description);
    updateElementText('[data-key="projects.details_button"]', langData.projects?.details_button);
    updateElementText('[data-key="projects.coming_soon"]', langData.projects?.coming_soon);
    
    // Update project modal headings
    updateElementText('[data-key="projects.modal.about"]', langData.projects?.modal?.about);
    updateElementText('[data-key="projects.modal.features"]', langData.projects?.modal?.features);
    updateElementText('[data-key="projects.modal.technologies"]', langData.projects?.modal?.technologies);
    updateElementText('[data-key="projects.modal.links"]', langData.projects?.modal?.links);
    
    // Update contact section
    updateElementText('[data-key="contact.heading"]', langData.contact?.heading);
    updateElementText('[data-key="contact.email.title"]', langData.contact?.email?.title);
    updateElementText('[data-key="contact.phone.title"]', langData.contact?.phone?.title);
    updateElementText('[data-key="contact.telegram.title"]', langData.contact?.telegram?.title);
    updateElementText('[data-key="contact.telegram.label"]', langData.contact?.telegram?.label);
    updateElementText('[data-key="contact.whatsapp.title"]', langData.contact?.whatsapp?.title);
    updateElementText('[data-key="contact.whatsapp.label"]', langData.contact?.whatsapp?.label);
    updateElementText('[data-key="contact.youtube.title"]', langData.contact?.youtube?.title);
    updateElementText('[data-key="contact.youtube.label"]', langData.contact?.youtube?.label);
    updateElementText('[data-key="contact.location.title"]', langData.contact?.location?.title);
    updateElementText('[data-key="contact.location.address"]', langData.contact?.location?.address);
    
    // Update footer
    updateElementText('[data-key="footer.copyright"]', langData.footer?.copyright);
}

function updateElementText(selector, text) {
    if (text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.textContent = text;
        });
    }
}

function updateLanguageToggle() {
    const currentLangDisplay = document.getElementById('current-lang-display');
    if (currentLangDisplay) {
        const languageNames = {
            'fa': 'فارسی',
            'en': 'English',
            'de': 'Deutsch',
            'fr': 'Français',
            'es': 'Español'
        };
        currentLangDisplay.textContent = languageNames[currentLang] || 'فارسی';
    }
}

function updateTextAlignment() {
    const isRTL = currentLang === 'fa';
    const html = document.documentElement;
    
    // Update HTML lang attribute
    html.setAttribute('lang', currentLang);
    
    // Add/remove text alignment classes
    if (isRTL) {
        html.classList.add('rtl-text');
        html.classList.remove('ltr-text');
    } else {
        html.classList.add('ltr-text');
        html.classList.remove('rtl-text');
    }
    
    console.log('Text alignment updated:', isRTL ? 'RTL' : 'LTR');
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateLanguageElements();
    
    // Re-initialize skills system with new language data
    if (typeof initInteractiveSkills === 'function') {
        initInteractiveSkills();
    }
    
    console.log('Language changed to:', lang);
}

// ===== Navigation =====
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
}

function handleNavLinkClick(e) {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        closeMobileMenu();
    }
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Navbar Scroll Effect =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== Form Validation =====
function initFormValidation() {
    // Contact form removed - using social links instead
    console.log('Contact form removed - using social links for communication');
}

// ===== Language Dropdown =====
function initLanguageDropdown() {
    const langDropdown = document.getElementById('lang-dropdown');
    
    langToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        langToggle.parentElement.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            langToggle.parentElement.classList.remove('active');
        }
    });
    
    // Handle language selection
    langDropdown.addEventListener('click', function(e) {
        const target = e.target.closest('.dropdown-item');
        if (target) {
            const lang = target.getAttribute('data-lang');
            if (lang) {
                changeLanguage(lang);
                langToggle.parentElement.classList.remove('active');
            }
        }
    });
}

// ===== Interactive Skills System =====
function initInteractiveSkills() {
    const skillItems = document.querySelectorAll('.skill-item-sliding');
    const hoverCard = document.getElementById('skill-hover-card');
    
    // Get skill data from translations based on current language
    function getSkillsData() {
        const currentTranslations = translations[currentLang] || translations['fa'];
        const skillsData = currentTranslations.skills?.skillsData || {};
        
        // Add experience percentages for each skill
        const enhancedSkillsData = {};
        Object.keys(skillsData).forEach(key => {
            enhancedSkillsData[key] = {
                ...skillsData[key],
                experience: getExperiencePercentage(key)
            };
        });
        
        return enhancedSkillsData;
    }
    
    function getExperiencePercentage(skillKey) {
        const experienceMap = {
            'python': 65,
            'web': 85,
            'ai': 90,
            'telegram': 40,
            'django': 85,
            'sql': 65,
            'git': 60,
            'prompt': 50,
            'scraping': 50,
            'deployment': 65,
            'arduino': 40,
            'flutter': 30,
            'photoshop': 70,
            'video': 60,
            'ui': 70,
            'office': 70
        };
        return experienceMap[skillKey] || 50;
    }
    
    let currentActiveSkill = null;
    let hoverTimeout = null;
    
    // Initialize hover interactions
    skillItems.forEach(skillItem => {
        const skillKey = skillItem.getAttribute('data-skill');
        const skillsData = getSkillsData();
        const skillData = skillsData[skillKey];
        
        if (!skillData) return;
        
        skillItem.addEventListener('mouseenter', (e) => {
            clearTimeout(hoverTimeout);
            
            // Remove active class from previous skill
            if (currentActiveSkill && currentActiveSkill !== skillItem) {
                currentActiveSkill.classList.remove('active');
            }
            
            // Add active class to current skill
            skillItem.classList.add('active');
            currentActiveSkill = skillItem;
            
            // Show hover card with animation delay
            setTimeout(() => {
                showSkillHoverCard(skillData, e);
            }, 200);
        });
        
        skillItem.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                hideSkillHoverCard();
                if (currentActiveSkill === skillItem) {
                    skillItem.classList.remove('active');
                    currentActiveSkill = null;
                }
            }, 300);
        });
    });
    
    // Hover card mouse events
    if (hoverCard) {
        hoverCard.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
        });
        
        hoverCard.addEventListener('mouseleave', () => {
            hideSkillHoverCard();
            if (currentActiveSkill) {
                currentActiveSkill.classList.remove('active');
                currentActiveSkill = null;
            }
        });
    }
    
    // Close hover card on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hoverCard && hoverCard.classList.contains('active')) {
            hideSkillHoverCard();
            if (currentActiveSkill) {
                currentActiveSkill.classList.remove('active');
                currentActiveSkill = null;
            }
        }
    });
    
    function showSkillHoverCard(skillData, event) {
        if (!hoverCard) return;
        
        // Update card content
        const iconElement = hoverCard.querySelector('.hover-skill-icon');
        const titleElement = hoverCard.querySelector('.hover-skill-title');
        const levelElement = hoverCard.querySelector('.hover-skill-level');
        const experienceBar = hoverCard.querySelector('.experience-fill');
        const experienceText = hoverCard.querySelector('.experience-text');
        const projectsContainer = hoverCard.querySelector('.related-projects');
        const descriptionElement = hoverCard.querySelector('.skill-description');
        
        // Update translatable elements in hover card
        const experienceLevelHeader = hoverCard.querySelector('[data-key="skills.hover.experience_level"]');
        const relatedProjectsHeader = hoverCard.querySelector('[data-key="skills.hover.related_projects"]');
        
        if (experienceLevelHeader && translations[currentLang]?.skills?.hover?.experience_level) {
            experienceLevelHeader.textContent = translations[currentLang].skills.hover.experience_level;
        }
        if (relatedProjectsHeader && translations[currentLang]?.skills?.hover?.related_projects) {
            relatedProjectsHeader.textContent = translations[currentLang].skills.hover.related_projects;
        }
        
        if (iconElement) iconElement.textContent = skillData.icon;
        if (titleElement) titleElement.textContent = skillData.title;
        if (levelElement) levelElement.textContent = skillData.level;
        if (experienceText) experienceText.textContent = skillData.experienceText;
        if (descriptionElement) descriptionElement.textContent = skillData.description;
        
        // Animate experience bar
        if (experienceBar) {
            experienceBar.style.width = '0%';
            setTimeout(() => {
                experienceBar.style.width = skillData.experience + '%';
            }, 300);
        }
        
        // Update projects
        if (projectsContainer) {
            projectsContainer.innerHTML = '';
            skillData.projects.forEach((project, index) => {
                const projectTag = document.createElement('span');
                projectTag.className = 'project-tag';
                projectTag.textContent = project;
                projectTag.style.animationDelay = (index * 0.1) + 's';
                projectsContainer.appendChild(projectTag);
            });
        }
        
        // Show card with stunning animation
        hoverCard.classList.add('active');
        
        // Add particle effects
        createHoverParticles();
    }
    
    function hideSkillHoverCard() {
        if (!hoverCard) return;
        hoverCard.classList.remove('active');
    }
    
    function createHoverParticles() {
        // Simplified - no particles for better performance
        return;
    }
}


// ===== Enhanced Scroll Animations =====
let lastScrollTop = 0;
let scrollDirection = 'down';
let isScrolling = false;

function initScrollAnimations() {
    // Add animate-on-scroll class to individual elements only (not sections)
    const elementsToAnimate = [
        '.project-card',
        '.skill-card', 
        '.certificate-card',
        '.stat-card',
        '.text-block',
        '.hero-visual',
        '.floating-elements',
        '.about-text-container',
        '.stats-header',
        '.ethics-cards',
        '.timeline-item',
        '.hero-stats',
        '.hero-actions',
        '.about-stats',
        '.ethics-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
    
    // Intersection Observer for scroll-in animations only
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-in');
                // Once animated, stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Remove scroll direction detection - no background changes on scroll
    // window.addEventListener('scroll', throttle(handleScrollDirection, 20));
}

function handleScrollDirection() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Remove scroll direction detection and animations
    // Keep only basic scroll tracking for other purposes
    lastScrollTop = scrollTop;
    
    // Remove scroll pause effect that affects background
    // Keep smooth scrolling behavior only
}

// ===== Performance Optimization =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Error Handling =====
function handleErrors() {
    window.onerror = function(message, source, lineno, colno, error) {
        console.error('JavaScript Error:', {
            message,
            source,
            line: lineno,
            column: colno,
            error
        });
        return true;
    };
    
    window.onunhandledrejection = function(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
    };
}

// ===== PWA Registration =====
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// ===== Initialization =====
async function init() {
    try {
        // Initialize loading screen first
        initLoadingScreen();
        
        // Load translations first
        await loadTranslations();
        
        
        // Apply saved theme
        applyTheme(currentTheme);
        
        // Apply saved language
        const savedLang = localStorage.getItem('language') || 'en';
        changeLanguage(savedLang);
        
        // Initialize all components
        initSmoothScrolling();
        initFormValidation();
        initLanguageDropdown();
        initInteractiveSkills();
        initScrollAnimations();
        handleErrors();
        registerServiceWorker();
        
        // Add event listeners
        window.addEventListener('scroll', throttle(handleNavbarScroll, 100));
        
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }
        
        if (navMenu) {
            navMenu.addEventListener('click', handleNavLinkClick);
        }
        
        // Close mobile menu on window resize
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250));
        
        // Initialize skill modal
        initSkillModal();
        
        // Initialize project modal
        initProjectModal();
        
        // Initialize fullscreen image modal
        initFullscreenImageModal();
        
        // Initialize modal interactive effects
        addModalInteractiveEffects();
        
        console.log('Website initialized successfully!');
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// ===== Skill Modal Functions =====
function initSkillModal() {
    // Skill details data
    const skillDetails = {
        'ai': {
            title: 'AI Development',
            icon: '🤖',
            description: 'AI-assisted development using Cursor and Copilot for code review, testing, and documentation.',
            level: 'Strong',
            experience: '2+ years'
        },
        'python': {
            title: 'Python',
            icon: '🐍',
            description: 'Python programming for NLP chatbots, web scraping, and automation tasks.',
            level: 'Intermediate',
            experience: '3+ years'
        },
        'web': {
            title: 'Web Development',
            icon: '🌐',
            description: 'Frontend development with HTML, CSS, and JavaScript for personal websites and school blogs.',
            level: 'Intermediate',
            experience: '3+ years'
        },
        'telegram': {
            title: 'Telegram Bots',
            icon: '📱',
            description: 'Telegram bot development with agents, webhooks, and scheduling capabilities.',
            level: 'Strong',
            experience: '2+ years'
        },
        'django': {
            title: 'Django Framework',
            icon: '🎯',
            description: 'Django web framework for building CRUD applications with database integration.',
            level: 'Intermediate',
            experience: '2+ years'
        },
        'git': {
            title: 'Git & GitHub',
            icon: '📊',
            description: 'Version control with Git and GitHub, including branches and pull requests.',
            level: 'Intermediate',
            experience: '1+ year'
        },
        'sql': {
            title: 'SQL/MySQL',
            icon: '🗄️',
            description: 'Database design and querying with SQL and MySQL for data management.',
            level: 'Intermediate',
            experience: '2+ years'
        },
        'arduino': {
            title: 'Arduino & IoT',
            icon: '🔧',
            description: 'Arduino programming with LM35 temperature sensors and ultrasonic sensors.',
            level: 'Beginner',
            experience: '1+ year'
        },
        'scraping': {
            title: 'Web Scraping',
            icon: '🕷️',
            description: 'Web scraping for data collection and automation purposes.',
            level: 'Intermediate',
            experience: '1+ year'
        },
        'prompt': {
            title: 'Prompt Engineering',
            icon: '💬',
            description: 'Creating effective prompts for chatbots and AI agents.',
            level: 'Intermediate',
            experience: '1+ year'
        },
        'photoshop': {
            title: 'Photoshop & Design',
            icon: '🎨',
            description: 'Photo editing and retouching with Photoshop for studio workflow.',
            level: 'Intermediate',
            experience: '2+ years'
        },
        'video': {
            title: 'Video Editing',
            icon: '🎬',
            description: 'Video editing with CapCut for YouTube content creation.',
            level: 'Intermediate',
            experience: '6+ months'
        },
        'deploy': {
            title: 'Deployment',
            icon: '🚀',
            description: 'Deploying applications on shared hosting and VPS with domain and SSL setup.',
            level: 'Intermediate',
            experience: '1+ year'
        },
        'flutter': {
            title: 'Flutter Development',
            icon: '📱',
            description: 'Mobile app development with Flutter framework.',
            level: 'Intermediate',
            experience: '2+ years'
        },
        'react': {
            title: 'React',
            icon: '⚛️',
            description: 'Modern web development with React and Tailwind CSS.',
            level: 'Beginner',
            experience: '6+ months'
        },
        'cpp': {
            title: 'C/C++',
            icon: '⚙️',
            description: 'System programming basics with C and C++ languages.',
            level: 'Familiar',
            experience: '1+ year'
        },
        'office': {
            title: 'Microsoft 365',
            icon: '📈',
            description: 'Office productivity suite including Word, Excel, and PowerPoint.',
            level: 'Intermediate',
            experience: '2+ years'
        }
    };

    // Add click event listeners to skill items and details buttons
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const skillKey = item.getAttribute('data-skill');
            showSkillModal(skillKey, skillDetails[skillKey]);
        });
    });

    document.querySelectorAll('.skill-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const skillItem = btn.closest('.skill-item');
            const skillKey = skillItem.getAttribute('data-skill');
            showSkillModal(skillKey, skillDetails[skillKey]);
        });
    });

    // Close modal when clicking close button
    if (skillModalClose) {
        skillModalClose.addEventListener('click', closeSkillModal);
    }

    // Close modal when clicking outside
    if (skillModal) {
        skillModal.addEventListener('click', (e) => {
            if (e.target === skillModal) {
                closeSkillModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && skillModal && skillModal.style.display === 'block') {
            closeSkillModal();
        }
    });
}

function showSkillModal(skillKey, skillData) {
    if (!skillData) return;
    
    const modal = document.getElementById('skill-modal');
    const title = document.getElementById('skill-modal-title');
    const icon = document.getElementById('skill-modal-icon');
    const description = document.getElementById('skill-modal-description');
    const level = document.getElementById('skill-modal-level');
    const experience = document.getElementById('skill-modal-experience');
    
    if (modal && title && icon && description && level && experience) {
        title.textContent = skillData.title;
        icon.textContent = skillData.icon;
        description.textContent = skillData.description;
        level.textContent = skillData.level;
        experience.textContent = skillData.experience;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeSkillModal() {
    const modal = document.getElementById('skill-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// ===== Project Modal Functions =====
function initProjectModal() {

    // Add click event listeners to project details buttons
    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const projectKey = btn.getAttribute('data-project');
            showProjectModal(projectKey);
        });
    });

    // Close modal when clicking close button
    const projectModalClose = document.querySelector('.project-modal-close');
    if (projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking outside
    const projectModal = document.getElementById('project-modal');
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function showProjectModal(projectKey) {
    // Get project data from translations, fallback to Persian if not available
    let projectInfo = translations[currentLang]?.projects?.details?.[projectKey];
    if (!projectInfo) {
        console.warn('Project data not found for:', projectKey, 'in language:', currentLang, 'falling back to Persian');
        projectInfo = translations['fa']?.projects?.details?.[projectKey];
    }
    if (!projectInfo) {
        console.error('Project data not found for:', projectKey, 'in any language');
        return;
    }
    
    // Create floating particles for the modal
    createModalParticles();
    
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('project-modal-title');
    const description = document.getElementById('project-modal-description');
    const featuresList = document.getElementById('project-modal-features-list');
    const techTags = document.getElementById('project-modal-tech-tags');
    const mainImage = document.getElementById('project-modal-main-img');
    const thumbnailsContainer = document.getElementById('project-modal-thumbnails');
    
    if (modal && title && description && featuresList && techTags) {
        // Update title and description
        title.textContent = projectInfo.title;
        description.textContent = projectInfo.description;
        
        // Update features list
        featuresList.innerHTML = '';
        projectInfo.features?.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Update tech tags
        techTags.innerHTML = '';
        projectInfo.tech?.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techTags.appendChild(tag);
        });
        
        // Update images based on project
        let projectImages = [];
        if (projectKey === 'chatbot') {
            projectImages = [
                './assets/images/1 (1).png',
                './assets/images/1 (2).png',
                './assets/images/1 (3).png',
                './assets/images/1 (4).png',
                './assets/images/1 (5).png',
                './assets/images/1 (6).png',
                './assets/images/1 (7).png'
            ];
        } else if (projectKey === 'blog') {
            projectImages = [
                './assets/images/2 (1).png',
                './assets/images/2 (2).png',
                './assets/images/2 (3).png',
                './assets/images/2 (4).png',
                './assets/images/2 (5).png',
                './assets/images/2 (6).png',
                './assets/images/2 (7).png',
                './assets/images/2 (8).png'
            ];
        } else if (projectKey === 'telegram-agent') {
            projectImages = [
                './assets/images/3 (2).png',
                './assets/images/3 (1).png'
            ];
        } else {
            projectImages = [
            './assets/images/1.png',
            './assets/images/2.png',
            './assets/images/johnz.png'
        ];
        }
        
        if (projectImages.length > 0) {
            // Set main image
            mainImage.src = projectImages[0];
            mainImage.alt = projectInfo.title;
            
            // Create thumbnails
            thumbnailsContainer.innerHTML = '';
            projectImages.forEach((imageSrc, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'project-modal-thumbnail';
                if (index === 0) thumbnail.classList.add('active');
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `${projectInfo.title} - تصویر ${index + 1}`;
                
                thumbnail.appendChild(img);
                thumbnailsContainer.appendChild(thumbnail);
                
                // Add click event to thumbnail
                thumbnail.addEventListener('click', () => {
                    // Remove active class from all thumbnails
                    thumbnailsContainer.querySelectorAll('.project-modal-thumbnail').forEach(t => t.classList.remove('active'));
                    // Add active class to clicked thumbnail
                    thumbnail.classList.add('active');
                    // Update main image
                    mainImage.src = imageSrc;
                });
            });
        }
        
        // Add zoom button functionality
        const zoomBtn = document.getElementById('image-zoom-btn');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', () => {
                // Get current project images for navigation
                const currentImageSrc = mainImage.src;
                const currentIndex = projectImages.findIndex(img => img === currentImageSrc);
                showFullscreenImage(currentImageSrc, mainImage.alt, projectImages, currentIndex >= 0 ? currentIndex : 0);
            });
        }
        
        // Show modal with animation
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus on close button for accessibility
        setTimeout(() => {
            const closeBtn = modal.querySelector('.project-modal-close');
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 100);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        // Remove particles before closing
        removeModalParticles();
        
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// ===== Seamless Tech Banner Animation =====
function initSeamlessTechBanner() {
    const techBanner = document.querySelector('.tech-banner');
    if (!techBanner) return;
    
    let position = 0;
    const speed = 1.5; // pixels per frame - smooth movement
    let cardsPerSet = 0;
    let cardWidth = 0;
    
    // Calculate dimensions dynamically
    function calculateDimensions() {
        const cards = techBanner.querySelectorAll('.tech-logo');
        cardsPerSet = Math.floor(cards.length / 3); // We have 3 sets
        
        if (cards.length > 0) {
            const firstCard = cards[0];
            const cardRect = firstCard.getBoundingClientRect();
            cardWidth = cardRect.width + 32; // width + gap
        }
    }
    
    function animate() {
        position -= speed;
        
        // Reset position when we've moved exactly one set width
        if (cardWidth > 0 && Math.abs(position) >= cardWidth * cardsPerSet) {
            position = 0;
        }
        
        techBanner.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    
    // Calculate dimensions and start animation
    calculateDimensions();
    requestAnimationFrame(animate);
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateDimensions);
}

// ===== Fullscreen Image Modal =====
let currentImageIndex = 0;
let currentImageArray = [];

function initFullscreenImageModal() {
    const fullscreenModal = document.getElementById('fullscreen-image-modal');
    const closeBtn = document.querySelector('.fullscreen-close-btn');
    const prevBtn = document.getElementById('fullscreen-prev-btn');
    const nextBtn = document.getElementById('fullscreen-next-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFullscreenImage);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    if (fullscreenModal) {
        fullscreenModal.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) {
                closeFullscreenImage();
            }
        });
    }
    
    // Close with Escape key and navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('fullscreen-image-modal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeFullscreenImage();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

function showFullscreenImage(imageSrc, imageAlt, imageArray = null, startIndex = 0) {
    const modal = document.getElementById('fullscreen-image-modal');
    const image = document.getElementById('fullscreen-image');
    
    if (modal && image) {
        // Set up image array for navigation
        if (imageArray && Array.isArray(imageArray)) {
            currentImageArray = imageArray;
            currentImageIndex = startIndex;
        } else {
            currentImageArray = [imageSrc];
            currentImageIndex = 0;
        }
        
        // Display current image
        updateFullscreenImage();
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus on close button for accessibility
        setTimeout(() => {
            const closeBtn = modal.querySelector('.fullscreen-close-btn');
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 100);
    }
}

function updateFullscreenImage() {
    const image = document.getElementById('fullscreen-image');
    const counter = document.getElementById('fullscreen-image-counter');
    const prevBtn = document.getElementById('fullscreen-prev-btn');
    const nextBtn = document.getElementById('fullscreen-next-btn');
    
    if (image && currentImageArray.length > 0) {
        const currentSrc = currentImageArray[currentImageIndex];
        image.src = currentSrc;
        image.alt = `تصویر ${currentImageIndex + 1}`;
        
        // Update counter
        if (counter) {
            counter.textContent = `${currentImageIndex + 1} / ${currentImageArray.length}`;
        }
        
        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = currentImageIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentImageIndex === currentImageArray.length - 1;
        }
        
        // Hide navigation if only one image
        if (currentImageArray.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }
    }
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateFullscreenImage();
    }
}

function showNextImage() {
    if (currentImageIndex < currentImageArray.length - 1) {
        currentImageIndex++;
        updateFullscreenImage();
    }
}

function closeFullscreenImage() {
    const modal = document.getElementById('fullscreen-image-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// ===== Simplified Modal Effects =====
function createModalParticles() {
    // Simplified - no particles for better performance
    return;
}

function removeModalParticles() {
    // Simplified - no particles to remove
    return;
}

// ===== Simplified Modal Interactions =====
function addModalInteractiveEffects() {
    // Simplified - no complex interactions for better performance
    return;
}

// ===== Start Application =====
document.addEventListener('DOMContentLoaded', init);