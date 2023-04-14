import CryptumSDK from "cryptum-sdk";
import { globalConfig } from "../../config/index.js";

const sdk = new CryptumSDK({
  environment: "testnet",
  apiKey: globalConfig.cryptumApikey,
});
const mnemonic = globalConfig.mnemonic

const wallet = await sdk.wallet.generateWallet({ mnemonic , protocol: "CELO" });

class MintTokenController {
  static mintarToken = async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);

      const { hash } = await sdk.token.mint({
        wallet,
        protocol: "CELO",
        token: globalConfig.tokenWallet,
        destination: data.address,
        amount: "1",
      });

      console.log({ hash });
      res.send();
    } catch (error) {
      next(error);
    }
  };
}

export default MintTokenController;
