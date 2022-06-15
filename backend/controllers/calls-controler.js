import mongoose from "mongoose";
import Agent from "../model/Agent";
import Calls from "../model/Calls";

export const getAllCalls = async (req, res, next) => {
  let calls;
  try {
    calls = await Calls.find();
  } catch (error) {
    console.log(error);
  }
  if (!calls) {
    return res.status(404).json({ message: "No Calls Found" });
  }
  console.log(
    calls.map(({ _id, START_DATE, END_DATE, STATUS, SUPPORT_AGENT_ID }) => ({
      _id,
      Started: START_DATE,
      Ended: END_DATE,
      Status: STATUS,
      SupportedAgentID: SUPPORT_AGENT_ID,
    }))
  );
  return res.status(200).json({
    calls: calls.map(
      ({ _id, START_DATE, END_DATE, STATUS, SUPPORT_AGENT_ID }) => ({
        _id,
        Started: START_DATE,
        Ended: END_DATE,
        Status: STATUS,
        SupportedAgentID: SUPPORT_AGENT_ID,
      })
    ),
  });
};

export const addCall = async (req, res, next) => {
  const { START_DATE, END_DATE, STATUS, SUPPORT_AGENT_ID } = req.body;
  let existingAgent;
  try {
    existingAgent = await Agent.findById(SUPPORT_AGENT_ID);
  } catch (error) {
    return console.log(error);
  }
  if (!existingAgent) {
    return res.status(400).json({ message: "Unable to find user by ID" });
  }

  const call = new Calls({
    START_DATE,
    END_DATE,
    STATUS,
    SUPPORT_AGENT_ID,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await call.save({ session });
    existingAgent.calls.push(call);
    await existingAgent.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ call });
};
