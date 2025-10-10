import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// إعداد البريد المرسل
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "academy.mail.sender@gmail.com", // بريد الإرسال
    pass: "APP_PASSWORD_HERE"             // كلمة مرور تطبيق (وليس العادية)
  }
});

// استقبال الرسائل من الأداة
app.post("/send-mail", async (req, res) => {
  const { question, time } = req.body;
  try {
    await transporter.sendMail({
      from: `"Student Question" <academy.mail.sender@gmail.com>`,
      to: "instructor@psa.ac.ae", // بريد المحاضر الحقيقي
      subject: "📩 سؤال جديد من أداة القارئ",
      html: `
        <h3>سؤال جديد من الطالب:</h3>
        <p>${question}</p>
        <hr>
        <small>🕓 أُرسل في ${time}</small>
      `
    });
    res.status(200).send("تم الإرسال بنجاح ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("حدث خطأ أثناء الإرسال ❌");
  }
});

app.listen(3000, () => console.log("📬 Mail API is running on port 3000"));
