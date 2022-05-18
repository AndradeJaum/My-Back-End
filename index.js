import fetch from "node-fetch";
import express from "express";
import cors from "cors";

const apiKey = "RGAPI-d3e2662d-e5e9-4feb-9d0e-28ba43050f39";

const app = express();
app.use(cors());
const port = 8000;

// Summoner Request
app.get("/summoner/:nickname", async (req, res) => {
  const region = req.query.region;
  const nickname = req.params.nickname;
  console.time("Summoner");
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": apiKey,
      },
    }
  );
  const summoner = await response.json();
  res.send(summoner);
  console.log(summoner);
  console.timeEnd("Summoner");
});

// Request of the last 20 games
app.get("/matchs/:id", async (req, res) => {
  const id = req.params.id;
  console.time("Matchs");
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=20`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": apiKey,
      },
    }
  );
  const matchs = await response.json();
  res.send(matchs);
  console.log(matchs);
  console.timeEnd("Matchs");
});

// Match Request
app.get("/match/:id", async (req, res) => {
  const id = req.params.id;
  console.time("Match");
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": apiKey,
      },
    }
  );
  const match = await response.json();
  res.send(match);
  console.timeEnd("Match");
});

// Rankeds Request
app.get("/rankedMatchs/:id", async (req, res) => {
  const id = req.params.id;
  console.time("Rankeds");
  const response = await fetch(
    `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Origin: "https://developer.riotgames.com/",
        "X-Riot-Token": apiKey,
      },
    }
  );
  const rankedMatchs = await response.json();
  res.send(rankedMatchs);
  console.log(rankedMatchs);
  console.timeEnd("Rankeds")
});
// searchByName("osteoposose", "br1");

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
