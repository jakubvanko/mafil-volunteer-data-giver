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
