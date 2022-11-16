import axios from "axios";
import Log from "../models/logModel.js";

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
  let result = await axios.post("https://www.odorik.cz/api/v1/sms", null, {
    params: {
      recipient: receiver.replace("+", "00"),
      message: content,
      user: process.env.ODORIK_USER,
      password: process.env.ODORIK_PASSWORD,
    },
  });
  if (result.data.includes("error")) {
    // because odorik does not send proper API error codes
    throw new Error("Error while sending an SMS");
  }
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
