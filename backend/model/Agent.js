import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AgentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  calls: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Calls",
      required: true,
    },
  ],
});

export default mongoose.model("Agent", AgentSchema);
