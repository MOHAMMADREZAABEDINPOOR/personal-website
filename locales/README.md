# Internationalization (i18n) Files

This directory contains translation files for the resume website in 5 languages:

## 📁 File Structure

```
locales/
├── fa.json          # Persian (فارسی) - Base language, RTL
├── en.json          # English - LTR
├── fr.json          # French (Français) - LTR
├── es.json          # Spanish (Español) - LTR
├── de.json          # German (Deutsch) - LTR
├── hreflang-suggestions.html  # SEO hreflang tags
├── qa-review.md     # Quality assurance documentation
└── README.md        # This file
```

## 🌐 Language Support

| Language | Code | Direction | Status | Notes |
|----------|------|-----------|--------|-------|
| Persian | `fa` | RTL | ✅ Complete | Base language |
| English | `en` | LTR | ✅ Complete | Primary LTR |
| French | `fr` | LTR | ✅ Complete | Professional tone |
| Spanish | `es` | LTR | ✅ Complete | Latin American friendly |
| German | `de` | LTR | ✅ Complete | Formal German |

## 📋 Content Structure

Each JSON file contains the following sections:

### Meta Information
- `meta.title` - Page title
- `meta.description` - SEO description
- `meta.keywords` - SEO keywords
- `meta.author` - Author name

### Navigation
- `nav.*` - Navigation menu items

### Hero Section
- `hero.name` - Full name
- `hero.title` - Professional title
- `hero.description` - Short bio
- `hero.ctaPrimary` - Primary button text
- `hero.ctaSecondary` - Secondary button text

### About Section
- `about.heading` - Section title
- `about.body` - Main description
- `about.stats.*` - Statistics labels

### Skills Section
- `skills.heading` - Section title
- `skills.categories.*` - Category names
- `skills.items.*` - Individual skills with levels and descriptions

### Projects Section
- `projects.heading` - Section title
- `projects.items[]` - Array of project objects

### Achievements Section
- `achievements.heading` - Section title
- `achievements.items[]` - Array of achievement objects

### Education Section
- `education.*` - Education information

### Contact Section
- `contact.*` - Contact form and information

### Footer
- `footer.*` - Footer content

### Accessibility
- `aria.*` - ARIA labels for screen readers

## 🔧 Technical Implementation

### Usage Example
```javascript
// Load language file
const translations = await fetch(`./locales/${language}.json`).then(r => r.json());

// Get translation
const title = translations.hero.title;

// Update DOM
document.querySelector('.hero-title').textContent = title;
```

### Language Switching
```javascript
function switchLanguage(lang) {
  // Update HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  
  // Load and apply translations
  loadTranslations(lang);
}
```

## 🎯 Translation Guidelines

### Tone & Style
- **Professional**: Suitable for resume/portfolio
- **Friendly**: Approachable for internships
- **Technical**: Accurate technical terminology
- **Natural**: Native-sounding translations

### Technical Terms
- **Preserve**: Python, Django, GitHub, Telegram, Cursor, Arduino
- **Translate**: AI-Assisted Development, Web Scraping, Prompt Engineering
- **Adapt**: Education system terms, cultural references

### Quality Standards
- ✅ Consistent terminology
- ✅ Proper punctuation
- ✅ Cultural adaptations
- ✅ Mobile-friendly lengths
- ✅ SEO optimization

## 📱 Responsive Considerations

### Text Length Limits
- **Meta descriptions**: < 160 characters
- **Navigation items**: < 15 characters
- **Button text**: < 20 characters
- **Skill names**: < 30 characters

### RTL/LTR Handling
- **Persian**: Pure RTL layout
- **Other languages**: Pure LTR layout
- **Mixed content**: Proper isolation

## 🔍 SEO Implementation

### Hreflang Tags
```html
<link rel="alternate" hreflang="fa" href="https://yoursite.com/fa/">
<link rel="alternate" hreflang="en" href="https://yoursite.com/en/">
<link rel="alternate" hreflang="fr" href="https://yoursite.com/fr/">
<link rel="alternate" hreflang="es" href="https://yoursite.com/es/">
<link rel="alternate" hreflang="de" href="https://yoursite.com/de/">
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/fa/">
```

### URL Structure
- `/fa/` - Persian (default)
- `/en/` - English
- `/fr/` - French
- `/es/` - Spanish
- `/de/` - German

## 🚀 Deployment

### File Organization
```
/
├── fa/
│   └── index.html
├── en/
│   └── index.html
├── fr/
│   └── index.html
├── es/
│   └── index.html
├── de/
│   └── index.html
└── locales/
    ├── fa.json
    ├── en.json
    ├── fr.json
    ├── es.json
    └── de.json
```

### Build Process
1. Copy base HTML to each language directory
2. Update meta tags for each language
3. Implement language switching logic
4. Test all languages on different devices
5. Deploy with proper hreflang tags

## 📊 Performance

### Optimization
- **Lazy loading**: Load language files on demand
- **Caching**: Cache translations in localStorage
- **Compression**: Minify JSON files
- **CDN**: Serve from CDN for better performance

### Monitoring
- **Load times**: Monitor translation loading
- **User preferences**: Track language usage
- **Error handling**: Graceful fallbacks

## 🔧 Maintenance

### Updates
1. **Content changes**: Update all language files
2. **New features**: Add translations for new content
3. **Bug fixes**: Fix translation errors
4. **Quality review**: Regular QA checks

### Version Control
- **Git**: Track all translation changes
- **Branches**: Separate branches for each language
- **Reviews**: Peer review for accuracy
- **Backups**: Regular backup of translation files

## 📞 Support

### Issues
- **Translation errors**: Report in GitHub issues
- **Missing translations**: Request new translations
- **Cultural issues**: Discuss cultural adaptations
- **Technical problems**: Technical support

### Contributors
- **Native speakers**: Preferred for translations
- **Technical reviewers**: For technical accuracy
- **QA testers**: For quality assurance
- **Documentation**: For maintaining this README

---

**Last Updated**: 2024-01-01  
**Version**: 1.0.0  
**Maintainer**: Mohammadreza Abedinpoor
