import useModal from "hooks/useModal";
import { useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import commafy from "@/components/commafy";
import useCallContract from "hooks/useCallContract";
import { convertNumber, convertToWei } from "@/components/number";
import { BigNumber } from "ethers";

type BondInputData = {
  youWillGet: string;
  endTime: string;
};

function useInputData(inputAmount: string) {
  const { selectedModalData } = useModal();
  const propData = selectedModalData as BondCardProps;
  const marketId = propData.index;
  const [bondInputData, setBondInputData] = useState<BondInputData | undefined>(
    undefined
  );

  const { BondDepositoryProxy_CONTRACT, StakingV2Proxy_CONTRACT } =
    useCallContract();

  useEffect(() => {
    const fetchListdata = async () => {
      if (inputAmount === "") {
        return;
      }
      if (BondDepositoryProxy_CONTRACT && StakingV2Proxy_CONTRACT) {
        const tosAmount =
          await BondDepositoryProxy_CONTRACT.calculateTosAmountForAsset(
            marketId,
            convertToWei(inputAmount)
          );
        const stakingIndex = await StakingV2Proxy_CONTRACT.possibleIndex();
        const LTOS_BN = BigNumber.from(tosAmount).div(stakingIndex);
        setBondInputData({
          youWillGet: convertNumber({ amount: LTOS_BN.toString() }) as string,
          endTime: "",
        });
      }
    };
    fetchListdata().catch((e) => {
      console.log("**useInputData err**");
      console.log(e);
    });
  }, [
    BondDepositoryProxy_CONTRACT,
    StakingV2Proxy_CONTRACT,
    marketId,
    inputAmount,
  ]);

  return {
    bondInputData,
  };
}

export default useInputData;
