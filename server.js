const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
    
    * { box-sizing: border-box; scroll-behavior: smooth; }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0b0b0b; }
    ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }

    body { 
        margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: #fff; direction: rtl; 
        background-color: #0b0b0b; overflow-x: hidden;
        background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.95)), 
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
    .logo { font-size: 26px; font-weight: 900; color: #d4af37; text-decoration: none; }

    .content-area { padding: 40px 8%; text-align: center; }
    
    /* التصميم العام للبطاقات والصفحات */
    .info-container { max-width: 1000px; margin: 0 auto; text-align: right; }
    .page-title { font-size: 45px; color: #d4af37; font-weight: 900; margin-bottom: 40px; text-align: center; }

    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }

    .card-dark { background: rgba(20, 20, 20, 0.85); border: 1px solid rgba(212, 175, 55, 0.2); padding: 40px; border-radius: 15px; margin-bottom: 30px; }
    
    .section-h { color: #d4af37; border-right: 4px solid #d4af37; padding-right: 15px; margin-top: 35px; font-size: 24px; }
    .list-items { list-style: none; padding: 0; }
    .list-items li { background: rgba(255,255,255,0.03); margin: 12px 0; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.8; color: #ddd; }

    .alert-box { background: rgba(212,175,55,0.1); padding: 20px; border: 1px dashed #d4af37; border-radius: 10px; color: #eee; margin: 20px 0; }
    .ticket-btn { background: #d4af37; color: #000; padding: 10px 25px; border-radius: 5px; font-weight: bold; text-decoration: none; display: inline-block; margin-top: 15px; }

    /* Modal */
    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px); }
    .modal-content { background: #0f0f0f; margin: 2% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 900px; max-height: 90vh; overflow-y: auto; text-align: right; position: relative; }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 25px; font-size: 35px; cursor: pointer; }

    footer { padding: 30px; text-align: center; color: #555; border-top: 1px solid #222; margin-top: 50px; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مقاطعة سبارك</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    ${STYLES}
    <script>
        function openModal(id) { document.getElementById(id).style.display = "block"; document.body.style.overflow = "hidden"; }
        function closeModal(id) { document.getElementById(id).style.display = "none"; document.body.style.overflow = "auto"; }
    </script>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">مقاطعة سبارك</a>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/rules">القوانين</a>
            <a href="/creators" style="color: #d4af37;">صناع المحتوى</a>
            <a href="/jobs">الوظائف</a>
            <a href="/store">المتجر</a>
        </div>
    </nav>
    <div class="content-area">${content}</div>
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

// --- الصفحة الرئيسية ---
app.get('/', (req, res) => {
    res.send(layout(`
        <section style="height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1 style="font-size: 60px; color: #d4af37; font-weight: 900;">مقاطعة سبارك</h1>
            <p>انطلق في رحلة واقعية لا تنتهي داخل عالمنا</p>
            <div>
                <a href="https://discord.gg/sp10" class="btn-main btn-discord"><i class="fa-brands fa-discord"></i> الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-gamepad"></i> دخول السيرفر</a>
            </div>
        </section>

        <div class="card-dark" style="max-width: 900px; margin: 40px auto; text-align: center;">
            <h2 style="color: #d4af37;">عن مقاطعة سبارك</h2>
            <p style="line-height: 1.9; font-size: 18px; color: #eee;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </div>

        <h2 style="margin-top: 60px; text-align: center;">تجربتنا الفريدة</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0;">
            <div class="card-dark" style="text-align: center;">
                <i class="fa-solid fa-briefcase" style="font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك والتجارة.</p>
            </div>
            <div class="card-dark" style="text-align: center;">
                <i class="fa-solid fa-shield-halved" style="font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <h3>نظام العساكر المتطور</h3>
                <p>لدينا نظام عسكري متطور من المركبات والمراكز الحكومية والملابس الحصرية.</p>
            </div>
            <div class="card-dark" style="text-align: center;">
                <i class="fa-solid fa-users" style="font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <h3>مجتمع نشط</h3>
                <p>انضم إلى مجتمع عربي متفاعل ومتواجد مع طاقم إدارة متفاعل.</p>
            </div>
        </div>

        <div style="margin-top: 50px; text-align: center;">
            <a href="/rules" class="btn-main" style="border: 2px solid #d4af37; color: #d4af37;">
                <i class="fa-solid fa-book-open"></i> الانتقال إلى القوانين
            </a>
        </div>
    `));
});

// --- صفحة القوانين (فقط لاعب معتمد) ---
app.get('/rules', (req, res) => {
    res.send(layout(`
        <h1 class="page-title">قوانين مقاطعة سبارك</h1>
        <div style="display: flex; justify-content: center;">
            <div class="card-dark" style="width: 450px; cursor: pointer; text-align: right; display: flex; align-items: center;" onclick="openModal('certified-modal')">
                <div style="width: 60px; height: 60px; background: #d4af37; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-left: 20px; flex-shrink: 0;"><i class="fa-solid fa-user-check"></i></div>
                <div>
                    <h3 style="margin: 0;">قوانين لاعب معتمد</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">اضغط للاطلاع على شروط ورتب الاعتماد</p>
                </div>
            </div>
        </div>

        <div id="certified-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('certified-modal')">&times;</span>
                <h2><i class="fa-solid fa-user-check"></i> قوانين اللاعب المعتمد</h2>
                <div class="alert-box"><strong>اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز مع الحفاظ على رتبه.</div>
                <h3 class="section-h">القواعد الأساسية</h3>
                <ul class="list-items">
                    <li>1. حسن السمعة واللباقة في التعامل.</li>
                    <li>2. التقديم على وظيفتين على الأقل والتنقل بينهما.</li>
                    <li>3. التمثيل الواقعي الجيد ومساعدة اللاعبين.</li>
                </ul>
                <h3 class="section-h">شروط القبول</h3>
                <ul class="list-items">
                    <li>خلو السجل الرقابي (30 يوم)، الخبرة 36+، رتبة ملازم أو مستوى 6 كحد أدنى.</li>
                </ul>
            </div>
        </div>
    `));
});

// --- صفحة صناع المحتوى (الصفحة الجديدة) ---
app.get('/creators', (req, res) => {
    res.send(layout(`
        <div class="info-container">
            <h1 class="page-title">صناع المحتوى</h1>
            
            <div class="card-dark">
                <h2 style="color: #d4af37; text-align: center;">شروط التقديم على صانع محتوى داخل مقاطعة سبارك</h2>
                <p style="line-height: 1.8; text-align: center; color: #ccc;">
                    تحرص إدارة مقاطعة سبارك على دعم صنّاع المحتوى وتوفير بيئة ملائمة تساعدهم على تقديم محتوى احترافي ومميز داخل السيرفر مع الحفاظ على قوانين المقاطعة واحترام سير الحياة الواقعية داخل اللعبة.
                </p>

                <h3 class="section-h">الامتيازات الممنوحة</h3>
                <ul class="list-items">
                    <li><i class="fa-solid fa-check-circle" style="color:#d4af37;"></i> يُعفى صانع المحتوى من استلام العمليات في جميع القطاعات الحكومية خلال فترات التصوير فقط.</li>
                    <li><i class="fa-solid fa-check-circle" style="color:#d4af37;"></i> الدخول المؤقت إلى مناطق مقفلة (الاستنفارات أو السيناريوهات الكبيرة) بعد التنسيق مع الإدارة.</li>
                    <li><i class="fa-solid fa-check-circle" style="color:#d4af37;"></i> دعم فني مباشر لحل أي مشاكل تقنية قد تواجه صانع المحتوى خلال فترة التصوير.</li>
                </ul>

                <h3 class="section-h">الضوابط والاستثناءات</h3>
                <ul class="list-items">
                    <li><i class="fa-solid fa-triangle-exclamation" style="color:#ff9800;"></i> جميع الامتيازات مخصصة للتصوير فقط، ويُمنع استغلالها للعب الشخصي.</li>
                    <li><i class="fa-solid fa-triangle-exclamation" style="color:#ff9800;"></i> يُمنع التدخل في الأحداث الجارية إذا لم يكن الشخص طرفاً رسمياً فيها.</li>
                    <li><i class="fa-solid fa-triangle-exclamation" style="color:#ff9800;"></i> يُمنع تبادل الأموال أو الممتلكات باستخدام صلاحيات صانع المحتوى.</li>
                    <li><i class="fa-solid fa-triangle-exclamation" style="color:#ff9800;"></i> التنسيق المسبق ضروري عند التصوير في المناطق الحساسة.</li>
                    <li><i class="fa-solid fa-triangle-exclamation" style="color:#ff9800;"></i> يجب أن يكون المحتوى المنشور محترماً وخالياً من الإساءات والسخرية.</li>
                </ul>

                <h3 class="section-h">شروط القبول كصانع محتوى</h3>
                <ul class="list-items">
                    <li>1. التقديم عبر فتح تذكرة مع إرفاق روابط الحسابات أو القنوات.</li>
                    <li>2. يُشترط أن يكون المحتوى المقدم ملتزماً بالأخلاقيات العامة وذو طابع احترافي.</li>
                    <li>3. بعد الموافقة، يتم جدولة موعد للمقابلة الشخصية من قبل الإدارة.</li>
                    <li>4. تُمنح الامتيازات لفترة تجريبية قابلة للتجديد أو الإلغاء.</li>
                    <li>5. الإدارة تحتفظ بحق سحب الامتيازات في حال إساءة الاستخدام.</li>
                </ul>

                <div class="alert-box" style="border-color: #ff4444; color: #ffcccc;">
                    <strong>تنويه:</strong> هذه الامتيازات لا تعني أبداً أنك فوق القوانين. احترام الجميع والتعاون شرط أساسي للاستمرار. يجب عليك مراجعة القوانين بشكل صحيح.
                </div>

                <div class="alert-box">
                    <strong>ملاحظة مهمة:</strong> إذا كنت ترغب بالحصول على امتيازات أكبر ودعم موسّع، فعليك تقديم محتوى احترافي يليق باسم سيرفر (مقاطعة سبارك) ويعكس جودة عالية.
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 20px; font-weight: bold;">للتقديم يرجى فتح تذكرة</p>
                    <a href="https://discord.gg/sp10" class="btn-main btn-discord">انتقل للديسكورد لفتح تذكرة</a>
                </div>
            </div>
        </div>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1 class="page-title">الوظائف</h1><div class="card-dark" style="text-align:center;">قريباً...</div>`)));
app.get('/store', (req, res) => res.send(layout(`<h1 class="page-title">المتجر</h1><div class="card-dark" style="text-align:center;">قريباً...</div>`)));

app.listen(3000, () => console.log('Spark Web Started!'));
