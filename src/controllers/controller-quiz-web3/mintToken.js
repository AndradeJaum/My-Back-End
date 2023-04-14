class MintTokenController {
  static mintarToken = (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      res.send();
    } catch (error) {
      next(error);
    }
  };
}

export default MintTokenController;
