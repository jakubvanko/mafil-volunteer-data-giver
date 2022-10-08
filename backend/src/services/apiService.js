import axios from "axios";
import twilio from "twilio";
import Log from "../models/logModel.js";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const requestDicomData = async (studyInstanceUID, type) => {
  try {
    await axios.get(process.env.PACS_API_URL, {
      params: {
        studyInstanceUID,
        type,
      },
      headers: { Authorization: `Bearer ${process.env.OUTGOING_API_KEY}` },
    });
    return Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "DICOM_DATA_REQUESTED",
      message: `Dicom data request sent to ${process.env.PACS_API_URL}`,
      details: {
        study_instance_uid: studyInstanceUID,
        type: type,
      },
    });
  } catch (error) {
    Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "DICOM_DATA_REQUEST_ERROR",
      message: `Dicom data request sent to ${process.env.PACS_API_URL} but an error occured`,
      details: {
        study_instance_uid: studyInstanceUID,
        type,
        error: error.message,
      },
    });
    throw error;
  }
};

const sendLogs = async (createdAt, eventType, eventName, message, details) => {
  await axios.post(
    process.env.LOG_API_URL,
    {
      application: "PVD",
      date: createdAt,
      event_type: eventType,
      event_name: eventName,
      message: message,
      details: details,
    },
    { headers: { Authorization: `Bearer ${process.env.OUTGOING_API_KEY}` } }
  );
};

const sendSMS = async (receiver, content) => {
  await twilioClient.messages.create({
    body: content,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: receiver,
  });
  return Log.createLog({
    eventType: "AUTOMATIC",
    eventName: "SMS_SENT",
    message: `SMS was sent to ${receiver}`,
    details: {
      receiver,
    },
  });
};

export default {
  requestDicomData,
  sendLogs,
  sendSMS,
};
