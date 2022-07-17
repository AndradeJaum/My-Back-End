import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  id: { type: String },
  matchDetail: { type: Array, required: true },
});

const MatchInfo = mongoose.model("MatchInfo", matchSchema);

export default MatchInfo;
