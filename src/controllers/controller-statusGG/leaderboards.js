import Player from "../../models/Player.js"

class leaderboardsController {
  static getLeaderboards = async (req, res, next) => {
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
  };

  static postLeaderboards = async (req, res, next) => {
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
  };
}

export default leaderboardsController;
