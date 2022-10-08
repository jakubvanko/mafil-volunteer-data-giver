import ms from "ms";
import UserModel from "../models/userModel.js";
import Log from "../models/logModel.js";

const setIntervalImmediately = async (callback, interval) => {
  await callback();
  return setInterval(callback, interval);
};

setIntervalImmediately(async () => {
  const deletedAccountsCount = await UserModel.deleteExpiredAccounts();
  await Log.createLog({
    eventType: "AUTOMATIC",
    eventName: "EXPIRED_ACCOUNTS_DELETED",
    message: `Deleted ${deletedAccountsCount} expired volunteer accounts`,
    details: {
      deleted_count: deletedAccountsCount,
    },
  });
}, ms("1d"));

setIntervalImmediately(async () => {
  try {
    await UserModel.requestDataForUnactivatedAccounts();
    await Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "UNACTIVATED_ACCOUNTS_DATA_REQUESTED",
      message: `Successfully requested Dicom data for unactivated accounts`,
      details: {},
    });
  } catch (error) {
    await Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "UNACTIVATED_ACCOUNTS_DATA_REQUEST_ERROR",
      message: `Unable to request Dicom data for unactivated accounts`,
      details: {
        error: error.message,
      },
    });
  }
}, ms("1d"));

setIntervalImmediately(async () => {
  try {
    await Log.dispatchAll();
    await Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "LOGS_DISPATCHED",
      message: `Dispatched unsent logs to the logging API`,
      details: {},
    });
  } catch (error) {
    await Log.createLog({
      eventType: "AUTOMATIC",
      eventName: "LOG_DISPATCH_ERROR",
      message: `Unable to dispatch unsent logs to the logging API`,
      details: {
        error: error.message,
      },
    });
  }
}, ms("1d"));

setIntervalImmediately(async () => {
  const deletedLogsCount = await Log.deleteOldLogs();
  await Log.createLog({
    eventType: "AUTOMATIC",
    eventName: "OLD_LOGS_DELETED",
    message: `Deleted ${deletedLogsCount} old log entries`,
    details: {
      deleted_count: deletedLogsCount,
    },
  });
}, ms("1d"));

setIntervalImmediately(async () => {
  await UserModel.remindUsers();
  await Log.createLog({
    eventType: "AUTOMATIC",
    eventName: "REMINDERS_SENT",
    message: `Reminded users whose account will soon expire`,
    details: {},
  });
}, ms("1d"));
