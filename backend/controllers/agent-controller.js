import Agent from "../model/Agent";

export const getAllAgent = async (req, res, next) => {
  let agents;
  try {
    agents = await Agent.find();
  } catch (error) {
    return console.log(error);
  }
  if (!agents) {
    return res.status(404).json({ message: "No Agents Found" });
  }
  return res.status(200).json({ agents });
};

export const addAgent = async (req, res, next) => {
  const { name } = req.body;

  let existingAgent;
  try {
    existingAgent = await Agent.findOne({ name });
  } catch (error) {
    return console.log(error);
  }
  if (existingAgent) {
    return res.status(400).json({ message: "Agent Already Exist" });
  }
  const agent = new Agent({
    name,
    calls: [],
  });

  try {
    agent.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ agent });
};
