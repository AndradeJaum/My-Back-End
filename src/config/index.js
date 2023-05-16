import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const env = dotenv.config({
  path: process.env.ENV ? process.env.ENV : ".env",
});
dotenvExpand.expand(env);

export const globalConfig = {
  dbUrl: process.env.DB_URL,
  port: 8000,
  riotApikey: process.env,
  RIOT_APIKEY,
  tokenWallet: process.env.TOKEN,
  cryptumApikey: process.env.CRYPTUM_APIKEY,
  mnemonic: process.env.MNEMONIC,
};

export function loadConfig() {
  const env = dotenv.config({
    path: process.env.ENV ? process.env.ENV : ".env",
  });
  dotenvExpand.expand(env);

  globalConfig.dbUrl = process.env.DB_URL;
  globalConfig.riotApikey = process.env.RIOT_APIKEY;
  globalConfig.port = parseInt(process.env.PORT, 10) || 8000;
  globalConfig.tokenWallet = process.env.TOKEN;
  globalConfig.cryptumApikey = process.env.CRYPTUM_APIKEY;
  globalConfig.mnemonic = process.env.MNEMONIC;
}
