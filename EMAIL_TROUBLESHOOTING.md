# 🔧 دليل حل مشاكل البريد الإلكتروني

## المشاكل الشائعة وحلولها

### 1. البريد الإلكتروني لا يصل (Gmail)

#### السبب الأكثر شيوعاً: استخدام كلمة المرور العادية بدلاً من App Password

**الحل:**
1. اذهب إلى [Google Account Settings](https://myaccount.google.com/)
2. اختر "Security" من القائمة الجانبية
3. فعّل "2-Step Verification" إذا لم تكن مفعلة
4. اذهب إلى "App passwords"
5. أنشئ App Password جديد للبريد الإلكتروني
6. استخدم هذا App Password في متغير `SMTP_PASS`

#### إعدادات Gmail الصحيحة:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-character-app-password"  # ليس كلمة المرور العادية
SMTP_FROM="CyberByte <noreply@cyberbyte.com>"
```

### 2. اختبار الإعدادات

#### استخدام صفحة الاختبار:
1. اذهب إلى `/test-email` في المتصفح
2. اختبر الاتصال بـ SMTP
3. أرسل بريد إلكتروني تجريبي

#### أو استخدم API مباشرة:
```bash
# اختبار الاتصال
curl http://localhost:3000/api/test-email

# اختبار إرسال بريد
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 3. مشاكل أخرى محتملة

#### أ) Gmail يحجب الاتصال
- تأكد من تفعيل "Less secure app access" (إذا لم تكن تستخدم App Password)
- أو استخدم App Password (الأفضل)

#### ب) مشاكل Firewall/Network
- تأكد من أن البورت 587 مفتوح
- جرب استخدام VPN إذا كان هناك قيود شبكة

#### ج) مشاكل في الإعدادات
- تأكد من صحة البريد الإلكتروني في `SMTP_USER`
- تأكد من أن `SMTP_FROM` يحتوي على اسم صالح

### 4. بدائل Gmail

#### SendGrid (مجاني حتى 100 بريد يومياً):
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

#### Outlook/Hotmail:
```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_USER="your-email@outlook.com"
SMTP_PASS="your-password"
```

### 5. تسجيل الأخطاء

الكود الآن يسجل تفاصيل مفصلة في الكونسول:
- ✅ نجاح الاتصال بـ SMTP
- ❌ فشل الاتصال مع تفاصيل الخطأ
- 📧 تفاصيل البريد المرسل
- 🔍 اختبار الاتصال قبل الإرسال

### 6. خطوات التشخيص

1. **تحقق من ملف .env:**
   ```bash
   cat .env.local
   ```

2. **تحقق من الكونسول:**
   - شاهد رسائل الخطأ في terminal
   - ابحث عن "SMTP connection failed" أو "Error sending email"

3. **اختبر الإعدادات:**
   - استخدم صفحة `/test-email`
   - أو استخدم API endpoints

4. **تحقق من البريد المهمل:**
   - قد يصل البريد إلى مجلد Spam
   - تحقق من جميع مجلدات البريد

### 7. نصائح إضافية

- استخدم App Password دائماً مع Gmail
- تأكد من صحة عنوان البريد الإلكتروني
- جرب مع بريد إلكتروني مختلف
- تحقق من إعدادات الأمان في حساب البريد

## 🆘 إذا لم تحل المشكلة

1. تحقق من الكونسول للحصول على رسائل الخطأ المفصلة
2. جرب مع مزود بريد إلكتروني مختلف
3. تأكد من أن جميع متغيرات البيئة صحيحة
4. استخدم صفحة الاختبار للتشخيص
