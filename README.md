# رزومه آنلاین محمدرضا عابدین‌پور

یک وب‌سایت رزومه تک‌صفحه‌ای مدرن و ریسپانسیو با پشتیبانی کامل از زبان فارسی (RTL) و انگلیسی.

## ویژگی‌ها

### 🎨 طراحی و تجربه کاربری
- **مینیمال و تمیز**: طراحی مدرن با فاصله‌گذاری مناسب
- **ریسپانسیو**: Mobile-first design با سازگاری کامل با تمام دستگاه‌ها
- **تم تاریک**: حالت تاریک خودکار با تشخیص سیستم
- **انیمیشن‌های سبک**: افکت‌های fade/slide هنگام اسکرول
- **ناوبری ثابت**: منوی ثابت در بالا با اسکرول نرم

### 🌐 چندزبانه
- **زبان اصلی**: فارسی (RTL)
- **زبان دوم**: انگلیسی (LTR)
- **سوئیچر زبان**: تغییر آسان بین زبان‌ها
- **ترجمه طبیعی**: محتوای انگلیسی معادل طبیعی، نه ترجمه تحت‌اللفظی

### ♿ دسترس‌پذیری و سئو
- **استانداردهای A11y**: کنتراست مناسب، ARIA labels، ترتیب فوکوس
- **سئو بهینه**: Meta tags، Open Graph، Twitter Cards
- **ساختار هدینگ منطقی**: H1-H6 مناسب برای موتورهای جستجو
- **داده ساختاریافته**: Schema.org Person + Project
- **Sitemap و Robots**: فایل‌های SEO کامل

### 📱 PWA و عملکرد
- **Progressive Web App**: قابلیت نصب روی دستگاه‌ها
- **Service Worker**: کش هوشمند و عملکرد آفلاین
- **Manifest**: تنظیمات کامل PWA
- **بهینه‌سازی عملکرد**: Lazy loading، فشرده‌سازی

## ساختار پروژه

```
├── index.html              # صفحه اصلی
├── manifest.json           # تنظیمات PWA
├── sw.js                   # Service Worker
├── robots.txt              # فایل robots
├── sitemap.xml             # نقشه سایت
├── README.md               # مستندات
└── assets/
    ├── css/
    │   └── style.css       # استایل‌های اصلی
    ├── js/
    │   └── script.js       # اسکریپت‌های تعاملی
    ├── images/             # تصاویر و آیکون‌ها
    │   └── README.md       # راهنمای تصاویر
    └── resume.pdf          # رزومه PDF
```

## تکنولوژی‌های استفاده شده

- **HTML5**: ساختار معنایی و مدرن
- **CSS3**: Flexbox، Grid، Custom Properties، Animations
- **JavaScript (Vanilla)**: ES6+ بدون وابستگی خارجی
- **PWA**: Service Worker، Manifest، Offline Support
- **Fonts**: Vazirmatn (فارسی) + Inter (انگلیسی)

## نصب و راه‌اندازی

### 1. کلون کردن پروژه
```bash
git clone https://github.com/yourusername/resume-site.git
cd resume-site
```

### 2. ویرایش محتوا
فایل `index.html` را باز کرده و اطلاعات شخصی خود را جایگزین کنید:

```html
<!-- تغییر نام و اطلاعات شخصی -->
<h1>نام شما</h1>
<p>عنوان شغلی شما</p>

<!-- تغییر لینک‌های شبکه‌های اجتماعی -->
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourusername">LinkedIn</a>
```

### 3. اضافه کردن تصاویر
تصاویر مورد نیاز را در پوشه `assets/images/` قرار دهید:

- `profile.jpg` - عکس پروفایل
- `project1.jpg`, `project2.jpg`, `project3.jpg` - تصاویر پروژه‌ها
- آیکون‌های PWA در اندازه‌های مختلف

### 4. تست محلی
```bash
# استفاده از Python
python -m http.server 8000

# یا استفاده از Node.js
npx serve .

# یا استفاده از Live Server در VS Code
```

## استقرار (Deployment)

### GitHub Pages

1. **ایجاد ریپازیتوری**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

2. **فعال‌سازی GitHub Pages**
   - به تنظیمات ریپازیتوری بروید
   - بخش Pages را پیدا کنید
   - Source را روی "Deploy from a branch" تنظیم کنید
   - Branch را "main" انتخاب کنید
   - Save کنید

3. **دسترسی به سایت**
   - سایت شما در آدرس `https://yourusername.github.io` در دسترس خواهد بود

### Netlify

1. **آپلود مستقیم**
   - به [netlify.com](https://netlify.com) بروید
   - فایل‌ها را drag & drop کنید
   - سایت شما فوراً منتشر می‌شود

2. **اتصال به Git**
   - New site from Git
   - ریپازیتوری GitHub خود را انتخاب کنید
   - Build command: خالی بگذارید
   - Publish directory: `/` (root)
   - Deploy site

3. **تنظیمات اضافی**
   ```toml
   # netlify.toml
   [build]
     publish = "."
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
   ```

### Vercel

1. **نصب Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **استقرار**
   ```bash
   vercel
   ```

3. **اتصال به Git**
   - Import project از GitHub
   - Framework preset: Other
   - Build command: خالی
   - Output directory: `.`

## سفارشی‌سازی

### تغییر رنگ‌ها
در فایل `assets/css/style.css` متغیرهای CSS را ویرایش کنید:

```css
:root {
  --primary-color: #6366f1;    /* رنگ اصلی */
  --secondary-color: #8b5cf6;  /* رنگ ثانویه */
  --accent-color: #06b6d4;     /* رنگ تأکیدی */
}
```

### اضافه کردن سکشن جدید
1. HTML سکشن را در `index.html` اضافه کنید
2. استایل‌های مربوطه را در `style.css` تعریف کنید
3. لینک ناوبری را به منو اضافه کنید

### تغییر فونت‌ها
```css
:root {
  --font-primary: 'Your-Font-Name', sans-serif;
}
```

## بهینه‌سازی

### عملکرد
- تصاویر را فشرده کنید (TinyPNG، ImageOptim)
- از فرمت‌های مدرن استفاده کنید (WebP)
- CSS و JS را minify کنید

### سئو
- Meta descriptions را بهینه کنید
- Alt text تصاویر را کامل کنید
- Schema markup را بررسی کنید

### امنیت
- HTTPS را فعال کنید
- Headers امنیتی را اضافه کنید
- محتوای کاربر را sanitize کنید

## پشتیبانی مرورگرها

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE 11 (محدود)

## مشارکت

1. Fork کنید
2. Branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. فایل [LICENSE](LICENSE) را برای جزئیات بیشتر مطالعه کنید.

## تماس

- **ایمیل**: mohammadrezaabedinpoor6@gmail.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [محمدرضا عابدین‌پور](https://linkedin.com/in/yourusername)

## تشکر

از تمام کسانی که در ساخت این پروژه کمک کرده‌اند تشکر می‌کنم.

---

⭐ اگر این پروژه برای شما مفید بود، لطفاً ستاره بدهید!
