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

  // static atualizarPlayer = (req, res) => {
  //   const id = req.params.id;

  //   players.findByIdAndUpdate(id, { $set: req.body }, (err) => {
  //     if (!err) {
  //       res.status(200).send({ message: "Player atualizado com sucesso" });
  //     } else {
  //         res.status(500).send({message: err.message})
  //     }
  //   });
  // };

}

export default PlayerController;
