# 🔧 متغيرات البيئة المطلوبة في Vercel

## إضافة متغيرات البيئة في Vercel:

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Settings** → **Environment Variables**
4. أضف هذه المتغيرات:

### متغيرات قاعدة البيانات:
```
DATABASE_URL=postgresql://neondb_owner:npg_iI0c5jYwEntg@ep-shy-thunder-adkk9exf-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### متغيرات Next.js:
```
NEXTAUTH_SECRET=cyberbyte-super-secret-key-2024
NEXTAUTH_URL=https://your-domain.vercel.app
```

### متغيرات البريد الإلكتروني (اختيارية):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=CyberByte <noreply@cyberbyte.com>
```

### متغيرات الإدارة:
```
ADMIN_EMAIL=admin@cyberbyte.com
ADMIN_PASSWORD=admin123
```

## ✅ بعد إضافة المتغيرات:
1. أعد نشر المشروع
2. ستجد أن الموقع يعمل بدون أخطاء!

## 🚨 مهم:
- تأكد من تغيير `your-domain.vercel.app` إلى رابط Vercel الحقيقي
- تأكد من إضافة جميع المتغيرات قبل النشر
