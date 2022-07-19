import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  _id: { type: String },
  matchDetail: { type: Object, required: true },
},
{
  _id: false
});

const MatchInfo = mongoose.model("MatchInfo", matchSchema);

export default MatchInfo;
