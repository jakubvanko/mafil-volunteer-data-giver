import ms from "ms";
import UserModel from "../models/userModel.js";

const setIntervalImmediately = async (callback, interval) => {
  await callback();
  return setInterval(callback, interval);
};

setIntervalImmediately(
  async () =>
    console.log(
      `Deleted ${await UserModel.deleteExpiredAccounts()} expired users...`
    ),
  ms("1d")
);
