import nodemailer from "nodemailer";
import fs from "fs";
import url from "url";
import path from "path";
import handlebars from "handlebars";
import mjml from "mjml";
import Log from "../models/userModel.js";

const getTemplatePath = (templateName) =>
  path.join(
    path.dirname(url.fileURLToPath(import.meta.url)),
    `../templates/${templateName}`
  );

const loadTemplate = async (templateName) => {
  let fileHandle;
  try {
    fileHandle = await fs.promises.open(getTemplatePath(templateName), "r");
    return (await fileHandle.readFile()).toString();
  } finally {
    await fileHandle?.close();
  }
};

const LOGIN_EMAIL_TEMPLATE = handlebars.compile(
  await loadTemplate("loginEmail.mjml.handlebars")
);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async (to, subject, html) => {
  const mailResult = await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to,
    subject,
    html,
  });
  if (mailResult.messageId === undefined) {
    Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "MAIL_ERROR",
      message: `A mail (${subject}) was sent to ${to} but an error occured`,
      details: {
        receiver: to,
        subject,
      },
    });
    throw new Error("Mail error");
  }
  Log.createLog({
    eventType: "AUTOMATIC",
    eventName: "MAIL_SENT",
    message: `A mail (${subject}) was sent to ${to}`,
    details: {
      receiver: to,
      subject,
    },
  });
};

const sendLoginEmail = (emailAddress, name, visitDate, loginLink) =>
  sendMail(
    emailAddress,
    "Váš účet byl vytvořen",
    mjml(
      LOGIN_EMAIL_TEMPLATE({
        name,
        loginLink,
        visitDate: visitDate.toLocaleDateString("cs-CZ").replaceAll(" ", ""),
      })
    ).html
  );

export default {
  sendLoginEmail,
};
