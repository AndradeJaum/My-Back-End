import CryptumSDK from "cryptum-sdk";
import { validateEthAddress } from "cryptum-sdk/dist/src/services/validations/index.js";
import { globalConfig } from "../../config/index.js";

console.log(globalConfig);
const sdk = new CryptumSDK({
  environment: "testnet",
  apiKey: globalConfig.cryptumApikey,
});
const mnemonic = globalConfig.mnemonic;

const wallet = await sdk.wallet.generateWallet({ mnemonic, protocol: "CELO" });

class MintTokenController {
  static mintarToken = async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data.address);

      validateEthAddress(data.address);

      const { hash } = await sdk.token.mint({
        wallet,
        protocol: "CELO",
        token: globalConfig.tokenWallet,
        destination: data.address,
        amount: "1",
      });

      res.send(hash).status(200);
    } catch (error) {
      next(error);
    }
  };
}

export default MintTokenController;
