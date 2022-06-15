import express from "express";
import { addCall, getAllCalls } from "../controllers/calls-controler";

const router = express.Router();

router.get("/", getAllCalls);
router.post("/addcall", addCall);

export default router;
