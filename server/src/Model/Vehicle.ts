export type VehicleType = {
  license_plate : string,
  capacity: number,
  range : number,
  fuel : 'gasoline' | 'mild hybrid' | 'pure electric',
  brand : string,
  model : string
}