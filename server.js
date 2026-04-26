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

    .navbar { 
        display: flex; justify-content: space-between; align-items: center;
        padding: 15px 8%; position: sticky; top: 0; width: 100%; z-index: 1000;
        background: rgba(10,10,10,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; font-size: 15px; transition: 0.3s; }
    .nav-links a:hover { color: #d4af37; }
    .logo { font-size: 24px; font-weight: bold; color: #d4af37; text-decoration: none; }

    .content-area { padding: 60px 8%; text-align: center; }
    .hero { height: 45vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
    .hero h1 { font-size: 48px; margin-bottom: 10px; color: #d4af37; text-shadow: 0 0 20px rgba(212,175,55,0.3); }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0; }
    .card {
        background: rgba(20, 20, 20, 0.85); border: 1px solid rgba(212, 175, 55, 0.15);
        padding: 35px; border-radius: 15px; transition: 0.3s;
    }
    .card:hover { border-color: #d4af37; transform: translateY(-10px); background: rgba(30, 30, 30, 0.95); }
    .card i { font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block; }

    /* أزرار سبارك الفول */
    .btn-gold {
        background: #d4af37; color: #000; padding: 14px 40px; border-radius: 8px;
        text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-block; cursor: pointer;
    }
    .btn-gold:hover { background: #fff; transform: scale(1.05); box-shadow: 0 0 20px rgba(212, 175, 55, 0.5); }

    .btn-cfx {
        background: linear-gradient(90deg, #d4af37, #b8860b); color: #000; padding: 18px 50px; 
        border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 20px;
        transition: 0.3s; display: inline-block; border: none; box-shadow: 0 5px 15px rgba(212,175,55,0.4);
    }
    .btn-cfx:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(212,175,55,0.6); filter: brightness(1.1); }

    /* قسم انضم الآن CFX */
    .join-section {
        background: rgba(0, 0, 0, 0.8); border: 2px solid #d4af37;
        padding: 60px 20px; border-radius: 20px; margin: 60px auto; max-width: 1000px;
        box-shadow: 0 0 30px rgba(212,175,55,0.1);
    }
    .join-section h2 { font-size: 38px; color: #fff; margin-bottom: 15px; }
    .join-section span { color: #d4af37; }

    footer { padding: 40px; text-align: center; background: rgba(10,10,10,0.95); border-top: 1px solid #222; color: #777; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة سبارك | الرول بلاي العربي</title>
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
            <p style="color: #ccc; margin-bottom: 35px; font-size: 18px;">اضغط على الزر أدناه ليتم توجيهك مباشرة لداخل المدينة عبر FiveM</p>
            <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-cfx">تشغيل اللعبة ودخول المدينة</a>
            <div style="margin-top: 20px;">
                <a href="https://discord.gg/sp10" style="color: #d4af37; text-decoration: none; font-weight: bold;">أو انضم لمجتمعنا على الديسكورد</a>
            </div>
        </section>
    </div>
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(layout(`
        <section class="hero">
            <h1>مقاطعة سبارك</h1>
            <p>حيث تبدأ قصتك الواقعية الأكثر إثارة</p>
        </section>
        
        <div style="background: rgba(20,20,20,0.8); padding: 40px; border-radius: 15px; border: 1px solid rgba(212,175,55,0.2); max-width: 900px; margin: 0 auto;">
            <h2 style="color: #d4af37;">من نحن</h2>
            <p style="line-height: 1.9; font-size: 18px; color: #eee;">نحن في مقاطعة سبارك نقدم بيئة رول بلاي احترافية تعتمد على الواقعية الكاملة، مع أنظمة برمجية حصرية وإدارة تسهر على راحتكم لضمان أفضل تجربة لعب.</p>
        </div>

        <h2 style="margin-top: 80px; font-size: 32px;">لماذا تختار سبارك؟</h2>
        <div class="grid">
            <div class="card"><i>🛡️</i><h3>بيئة آمنة</h3><p>قوانين صارمة ورقابة إدارية لضمان جودة التمثيل والعدالة.</p></div>
            <div class="card"><i>🏎️</i><h3>سيارات حصرية</h3><p>أسطول من السيارات الواقعية والمعدلة خصيصاً لسكان المدينة.</p></div>
            <div class="card"><i>🏙️</i><h3>أنظمة فريدة</h3><p>سكربتات حصرية ومميزات تجعل من حياتك الافتراضية متعة حقيقية.</p></div>
        </div>
    `));
});

// صفحات الوظائف والمتجر والقوانين
app.get('/jobs', (req, res) => res.send(layout(`<h1 style="color: #d4af37;">الوظائف المتاحة</h1><div class="grid"><div class="card"><i>🚔</i><h3>الشرطة</h3><p>حماية أمن سبارك.</p></div><div class="card"><i>🚑</i><h3>الإسعاف</h3><p>إنقاذ الأرواح.</p></div><div class="card"><i>🔧</i><h3>الميكانيك</h3><p>تعديل المركبات.</p></div></div>`)));
app.get('/store', (req, res) => res.send(layout(`<h1 style="color: #d4af37;">متجر سبارك</h1><div class="grid"><div class="card"><i>💎</i><h3>عضويات VIP</h3><p>مميزات رهيبة.</p></div><div class="card"><i>🚗</i><h3>سيارات خاصة</h3><p>مركبات فريدة.</p></div></div>`)));
app.get('/rules', (req, res) => res.send(layout(`<h1 style="color: #d4af37;">القوانين</h1><div class="card" style="max-width: 700px; margin: 20px auto; text-align: right;"><p>• الاحترام المتبادل.</p><p>• الالتزام بالرول بلاي.</p><p>• منع الغش تماماً.</p></div>`)));

app.listen(3000, () => console.log('Spark Web is LIVE on CFX Mode!'));
