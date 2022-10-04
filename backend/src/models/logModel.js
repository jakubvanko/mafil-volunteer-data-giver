import mongoose from "mongoose";
import apiService from "../services/apiService.js";

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
  await this.dispatchToApi();
});

logSchema.statics.createLog = async function (logData) {
  await new this(logData).save();
};

logSchema.methods.dispatchToApi = async function () {
  try {
    await apiService.sendLogs(
      this.createdAt,
      this.eventType,
      this.eventName,
      this.message,
      this.details
    );
    this.dispatched = true;
    return true;
  } catch {
    return false;
  }
};

export default mongoose.model("Log", logSchema);
