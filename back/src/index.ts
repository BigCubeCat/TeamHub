import http from "http";
import createError from "http-errors";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import mongoose, { Error } from "mongoose";

import { env } from "./utils/config";
import indexRouter from "./routes/index";
import usersRouter from "./routes/userRouter";
import meRouter from "./routes/meRouter";
import { auth } from "./middleware/auth";

mongoose.connect(env.MONGODB_URL);

const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/me", auth, meRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set("port", env.PORT);

const server = http.createServer(app);
server.on("listening", onListening);
server.listen(env.PORT);

function onListening() {
  var addr = server.address();
  console.log("Listening on ", addr);
}
