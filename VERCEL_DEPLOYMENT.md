# تعليمات النشر على Vercel

## المشكلة
الموقع يعمل محلياً لكن يعطي "Internal server error" على Vercel بسبب قاعدة البيانات المحلية SQLite.

## الحل

### 1. إعداد قاعدة بيانات PostgreSQL

#### خيار 1: Vercel Postgres (مجاني - الأسهل)
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
NEXTAUTH_SECRET=your-super-secret-jwt-key
NEXTAUTH_URL=https://your-domain.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=CyberByte <noreply@cyberbyte.com>
ADMIN_EMAIL=admin@cyberbyte.com
ADMIN_PASSWORD=admin123
```

### 3. تحديث قاعدة البيانات

```bash
# استخدام schema الإنتاج
npx prisma db push --schema=./prisma/schema.production.prisma

# أو إنشاء migration
npx prisma migrate dev --name init --schema=./prisma/schema.production.prisma
```

### 4. زرع البيانات

```bash
# زرع المنتجات
npm run db:seed
```

### 5. إعادة النشر

```bash
git add .
git commit -m "Fix Vercel deployment with PostgreSQL"
git push
```

## ملاحظات مهمة

- تأكد من أن `DATABASE_URL` صحيح
- تأكد من أن قاعدة البيانات متاحة من الإنترنت
- تأكد من أن جميع متغيرات البيئة محددة في Vercel
- استخدم `schema.production.prisma` للإنتاج
- استخدم `schema.prisma` للتطوير المحلي

## استكشاف الأخطاء

إذا استمر الخطأ:
1. تحقق من logs في Vercel Dashboard
2. تأكد من أن `DATABASE_URL` صحيح
3. تأكد من أن قاعدة البيانات متاحة
4. تحقق من أن جميع المتغيرات محددة
