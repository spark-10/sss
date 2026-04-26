const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
    
    * { box-sizing: border-box; scroll-behavior: smooth; }
    
    /* تعديل شريط التمرير (Scrollbar) */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0b0b0b; }
    ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #b5952f; }

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
    .logo { font-size: 26px; font-weight: 900; color: #d4af37; text-decoration: none; text-shadow: 0 0 10px rgba(212,175,55,0.5); }

    .content-area { padding: 40px 8%; }
    
    /* تنسيقات الصفحة الرئيسية */
    .hero { height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
    .hero h1 { font-size: 60px; margin-bottom: 15px; color: #d4af37; font-weight: 900; text-shadow: 0 0 30px rgba(212,175,55,0.4); }
    .hero p { font-size: 20px; margin-bottom: 30px; color: #eee; }
    .hero-btns { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .btn-main { padding: 15px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; transition: 0.3s; min-width: 220px; text-align: center; }
    .btn-discord { background: #5865F2; color: #fff; border: 2px solid #5865F2; }
    .btn-discord:hover { background: transparent; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(88, 101, 242, 0.4); }
    .btn-cfx-main { background: #d4af37; color: #000; border: 2px solid #d4af37; }
    .btn-cfx-main:hover { background: transparent; color: #d4af37; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4); }

    /* تنسيقات صفحة القوانين (مطابقة للصورة) */
    .rules-header { text-align: center; margin-bottom: 50px; margin-top: 20px; }
    .rules-header h1 { font-size: 45px; color: #d4af37; font-weight: 900; margin-bottom: 10px; }
    .rules-header p { font-size: 18px; color: #ccc; }

    .rules-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 25px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .rule-card {
        background: rgba(22, 18, 15, 0.85); /* لون مقارب للصورة */
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        padding: 30px;
        text-align: right;
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .rule-card:hover { 
        transform: translateY(-5px); 
        border-color: rgba(212, 175, 55, 0.5);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }

    .icon-box {
        width: 55px; height: 55px;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        font-size: 24px; color: #fff;
        margin-bottom: 20px;
        float: right; /* لجعل الأيقونة في اليمين */
        margin-left: 20px; /* مسافة بين الأيقونة والنص إذا كان بجانبها، لكننا سنضعها بالأعلى يميناً */
    }

    .rule-card .card-content { clear: both; padding-top: 10px; }
    .rule-card h3 { font-size: 22px; color: #fff; margin: 0 0 10px 0; font-weight: 700; }
    .rule-card p { font-size: 15px; color: #999; margin: 0; line-height: 1.6; }

    /* تنسيقات النافذة المنبثقة (Modal) للقوانين */
    .modal {
        display: none; position: fixed; z-index: 2000; left: 0; top: 0; 
        width: 100%; height: 100%; background-color: rgba(0,0,0,0.85); 
        backdrop-filter: blur(8px); overflow: hidden;
    }
    .modal-content {
        background-color: #111; margin: 5% auto; padding: 40px; 
        border: 1px solid #d4af37; border-radius: 15px; 
        width: 90%; max-width: 900px; max-height: 85vh; 
        overflow-y: auto; text-align: right; position: relative;
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
    }
    .close-btn { 
        color: #fff; position: absolute; left: 30px; top: 30px; 
        font-size: 30px; font-weight: bold; cursor: pointer; transition: 0.3s; 
    }
    .close-btn:hover { color: #dc3545; transform: scale(1.1); }

    /* تنسيق النصوص داخل الـ Modal */
    .modal-content h2 { color: #d4af37; font-size: 30px; border-bottom: 2px solid #333; padding-bottom: 15px; margin-top: 0; }
    .modal-content h3 { color: #fff; margin-top: 30px; font-size: 22px; }
    .modal-content p.def { font-size: 18px; background: rgba(212,175,55,0.1); padding: 15px; border-right: 4px solid #d4af37; border-radius: 5px; color: #eee;}
    .rules-list { list-style: none; padding: 0; }
    .rules-list li { background: rgba(255,255,255,0.03); margin: 10px 0; padding: 15px; border-radius: 8px; border-right: 3px solid #555; transition: 0.2s; color: #ccc;}
    .rules-list li:hover { border-right-color: #d4af37; background: rgba(255,255,255,0.06); color: #fff; }
    .rank-box { background: rgba(25,25,25,0.8); border: 1px solid #333; padding: 20px; margin: 20px 0; border-radius: 10px; }
    .rank-box h4 { color: #d4af37; margin-top: 0; font-size: 20px; }
    .rank-box ul { padding-right: 20px; color: #ccc; }
    .rank-box ul li { margin-bottom: 8px; }

    footer { padding: 30px; text-align: center; background: rgba(10,10,10,0.95); border-top: 1px solid #222; color: #555; margin-top: 50px; }
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
        function openModal(id) {
            document.getElementById(id).style.display = "block";
            document.body.style.overflow = "hidden"; // منع التمرير في الخلفية
        }
        function closeModal(id) {
            document.getElementById(id).style.display = "none";
            document.body.style.overflow = "auto"; // إعادة التمرير للخلفية
        }
        // إغلاق النافذة عند الضغط خارجها
        window.onclick = function(event) {
            let modals = document.getElementsByClassName('modal');
            for(let i = 0; i < modals.length; i++) {
                if (event.target == modals[i]) {
                    modals[i].style.display = "none";
                    document.body.style.overflow = "auto";
                }
            }
        }
    </script>
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
    </div>
    <footer>جميع الحقوق محفوظة لمقاطعة سبارك &copy; 2026</footer>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(layout(`
        <section class="hero">
            <h1>مقاطعة سبارك</h1>
            <p>انطلق في رحلة واقعية لا تنتهي داخل عالمنا</p>
            <div class="hero-btns">
                <a href="https://discord.gg/sp10" class="btn-main btn-discord" target="_blank"><i class="fa-brands fa-discord"></i> انضم إلى الديسكورد</a>
                <a href="fivem://connect/cfx.re/join/p9bd35" class="btn-main btn-cfx-main"><i class="fa-solid fa-gamepad"></i> الدخول إلى المقاطعة</a>
            </div>
        </section>
    `));
});

app.get('/jobs', (req, res) => res.send(layout(`<div class="rules-header"><h1>الوظائف المتاحة</h1><p>جار العمل على تحديث الصفحة.</p></div>`)));
app.get('/store', (req, res) => res.send(layout(`<div class="rules-header"><h1>متجر المقاطعة</h1><p>جار العمل على تحديث الصفحة.</p></div>`)));

// صفحة القوانين المحدثة بالتصميم المطلوب
app.get('/rules', (req, res) => {
    res.send(layout(`
        <div class="rules-header">
            <h1>قوانين مقاطعة سبارك</h1>
            <p>اطلع على جميع القوانين والأنظمة المعمول بها في السيرفر</p>
        </div>

        <div class="rules-grid">
            <div class="rule-card" onclick="alert('سيتم إضافة هذه القوانين لاحقاً')">
                <div class="icon-box" style="background-color: #dc3545;"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="card-content">
                    <h3>قوانين السيرفر</h3>
                    <p>القوانين العامة لسيرفر مقاطعة سبارك</p>
                </div>
            </div>

            <div class="rule-card" onclick="alert('سيتم إضافة هذه القوانين لاحقاً')">
                <div class="icon-box" style="background-color: #0d6efd;"><i class="fa-solid fa-file-lines"></i></div>
                <div class="card-content">
                    <h3>قوانين مقاطعة سبارك العامة</h3>
                    <p>القواعد الأساسية للعب في المقاطعة</p>
                </div>
            </div>

            <div class="rule-card" onclick="alert('سيتم إضافة هذه القوانين لاحقاً')">
                <div class="icon-box" style="background-color: #198754;"><i class="fa-solid fa-dollar-sign"></i></div>
                <div class="card-content">
                    <h3>قوانين إقتصادية وعقارية</h3>
                    <p>قوانين التعاملات المالية والعقارات</p>
                </div>
            </div>

            <div class="rule-card" onclick="alert('سيتم إضافة هذه القوانين لاحقاً')">
                <div class="icon-box" style="background-color: #6610f2;"><i class="fa-brands fa-discord"></i></div>
                <div class="card-content">
                    <h3>قوانين الديسكورد</h3>
                    <p>قوانين التواصل عبر Discord</p>
                </div>
            </div>

            <div class="rule-card" onclick="alert('سيتم إضافة هذه القوانين لاحقاً')">
                <div class="icon-box" style="background-color: #0dcaf0;"><i class="fa-solid fa-building-shield"></i></div>
                <div class="card-content">
                    <h3>قوانين الأمن العام</h3>
                    <p>قوانين وإجراءات رجال الأمن</p>
                </div>
            </div>

            <div class="rule-card" onclick="openModal('certified-player-modal')" style="border: 1px solid rgba(212,175,55,0.3);">
                <div class="icon-box" style="background-color: #d4af37;"><i class="fa-solid fa-user-check"></i></div>
                <div class="card-content">
                    <h3 style="color: #d4af37;">قوانين لاعب معتمد</h3>
                    <p>الشروط والقوانين الخاصة بالحصول على رتب الاعتماد والتنقل الوظيفي</p>
                </div>
            </div>
        </div>

        <div id="certified-player-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('certified-player-modal')">&times;</span>
                <h2><i class="fa-solid fa-user-check" style="margin-left: 10px;"></i> قوانين اللاعب المعتمد</h2>
                
                <p class="def"><strong>اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز في الوظيفة المنتدب إليها مع الحفاظ على الرتب والترقيات الخاصة بكل وظيفة والتغيير بين الوظائف بشكل دوري ومستمر.</p>
                
                <h3>القوانين العامة للاعب المعتمد</h3>
                <ul class="rules-list">
                    <li>1. حسن السمعة ولبق في تعاملك وأسلوبك مع اللاعبين.</li>
                    <li>2. التقديم على وظيفتين معتمدة على الأقل والتغيير بينهم بشكل دوري والحرص على تطوير نفسك ومساندة زملائك في الوظيفة سواء كانت أساسية أو انتداب.</li>
                    <li>3. مساعدة اللاعبين في الديسكورد بشكل عام.</li>
                    <li>4. التمثيل بشكل جيد والالتزام في التمثيل الخاص في المدينة.</li>
                    <li>5. مساندة الوظائف المعتمدة الأخرى عند الضرورة.</li>
                </ul>

                <h3>🟢 شروط القبول في اللاعب المعتمد 🟢</h3>
                <ul class="rules-list">
                    <li>1. عدم وجود مخالفات رقابية في أخر 30 يوم.</li>
                    <li>2. أن يكون المتقدم متفرغ لمهام اللاعب المعتمد بشكل عام.</li>
                    <li>3. يجب على المتقدم أن يتواجد في وظيفة معتمدة.</li>
                    <li>4. في حال تم إعفاؤك من مهام اللاعب المعتمد يمنع دخولك إلا بعد 60 يوم من تاريخ خروجك.</li>
                    <li>5. السمعة الطيبة في الوظيفة وعدم وجود أي مخالفة وظيفية.</li>
                    <li>6. مساعدة اللاعبين في روم #الاستفسار-والمساعدة.</li>
                    <li>7. الرتبة المسموحة للوظائف العلمية (مستوى 6).</li>
                    <li>8. الرتبة المسموحة للوظائف العسكرية (ملازم).</li>
                    <li>9. أن تكون خبرة المتقدم 36 فما فوق.</li>
                    <li>10. أن يكون المتقدم خالي من المخالفات أو السجلات الرقابية.</li>
                    <li>11. يجب التقيد بالانتداب بشكل أسبوعي لجميع الوظائف، المدة المسموحة تبدأ من يوم إلى ٧ أيام.</li>
                    <li>12. يمنع منعاً باتاً أثناء التقدم أو في حال امتلاك الاعتماد أن تكون لاعب معتمد أو من طاقم إداري في مدن أخرى.</li>
                    <li>13. يحق لمسؤول اللاعب المعتمد إعفاء أي لاعب في حال خالف أي بند يخص اللاعب المعتمد.</li>
                    <li>14. في حال تم إغلاق التذكرة يعتبر الطلب تحت المعالجة، وفي حال عدم القبول يعني أنك لم تكمل أحد الشروط.</li>
                </ul>

                <h3>ملاحظات هامة</h3>
                <ul class="rules-list" style="border-right-color: #dc3545;">
                    <li>يحق لإدارة الرقابة والتفتيش سحب الاعتماد بحال مخالفة قوانين المدينة أو مخالفة قوانين الوظائف المعتمدة.</li>
                    <li>يجب عليك التدرج في رتب الوظيفة المنتدب إليها.</li>
                    <li>يتم قبول ورفض الانتداب من قبل مسؤول اللاعب المعتمد.</li>
                </ul>

                <h3>شروط قبول اللاعب المعتمد حسب الرتب</h3>
                <p style="color: #ccc;">اللاعب المعتمد ينقسم إلى 3 رتب ولكل رتبة شروط وقوانين معينة:</p>

                <div class="rank-box">
                    <h4>1- رتبة [CP]</h4>
                    <p>يشترط للتقديم على اللاعب المعتمد والحصول على رتبة [CP] أن تكون موظفاً حكومياً ويُعرف عنك بحسن التعامل والسلوك بين اللاعبين. ويبدأ التقديم بعد وصولك إلى إحدى الرتب التالية بالقطاعات:</p>
                    <ul>
                        <li>الشرطة: رتبة رقيب أول أو أعلى.</li>
                        <li>أمن المنشآت: رتبة رقيب أول أو أعلى.</li>
                        <li>الهلال الأحمر: مستوى 4 وأعلى.</li>
                    </ul>
                    <p>وبهذه الرتبة، يسمح لك بالتوظف ببقية القطاعات الحكومية والتنقل بينهم بعد طلب الإذن والسماح لك من قبل قائد قطاعك الأساسي وتوثيق الموافقة بالروم المخصص، ويجب أن يكون مرة واحدة على الأقل كل أسبوع.</p>
                </div>

                <div class="rank-box">
                    <h4>2- رتبة [CR]</h4>
                    <p>يتم الترشيح لهذه الرتبة من قبل الإدارة ومسؤول اللاعب المعتمد، والأولوية للستريمر وأصحاب السمعة الحسنة داخل المقاطعة.</p>
                    <p>يعتبر حامل هذه الرتبة مشرفاً على اللاعبين المعتمدين الأحدث منه. يسمح لحامل هذه الرتبة بالتنقل بين القطاعات الحكومية بحرية أو حسب الاحتياج عند وجود نقص بالعدد وبدون إذن مسبق، لكن لا يمكنك أخذ رتبة مواطن إلا بعد أخذ إجازة رسمية من القائد أو النائب ويتم الموافقة عليها، ومن ثم تعتبر إجازة داخلية يومين إلى ثلاث.</p>
                    <p style="color: #ff9800; font-size: 14px; margin-top: 10px;">* ملاحظة: استكمالك لجميع الشروط أعلاه لا يعني ضمان قبولك. يكون القبول بعد استيفاء جميع الشروط من قبل مسؤول اللاعب المعتمد والإدارة. توجد مميزات ومكافآت مجزية ونادرة تُمنح ولا تُطلب. في حال يوجد نقص في قطاع إجباري تتوجه بأسرع وقت.</p>
                </div>

                <div class="rank-box">
                    <h4>3- رتبة [CA]</h4>
                    <p>يتم الترشيح لهذه الرتبة من قبل الإدارة ومسؤول اللاعب المعتمد، والأولوية للستريمر وأصحاب السمعة الحسنة داخل المقاطعة.</p>
                    <p>يعتبر حامل هذه الرتبة مشرفاً على اللاعبين المعتمدين الأحدث منه. يسمح لحامل هذه الرتبة بالتنقل بين القطاعات الحكومية بحرية أو حسب الاحتياج عند وجود نقص بالعدد وبدون إذن مسبق.</p>
                    <p style="color: #ff9800; font-size: 14px; margin-top: 10px;">* ملاحظة: استكمالك لجميع الشروط أعلاه لا يعني ضمان قبولك. يكون القبول بعد استيفاء جميع الشروط من قبل مسؤول اللاعب المعتمد والإدارة. توجد مميزات ومكافآت مجزية ونادرة تُمنح ولا تُطلب.</p>
                </div>
            </div>
        </div>
    `));
});

app.listen(3000, () => console.log('Spark Web Updated!'));
