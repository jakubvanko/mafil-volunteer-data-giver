import http from "http";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import ms from "ms";
import "express-async-errors"; // Handle async errors without try and catch blocks

import "./config/env.js";
import "./config/database.js";
import "./config/timers.js";
import handlers from "./middleware/handlers.js";
import userRouter from "./routes/userRouter.js";

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: ms(process.env.RATE_LIMIT_WINDOW_TIME),
    max: process.env.RATE_LIMIT_WINDOW_ACTIONS,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(cors()); // Set origin for better security
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use(handlers.defaultRoute);
app.use(handlers.errorHandler);

http.createServer(app).listen(process.env.PORT || "3000");
