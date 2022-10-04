import axios from "axios";
import Log from "../models/userModel.js";

const requestDicomData = async (studyInstanceUID, type) => {
  try {
    result = await axios.get(process.env.PACS_API_URL, {
      params: {
        studyInstanceUID,
        type,
      },
      headers: { Authorization: `Bearer ${process.env.OUTGOING_API_KEY}` },
    });
    return Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "DICOM_DATA_REQUESTED",
      message: `Dicom data was requested from ${process.env.PACS_API_URL}`,
      details: {
        study_instance_uid: studyInstanceUID,
        type: type,
      },
    });
  } catch (error) {
    Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "DICOM_DATA_REQUEST_ERROR",
      message: `Dicom data was requested from ${process.env.PACS_API_URL} but an error occured`,
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
  result = await axios.post(
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
  return result;
};

export default {
  requestDicomData,
  sendLogs,
};
