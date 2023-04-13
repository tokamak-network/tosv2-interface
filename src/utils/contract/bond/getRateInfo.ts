import { Contract } from "ethers";
import BonusRateAbi from "services/abis/BonusRate.json";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

export async function getRateInfo(
  marketId: string | number,
  BondDepositoryProxy_CONTRACT: Contract,
  Provider: Web3Provider | JsonRpcSigner
): Promise<number[] | undefined> {
  const marketInfo = await BondDepositoryProxy_CONTRACT.viewMarket(marketId);

  const bonusInfo = marketInfo?.bonusInfo;
  if (bonusInfo?.bonusRatesAddress && bonusInfo?.bonusRatesId && Provider) {
    const BonusRate_CONTRACT = new Contract(
      bonusInfo.bonusRatesAddress,
      BonusRateAbi.abi,
      Provider
    );
    const response = await BonusRate_CONTRACT.getRatesInfo(
      bonusInfo?.bonusRatesId
    );
    if (response?.rates) return response.rates as number[];
  }
  return undefined;
}
