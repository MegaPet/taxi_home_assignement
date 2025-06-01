import { Router, Request, Response } from "express";
import db from "../config/db";
import { VehicleType } from "../Model/Vehicle";
import vehiclesDAO from "../dao/vehiclesDAO";
import { log, table } from "console";

const router = Router();

router.get("/api/getVehicles", async (req: Request, resp: Response) => {
  try {
    const result = vehiclesDAO.getAllVehicles();
    result.then((data) => {
      resp.json(data);
    });
  } catch (err) {
    console.error(err);
  }
});

router.put("/api/addVehicle", async (req: Request, resp: Response) => {
  let tempCar: VehicleType = req.body as VehicleType;
  if (
    !(
      tempCar.brand &&
      tempCar.capacity &&
      tempCar.fuel &&
      tempCar.license_plate &&
      tempCar.model &&
      tempCar.range
    )
  ) {
    resp.status(403).json({
      success: false,
      message: "Not enough data for car to be stored.",
    });
    return;
  }
  try {
    const result = await vehiclesDAO.addVehicle(tempCar);
    console.log(result);
    if (result) {
      console.log("Vehicle has been added.");
      resp
        .status(201)
        .json({ success: true, message: "Vehicle has been added." });
    } else {
      console.log("Vehicle cannot be added for unknown reasons.");
      resp.status(400).json({
        success: false,
        message: "Vehicle cannot be added for unknown reasons.",
      });
    }
  } catch (err: any) {
    if ((err.code = 23505)) {
      resp
        .status(406)
        .json({ success: false, message: "Vehicle already exists." });
      return;
    }
    console.error(err);
  }
});

router.post("/api/listOptimal", async (req: Request, resp: Response) => {
  let _request: optimalReqType = req.body as optimalReqType;

  if (!(_request.distance && _request.passanger_count)) {
    resp.status(400).json({ success: false, message: "not a valid request." });
  }
  console.table(_request);

  try {
    const result = await vehiclesDAO.listOptimal(
      _request.passanger_count,
      _request.distance
    );
  } catch (err) {
    console.error(err);
  }
});

type optimalReqType = { passanger_count: number; distance: number };

module.exports = router;
