import { convertNumber, convertToWei } from "@/components/number";
import useStosReward from "hooks/stake/useStosReward";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";

type UseUnstake = {
  youWillGet: string | undefined;
  stosReward: string | undefined;
  endTime: string | undefined;
};

function useBondModalInputData(): UseUnstake {
  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const { newEndTime, stosReward } = useStosReward(
    inputValue?.bond_modal_balance,
    inputValue?.bond_modal_period
  );

  useEffect(() => {
    async function fetchUnstakeData() {
      if (StakingV2Proxy_CONTRACT && inputValue?.bond_modal_balance) {
        const ethAmount = inputValue.bond_modal_balance;
        const ethAmountWei = convertToWei(ethAmount);
        const LTOS_BN = await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(
          ethAmountWei
        );
        const ltos = convertNumber({ amount: LTOS_BN, localeString: true });
        return setYouWillGet(ltos);
      }
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useBondInputData1 err**");
      console.log(e);
    });
  }, [inputValue?.bond_modal_balance, StakingV2Proxy_CONTRACT]);

  useEffect(() => {
    async function fetchUnstakeData() {
      return setEndTime(newEndTime);
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useBondInputData2 err**");
      console.log(e);
    });
  }, [newEndTime]);

  return { youWillGet, endTime, stosReward };
}

export default useBondModalInputData;
