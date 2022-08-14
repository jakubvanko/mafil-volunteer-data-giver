import http from "http";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";
// Handle async errors without try and catch blocks => import "express-async-errors"

import "./config/env.js";
import "./config/database.js";
import "./config/timers.js";
import handlers from "./middleware/handlers.js";
import userRouter from "./routes/userRouter.js";

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors()); // Set origin for better security
app.use(helmet());
app.use(express.json()); // If form objects needed => app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use(handlers.defaultRoute);
app.use(handlers.errorHandler);

http.createServer(app).listen(process.env.PORT || "3000");
