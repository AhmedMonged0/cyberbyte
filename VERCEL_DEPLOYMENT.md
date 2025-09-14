# تعليمات النشر على Vercel

## المشكلة
التسجيل يعمل محلياً لكن يفشل على Vercel بسبب قاعدة البيانات المحلية.

## الحل

### 1. إعداد قاعدة بيانات PostgreSQL

#### خيار 1: Vercel Postgres (مجاني)
1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. اذهب إلى Storage → Create Database → Postgres
4. انسخ `DATABASE_URL` من الإعدادات

#### خيار 2: Neon (مجاني)
1. اذهب إلى https://neon.tech
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. انسخ `DATABASE_URL`

#### خيار 3: Supabase (مجاني)
1. اذهب إلى https://supabase.com
2. أنشئ مشروع جديد
3. اذهب إلى Settings → Database
4. انسخ `DATABASE_URL`

### 2. إعداد متغيرات البيئة في Vercel

1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. اذهب إلى Settings → Environment Variables
4. أضف المتغيرات التالية:

```
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### 3. تحديث قاعدة البيانات

```bash
# إنشاء قاعدة البيانات
npx prisma db push

# أو استخدام migrations
npx prisma migrate dev --name init
```

### 4. إعادة النشر

```bash
git add .
git commit -m "Update database to PostgreSQL"
git push
```

## ملاحظات مهمة

- تأكد من أن `DATABASE_URL` صحيح
- تأكد من أن قاعدة البيانات متاحة من الإنترنت
- تأكد من أن جميع متغيرات البيئة محددة في Vercel
