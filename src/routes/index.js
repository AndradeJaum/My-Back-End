import express from "express";
import players from "./playersRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ leaderboards: "players top 5" });
  });

  app.use(express.json(), players);
};

export default routes;
