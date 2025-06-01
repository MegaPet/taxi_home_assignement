import config from './config';
import { Pool, QueryResult} from 'pg';

const db = new Pool({
  user: 'postgres',
  host: config.host,
  port: config.port,
  database: 'vehicles',
  password: config.password
})

db.connect((err, client, done) => {
  console.table(config)
  if(err){
    console.error("Cannot connet:\t",err.stack);
  }else{
    console.log("Connection successfull");
    client?.release();
  }
})

export default db;