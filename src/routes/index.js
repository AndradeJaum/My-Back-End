import express from "express";
import { globalConfig } from "../config/index.js";
import MintTokenController from "../controllers/controller-quiz-web3/mintToken.js";
import leaderboardsController from "../controllers/controller-statusGG/leaderboards.js";
import RankedMatchesController from "../controllers/controller-statusGG/rankedMatchs.js";
import MatchsController from "../controllers/controller-statusGG/matchs.js";
import MatchController from "../controllers/controller-statusGG/match.js";
import SummonerController from "../controllers/controller-statusGG/summoner.js";

const router = new express.Router();

const getHeaders = () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    Origin: "https://developer.riotgames.com/",
    "X-Riot-Token": globalConfig.riotApikey,
  };
  return headers;
};

router
  .post("/wallet", MintTokenController.mintarToken)
  .get("/summoner/:nickname", SummonerController.summoner)
  .get("/match/:id", MatchController.match)
  .get("/matchs/:id", MatchsController.matchs)
  .get("/rankedMatchs/:id", RankedMatchesController.rankedMatches)
  .post("/leaderboards", leaderboardsController.postLeaderboards)
  .get("/leaderboards", leaderboardsController.getLeaderboards);

export default router;
