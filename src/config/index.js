import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export const globalConfig = {
  dbUrl: "",
  port: 8000,
  riotApikey: "",
  tokenWallet: "",
  cryptumApikey: "niAcYQ2gLni0dZzt6yRd30MmJGVfjZGz",
  mnemonic: "",
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
