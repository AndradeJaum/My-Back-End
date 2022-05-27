import dotenv from "dotenv"
dotenv.config()

import express from "express";
import cors from "cors";
import db from "./src/config/dbconnect.js";

import router from "./src/routes/index.js";

const port = process.env.PORT | 8000;

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(router)

app.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`);
  });

export default app;
