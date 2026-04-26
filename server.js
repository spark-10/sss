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
    
    .hero { height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .hero h1 { font-size: 60px; margin-bottom: 15px; color: #d4af37; font-weight: 900; text-shadow: 0 0 20px rgba(212,175,55,0.3); }
    
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; display: inline-block; cursor: pointer; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; margin: 10px; }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; margin: 10px; }
    .btn-cfx-main:hover { background: transparent; color: #d4af37; }

    .about-box {
        background: rgba(20, 20, 20, 0.85); border: 1px solid rgba(212, 175, 55, 0.2);
        padding: 40px; border-radius: 15px; margin: 40px auto; max-width: 950px; text-align: center;
    }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 40px 0; }
    .card {
        background: rgba(25, 25, 25, 0.85); border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 35px; border-radius: 15px; transition: 0.3s; text-align: center;
    }
    .card i { font-size: 45px; color: #d4af37; margin-bottom: 20px; display: block; }

    /* قوانين السيرفر (Cards Grid) */
    .rules-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px; }
    .rule-card {
        background: rgba(22, 18, 15, 0.95); border: 1px solid rgba(212, 175, 55, 0.4);
        border-radius: 15px; padding: 25px; text-align: right; width: 400px;
        cursor: pointer; transition: 0.3s; display: flex; align-items: center;
    }
    .rule-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(212, 175, 55, 0.1); border-color: #d4af37; }
    .icon-box { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #fff; margin-left: 20px; flex-shrink: 0; }

    /* Modal Styling */
    .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.92); backdrop-filter: blur(10px); }
    .modal-content { background: #0f0f0f; margin: 2% auto; padding: 40px; border: 1px solid #d4af37; border-radius: 15px; width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto; text-align: right; position: relative; box-shadow: 0 0 40px rgba(0,0,0,1); }
    .close-btn { color: #fff; position: absolute; left: 30px; top: 25px; font-size: 35px; cursor: pointer; transition: 0.3s; z-index: 10; }
    .close-btn:hover { color: #d4af37; }
    
    .modal-content h2 { font-size: 32px; border-bottom: 2px solid #222; padding-bottom: 15px; margin-bottom: 25px; color: #d4af37; }
    .modal-content h3 { color: #d4af37; margin-top: 35px; border-right: 4px solid #d4af37; padding-right: 15px; font-size: 22px; }
    
    .rules-list { list-style: none; padding: 0; margin: 20px 0; }
    .rules-list li { background: rgba(255,255,255,0.02); margin: 10px 0; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); line-height: 1.7; color: #ddd; }
    
    .note-box { color: #ffab00; background: rgba(255, 171, 0, 0.1); padding: 20px; border-radius: 10px; font-size: 15px; margin-top: 20px; border: 1px dashed #ffab00; line-height: 1.8; }
    .highlight-box { background: rgba(212,175,55,0.1); padding: 20px; border-right: 5px solid #d4af37; border-radius: 8px; margin-bottom: 25px; font-size: 17px; line-height: 1.8; }

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
        window.onclick = function(event) { if (event.target.className === 'modal') closeModal(event.target.id); }
    </script>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">مقاطعة سبارك</a>
        <div class="nav-links">
            <a href="/">الرئيسية</a>
            <a href="/rules">القوانين</a>
            <a href="/rules?open=creators">صناع المحتوى</a>
            <a href="/jobs">الوظائف</a>
            <a href="/store">المتجر</a>
        </div>
    </nav>
    <div class="content-area">${content}</div>
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(layout(`
        <section class="hero">
            <h1>مقاطعة سبارك</h1>
            <p>انطلق في رحلة واقعية لا تنتهي داخل عالمنا</p>
            <div>
                <a href="https://discord.gg/sp10" class="btn-main btn-discord"><i class="fa-brands fa-discord"></i> الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-gamepad"></i> دخول السيرفر</a>
            </div>
        </section>

        <section class="about-box">
            <h2 style="color: #d4af37;">عن مقاطعة سبارك</h2>
            <p style="line-height: 1.9; font-size: 18px; color: #eee;">نحن نقدم تجربة رول بلاي فريدة من نوعها، تجمع بين الواقعية والاحترافية. سيرفر سبارك مبني على سكربتات حصرية وإدارة واعية لضمان أفضل بيئة لعب ممكنة.</p>
        </section>

        <h2 style="margin-top: 60px;">تجربتنا الفريدة</h2>
        <div class="grid">
            <div class="card">
                <i class="fa-solid fa-briefcase"></i>
                <h3>وظائف متنوعة</h3>
                <p>اختر من بين وظائف حكومية وخاصة، من الشرطة والإسعاف إلى الميكانيك والتجارة.</p>
            </div>
            <div class="card">
                <i class="fa-solid fa-shield-halved"></i>
                <h3>نظام العساكر المتطور</h3>
                <p>لدينا نظام عسكري متطور من المركبات والمراكز الحكومية والملابس الحصرية.</p>
            </div>
            <div class="card">
                <i class="fa-solid fa-users"></i>
                <h3>مجتمع نشط</h3>
                <p>انضم إلى مجتمع عربي متفاعل ومتواجد مع طاقم إدارة متفاعل.</p>
            </div>
        </div>

        <div style="margin-top: 50px;">
            <a href="/rules" class="btn-main btn-cfx-main" style="width: 350px; background: rgba(212,175,55,0.1); color: #d4af37;">
                <i class="fa-solid fa-book-open"></i> الانتقال إلى القوانين
            </a>
        </div>
    `));
});

app.get('/rules', (req, res) => {
    res.send(layout(`
        <div style="text-align: center; margin-bottom: 50px;">
            <h1 style="font-size: 45px; color: #d4af37; font-weight: 900;">قوانين مقاطعة سبارك</h1>
            <p style="color: #ccc;">اختر الفئة للاطلاع على القوانين والأنظمة الخاصة بها</p>
        </div>

        <div class="rules-grid">
            <div class="rule-card" onclick="openModal('certified-player-modal')">
                <div class="icon-box" style="background-color: #d4af37;"><i class="fa-solid fa-user-check"></i></div>
                <div>
                    <h3 style="color: #fff; margin: 0; font-size: 22px;">قوانين لاعب معتمد</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">نظام الرتب والانتداب الوظيفي</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('creators-modal')">
                <div class="icon-box" style="background-color: #e91e63;"><i class="fa-solid fa-video"></i></div>
                <div>
                    <h3 style="color: #fff; margin: 0; font-size: 22px;">صناع المحتوى</h3>
                    <p style="color: #999; font-size: 14px; margin-top: 5px;">شروط التقديم والامتيازات الممنوحة</p>
                </div>
            </div>
        </div>

        <div id="certified-player-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('certified-player-modal')">&times;</span>
                <h2>قوانين اللاعب المعتمد</h2>
                <div class="highlight-box">
                    <strong>اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز في الوظيفة المنتدب إليها مع الحفاظ على الرتب والترقيات الخاصة بكل وظيفة.
                </div>
                <h3>القواعد الأساسية</h3>
                <ul class="rules-list">
                    <li>1. حسن السمعة واللباقة في التعامل مع اللاعبين.</li>
                    <li>2. التقديم على وظيفتين معتمدة على الأقل والتغير بينهم دورياً.</li>
                    <li>3. مساعدة اللاعبين في الديسكورد والتمثيل الواقعي الجيد.</li>
                    <li>4. مساندة الوظائف الأخرى عند الضرورة.</li>
                </ul>
                <h3>🟢 شروط القبول</h3>
                <ul class="rules-list">
                    <li>- خلو السجل الرقابي لآخر 30 يوم والخبرة 36+.</li>
                    <li>- الرتبة الدنيا: مستوى 6 (علمية) أو ملازم (عسكرية).</li>
                    <li>- يمنع الاعتماد في مدن أخرى نهائياً.</li>
                </ul>
            </div>
        </div>

        <div id="creators-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('creators-modal')">&times;</span>
                <h2>شروط التقديم على صانع محتوى</h2>
                
                <div class="highlight-box">
                    تحرص إدارة مقاطعة سبارك على دعم صنّاع المحتوى وتوفير بيئة ملائمة تساعدهم على تقديم محتوى احترافي ومميز مع الحفاظ على قوانين المقاطعة واحترام سير الحياة الواقعية.
                </div>

                <h3>🎁 الامتيازات الممنوحة</h3>
                <ul class="rules-list">
                    <li>- يُعفى صانع المحتوى من استلام العمليات في جميع القطاعات الحكومية <strong>خلال فترات التصوير فقط</strong>.</li>
                    <li>- الدخول المؤقت إلى مناطق مقفلة (استنفارات أو سيناريوهات كبيرة) بعد التنسيق مع الإدارة.</li>
                    <li>- دعم فني مباشر لحل أي مشاكل تقنية قد تواجه صانع المحتوى خلال فترة التصوير.</li>
                </ul>

                <h3>🚫 الضوابط والاستثناءات</h3>
                <ul class="rules-list">
                    <li>- جميع الامتيازات مخصصة للتصوير فقط، ويُمنع استغلالها لأغراض اللعب الشخصي.</li>
                    <li>- يُمنع التدخل في الأحداث الجارية إذا لم يكن الشخص طرفاً رسمياً فيها.</li>
                    <li>- يُمنع تبادل الأموال أو الممتلكات باستخدام صلاحيات صانع المحتوى.</li>
                    <li>- التنسيق المسبق عند التصوير في المناطق الحساسة (مراكز أمنية، مستشفيات).</li>
                    <li>- يجب أن يكون المحتوى المنشور محترماً وخالياً من الإساءات لأي جهة داخل السيرفر.</li>
                </ul>

                <h3>📝 شروط القبول</h3>
                <ul class="rules-list">
                    <li>- التقديم عبر فتح تذكرة مع إرفاق روابط الحسابات والقنوات.</li>
                    <li>- يُشترط أن يكون المحتوى ملتزماً بالأخلاقيات العامة وذو طابع احترافي.</li>
                    <li>- بعد الموافقة المبدئية، يتم جدولة موعد للمقابلة الشخصية من قبل الإدارة.</li>
                    <li>- تُمنح الامتيازات لفترة تجريبية قابلة للتجديد أو الإلغاء.</li>
                </ul>

                <div class="note-box">
                    <strong>تنويه هام:</strong> هذه الامتيازات لا تعني أبداً أن صانع المحتوى فوق القانون. احترام الجميع والتعاون شرط أساسي للاستمرار. إذا كنت ترغب بدعم أكبر، قدم محتوى يليق باسم (مقاطعة سبارك).
                    <br><br>
                    <center><strong>للتقديم يرجى فتح تذكرة</strong></center>
                </div>
            </div>
        </div>

        <script>
            // كود لفتح نافذة صناع المحتوى مباشرة إذا جاء الزائر من الرابط العلوي
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('open') === 'creators') {
                openModal('creators-modal');
            }
        </script>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<h1>الوظائف</h1><div class="about-box"><p>جار العمل على تحديث القائمة...</p></div>`)));
app.get('/store', (req, res) => res.send(layout(`<h1>المتجر</h1><div class="about-box"><p>المتجر سيفتح قريباً!</p></div>`)));

app.listen(3000, () => console.log('Spark Web Started!'));
