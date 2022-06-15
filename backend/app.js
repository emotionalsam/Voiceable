import express from "express";
import mongoose from "mongoose";
import router from "./routes/calls-routes";
import agentRouter from "./routes/agent-routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/calls", router);
app.use("/api/agent", agentRouter);

mongoose
  .connect(
    "mongodb+srv://admin:Q0yfKoz3StygfdVb@cluster0.lwjeb.mongodb.net/Voice?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to DB port 5000"))
  .catch((err) => console.log(err));
