import players from "../models/Player.js";

class PlayerController {
  static listarPlayers = (req, res) => {
    players.find((err, players) => {
      res.status(200).json(players);
    });
  };
  
  static cadastrarPlayer = (req, res) => {
    let player = new players(req.body);
    
    player.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao cadastrar player` });
      } else {
        res.status(201).send(player.toJSON());
      }
    });
  };

}

export default PlayerController;
