const express = require('express');
const app = express();

const styles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    
    body { 
        margin: 0; 
        padding: 0; 
        font-family: 'Cairo', sans-serif; 
        color: #fff; 
        direction: rtl; 
        overflow-x: hidden; 
        background: #0d0d0d url('https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png') no-repeat center center fixed;
        background-size: cover;
    }
    
    /* جعل الخلفية أغمق قليلاً لتوضيح البطاقات */
    body::before {
        content: "";
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: -1;
    }

    .navbar { 
        background: rgba(0, 0, 0, 0.85); 
        padding: 15px 0; 
        text-align: center; 
        position: sticky; 
        top: 0; 
        backdrop-filter: blur(10px); 
        border-bottom: 2px solid #e74c3c; 
        z-index: 100; 
        display: flex; 
        justify-content: center; 
        flex-wrap: wrap; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }
    .navbar a { 
        color: rgba(255,255,255,0.7); 
        text-decoration: none; 
        margin: 5px 15px; 
        font-weight: bold; 
        font-size: 16px; 
        transition: 0.3s; 
        padding: 8px 15px; 
        border-radius: 8px; 
    }
    .navbar a:hover, .navbar a.active { 
        color: #fff; 
        background: rgba(231, 76, 60, 0.15); 
    }

    .container { 
        max-width: 1100px; 
        margin: 50px auto; 
        padding: 0 20px; 
        padding-bottom: 50px;
    }
    
    /* تنسيق شبكة البطاقات (Grid) */
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-top: 40px;
    }
    
    /* تنسيق البطاقة الفردية */
    .card {
        background: rgba(25, 25, 25, 0.9);
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        transition: 0.3s ease;
        border: 1px solid rgba(255,255,255,0.05);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    /* تأثير التحويم فوق البطاقة */
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(231, 76, 60, 0.2);
        border-color: rgba(231, 76, 60, 0.3);
    }
    
    /* تنسيق الأيقونة الملونة داخل البطاقة */
    .card-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #fff;
    }
    
    /* الألوان المختلفة للأيقونات */
    .icon-safe { background: #16a085; } /* اخضر لوسايس - المناطق الآمنة */
    .icon-trusted { background: #8e44ad; } /* بنفسجي - اللاعب المعتمد */
    .icon-rules { background: #3498db; } /* ازرق - القوانين العامة */
    .icon-chase { background: #d35400; } /* برتقالي - المطاردات */
    .icon-journal { background: #2c3e50; } /* رمادي غامق - الجريدة */
    .icon-apply { background: #c0392b; } /* احمر - شروط القبول */

    .card h3 { 
        margin: 0; 
        font-size: 20px; 
        color: #fff; 
        margin-bottom: 10px;
    }
    
    .card p { 
        margin: 0; 
        font-size: 14px; 
        color: rgba(255,255,255,0.6); 
        line-height: 1.6;
    }
    
    .footer-section { 
        text-align: center; 
        margin-top: 60px; 
        padding-top: 30px; 
        border-top: 1px solid rgba(255,255,255,0.05);
    }
    
    .footer-buttons { 
        display: flex; 
        justify-content: center; 
        gap: 15px; 
        flex-wrap: wrap; 
        margin-bottom: 20px; 
    }
    
    .server-invite { 
        display: inline-block; 
        background: #e74c3c; 
        color: white; 
        padding: 12px 30px; 
        text-decoration: none; 
        border-radius: 50px; 
        font-weight: bold; 
        font-size: 16px; 
        transition: 0.3s; 
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3); 
    }
    .server-invite:hover { transform: translateY(-3px); background: #ff5e4d; }
    
    .fivem-invite { 
        display: inline-block; 
        background: #f39c12; 
        color: white; 
        padding: 12px 30px; 
        text-decoration: none; 
        border-radius: 50px; 
        font-weight: bold; 
        font-size: 16px; 
        transition: 0.3s; 
        box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3); 
    }
    .fivem-invite:hover { transform: translateY(-3px); background: #f1c40f; }
    
    .copyright-text { 
        font-size: 14px; 
        color: rgba(255,255,255,0.4); 
    }
    
</style>
`;

const bgImage = 'https://cdn.discordapp.com/attachments/1478519443968753695/1478522145469370570/fca6a48587bf24ac.png?ex=69ee940d&is=69ed428d&hm=2011367125827fa11fa218fce0611a2626d1676fb461a6d241c4f54fae62e715&';

const renderPage = (title, content, activePage) => `
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - مقاطعة سبارك</title>
    ${styles}
</head>
<body>
    <nav class="navbar">
        <a href="/" class="${activePage === 'index' ? 'active' : ''}">الرئيسية</a>
        <a href="/safe" class="${activePage === 'safe' ? 'active' : ''}">المناطق الآمنة</a>
        <a href="/trusted" class="${activePage === 'trusted' ? 'active' : ''}">اللاعب المعتمد</a>
        <a href="/trusted-apply" class="${activePage === 'trustedApply' ? 'active' : ''}">شروط القبول والرتب</a>
    </nav>
    <div class="container">
        <h1>${title} - مقاطعة سبارك</h1>
        ${content}
        <div class="footer-section">
            <div class="footer-buttons">
                <a href="fivem://connect/cfx.re/join/p9bd35" class="fivem-invite">دخول المدينة</a>
                <a href="https://discord.gg/sp10" class="server-invite" target="_blank">ديسكورد مقاطعة سبارك</a>
            </div>
            <span class="copyright-text">جميع الحقوق محفوظة لمقاطعة سبارك</span>
        </div>
    </div>
</body>
</html>
`;

// الصفحة الرئيسية (شبكة البطاقات)
app.get('/', (req, res) => {
    const content = `
        <p style="text-align:center; color: rgba(255,255,255,0.7); margin-bottom: 40px;">اطلع على جميع القوانين والأنظمة المعمول بها في السيرفر.</p>
        <div class="cards-grid">
            <div class="card" onclick="window.location.href='/safe'">
                <div class="card-icon icon-safe">🛡️</div>
                <h3>المناطق الآمنة</h3>
                <p>القواعد الأساسية والأماكن التي يمنع فيها أي عمل غير قانوني.</p>
            </div>
            
            <div class="card" onclick="window.location.href='/trusted'">
                <div class="card-icon icon-trusted">🤝</div>
                <h3>اللاعب المعتمد</h3>
                <p>قوانين ومهام اللاعبين الحاصلين على صفة "معتمد".</p>
            </div>
            
            <div class="card" onclick="window.location.href='/trusted-apply'">
                <div class="card-icon icon-apply">📋</div>
                <h3>شروط قبول المعتمد</h3>
                <p>المتطلبات، الرتب، وكيفية التقديم للحصول على الاعتماد.</p>
            </div>
            
            <div class="card">
                <div class="card-icon icon-rules">📜</div>
                <h3>القوانين العامة</h3>
                <p>قريباً - القواعد الأساسية للعب والتمثيل داخل المدينة.</p>
            </div>
        </div>
    `;
    res.send(renderPage('الرئيسية', content, 'index'));
});

// اللاعب المعتمد
app.get('/trusted', (req, res) => {
    const content = `
        <div class="info-box">
            <strong>تعريف اللاعب المعتمد:</strong> هو لاعب يحق له الانتداب في أكثر من وظيفة لسد العجز في الوظيفة المنتدب إليها مع الحفاظ على الرتب والترقيات الخاصة بكل وظيفة والتغيير بين الوظائف بشكل دوري ومستمر.
        </div>
        <h2>قوانين اللاعب المعتمد</h2>
        <ul class="law-list" style="list-style: none; padding: 0;">
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">1. حسن السمعة ولبق في تعاملك وأسلوبك مع اللاعبين.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">2. التقديم على وظيفتين معتمدتين على الأقل والتغيير بينهما بشكل دوري والحرص على تطوير نفسك ومساندة زملائك.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">3. مساعدة اللاعبين في الديسكورد بشكل عام.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">4. التمثيل بشكل جيد والالتزام بالتمثيل الواقعي الخاص بمقاطعة سبارك.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">5. مساندة الوظائف المعتمدة الأخرى عند الضرورة.</li>
        </ul>
        <div class="info-box" style="border-color: #f1c40f; color: #f1c40f; margin-top: 20px;">
            ملاحظة: يحق لإدارة الرقابة والتفتيش سحب الاعتماد في حال مخالفة القوانين، ويجب التدرج في رتب الوظيفة المنتدب إليها.
        </div>`;
    res.send(renderPage('قوانين اللاعب المعتمد', content, 'trusted'));
});

// شروط القبول والرتب
app.get('/trusted-apply', (req, res) => {
    const content = `
        <h2>🟢 شروط القبول في اللاعب المعتمد 🟢</h2>
        <ul class="law-list" style="list-style: none; padding: 0;">
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">1. عدم وجود مخالفات رقابية في آخر 30 يوم.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">2. أن يكون المتقدم متفرغاً لمهام اللاعب المعتمد بشكل عام.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">3. يجب على المتقدم أن يتواجد في وظيفة معتمدة فعلياً.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">4. خبرة المتقدم 36 فما فوق.</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #e74c3c;">5. التقيد بالانتداب الأسبوعي لجميع الوظائف (مدة من يوم إلى 7 أيام).</li>
        </ul>
        <div style="text-align:center; color:#f1c40f; margin-top:30px;">يتم التقديم عبر تذكرة (Ticket) خاصة بالديسكورد.</div>
    `;
    res.send(renderPage('شروط قبول المعتمد', content, 'trustedApply'));
});

// المناطق الآمنة (تم دمج تعديلك)
app.get('/safe', (req, res) => {
    const content = `
        <h2>المناطق الآمنة</h2>
        <ul class="law-list" style="list-style: none; padding: 0;">
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #16a085;">1 - المستشفيات ومراكز الشرطة وحرس الحدود</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #16a085;">2 - معرض المركبات والشاحنات</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #16a085;">3 - حجز المركبات والشاحنات</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #16a085;">4 - مركز التوظيف ومكان استخراج الرخص - مناطق العمل القانونية</li>
            <li style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-right: 4px solid #16a085;">5 - مناطق العمل (الأخشاب - الدواجن - الأعناب الخ...)</li>
        </ul>`;
    res.send(renderPage('المناطق الآمنة', content, 'safe'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Spark Server Ready!'); });
