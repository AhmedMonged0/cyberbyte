# 🚀 إعداد Vercel السريع

## المشكلة
الموقع يعمل محلياً لكن يعطي "Internal server error" على Vercel لأن Vercel لا يدعم SQLite.

## الحل السريع (5 دقائق)

### 1. إنشاء قاعدة بيانات PostgreSQL

#### خيار 1: Vercel Postgres (الأسهل)
1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Storage** → **Create Database** → **Postgres**
4. انسخ `DATABASE_URL`

#### خيار 2: Neon (مجاني)
1. اذهب إلى [neon.tech](https://neon.tech)
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. انسخ `DATABASE_URL`

### 2. إضافة متغيرات البيئة في Vercel

1. اذهب إلى Vercel Dashboard → مشروعك → **Settings** → **Environment Variables**
2. أضف هذه المتغيرات:

```
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 3. النشر

```bash
# إذا كان لديك Vercel CLI
vercel --prod

# أو ادفع إلى GitHub إذا كان متصل
git add .
git commit -m "Fix Vercel deployment with PostgreSQL"
git push
```

### 4. إعداد قاعدة البيانات

بعد النشر، شغل هذه الأوامر:

```bash
# إعداد قاعدة البيانات
npx prisma db push --schema=./prisma/schema.production.prisma

# زرع البيانات
npm run db:seed:prod
```

## ✅ النتيجة
الموقع سيعمل على Vercel بدون أخطاء مع جميع المنتجات!

## 🔧 أوامر مفيدة

```bash
# إعداد Vercel مع PostgreSQL
npm run setup:vercel:postgres

# زرع البيانات للإنتاج
npm run db:seed:prod

# إعداد قاعدة البيانات للإنتاج
npm run db:push:prod
```

## 📞 المساعدة
إذا واجهت مشاكل:
1. تحقق من logs في Vercel Dashboard
2. تأكد من أن `DATABASE_URL` صحيح
3. تأكد من أن قاعدة البيانات متاحة
