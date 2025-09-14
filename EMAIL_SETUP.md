# إعداد الإيميل لإعادة تعيين كلمة المرور

## 1. إعداد Gmail App Password

### الخطوة 1: تفعيل المصادقة الثنائية
1. اذهب إلى [Google Account Security](https://myaccount.google.com/security)
2. فعّل "2-Step Verification"

### الخطوة 2: إنشاء App Password
1. اذهب إلى [App Passwords](https://myaccount.google.com/apppasswords)
2. اختر "Mail" و "Other (Custom name)"
3. اكتب "CyberByte App"
4. انسخ كلمة المرور المُنشأة (16 حرف)

## 2. إعداد متغيرات البيئة

### محلياً (.env.local):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM=CyberByte <noreply@cyberbyte.com>
NEXTAUTH_URL=http://localhost:3000
```

### على Vercel:
1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. اذهب إلى Settings > Environment Variables
4. أضف المتغيرات التالية:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `your-email@gmail.com`
   - `SMTP_PASS` = `your-16-character-app-password`
   - `SMTP_FROM` = `CyberByte <noreply@cyberbyte.com>`
   - `NEXTAUTH_URL` = `https://your-domain.vercel.app`

## 3. بدائل أخرى للإيميل

### SendGrid:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun:
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

## 4. اختبار الإيميل

بعد إعداد المتغيرات:
1. أعد تشغيل الخادم
2. اذهب إلى `/reset-password`
3. أدخل بريد إلكتروني صحيح
4. تحقق من وصول الإيميل

## 5. استكشاف الأخطاء

### إذا لم يصل الإيميل:
1. تحقق من صحة App Password
2. تأكد من تفعيل المصادقة الثنائية
3. تحقق من متغيرات البيئة
4. راجع Vercel logs

### رسائل الخطأ الشائعة:
- `Invalid login`: كلمة مرور خاطئة
- `Connection timeout`: مشكلة في الشبكة
- `Authentication failed`: App Password غير صحيح
