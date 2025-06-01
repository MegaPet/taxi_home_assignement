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

  private _countProfit(distance : number, fuel_type : 'mild hybrid' | 'gasoline' | 'pure electric') : number{
    
    /**
     * Calculates the profit for a given trip distance and fuel type for short distance.
     * @param distance - The distance of the trip in kilometers.
     * @param fuel_type - The type of fuel used by the vehicle ('mild hybrid', 'gasoline', or 'pure electric').
     * @returns an array, first element is the profit, second is the amount the passangers have to pay.
     */
    function _calc_city_trips(distance : number, fuel_price : number) : [number, number]{
      console.log("\n\t_calc_city_trips\n");
      
      const started_half_hours = Math.floor(((distance * 2) / 30)) + 1; // every km takes 2 minutes. half hours started, automatically starts at 1
      const fuel_cost = distance * fuel_price;
      
      const time_cost = started_half_hours * 2; // every started half-hours costs 2 euros.
      const distance_cost = distance * 2
      const all_cost = time_cost + distance_cost;

      const profit  =  all_cost - fuel_cost
      console.log("\tdistance", distance);
      console.log("\tstarted_half_hours",started_half_hours);
      console.log("\tall_cost",all_cost)
      console.log("\tprofit", profit)
      console.log("\tfuel_cost", fuel_cost)


      // return [time_cost, fuel_cost];
      return [profit, all_cost]
    }

    /**
     * Calculates the profit for a given trip distance and fuel type for long trips.
     * @param distance - The distance of the trip in kilometers.
     * @param fuel_type - The type of fuel used by the vehicle ('mild hybrid', 'gasoline', or 'pure electric').
     * @returns an array, first element is the profit, second is the amount the passangers have to pay.
     */
    function _calc_long_trips(distance: number, fuel_price: number) : [number, number]{
      console.log("\n\t_calc_long_trips\n");
      

      const started_half_hours = Math.floor((distance / 30)) + 1; //every km takes only 1 minutes this time.
      const fuel_cost = distance * fuel_price;
      
      const time_cost = started_half_hours * 2; // every started half-hours costs 2 euros.
      const distance_cost = distance * 2
      const all_cost = time_cost + distance_cost;
      
      const profit = all_cost - fuel_cost;

      console.log("\tdistance", distance);
      console.log("\tstarted_half_hours",started_half_hours);
      console.log("\tall_cost",all_cost)
      console.log("\tprofit",profit);
      console.log("\tfuel_cost", fuel_cost)
      


      return [profit,all_cost]
    }

    const is_short_distance = distance <= 50;
    const fuel_price = (fuel_type === 'pure electric')? 1 : 2;
    
    console.log("is_short_distance",is_short_distance);
    console.log("fuel_price",fuel_price)
    
    if ( is_short_distance){
      return _calc_city_trips(distance, fuel_price)[0];
    }
    const city_profit = _calc_city_trips(50, fuel_price)[0]
    const long_trip_distance = distance - 50;
    const long_profit = _calc_long_trips(long_trip_distance, fuel_price)[0];

    console.log("sum profit", city_profit + long_profit)
    return city_profit + long_profit;
  }

  async listOptimal(passanger_count: number, distance: number) : Promise<Map<VehicleType, number>> {
    console.log(" ---[ listOptimal ]---")
    
    const profit_map = new Map<VehicleType, number>()
  
    const sql = {
      text: `SELECT * FROM vehicles v WHERE v.capacity >= $1 + 1 AND v.range >= $2  `,
      values: [passanger_count, distance]
    };

    try{
      const result = (await db.query<VehicleType>(sql));
      if (!result.rowCount){
        return new Map();
      }
      const available_vehicles : VehicleType[] = result.rows;
      //calc profit for all the cars.
      for (let vehicle of available_vehicles) {
        profit_map.set(vehicle, this._countProfit(distance, vehicle.fuel))
      }

      
      const sortedProfitMap = new Map(
        Array.from(profit_map.entries()).sort((a, b) => b[1] - a[1]) //made by copilot.
      );
      return sortedProfitMap;
    }catch(error){
      console.error(error);
    }
    return new Map;
  }

}



export default new VehiclesDAO();
