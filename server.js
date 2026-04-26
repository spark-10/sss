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
        padding: 15px 8%; position: absolute; width: 100%; z-index: 1000;
        background: rgba(0,0,0,0.5); backdrop-filter: blur(5px);
    }
    .nav-links a { 
        color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s;
    }
    .nav-links a:hover { color: #e74c3c; }
    .logo { font-size: 24px; font-weight: bold; color: #e74c3c; display: flex; align-items: center; gap: 10px; }

    /* القسم الرئيسي (Hero Section) مع خلفيتك الأصلية */
    .hero {
        height: 100vh;
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), 
                    url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center;
        display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        padding: 0 20px;
    }
    .hero h1 { font-size: 45px; margin-bottom: 10px; color: #fff; }
    .hero p { font-size: 17px; color: rgba(255,255,255,0.8); max-width: 650px; margin-bottom: 30px; }
    
    /* الأزرار المتحركة الاحترافية باللون الأحمر والأسود */
    .btn-main {
        padding: 12px 35px; border-radius: 50px; font-weight: bold; font-size: 18px;
        text-decoration: none; cursor: pointer; transition: 0.5s ease-in-out;
        background: linear-gradient(-45deg, #800000, #1a1a1a); /* أحمر غامق وأسود */
        background-size: 400% 400%;
        animation: gradientShift 3s ease infinite, pulse 2s infinite;
        color: white; display: inline-block; border: 2px solid #800000;
        box-shadow: 0 4px 15px rgba(128, 0, 0, 0.3);
    }
    .btn-main:hover {
        transform: translateY(-5px) scale(1.05);
        background: linear-gradient(-45deg, #1a1a1a, #e74c3c); /* يعكس أحمر فاتح وأسود */
        background-size: 400% 400%;
        box-shadow: 0 6px 20px rgba(231, 76, 60, 0.5); border-color: white;
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
        100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
    }

    /* قسم من نحن */
    .about-section { padding: 80px 8%; text-align: center; background: #080808; border-top: 1px solid #222; }
    .about-section h2 { font-size: 30px; color: #e74c3c; margin-bottom: 20px; }
    .about-section p { font-size: 16px; color: rgba(255,255,255,0.7); max-width: 750px; margin: 0 auto; line-height: 1.8; }

    /* قسم المميزات (التجربة الفريدة) */
    .features-section { padding: 80px 8%; text-align: center; background: #0d0d0d; border-top: 1px solid #222; }
    .features-section h2 { font-size: 30px; margin-bottom: 40px; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
    .f-card {
        background: rgba(255,255,255,0.03); border: 1px solid rgba(231, 76, 60, 0.1);
        padding: 40px; border-radius: 10px; transition: 0.3s;
    }
    .f-card:hover { border-color: #e74c3c; background: rgba(231, 76, 60, 0.05); transform: translateY(-10px); }
    .f-card i { font-size: 40px; color: #e74c3c; margin-bottom: 20px; display: block; }
    .f-card h3 { margin-bottom: 15px; font-size: 21px; }
    .f-card p { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; }

    footer { padding: 40px; text-align: center; border-top: 1px solid #222; color: #555; font-size: 14px; background: #080808; }
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
        <div class="logo">مقاطعة سبارك</div>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/safe">القوانين</a>
            <a href="/trusted">الوظائف</a>
            <a href="https://discord.gg/sp10" target="_blank">الدعم الفني</a>
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
        <h1>مرحباً بك في مقاطعة سبارك</h1>
        <p>انضم إلى مجتمعنا العربي واستمتع بتجربة رول بلاي واقعية، عادلة، وممتعة في مدينة افتراضية متكاملة الأنظمة.</p>
        <a href="https://discord.gg/sp10" class="btn-mainPulse btn-main">انضم الآن عبر Discord</a>
    </section>

    <section class="about-section">
        <h2>من نحن</h2>
        <p>نحن فريق شغوف بتقديم أفضل تجربة رول بلاي عربي. نهدف لبناء مجتمع متفاعل ومتكامل، حيث نضمن لك بيئة لعب نظيفة، أنظمة متطورة، ودعماً فنياً متواصلاً على مدار الساعة.</p>
    </section>

    <section class="features-section">
        <h2>تجربتنا الفريدة</h2>
        <div class="features-grid">
            <div class="f-card">
                <i>💼</i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين عشرات الوظائف الحكومية والخاصة الممتعة.</p>
            </div>
            <div class="f-card">
                <i>🛡️</i>
                <h3>نظام أمني متطور</h3>
                <p>قوانين واضحة وإدارة فاعلة تضمن عدالة اللعب للجميع.</p>
            </div>
            <div class="f-card">
                <i>👥</i>
                <h3>مجتمع نشط</h3>
                <p>انضم إلى آلاف اللاعبين، كون صداقات وابدأ قصتك الخاصة.</p>
            </div>
        </div>
    </section>
    `;
    res.send(renderLayout(homeContent));
});

// صفحة القوانين الفرعية (مثال للمناطق الآمنة)
app.get('/safe', (req, res) => {
    const safeContent = `
    <div style="padding: 150px 8% 80px; max-width: 900px; margin: 0 auto;">
        <h1 style="color: #e74c3c; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">المناطق الآمنة</h1>
        <ul style="list-style: none; padding: 0; margin-top: 30px;">
            <li style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 10px; border-right: 5px solid #e74c3c;">1 - المستشفيات ومراكز الشرطة وحرس الحدود</li>
            <li style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 10px; border-right: 5px solid #e74c3c;">2 - معرض المركبات والشاحنات</li>
            <li style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 10px; border-right: 5px solid #e74c3c;">3 - مناطق العمل القانونية ومركز التوظيف</li>
        </ul>
        <a href="/" style="display: inline-block; margin-top: 30px; color: #e74c3c; text-decoration: none;">&larr; العودة للرئيسية</a>
    </div>
    `;
    res.send(renderLayout(safeContent));
});

// صفحة الوظائف (مثال)
app.get('/trusted', (req, res) => {
    const trustedContent = `
    <div style="padding: 150px 8% 80px; max-width: 900px; margin: 0 auto;">
        <h1 style="color: #e74c3c; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">الوظائف الحكومية</h1>
        <p style="color: #aaa; margin-top: 20px;">هنا سيتم عرض قائمة الوظائف وشروط التقدم لها قريباً.</p>
        <a href="/" style="display: inline-block; margin-top: 30px; color: #e74c3c; text-decoration: none;">&larr; العودة للرئيسية</a>
    </div>
    `;
    res.send(renderLayout(trustedContent));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Spark Web is Live! Full & Impressive!'); });
