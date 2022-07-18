
import express from "express";
import cors from "cors";
import { loadConfig, globalConfig } from "./src/config/index.js";
import { getDbConnection } from "./src/config/dbconnect.js";

import router from "./src/routes/index.js";

loadConfig();

await getDbConnection()

const app = express();
app.use(express.json());
app.use(cors());
app.use(router)

app.use((error, req, res, next) => {
  console.log(error)
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(globalConfig.port, () => {
  console.log(`Servidor rodando na porta:${globalConfig.port}`);
});

export default app;
