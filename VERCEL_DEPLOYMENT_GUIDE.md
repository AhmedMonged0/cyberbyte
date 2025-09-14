# دليل النشر على Vercel

## المشكلة الحالية
تسجيل الدخول يعمل محلياً لكن لا يعمل على Vercel بسبب:
1. Vercel يستخدم PostgreSQL بينما المشروع محلياً يستخدم SQLite
2. قاعدة البيانات فارغة على Vercel
3. متغيرات البيئة غير محددة

## الحل

### 1. إعداد قاعدة البيانات على Vercel
1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى Settings > Environment Variables
4. أضف المتغيرات التالية:

```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### 2. إنشاء قاعدة بيانات PostgreSQL
استخدم إحدى هذه الخدمات:
- [Neon](https://neon.tech) (مجاني)
- [Supabase](https://supabase.com) (مجاني)
- [PlanetScale](https://planetscale.com) (مجاني)

### 3. تحديث Prisma Schema
```bash
# انسخ schema.production.prisma إلى schema.prisma
cp prisma/schema.production.prisma prisma/schema.prisma
```

### 4. نشر المشروع
```bash
# ادفع التغييرات إلى GitHub
git add .
git commit -m "Fix Vercel deployment"
git push origin main
```

### 5. إنشاء البيانات على Vercel
بعد النشر، شغل هذا الأمر في Vercel Functions:
```bash
# اذهب إلى Vercel Dashboard > Functions
# أنشئ function جديدة باسم "setup-database"
# استخدم الكود من scripts/deploy-to-vercel.js
```

### 6. اختبار تسجيل الدخول
- اذهب إلى: https://your-app.vercel.app/admin/login
- البريد الإلكتروني: admin@cyberbyte.com
- كلمة المرور: admin123

## ملاحظات مهمة
- تأكد من أن DATABASE_URL صحيح
- تأكد من أن قاعدة البيانات متاحة من Vercel
- قد تحتاج إلى إعادة نشر المشروع بعد إضافة متغيرات البيئة
