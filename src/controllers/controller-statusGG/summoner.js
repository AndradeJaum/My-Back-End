import fetch from "node-fetch";
import getHeaders from "../../routes/index.js";

class SummonerController {
  static summoner = async (req, res, next) => {
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
  };
}

export default SummonerController;
