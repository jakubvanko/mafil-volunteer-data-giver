import mongoose from "mongoose";
import apiService from "../services/apiService.js";
import ms from "ms";

const logSchema = mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
      required: true,
      default: {},
    },
    dispatched: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

logSchema.pre("save", async function () {
  if (!this.isNew) return;
  if (process.env.NODE_ENV === "development")
    console.log(
      `${this.createdAt.toLocaleString()} ${this.eventType}: ${
        this.eventName
      }\n${this.message} - details: ${JSON.stringify(this.details)}`
    );
  try {
    await this.dispatchToApi();
    this.dispatched = true;
  } catch {}
});

logSchema.statics.createLog = async function (logData) {
  await new this(logData).save();
};

logSchema.statics.dispatchAll = async function () {
  for (const log of await this.find({ dispatched: false }).exec()) {
    await log.dispatchToApi();
    log.dispatched = true;
    await log.save();
  }
};

logSchema.statics.deleteOldLogs = async function () {
  return (
    await this.deleteMany()
      .where("createdAt")
      .lte(new Date(Date.now() - ms(process.env.LOG_ENTRY_EXPIRATION)))
      .exec()
  ).deletedCount;
};

logSchema.methods.dispatchToApi = async function () {
  await apiService.sendLogs(
    this.createdAt,
    this.eventType,
    this.eventName,
    this.message,
    this.details
  );
};

export default mongoose.model("Log", logSchema);
