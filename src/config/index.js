import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export const globalConfig = {
  dbUrl: process.env.DB_URL,
  port: 8000,
  riot_apikey: process.env.APIKEY
}

export function loadConfig() {
  const env = dotenv.config({
    path: process.env.ENV ? process.env.ENV : '.env',
  });
  dotenvExpand.expand(env);

  globalConfig.dbUrl = process.env.DB_URL;
  globalConfig.port = parseInt(process.env.PORT, 10) || 8000;
}