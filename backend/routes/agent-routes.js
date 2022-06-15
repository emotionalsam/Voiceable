import express from "express";
import { addAgent, getAllAgent } from "../controllers/agent-controller";

const agentRouter = express.Router();

agentRouter.get("/", getAllAgent);
agentRouter.post("/addagent", addAgent);

export default agentRouter;
