import express from "express";
import fetch from "node-fetch";
import Player from "../models/Player.js";
import MatchInfo from "../models/MatchInfo.js";
import { globalConfig } from "../config/index.js";

const router = new express.Router();

const getHeaders = () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    Origin: "https://developer.riotgames.com/",
    "X-Riot-Token": globalConfig.riotApikey,
  };
  return headers;
};

router.get("/summoner/:nickname", async (req, res, next) => {
  try {
    const region = req.query.region;
    const nickname = req.params.nickname;

    const response = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}`,
      {
        headers: getHeaders(),
      }
    );

    const summoner = await response.json();

    const data = await fetch(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}`,
      {
        headers: getHeaders(),
      }
    );

    const summonerDetail = await data.json();

    const stats = {
      RANKED_FLEX_SR: {},
      RANKED_SOLO_5x5: {},
    };

    summonerDetail.forEach((item) => {
      const queueType = item.queueType;
      if (queueType != "RANKED_FLEX_SR" && queueType != "RANKED_SOLO_5x5") {
        return;
      }
      const elo = {
        tier: item.tier,
        rank: item.rank,
      };
      Object.assign(stats[queueType], elo);

      stats[queueType].wins = item.wins;
      stats[queueType].losses = item.losses;
      const matchsAmount = item.wins + item.losses;
      stats[queueType].matchsAmount = matchsAmount;

      stats[queueType].winrate = ((item.wins * 100) / matchsAmount).toFixed();
    });

    Object.assign(summoner, stats);

    res.send(summoner);
  } catch (error) {
    next(error);
  }
});

router.get("/match/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    let matchDb = await MatchInfo.findById(id);

    if (!matchDb) {
      const response = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
        {
          headers: getHeaders(),
        }
      );
      const match = await response.json();
      matchDb = await MatchInfo.create({
        _id: match.metadata.matchId,
        matchDetail: match,
      });
    }
    res.send(matchDb);
  } catch (error) {
    next(error);
  }
});

router.get("/matchs/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=20`,
      {
        headers: getHeaders(),
      }
    );
    const matchs = await response.json();
    res.send(matchs);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/rankedMatchs/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await fetch(
      `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
      {
        headers: getHeaders(),
      }
    );
    const rankedMatchs = await response.json();
    res.send(rankedMatchs);
  } catch (error) {
    next(error);
  }
});

router.post("/leaderboards", async (req, res, next) => {
  try {
    const data = req.body;

    const playerToSave = {
      _id: data.summonerId,
      summonerName: data.summonerName,
      rankedSolo: data.solo,
      rankedFlex: data.flex,
    };

    let summonerDb = await Player.findOneAndUpdate(
      { _id: data.summonerId },
      { $set: { ...playerToSave } }
    );

    if (!summonerDb) {
      const player = new Player(playerToSave);
      await player.save();
    }
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.post("/wallet", async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);

    res.send();
  } catch (error) {
    next(error);
  }
});

router.get("/leaderboards", async (req, res, next) => {
  try {
    const limit = req.query.limit;
    const rankedType = req.query.rankedType;

    const leaderboardsData = await Player.find({
      [`${rankedType}.winrate`]: { $ne: null },
    })
      .sort({
        [`${rankedType}.winrate`]: -1,
      })
      .limit(limit);

    const leaderboards = leaderboardsData.map((i) => {
      return {
        summonerName: i.summonerName,
        stats: i[rankedType],
      };
    });

    res.send(leaderboards);
  } catch (error) {
    next(error);
  }
});

export default router;
