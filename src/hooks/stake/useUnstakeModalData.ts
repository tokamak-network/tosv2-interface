import { convertNumber, convertToWei } from "@/components/number";
import { BigNumber } from "ethers";
import useStakeV2 from "hooks/contract/useStakeV2";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useInputValue from "hooks/useInputValue";
import { useEffect, useState } from "react";

type UseUnstake = {
  maxValue: string;
};

function useUnstakeModalData(stakeId: string | string[]) {
  const [unstakeData, setUnstakeData] = useState<UseUnstake | undefined>(
    undefined
  );
  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [youWillGetMax, setYouWillGetMax] = useState<string | undefined>(
    undefined
  );
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { inputValue } = useInput("Stake_screen", "unstake_modal");
  const { stakeV2 } = useStakeV2();

  useEffect(() => {
    async function fetchUnstakeData() {
      if (StakingV2Proxy_CONTRACT && stakeId) {
        const maxValueBN = await StakingV2Proxy_CONTRACT.remainedLtos(stakeId);
        // const maxValueData = await StakingV2Proxy_CONTRACT.claimableTos(
        //   stakeId
        // );
        const maxValue = convertNumber({
          amount: maxValueBN.toString(),
          round: false,
        });
        if (maxValue) {
          return setUnstakeData({ maxValue });
        }
      }
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useUnstake fetchUnstakeData1 err**");
      console.log(e);
    });
  }, [stakeId, StakingV2Proxy_CONTRACT]);

  useEffect(() => {
    async function fetchUnstakeData() {
      if (
        StakingV2Proxy_CONTRACT &&
        inputValue.stake_unstakeModal_balance &&
        stakeV2?.ltosIndexBN
      ) {
        if (inputValue.stake_unstakeModal_balance === "") {
          return setYouWillGet("0");
        }
        const inputAmount = convertToWei(inputValue.stake_unstakeModal_balance);
        // const getTosAmount = await StakingV2Proxy_CONTRACT.getLtosToTos(
        //   inputAmount
        // );
        const getTosAmount = BigNumber.from(inputAmount).mul(
          stakeV2.ltosIndexBN
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
      console.log("**useUnstake fetchUnstakeData2 err**");
      console.log(e);
    });
  }, [StakingV2Proxy_CONTRACT, inputValue.stake_unstakeModal_balance, stakeV2]);

  useEffect(() => {
    async function fetchUnstakeData() {
      if (StakingV2Proxy_CONTRACT && stakeV2?.ltosIndexBN) {
        const maxValueBN = await StakingV2Proxy_CONTRACT.remainedLtos(stakeId);
        const maxValue =
          await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(maxValueBN);
        const convertedGetMaxTosAmount = convertNumber({
          amount: maxValue.toString(),
          localeString: true,
        });
        return setYouWillGetMax(convertedGetMaxTosAmount);
      }
      return setYouWillGet("0");
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useUnstake fetchUnstakeData3 err**");
      console.log(e);
    });
  }, [StakingV2Proxy_CONTRACT, stakeId, stakeV2]);

  return { unstakeData, youWillGet, youWillGetMax };
}

export default useUnstakeModalData;
