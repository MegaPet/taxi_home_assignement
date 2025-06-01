import { Router, Request, Response } from "express";
import db from "../config/db";
import { VehicleType } from "../Model/Vehicle";
import vehiclesDAO from "../dao/vehiclesDAO";

const router = Router();

router.get('/api/getVehicles', async (req: Request, resp : Response) => {
  
  try{
    const result = vehiclesDAO.getAllVehicles(); 
    result.then((data) => {
      resp.json(data)
    });
  }catch(err){
    console.error(err)
  }


});


module.exports = router;