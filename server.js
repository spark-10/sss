const express = require('express');
const app = express();

const styles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    * { box-sizing: border-box; }
    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
    }

    /* الهيدر والملاحة */
    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 20px 8%; position: absolute; width: 100%; z-index: 1000;
    }
    .nav-links a { 
        color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s;
    }
    .nav-links a:hover { color: #d4af37; }
    .logo { font-size: 24px; font-weight: bold; color: #d4af37; display: flex; align-items: center; gap: 10px; }

    /* القسم الرئيسي (Hero Section) */
    .hero {
        height: 100vh;
        background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), 
                    url('https://images.wallpaperscraft.com/image/single/chevrolet_camaro_front_view_156230_1920x1080.jpg');
        background-size: cover; background-position: center;
        display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        padding: 0 20px;
    }
    .hero h1 { font-size: 50px; margin-bottom: 10px; color: #fff; }
    .hero p { font-size: 18px; color: rgba(255,255,255,0.8); max-width: 700px; margin-bottom: 30px; }
    
    .btn-discord {
        background: #d4af37; color: #000; padding: 12px 40px; border-radius: 5px;
        text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    }
    .btn-discord:hover { background: #fff; transform: translateY(-3px); }

    /* قسم المميزات (التجربة الفريدة) */
    .features-section { padding: 80px 8%; text-align: center; background: #0d0d0d; }
    .features-section h2 { font-size: 32px; margin-bottom: 40px; }
    .features-grid { 
        display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; 
    }
    .f-card {
        background: rgba(255,255,255,0.03); border: 1px solid rgba(212, 175, 55, 0.1);
        padding: 40px; border-radius: 10px; transition: 0.3s;
    }
    .f-card:hover { border-color: #d4af37; background: rgba(212, 175, 55, 0.05); transform: translateY(-10px); }
    .f-card i { font-size: 40px; color: #d4af37; margin-bottom: 20px; display: block; }
    .f-card h3 { margin-bottom: 15px; font-size: 22px; }
    .f-card p { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; }

    /* قسم القوانين (البطاقات الملونة) */
    .laws-section { padding: 80px 8%; background: #0b0b0b; }
    .laws-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .law-card {
        background: #151515; border-radius: 12px; padding: 25px; position: relative;
        overflow: hidden; cursor: pointer; transition: 0.3s; border: 1px solid #222;
        text-decoration: none; color: #fff; display: block;
    }
    .law-card:hover { transform: scale(1.02); background: #1a1a1a; }
    .law-icon { 
        width: 45px; height: 45px; border-radius: 8px; display: flex; 
        align-items: center; justify-content: center; font-size: 20px; margin-bottom: 15px;
    }
    .law-card h4 { margin: 0 0 8px 0; font-size: 18px; }
    .law-card p { margin: 0; font-size: 13px; color: #888; }

    /* ألوان أيقونات القوانين */
    .bg-blue { background: #3498db; }
    .bg-green { background: #2ecc71; }
    .bg-red { background: #e74c3c; }
    .bg-purple { background: #9b59b6; }
    .bg-orange { background: #f39c12; }

    footer { padding: 40px; text-align: center; border-top: 1px solid #222; color: #555; font-size: 14px; }
</style>
`;

const renderLayout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة سبارك - رول بلاي</title>
    ${styles}
</head>
<body>
    <nav class="navbar">
        <div class="logo">
            <img src="https://ragerg.com/assets/logo.png" width="40" alt="" onerror="this.style.display='none'"> 
            مقاطعة سبارك
        </div>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="#laws">القوانين</a>
            <a href="/trusted">الوظائف</a>
            <a href="#">متجر سبارك</a>
        </div>
    </nav>

    ${content}

    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

// الصفحة الرئيسية
app.get('/', (req, res) => {
    const homeContent = `
    <section class="hero">
        <h1>مرحباً بك في رول بلاي مقاطعة سبارك</h1>
        <p>انضم إلى مجتمعنا واستمتع بتجربة واقعية فريدة في مدينة افتراضية متكاملة الخدمات والأنظمة.</p>
        <a href="https://discord.gg/sp10" class="btn-discord">انضم الآن عبر Discord</a>
    </section>

    <section class="features-section">
        <p style="color: #d4af37; font-weight: bold; margin-bottom: 10px;">نحن نوفر لك أفضل تجربة</p>
        <h2>تجربتنا الفريدة</h2>
        <div class="features-grid">
            <div class="f-card">
                <i>💼</i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك والتجارة.</p>
            </div>
            <div class="f-card">
                <i>🛡️</i>
                <h3>نظام أمني متطور</h3>
                <p>قوانين واضحة وإدارة فاعلة تضمن لك بيئة لعب عادلة وممتعة للجميع.</p>
            </div>
            <div class="f-card">
                <i>👥</i>
                <h3>مجتمع نشط</h3>
                <p>انضم إلى مجتمع عربي متفاعل، كون صداقات جديدة وابدأ قصتك الخاصة.</p>
            </div>
        </div>
    </section>

    <section id="laws" class="laws-section">
        <h2 style="text-align: center; margin-bottom: 40px;">قوانين المقاطعة</h2>
        <div class="laws-grid">
            <a href="/safe" class="law-card">
                <div class="law-icon bg-blue">🛡️</div>
                <h4>قوانين السيرفر</h4>
                <p>القوانين العامة لمقاطعة سبارك</p>
            </a>
            <a href="/safe" class="law-card">
                <div class="law-icon bg-green">⚖️</div>
                <h4>قوانين مقاطعة سبارك العامة</h4>
                <p>القواعد الأساسية للعب في المقاطعة</p>
            </a>
            <a href="/safe" class="law-card">
                <div class="law-icon bg-purple">💰</div>
                <h4>قوانين اقتصادية وعقارية</h4>
                <p>قوانين التعاملات المالية والعقارات</p>
            </a>
            <a href="/safe" class="law-card">
                <div class="law-icon bg-orange">🚔</div>
                <h4>قوانين الأمن العام</h4>
                <p>قوانين وإجراءات رجال الأمن</p>
            </a>
            <a href="/safe" class="law-card">
                <div class="law-icon bg-red">🚗</div>
                <h4>قوانين المركبات</h4>
                <p>قوانين استخدام المركبات والقصص</p>
            </a>
        </div>
    </section>
    `;
    res.send(renderLayout(homeContent));
});

// صفحة القوانين الفرعية (مثال للمناطق الآمنة)
app.get('/safe', (req, res) => {
    const safeContent = `
    <div style="padding: 150px 8% 80px; max-width: 900px; margin: 0 auto;">
        <h1 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">المناطق الآمنة</h1>
        <ul style="list-style: none; padding: 0; margin-top: 30px;">
            <li style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 10px; border-right: 5px solid #3498db;">1 - المستشفيات ومراكز الشرطة وحرس الحدود</li>
            <li style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 10px; border-right: 5px solid #3498db;">2 - معرض المركبات والشاحنات</li>
            <li style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 10px; border-right: 5px solid #3498db;">3 - مناطق العمل القانونية ومركز التوظيف</li>
        </ul>
        <a href="/" style="display: inline-block; margin-top: 30px; color: #d4af37; text-decoration: none;">&larr; العودة للرئيسية</a>
    </div>
    `;
    res.send(renderLayout(safeContent));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Spark Web is Live!'); });
