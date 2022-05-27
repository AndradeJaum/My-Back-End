import express from "express";
import PlayerController from "../controllers/playerController.js";

const router = express.Router();

router
  .get("/players", PlayerController.listarPlayers)
  .post("/players", PlayerController.cadastrarPlayer)

export default router;
