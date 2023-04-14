import fetch from "node-fetch";
import getHeaders from "../../routes/index.js";

class RankedMatchesController {
  static rankedMatches = async (req, res, next) => {
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
  };
}

export default RankedMatchesController;
