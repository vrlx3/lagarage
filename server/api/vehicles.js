const express = require("express");
const vehiclesRouter = express.Router();

const { createVehicles } = require("../db/vehicles");

//POST / api / vehicles

// add a plate

vehiclesRouter.post("/add", async (req, res, next) => {
  const { lic } = req.body;
  try {
    const addV = await createVehicles(lic);
    return addV;
  } catch (error) {
    console.error(error);
  }
});

module.exports = vehiclesRouter;
