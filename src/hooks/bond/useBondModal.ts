import useModal from "hooks/useModal";
import { useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { useQuery } from "@apollo/client";
import commafy from "@/components/commafy";
import useCallContract from "hooks/useCallContract";
import { convertNumber } from "@/components/number";

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

  useEffect(() => {}, []);

  useEffect(() => {
    async function fetchAsyncData() {
      //   const ltosIndex = await StakingV2Proxy_CONTRACT?.possibleIndex();
      if (propData && apiData) {
        const maxBondWei =
          await BondDepositoryProxy_CONTRACT?.purchasableAseetAmountAtOneTime(
            propData.index
          );
        const maxBond = convertNumber({
          amount: maxBondWei?.toString(),
        }) as string;
        const bondPrice = propData.bondingPrice;
        const marketPrice = commafy(apiData.getDashboard[0].tosPrice);
        const discount =
          Number(marketPrice) -
          Number(bondPrice) /
            (Number(commafy(apiData.getDashboard[0].tosPrice)) * 100);
        setBondModalData({
          bondPrice: `$${bondPrice}`,
          marketPrice: `$${marketPrice}`,
          discount: `${commafy(discount)}%`,
          minBond: "",
          maxBond,
          ltosIndex: "-",
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
  ]);

  return {
    bondModalData,
  };
}

export default useBondModal;
