import mongoose from "mongoose";

const playersSchema = new mongoose.Schema(
  {
    _id: { type: String },
    summonerName: { type: String, required: true },
    rankedSolo: { type: Object },
    rankedFlex: { type: Object },
  },
  {
    _id: false,
  }
);

const Player = mongoose.model("Player", playersSchema);

export default Player;
