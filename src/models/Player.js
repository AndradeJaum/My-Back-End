import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
  id: { type: String },
  summonerName: { type: String, required: true },
  rankedSolo: { type: Object },
  rankedFlex: { type: Object },
});


const Player = mongoose.model("Player", playersSchema);

export default Player;
