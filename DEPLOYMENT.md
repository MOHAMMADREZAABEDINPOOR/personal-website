# راهنمای استقرار (Deployment Guide)

این راهنما مراحل کامل استقرار وب‌سایت رزومه روی GitHub Pages و Netlify را شرح می‌دهد.

## 📋 پیش‌نیازها

- حساب GitHub
- Git نصب شده روی سیستم
- ویرایشگر کد (VS Code توصیه می‌شود)

## 🚀 استقرار روی GitHub Pages

### مرحله 1: آماده‌سازی پروژه

1. **ایجاد ریپازیتوری جدید**
   ```bash
   # در GitHub یک ریپازیتوری جدید ایجاد کنید
   # نام ریپازیتوری: yourusername.github.io
   ```

2. **کلون کردن ریپازیتوری**
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   cd yourusername.github.io
   ```

3. **کپی کردن فایل‌های پروژه**
   ```bash
   # تمام فایل‌های پروژه را در این پوشه کپی کنید
   cp -r /path/to/resume-site/* .
   ```

### مرحله 2: ویرایش محتوا

1. **تغییر اطلاعات شخصی در `index.html`**
   ```html
   <!-- خط 15: تغییر عنوان صفحه -->
   <title>نام شما - رزومه</title>
   
   <!-- خط 25: تغییر meta description -->
   <meta name="description" content="رزومه نام شما - توضیح کوتاه">
   
   <!-- خط 45: تغییر نام -->
   <h1>نام شما</h1>
   
   <!-- خط 50: تغییر عنوان شغلی -->
   <p>عنوان شغلی شما</p>
   ```

2. **تغییر لینک‌های شبکه‌های اجتماعی**
   ```html
   <!-- خط 200: تغییر لینک GitHub -->
   <a href="https://github.com/yourusername">GitHub</a>
   
   <!-- خط 205: تغییر لینک LinkedIn -->
   <a href="https://linkedin.com/in/yourusername">LinkedIn</a>
   
   <!-- خط 210: تغییر ایمیل -->
   <a href="mailto:your-email@example.com">ایمیل</a>
   ```

3. **تغییر URL در فایل‌های SEO**
   ```html
   <!-- در index.html خط 30-35 -->
   <meta property="og:url" content="https://yourusername.github.io/">
   
   <!-- در sitemap.xml -->
   <loc>https://yourusername.github.io/</loc>
   ```

### مرحله 3: آپلود و استقرار

1. **اضافه کردن فایل‌ها به Git**
   ```bash
   git add .
   git commit -m "Initial commit: Add resume website"
   ```

2. **Push کردن به GitHub**
   ```bash
   git push -u origin main
   ```

3. **فعال‌سازی GitHub Pages**
   - به ریپازیتوری خود در GitHub بروید
   - روی تب "Settings" کلیک کنید
   - در منوی سمت چپ "Pages" را انتخاب کنید
   - در بخش "Source" گزینه "Deploy from a branch" را انتخاب کنید
   - Branch را "main" انتخاب کنید
   - Folder را "/ (root)" انتخاب کنید
   - روی "Save" کلیک کنید

4. **انتظار برای استقرار**
   - GitHub Pages معمولاً 5-10 دقیقه طول می‌کشد
   - سایت شما در آدرس `https://yourusername.github.io` در دسترس خواهد بود

### مرحله 4: تنظیمات اضافی GitHub Pages

1. **تنظیم Custom Domain (اختیاری)**
   ```bash
   # فایل CNAME ایجاد کنید
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **تنظیم HTTPS**
   - در Settings > Pages
   - گزینه "Enforce HTTPS" را فعال کنید

## 🌐 استقرار روی Netlify

### روش 1: آپلود مستقیم

1. **آماده‌سازی فایل‌ها**
   ```bash
   # فایل‌های پروژه را در یک پوشه zip کنید
   zip -r resume-site.zip .
   ```

2. **آپلود به Netlify**
   - به [netlify.com](https://netlify.com) بروید
   - روی "Add new site" کلیک کنید
   - "Deploy manually" را انتخاب کنید
   - فایل zip را drag & drop کنید
   - سایت شما فوراً منتشر می‌شود

### روش 2: اتصال به Git

1. **اتصال ریپازیتوری**
   - در Netlify روی "Add new site" کلیک کنید
   - "Import an existing project" را انتخاب کنید
   - GitHub را انتخاب کنید
   - ریپازیتوری خود را انتخاب کنید

2. **تنظیمات Build**
   ```
   Build command: (خالی بگذارید)
   Publish directory: / (root)
   ```

3. **استقرار خودکار**
   - Netlify به صورت خودکار هر بار که کد را push کنید، سایت را به‌روزرسانی می‌کند

### تنظیمات پیشرفته Netlify

1. **فایل `netlify.toml` ایجاد کنید**
   ```toml
   [build]
     publish = "."
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **تنظیم Custom Domain**
   - در Site settings > Domain management
   - "Add custom domain" را کلیک کنید
   - دامنه خود را وارد کنید

## 🔧 استقرار روی Vercel

### روش 1: Vercel CLI

1. **نصب Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **ورود به حساب کاربری**
   ```bash
   vercel login
   ```

3. **استقرار**
   ```bash
   vercel
   ```

### روش 2: Dashboard Vercel

1. **اتصال ریپازیتوری**
   - به [vercel.com](https://vercel.com) بروید
   - "New Project" را کلیک کنید
   - ریپازیتوری GitHub خود را انتخاب کنید

2. **تنظیمات**
   ```
   Framework Preset: Other
   Build Command: (خالی)
   Output Directory: .
   ```

## 📱 تنظیمات PWA

### 1. آیکون‌های PWA

ایجاد آیکون‌ها در اندازه‌های مختلف:

```bash
# استفاده از ImageMagick (در صورت نصب)
convert profile.jpg -resize 192x192 assets/images/icon-192x192.png
convert profile.jpg -resize 512x512 assets/images/icon-512x512.png

# یا استفاده از آنلاین tools
# https://realfavicongenerator.net/
# https://www.favicon-generator.org/
```

### 2. تست PWA

```bash
# استفاده از Lighthouse
npx lighthouse https://yourusername.github.io --view

# یا استفاده از Chrome DevTools
# Application > Manifest
# Application > Service Workers
```

## 🔍 تست و بهینه‌سازی

### 1. تست عملکرد

```bash
# PageSpeed Insights
# https://pagespeed.web.dev/

# GTmetrix
# https://gtmetrix.com/

# WebPageTest
# https://www.webpagetest.org/
```

### 2. تست سئو

```bash
# Google Search Console
# https://search.google.com/search-console

# Bing Webmaster Tools
# https://www.bing.com/webmasters

# Schema Markup Validator
# https://validator.schema.org/
```

### 3. تست دسترس‌پذیری

```bash
# WAVE Web Accessibility Evaluator
# https://wave.webaim.org/

# axe DevTools
# https://www.deque.com/axe/devtools/

# Lighthouse Accessibility Audit
```

## 🚨 عیب‌یابی مشکلات رایج

### مشکل 1: سایت لود نمی‌شود

**راه‌حل:**
```bash
# بررسی فایل index.html در root directory
ls -la index.html

# بررسی محتوای فایل
head -10 index.html
```

### مشکل 2: CSS/JS لود نمی‌شود

**راه‌حل:**
```bash
# بررسی مسیر فایل‌ها
ls -la assets/css/style.css
ls -la assets/js/script.js

# بررسی لینک‌ها در HTML
grep -n "style.css" index.html
grep -n "script.js" index.html
```

### مشکل 3: تصاویر نمایش داده نمی‌شوند

**راه‌حل:**
```bash
# بررسی وجود تصاویر
ls -la assets/images/

# استفاده از placeholder images
# https://via.placeholder.com/300x300/6366f1/ffffff?text=Profile
```

### مشکل 4: Service Worker کار نمی‌کند

**راه‌حل:**
```bash
# بررسی فایل sw.js
ls -la sw.js

# بررسی registration در script.js
grep -n "serviceWorker" assets/js/script.js
```

## 📊 مانیتورینگ و آمار

### 1. Google Analytics

```html
<!-- در index.html قبل از </head> اضافه کنید -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Netlify Analytics

- در Netlify Dashboard > Site settings > Analytics
- "Enable Netlify Analytics" را فعال کنید

### 3. GitHub Pages Analytics

- در GitHub Repository > Insights > Traffic
- آمار بازدیدکنندگان و صفحات محبوب

## 🔄 به‌روزرسانی سایت

### 1. تغییر محتوا

```bash
# ویرایش فایل‌ها
# سپس:
git add .
git commit -m "Update content"
git push
```

### 2. تغییر طراحی

```bash
# ویرایش assets/css/style.css
# سپس:
git add assets/css/style.css
git commit -m "Update styling"
git push
```

### 3. اضافه کردن ویژگی جدید

```bash
# ایجاد branch جدید
git checkout -b feature/new-feature

# تغییرات را اعمال کنید
# سپس:
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Pull Request ایجاد کنید
```

## 📞 پشتیبانی

اگر در مراحل استقرار مشکلی داشتید:

1. **مستندات رسمی:**
   - [GitHub Pages Docs](https://docs.github.com/en/pages)
   - [Netlify Docs](https://docs.netlify.com/)
   - [Vercel Docs](https://vercel.com/docs)

2. **جامعه:**
   - [GitHub Community](https://github.community/)
   - [Netlify Community](https://community.netlify.com/)
   - [Stack Overflow](https://stackoverflow.com/)

3. **تماس مستقیم:**
   - ایمیل: mohammadrezaabedinpoor6@gmail.com
   - GitHub Issues: [ایجاد Issue](https://github.com/yourusername/resume-site/issues)

---

🎉 **تبریک!** سایت رزومه شما آماده است و در دسترس عموم قرار دارد.
