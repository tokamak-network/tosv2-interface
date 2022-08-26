import useModal from "hooks/useModal";
import { useCallback, useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import commafy from "@/components/commafy";
import useCallContract from "hooks/useCallContract";
import { convertNumber, convertToWei } from "@/components/number";
import { BigNumber } from "ethers";
import moment from "moment";
import Decimal from "decimal.js";

type BondInputData = {
  youWillGet: {
    ltos: string;
    stos: string;
  };
  endTime: string;
};

function useInputData(inputAmount: string, inputPeriod: number) {
  const { selectedModalData } = useModal();
  const propData = selectedModalData as BondCardProps;
  const marketId = propData.index;
  const [bondInputData, setBondInputData] = useState<BondInputData | undefined>(
    undefined
  );

  const {
    BondDepositoryProxy_CONTRACT,
    StakingV2Proxy_CONTRACT,
    LockTOS_CONTRACT,
  } = useCallContract();

  // set Estimated reward;
  const getEstimatedReward = useCallback(
    async (date: number) => {
      if (
        inputAmount !== "" &&
        inputAmount !== "0" &&
        inputAmount !== undefined &&
        inputPeriod > 0 &&
        LockTOS_CONTRACT
      ) {
        const maxTime = await LockTOS_CONTRACT.maxTime();
        const maxPeriod = parseInt(maxTime);
        const numValue = Number(inputAmount.replaceAll(",", ""));
        const avgProfit = numValue / maxPeriod;
        const estimatedReward = avgProfit * (date - moment().unix());
        const deciamlNum = new Decimal(estimatedReward);
        const resultNum = deciamlNum.toFixed(3, Decimal.ROUND_HALF_UP);
        const result = Number(resultNum).toFixed(2);
        return String(Number(result));
      }
      return "-";
    },
    [LockTOS_CONTRACT, inputPeriod, inputAmount]
  );

  useEffect(() => {
    const fetchListdata = async () => {
      if (inputAmount === "") {
        return setBondInputData({
          youWillGet: {
            ltos: "0",
            stos: "0",
          },
          endTime: "-",
        });
      }
      if (BondDepositoryProxy_CONTRACT && StakingV2Proxy_CONTRACT) {
        const tosAmount =
          await BondDepositoryProxy_CONTRACT.calculateTosAmountForAsset(
            marketId,
            convertToWei(inputAmount)
          );
        const stakingIndex = await StakingV2Proxy_CONTRACT.possibleIndex();
        const LTOS_BN = BigNumber.from(tosAmount).div(stakingIndex);
        const endTime = await getEstimatedReward(inputPeriod);
        setBondInputData({
          youWillGet: {
            ltos: `${convertNumber({ amount: LTOS_BN.toString() }) as string}`,
            stos: "",
          },
          endTime,
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
    inputPeriod,
    getEstimatedReward,
  ]);

  return {
    bondInputData,
  };
}

export default useInputData;
