const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.EMAIL_API_PORT || 3001);

const allowedOrigins = (process.env.EMAIL_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed"));
    }
  })
);

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

function createTransporter() {
  const host = requireEnv("SMTP_HOST");
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const portNumber = Number(process.env.SMTP_PORT || (secure ? 465 : 587));

  return nodemailer.createTransport({
    host,
    port: portNumber,
    secure,
    auth: { user, pass }
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/send-email", async (req, res) => {
  const { to, subject, body } = req.body || {};

  if (!to || !subject || !body) {
    res.status(400).json({ ok: false, error: "Missing to/subject/body" });
    return;
  }

  try {
    const transporter = createTransporter();
    const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

    await transporter.sendMail({
      from,
      to,
      subject,
      text: body
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email send failed:", error.message);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Email API listening on http://localhost:${port}`);
});
