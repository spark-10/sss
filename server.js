const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    * { box-sizing: border-box; scroll-behavior: smooth; }
    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
        background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), 
                    url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&');
        background-size: cover; background-position: center; background-attachment: fixed;
    }

    /* الهيدر */
    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 15px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    .logo { font-size: 24px; font-weight: bold; color: #d4af37; text-decoration: none; }

    /* الأقسام العامة */
    .content-area { padding: 60px 8%; text-align: center; }
    
    /* الهيرو */
    .hero { height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
    .hero h1 { font-size: 48px; margin-bottom: 10px; color: #d4af37; }

    /* البطاقات */
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0; }
    .card {
        background: rgba(20, 20, 20, 0.85); border: 1px solid rgba(212, 175, 55, 0.15);
        padding: 35px; border-radius: 15px; transition: 0.3s; text-align: center;
    }
    .card:hover { border-color: #d4af37; transform: translateY(-10px); background: rgba(30, 30, 30, 0.95); }
    .card i { font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block; }
    .card h3 { color: #fff; margin-bottom: 12px; font-size: 22px; }
    .card p { color: #aaa; font-size: 15px; line-height: 1.6; }

    /* أزرار سبارك */
    .btn-gold {
        background: #d4af37; color: #000; padding: 14px 40px; border-radius: 8px;
        text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-block;
    }
    .btn-gold:hover { background: #fff; transform: scale(1.05); box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }

    /* قسم انضم الآن المطور */
    .join-section {
        background: rgba(10, 10, 10, 0.9); border: 2px solid #d4af37;
        padding: 50px; border-radius: 20px; margin: 60px 0; text-align: center;
    }
    .join-section h2 { font-size: 35px; color: #fff; margin-bottom: 20px; }
    .join-section span { color: #d4af37; }

    footer { padding: 40px; text-align: center; background: rgba(10,10,10,0.95); border-top: 1px solid #222; color: #777; font-size: 14px; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة سبارك</title>
    ${STYLES}
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">مقاطعة سبارك</a>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/rules">القوانين</a>
            <a href="/jobs">الوظائف</a>
            <a href="/store">المتجر</a>
        </div>
    </nav>
    <div class="content-area">
        ${content}
        
        <section class="join-section">
            <h2>انضم الآن إلى <span>مقاطعة سبارك</span></h2>
            <p style="color: #ccc; margin-bottom: 30px;">ابدأ رحلتك اليوم في أكبر تجمع رول بلاي واقعي</p>
            <a href="https://discord.gg/sp10" class="btn-gold" target="_blank">دخول السيرفر (Discord)</a>
        </section>
    </div>
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send(layout(`
        <section class="hero">
            <h1>مقاطعة سبارك</h1>
            <p>التميز.. الواقعية.. والاحترافية</p>
        </section>
        
        <div style="background: rgba(20,20,20,0.7); padding: 40px; border-radius: 15px; border: 1px solid rgba(212,175,55,0.2);">
            <h2 style="color: #d4af37;">من نحن</h2>
            <p style="line-height: 1.8; font-size: 18px;">نحن في مقاطعة سبارك نسعى لتقديم تجربة لعب فريدة من نوعها، نجمع بين الواقعية المطلقة والترفيه اللامحدود تحت إدارة عربية محترفة.</p>
        </div>

        <h2 style="margin-top: 60px;">تجربتنا الفريدة</h2>
        <div class="grid">
            <div class="card"><i>🛡️</i><h3>حماية قوية</h3><p>أنظمة حماية متطورة لضمان لعب عادل لجميع سكان سبارك.</p></div>
            <div class="card"><i>🚀</i><h3>أداء عالي</h3><p>سيرفراتنا تعمل بأحدث التقنيات لضمان عدم وجود "لاق".</p></div>
            <div class="card"><i>💎</i><h3>حصريات</h3><p>سيارات وأنظمة برمجية خاصة بسبارك لن تجدها في مكان آخر.</p></div>
        </div>
        <a href="/rules" class="btn-gold" style="background: transparent; color: #d4af37; border: 2px solid #d4af37;">اطلع على القوانين</a>
    `));
});

// صفحة الوظائف
app.get('/jobs', (req, res) => {
    res.send(layout(`
        <h1 style="color: #d4af37;">الوظائف المتاحة</h1>
        <p>اختر مسارك المهني في مقاطعة سبارك</p>
        <div class="grid">
            <div class="card"><i>🚔</i><h3>وزارة الداخلية</h3><p>انضم لحماية المدينة وفرض القانون.</p></div>
            <div class="card"><i>🚑</i><h3>وزارة الصحة</h3><p>كن المنقذ وسارع لتقديم المساعدة الطبية.</p></div>
            <div class="card"><i>🛠️</i><h3>الميكانيك</h3><p>قم بصيانة وتعديل أفخم السيارات في المدينة.</p></div>
            <div class="card"><i>🏗️</i><h3>الأعمال الحرة</h3><p>من التجارة إلى المقاولات، ابنِ ثروتك الخاصة.</p></div>
        </div>
    `));
});

// صفحة المتجر
app.get('/store', (req, res) => {
    res.send(layout(`
        <h1 style="color: #d4af37;">متجر سبارك</h1>
        <p>احصل على مميزات حصرية لدعم تجربتك</p>
        <div class="grid">
            <div class="card"><i>🚗</i><h3>سيارات VIP</h3><p>مجموعة من السيارات النادرة والسريعة جداً.</p></div>
            <div class="card"><i>🏠</i><h3>عقارات فاخرة</h3><p>قصور وشقق بتصاميم داخلية خرافية.</p></div>
            <div class="card"><i>✨</i><h3>رتب خاصة</h3><p>رتب ديسكورد ومميزات داخل اللعبة للمانحين.</p></div>
        </div>
        <p style="color: #888;">* جميع المشتريات تذهب لدعم تطوير السيرفر</p>
    `));
});

// صفحة القوانين
app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 style="color: #d4af37;">قوانين المدينة</h1>
        <div class="card" style="max-width: 800px; margin: 40px auto; text-align: right;">
            <p>1. يمنع منعا باتاً الخروج عن الرول بلاي.</p>
            <p>2. الاحترام المتبادل بين جميع اللاعبين والإدارة.</p>
            <p>3. يمنع استخدام أي ثغرات أو برامج غش.</p>
            <p>4. الالتزام بقوانين المناطق الآمنة والمطاردات.</p>
        </div>
    `));
});

app.listen(3000, () => console.log('Spark Web is FULL & Ready!'));
