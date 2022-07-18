import mongoose from "mongoose";
import { globalConfig } from "../config/index.js"

export async function getDbConnection() {
  let connection = mongoose.connection;
  if (!connection.db) {
    await mongoose.connect(globalConfig.dbUrl);
    connection = mongoose.connection;
  }
  return connection;
}