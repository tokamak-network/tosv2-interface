import { convertNumber, convertToWei } from "@/components/number";
import useCallContract from "hooks/useCallContract";
import useInputValue from "hooks/useInputValue";
import { useEffect, useState } from "react";

type UseUnstake = {
  maxValue: string;
};

function useUnstake(stakeId: string | string[]) {
  const [unstakeData, setUnstakeData] = useState<UseUnstake | undefined>(
    undefined
  );
  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { inputValues } = useInputValue();

  useEffect(() => {
    async function fetchUnstakeData() {
      if (StakingV2Proxy_CONTRACT && stakeId) {
        const balanceOfId = await StakingV2Proxy_CONTRACT.balanceOfId(stakeId);
        const maxValueData = await StakingV2Proxy_CONTRACT.claimableTos(
          stakeId
        );
        const maxValue = convertNumber({
          amount: maxValueData.toString(),
          round: false,
        });
        if (maxValue) return setUnstakeData({ maxValue });
      }
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useUnstake err**");
      console.log(e);
    });
  }, [stakeId, StakingV2Proxy_CONTRACT]);

  useEffect(() => {
    async function fetchUnstakeData() {
      if (StakingV2Proxy_CONTRACT && inputValues.stake_unstake_modal_balance) {
        if (inputValues.stake_unstake_modal_balance === "") {
          return setYouWillGet("0");
        }
        const inputAmount = convertToWei(
          inputValues.stake_unstake_modal_balance
        );
        console.log(inputAmount);
        const getTosAmount = await StakingV2Proxy_CONTRACT.getLtosToTos(
          inputAmount
        );
        const convertedGetTosAmount = convertNumber({
          amount: getTosAmount.toString(),
          localeString: true,
        });
        return setYouWillGet(convertedGetTosAmount || "0");
      }
      return setYouWillGet("0");
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useUnstake err**");
      console.log(e);
    });
  }, [StakingV2Proxy_CONTRACT, inputValues.stake_unstake_modal_balance]);

  return { unstakeData, youWillGet };
}

export default useUnstake;
