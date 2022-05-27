import express from "express";
import fetch from "node-fetch";
import Player from "../models/Player.js";

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
  const player = new Player({ player: summoner.name });
  await player.save();
  res.send(summoner);
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
  res.send(match);
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

export default router;
