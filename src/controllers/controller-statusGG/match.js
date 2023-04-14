import fetch from "node-fetch";
import getHeaders from "../../routes/index.js";
import MatchInfo from "../../models/MatchInfo.js";

class MatchController {
  static match = async (req, res, next) => {
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
  };
}

export default MatchController;
