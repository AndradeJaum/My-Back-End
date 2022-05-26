import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
  id: { type: String },
  player: { type: String, required: true },
});

const players = mongoose.model("Leaderboards", playersSchema);

export default players;
