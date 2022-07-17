import express, { response } from "express";
import fetch from "node-fetch";
import Player from "../models/Player.js";
import MatchInfo from "../models/MatchInfo.js";

const router = new express.Router();

router.get("/", async (req, res) => {
  res.status(200).send({ leaderboards: "players top 5" });
});

router.get("/summoner/:nickname", async (req, res) => {
  const region = req.query.region;
  const nickname = req.params.nickname;

  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": process.env.API_KEY,
      },
    }
  );
  const summoner = await response.json();
  res.send(summoner);
});

router.get("/match/:id", async (req, res) => {
  const id = req.params.id;
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": process.env.API_KEY,
      },
    }
  );
  const match = await response.json();
  const matchInfo = new MatchInfo({ matchDetail: match });
  await matchInfo.save();
  res.send(match);
});

router.get("/matchs/:id", async (req, res) => {
  const id = req.params.id;
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=20`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": process.env.API_KEY,
      },
    }
  );
  const matchs = await response.json();
  res.send(matchs);
});

router.get("/rankedMatchs/:id", async (req, res) => {
  const id = req.params.id;
  const response = await fetch(
    `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": process.env.API_KEY,
      },
    }
  );
  const rankedMatchs = await response.json();
  res.send(rankedMatchs);
});

router.post("/leaderboards", async (req, res) => {
  const data = req.body;

  const playerToSave = {
    summonerName: data.summoner.name,
    rankedSolo: data.solo,
    rankedFlex: data.flex,
  };

  let summonerDb = await Player.findOneAndUpdate(
    { summonerName: data.summoner.name },
    { $set: { ...playerToSave } }
  );

  if (!summonerDb) {
    console.log("Cadastrei");
    const player = new Player(playerToSave);
    await player.save();
  }
  res.status(201).send();
});

router.get("/leaderboards", async (req, res) => {
  const limit = req.query.limit;
  const leaderboardType = req.query.leaderboardType;

  const leaderboards = await Player.find({
    [`${leaderboardType}.winrate`]: { $ne: null },
  })
    .sort({
      [`${leaderboardType}.winrate`]: -1,
    })
    .limit(limit);

  console.log(leaderboards);
  res.send(leaderboards);
});

export default router;
