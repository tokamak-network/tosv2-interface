import useModal from "hooks/useModal";
import { useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { useQuery } from "@apollo/client";
import commafy from "@/components/commafy";
import useCallContract from "hooks/useCallContract";
import { convertNumber, convertToWei } from "@/components/number";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers, utils } from "ethers";
import usePrice from "hooks/usePrice";
import constant from "constant";

type BondModalData = {
  bondPrice: string;
  marketPrice: string;
  discount: string;
  minBond: string;
  maxBond: string;
  ltosIndex: string;
};

type BondInputData = {
  youWillGet: string;
  endTime: string;
};

function useBondModal() {
  const { selectedModalData } = useModal();
  const propData = selectedModalData as BondCardProps;
  const [bondModalData, setBondModalData] = useState<BondModalData | undefined>(
    undefined
  );
  const [bondInputData, setBondInputData] = useState<BondInputData | undefined>(
    undefined
  );

  const {
    loading,
    error,
    data: apiData,
  } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  const { BondDepositoryProxy_CONTRACT, StakingV2Proxy_CONTRACT } =
    useCallContract();

  const context = useWeb3React();
  const { priceData } = usePrice();
  const { mainnetGasPrice } = constant;

  useEffect(() => {
    async function fetchAsyncData() {
      if (propData && apiData && priceData && BondDepositoryProxy_CONTRACT) {
        const marketData = await BondDepositoryProxy_CONTRACT?.viewMarket(
          propData.index
        );

        const maxBondWei =
          await BondDepositoryProxy_CONTRACT?.purchasableAssetAmountAtOneTime(
            marketData.tosPrice,
            marketData.maxPayout
          );
        const ltosIndexWei = await StakingV2Proxy_CONTRACT?.possibleIndex();

        const gasPriceWei = await context.library?.getGasPrice();
        const gasPrice = Number(utils.formatUnits(gasPriceWei, 9));

        const maxBond = convertNumber({
          amount: maxBondWei?.toString(),
        }) as string;
        const ltosIndex = convertNumber({
          amount: ltosIndexWei?.toString(),
        }) as string;
        const bondPrice = (1 / priceData.tosPrice) * 1e18 * priceData.ethPrice;
        const marketPrice = commafy(apiData.getDashboard[0].tosPrice);
        const discount =
          Number(marketPrice) -
          Number(propData.bondingPrice) / (Number(marketPrice) * 100);

        //minbond
        //285,753 x gasPrice / 1e9 / Discount
        // ex:
        // gasPrice = 30 gwei, Discount = 5% = 0.05
        // Min Bond = 285,753 x 30 / 1e9 / 0.05 = 0.1714518 ETH

        const divParam =
          Number(propData.discountRate.replaceAll("%", "")) / 100;

        const minbond = BigNumber.from(convertToWei("285753"))
          .mul(gasPriceWei)
          .div(convertToWei(divParam.toString()))
          .mul(mainnetGasPrice);

        const convertedMinBond = convertNumber({
          amount: minbond.toString(),
          decimalPoints: 6,
          decimalPlaces: 6,
        });

        setBondModalData({
          bondPrice: `$${commafy(bondPrice)}`,
          marketPrice: `$${marketPrice}`,
          discount: `${commafy(discount)}%`,
          minBond: `${convertedMinBond}`,
          maxBond: `${commafy(maxBond)}`,
          ltosIndex: `${commafy(ltosIndex)}`,
        });
      }
    }
    try {
      fetchAsyncData();
    } catch (e) {
      console.log("**useBondModal err**");
      console.log(e);
    }
  }, [
    propData,
    apiData,
    BondDepositoryProxy_CONTRACT,
    StakingV2Proxy_CONTRACT,
    context?.library,
    priceData,
  ]);

  return {
    bondModalData,
  };
}

export default useBondModal;
