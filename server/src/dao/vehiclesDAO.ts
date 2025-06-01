import { text } from "stream/consumers";
import db from "../config/db";
import { VehicleType } from "../Model/Vehicle";

class VehiclesDAO {
  async getAllVehicles(): Promise<VehicleType[]> {
    const sql = `SELECT * FROM vehicles`;
    try {
      const res = await db.query<VehicleType>(sql);
      console.table(res.rows[0]);
      return res.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async addVehicle(vehicle: VehicleType): Promise<boolean> {
    const sql = {
      text: `INSERT INTO vehicles (license_plate, capacity, range, fuel, brand, model) VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [
        vehicle.license_plate,
        vehicle.capacity,
        vehicle.range,
        vehicle.fuel,
        vehicle.brand,
        vehicle.model,
      ],
    };
    try {
      const res = await db.query(sql);

      return res.rowCount ? res.rowCount > 0 : false ;
    } catch (err) {
      throw err;
    }
  }

  async listOptimal(passanger_count: number, distance: number){
    const sql = {
      text: `SELECT * FROM VEHICLES v WHERE v. `
    }

  }

}



export default new VehiclesDAO();
