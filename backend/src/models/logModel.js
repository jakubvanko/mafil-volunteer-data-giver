import mongoose from "mongoose";
import axios from "axios";

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
    await axios.post(
      process.env.LOG_API_URL,
      {
        application: "PVD",
        date: this.createdAt,
        event_type: this.eventType,
        event_name: this.eventName,
        message: this.message,
        details: this.details,
      },
      { headers: { Authorization: `Bearer ${process.env.OUTGOING_API_KEY}` } }
    );
    this.dispatched = true;
    return true;
  } catch {
    return false;
  }
};

export default mongoose.model("Log", logSchema);
