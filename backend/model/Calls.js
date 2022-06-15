import mongoose from "mongoose";

const Schema = mongoose.Schema;

const callsSchema = new Schema({
  START_DATE: {
    type: Date,
    required: true,
  },
  END_DATE: {
    type: Date,
    required: true,
  },
  STATUS: {
    type: Boolean,
    required: true,
  },
  SUPPORT_AGENT_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});

export default mongoose.model("Calls", callsSchema);
