import ms from "ms";
import userService from "../services/userService.js";

const setIntervalImmediately = async (callback, interval) => {
  await callback();
  return setInterval(callback, interval);
};

setIntervalImmediately(userService.deleteExpiredUsers, ms("1d"));
