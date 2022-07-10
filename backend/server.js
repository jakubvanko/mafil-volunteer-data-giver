import http from "http";
import app from "./scripts/app.js";

const server = http.createServer(app);

server.listen(process.env.PORT || "3000");
