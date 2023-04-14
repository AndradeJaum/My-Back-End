import fetch from "node-fetch";
import getHeaders from "../../routes/index.js";

class MatchsController {
  static matchs = async (req, res, next) => {
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
  };
}

export default MatchsController;
