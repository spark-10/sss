const express = require('express');
const app = express();

const styles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    body { margin: 0; padding: 0; font-family: 'Cairo', sans-serif; color: white; direction: rtl; overflow-x: hidden; background-color: #000; }
    
    .banner { 
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background-size: cover; 
        background-position: center; 
        background-attachment: fixed; 
        background-repeat: no-repeat;
        z-index: -1; 
        filter: brightness(0.5); 
    }

    .navbar { background: rgba(0, 0, 0, 0.85); padding: 10px 0; text-align: center; position: sticky; top: 0; backdrop-filter: blur(10px); border-bottom: 3px solid #e74c3c; z-index: 100; display: flex; justify-content: center; flex-wrap: wrap; }
    .navbar a { color: white; text-decoration: none; margin: 5px 12px; font-weight: bold; font-size: 14px; transition: 0.3s; padding: 6px 12px; border-radius: 5px; border: 1px solid transparent; }
    .navbar a:hover { background: #e74c3c; border-color: white; }
    
    .container { background: rgba(0, 0, 0, 0.8); max-width: 1000px; margin: 30px auto; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #333; }
    h1 { border-bottom: 2px solid #e74c3c; padding-bottom: 10px; color: #e74c3c; text-align: center; font-size: 28px; }
    h2 { color: #e74c3c; margin-top: 25px; border-right: 5px solid #e74c3c; padding-right: 15px; font-size: 22px; }
    h3 { color: #f1c40f; margin-top: 20px; font-size: 20px; border-bottom: 1px dashed #f1c40f; display: inline-block; padding-bottom: 5px; }
    
    .law-list { list-style: none; padding: 0; margin-top: 15px; }
    .law-list li { margin-bottom: 10px; font-size: 16px; line-height: 1.7; background: rgba(255,255,255,0.05); padding: 12px 18px; border-radius: 8px; border-right: 4px solid #e74c3c; transition: 0.2s; }
    .law-list li:hover { background: rgba(231, 76, 60, 0.1); transform: scale(1.01); }
    
    .info-box { background: rgba(231, 76, 60, 0.1); border: 1px solid #e74c3c; padding: 15px; border-radius: 10px; margin: 15px 0; font-style: italic; color: #fce4e4; }
    
    .footer-section { text-align: center; margin-top: 40px; padding-bottom: 20px; border-top: 1px solid #333; padding-top: 20px; }
    .server-invite { display: inline-block; background: #e74c3c; color: white; padding: 12px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; transition: 0.3s; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3); }
    .server-invite:hover { transform: translateY(-3px); background: #ff5e4d; box-shadow: 0 6px 20px rgba(231, 76, 60, 0.5); }
    
    .copyright-text { display: inline-block; margin-top: 25px; font-size: 16px; font-weight: bold; background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow 5s ease infinite; }
    @keyframes rainbow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
</style>
`;

const bgImage = 'https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&';

const renderPage = (title, content) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - مقاطعة سبارك</title>
    ${styles}
</head>
<body>
    <div class="banner" style="background-image: url('${bgImage}');"></div>
    <nav class="navbar">
        <a href="/">القوانين العامة</a>
        <a href="/chat">قوانين الجريدة</a>
        <a href="/chase">المطاردات والقيادة</a>
        <a href="/safe">المناطق الآمنة</a>
        <a href="/trusted">اللاعب المعتمد</a>
        <a href="/trusted-apply">شروط الرتب والقبول</a>
    </nav>
    <div class="container">
        <h1>${title}</h1>
        ${content}
        <div class="footer-section">
            <a href="https://discord.gg/sp10" class="server-invite" target="_blank">دخول مقاطعة سبارك</a>
            <br>
            <span class="copyright-text">جميع الحقوق محفوظة لمقاطعة سبارك</span>
        </div>
    </div>
</body>
</html>
`;

// القوانين العامة
app.get('/', (req, res) => {
    const content = `
        <h2>القوانين الأساسية</h2>
        <ul class="law-list">
            <li>استخدام المركبة كسلاح ودهس اللاعبين (VDM)</li>
            <li>استخدام السلاح بشكل عشوائي و القتل بدون سبب (RDM)</li>
            <li>1 - يجب ان يكون اسمك في الهويه اسم اول و ثاني واقعي</li>
            <li>2-يمنع طلب المطاردة من العساكر او الترصد لقتلهم</li>
            <li>3- يمنع التواصل الغير شرعي (ميتارينغ) عقوبتها سجن 60 شهر</li>
            <li>4 - عدم الترصد للمواطنين عن طريق البث المباشر</li>
            <li>5 - يمنع السب و القذف و الشتم بجميع انواعة</li>
            <li>6 - يمنع التحدث في الراديو في حال كنت مقيد او تغوص تحت الماء</li>
            <li>7-يمنع الترصد للوظائف الحكومية لقتلهم ويجب ان يكون هناك سبب</li>
            <li>8-في حال قمت بتهديد شخص لطلب مبلغ مالي يجب ان لا يزيد عن 15الف</li>
            <li>9-يمنع سرقة جميع مركبات الوظائف المعتمدة</li>
            <li>10-يحق للرهينة الهروب في حال كان المجرم على غفله</li>
            <li>11-الاحترام المتبادل بين الجميع والالتزام بالتمثيل الواقعي</li>
            <li>12- يمنع المقاومه بعد الانعاش مباشرة</li>
            <li>13-يمنع اطلاق النار بوجود الهلال الاحمر</li>
            <li>14-يمنع تهديد او خطف موظفين الهلال الاحمر و كراج الميكانيكي</li>
            <li>15- يمنع الركوب بالشنطه في حال انك مواطن او مجرم</li>
            <li>16- يجب تقدير حياتك وحياة الاخرين (عدم تقدير الحياة = حظر 7 أيام)</li>
        </ul>`;
    res.send(renderPage('القوانين العامة', content));
});

// اللاعب المعتمد
app.get('/trusted', (req, res) => {
    const content = `
        <div class="info-box">
            <strong>تعريف اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز في الوظيفة المنتدب إليها مع الحفاظ على الرتب والترقيات الخاصة بكل وظيفة والتغيير بين الوظائف بشكل دوري ومستمر.
        </div>
        <h2>قوانين اللاعب المعتمد</h2>
        <ul class="law-list">
            <li>1. حسن السمعة ولبق في تعاملك وأسلوبك مع اللاعبين.</li>
            <li>2. التقديم على وظيفتين معتمدتين على الأقل والتغيير بينهما بشكل دوري والحرص على تطوير نفسك ومساندة زملائك.</li>
            <li>3. مساعدة اللاعبين في الديسكورد بشكل عام.</li>
            <li>4. التمثيل بشكل جيد والالتزام بالتمثيل الواقعي الخاص بمقاطعة سبارك.</li>
            <li>5. مساندة الوظائف المعتمدة الأخرى عند الضرورة.</li>
        </ul>
        <div class="info-box" style="border-color: #f1c40f; color: #f1c40f;">
            ملاحظة: يحق لإدارة الرقابة والتفتيش سحب الاعتماد في حال مخالفة القوانين، ويجب التدرج في رتب الوظيفة المنتدب إليها.
        </div>`;
    res.send(renderPage('قوانين اللاعب المعتمد', content));
});

// شروط القبول والرتب
app.get('/trusted-apply', (req, res) => {
    const content = `
        <h2>🟢 شروط القبول في اللاعب المعتمد 🟢</h2>
        <ul class="law-list">
            <li>1. عدم وجود مخالفات رقابية في آخر 30 يوم.</li>
            <li>2. أن يكون المتقدم متفرغاً لمهام اللاعب المعتمد بشكل عام.</li>
            <li>3. يجب على المتقدم أن يتواجد في وظيفة معتمدة فعلياً.</li>
            <li>4. في حال الإعفاء، يمنع التقديم مجدداً إلا بعد 60 يوم.</li>
            <li>5. السمعة الطيبة في الوظيفة وخلو السجل من المخالفات الوظيفية.</li>
            <li>6. مساعدة اللاعبين في روم الاستفسارات والمساعدة.</li>
            <li>7. الرتبة المطلوبة للوظائف العلمية: مستوى 6.</li>
            <li>8. الرتبة المطلوبة للوظائف العسكرية: ملازم.</li>
            <li>9. خبرة المتقدم 36 فما فوق.</li>
            <li>10. السجل الرقابي يجب أن يكون خالياً تماماً.</li>
            <li>11. التقيد بالانتداب الأسبوعي لجميع الوظائف (مدة من يوم إلى 7 أيام).</li>
            <li>12. يمنع أن تكون لاعباً معتمداً أو إدارياً في مدن أخرى.</li>
            <li>13. يحق للمسؤول الإعفاء الفوري في حال مخالفة أي بند.</li>
        </ul>

        <h2>رتب اللاعب المعتمد</h2>
        
        <h3>1- رتبة [CP]</h3>
        <p>يجب أن تكون موظفاً حكومياً بحسن سير وسلوك، ويبدأ التقديم بعد وصولك للرتب التالية:</p>
        <ul class="law-list">
            <li>الشرطة / أمن المنشآت: رتبة رقيب أول أو أعلى.</li>
            <li>الهلال الأحمر: مستوى 4 وأعلى.</li>
            <li>المميزات: التنقل بين القطاعات بعد إذن القائد وتوثيقه في الروم المخصص.</li>
        </ul>

        <h3>2- رتبة [CR]</h3>
        <p>يتم الترشيح من الإدارة ومسؤول اللاعب المعتمد (الأولوية للستريمر وأصحاب السمعة الحسنة).</p>
        <ul class="law-list">
            <li>يعتبر مشرفاً على اللاعبين المعتمدين الأحدث منه.</li>
            <li>التنقل بين القطاعات بحرية لسد النقص بدون إذن مسبق.</li>
            <li>لا يمكن أخذ رتبة مواطن إلا بإجازة رسمية (2-3 أيام).</li>
        </ul>

        <h3>3- رتبة [CA]</h3>
        <p>يتم الترشيح من قبل الإدارة ومسؤول اللاعب المعتمد.</p>
        <ul class="law-list">
            <li>مشرف عام على المعتمدين الأحدث.</li>
            <li>حرية كاملة في التنقل لسد الاحتياج في أي قطاع فوراً.</li>
            <li>توجد مميزات ومكافآت مجزية ونادرة تُمنح من الإدارة.</li>
        </ul>`;
    res.send(renderPage('شروط قبول اللاعب المعتمد', content));
});

// المسارات الأخرى (الجريدة، المطاردات، المناطق الآمنة)
app.get('/chat', (req, res) => {
    const content = `<h2>قوانين الجريدة [شات اللعبة]</h2><ul class="law-list"><li>1- يمنع منعا باتا الكتابة في الجريدة / الشات إلا للتمثيل</li><li>2- الشات مخصص للرسائل المهمة</li><li>3- تويتر للإعلانات فقط</li></ul>`;
    res.send(renderPage('قوانين الجريدة', content));
});

app.get('/chase', (req, res) => {
    const content = `<h2>قوانين المطاردات</h2><ul class="law-list"><li>1 - يمنع دخول المنزل أثناء المطاردة</li><li>2 - يمنع تخزين المركبة</li><li>3 - يمنع الصدم الغير واقعي</li></ul>`;
    res.send(renderPage('المطاردات والقيادة', content));
});

app.get('/safe', (req, res) => {
    const content = `<h2>المناطق الآمنة</h2><ul class="law-list"><li>1 - المستشفيات ومراكز الشرطة</li><li>2 - معرض المركبات</li><li>3 - مناطق العمل القانونية</li></ul>`;
    res.send(renderPage('المناطق الآمنة', content));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Spark Server Ready!'); });
