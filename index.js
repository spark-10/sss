const express = require('express');
const app = express();

const STYLES = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
    * { box-sizing: border-box; scroll-behavior: smooth; font-family: 'Cairo', sans-serif; }
    body { margin: 0; background: #0b0b0b; color: #fff; direction: rtl; text-align: center; }
    .navbar { background: rgba(10,10,10,0.95); padding: 15px; border-bottom: 1px solid #d4af37; }
    .nav-links a { color: #fff; text-decoration: none; margin: 0 15px; font-weight: bold; }
    .btn { background: #d4af37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
</style>
`;

const layout = (content) => `
<!DOCTYPE html>
<html lang="ar">
<head><meta charset="UTF-8"><title>مقاطعة سبارك</title>${STYLES}</head>
<body>
    <nav class="navbar">
        <a href="/" class="nav-links">الرئيسية</a>
        <a href="/rules" class="nav-links">القوانين</a>
    </nav>
    <div style="padding: 50px;">${content}</div>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(layout('<h1>مرحباً بكم في مقاطعة سبارك</h1><p>السيرفر الأفضل للرول بلاي</p><a href="/rules" class="btn">عرض القوانين</a>'));
});

app.get('/rules', (req, res) => {
    res.send(layout('<h1>قوانين السيرفر</h1><p>1. يمنع الـ RDM</p><p>2. يمنع الـ VDM</p>'));
});

// ملاحظة مهمة: لا تضع app.listen هنا أبداً
module.exports = app;
