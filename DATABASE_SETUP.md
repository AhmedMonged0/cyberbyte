# إعداد قاعدة البيانات لتسجيل الدخول

## ما تم إنجازه

تم إعداد نظام قاعدة بيانات كامل لتسجيل الدخول باستخدام:

### 1. التقنيات المستخدمة
- **Prisma ORM**: لإدارة قاعدة البيانات
- **SQLite**: قاعدة البيانات المحلية للتطوير
- **bcryptjs**: لتشفير كلمات المرور
- **Zod**: للتحقق من صحة البيانات

### 2. هيكل قاعدة البيانات

```sql
-- جدول المستخدمين
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- جدول رموز إعادة تعيين كلمة المرور
CREATE TABLE reset_tokens (
  id TEXT PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  userId TEXT NOT NULL,
  expiresAt DATETIME NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. API Endpoints

#### تسجيل مستخدم جديد
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "أحمد",
  "lastName": "محمد",
  "email": "ahmed@example.com",
  "password": "password123"
}
```

#### تسجيل الدخول
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

#### إعادة تعيين كلمة المرور
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "ahmed@example.com"
}
```

#### التحقق من رابط إعادة التعيين
```
POST /api/auth/verify-reset-token
Content-Type: application/json

{
  "token": "reset-token-here"
}
```

#### تحديث كلمة المرور
```
POST /api/auth/update-password
Content-Type: application/json

{
  "token": "reset-token-here",
  "password": "new-password-123"
}
```

### 4. كيفية التشغيل

1. **إنشاء ملف .env**:
```bash
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Email Configuration (for password reset)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@cyberbyte.com"
```

2. **تشغيل قاعدة البيانات**:
```bash
# إنشاء قاعدة البيانات
npx prisma db push

# عرض قاعدة البيانات (اختياري)
npx prisma studio
```

3. **تشغيل التطبيق**:
```bash
npm run dev
```

### 5. الميزات الأمنية

- ✅ تشفير كلمات المرور باستخدام bcryptjs
- ✅ التحقق من صحة البيانات باستخدام Zod
- ✅ منع تكرار البريد الإلكتروني
- ✅ معالجة الأخطاء بشكل آمن
- ✅ عدم إرجاع كلمة المرور في الاستجابات
- ✅ نظام نسيان كلمة المرور مع رموز آمنة
- ✅ انتهاء صلاحية رموز إعادة التعيين (15 دقيقة)
- ✅ منع استخدام الرموز المستخدمة مسبقاً
- ✅ إرسال بريد إلكتروني آمن لإعادة التعيين

### 6. التطوير المستقبلي

- إضافة JWT tokens للمصادقة
- إضافة نظام أدوار المستخدمين
- إضافة تأكيد البريد الإلكتروني
- إضافة نظام إعادة تعيين كلمة المرور الحقيقي
- إضافة تسجيل الدخول عبر Google/Facebook

### 7. ملفات مهمة

- `prisma/schema.prisma`: تعريف هيكل قاعدة البيانات
- `src/lib/prisma.ts`: إعداد Prisma Client
- `src/lib/email.ts`: خدمة إرسال البريد الإلكتروني
- `src/contexts/AuthContext.tsx`: إدارة حالة المصادقة
- `src/app/api/auth/*`: API endpoints للمصادقة
- `src/app/reset-password/page.tsx`: صفحة إعادة تعيين كلمة المرور

### 8. كيفية استخدام نظام نسيان كلمة المرور

1. **من صفحة تسجيل الدخول**: اضغط على "نسيان كلمة المرور؟"
2. **أدخل البريد الإلكتروني**: سيتم إرسال رابط إعادة التعيين
3. **تحقق من البريد الإلكتروني**: افتح الرابط المرسل
4. **أدخل كلمة المرور الجديدة**: مع التأكيد
5. **تم التحديث**: يمكنك تسجيل الدخول بكلمة المرور الجديدة

### 9. إعداد البريد الإلكتروني

لإرسال رسائل إعادة تعيين كلمة المرور، تحتاج إلى إعداد خدمة بريد إلكتروني:

#### Gmail (الأسهل):
1. فعّل "2-Step Verification" في حساب Google
2. أنشئ "App Password" من إعدادات Google
3. استخدم App Password في `SMTP_PASS`

#### خدمات أخرى:
- SendGrid
- AWS SES
- Mailgun
- Nodemailer مع أي خدمة SMTP
