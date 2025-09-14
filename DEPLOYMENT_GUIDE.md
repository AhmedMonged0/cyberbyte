# دليل النشر على Vercel

## المشكلة الحالية
التسجيل يعمل محلياً لكن يفشل على Vercel

## الحل السريع

### 1. استخدم قاعدة بيانات مجانية

**خيار 1: Vercel Postgres (الأسهل)**
1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. اذهب إلى Storage → Create Database → Postgres
4. انسخ `DATABASE_URL`

**خيار 2: Neon (مجاني)**
1. اذهب إلى https://neon.tech
2. أنشئ حساب مجاني
3. انسخ `DATABASE_URL`

### 2. أضف متغيرات البيئة في Vercel

1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. اذهب إلى Settings → Environment Variables
4. أضف:

```
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
JWT_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
```

### 3. أعد النشر

```bash
git add .
git commit -m "Fix database for Vercel"
git push
```

## ملاحظة
- تأكد من أن `DATABASE_URL` صحيح
- تأكد من أن قاعدة البيانات متاحة من الإنترنت
