import db from "../config/db";
import { VehicleType } from "../Model/Vehicle";

class VehiclesDAO {

  async getAllVehicles() : Promise<VehicleType[]> {
    const sql = `SELECT * FROM vehicles`
    try{
      const res = await db.query<VehicleType>(sql);
      console.table(res.rows[0]);
      return res.rows;
    }catch(err){
      console.error(err)
      return [];
    }
  }

}

export default new VehiclesDAO();