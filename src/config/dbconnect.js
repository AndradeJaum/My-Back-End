import mongoose from "mongoose";

mongoose.connect("mongodb+srv://status:123@leaderboards.88oca.mongodb.net/StatusGG")

let db = mongoose.connection;

export default db;