import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  username: string;
  password: string;
  host: string
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  username: process.env.USERNAME || 'postgres',
  password: process.env.PASSWORD || 'admin',
  host: process.env.HOST || 'localhost'
};

export default config;