import { convertTimeStamp, getNowTimeStamp } from "@/components/time";
import Decimal from "decimal.js";
import useLockTOS from "hooks/contract/useLockTOS";
import useModalContract from "hooks/contract/useModalContract";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";

type UseStosReward = {
  stosReward: string;
  newEndTime: string;
  maxWeeks: number;
  unlockTime: number;
};

function useStosReward(inputPeriod?: number): UseStosReward {
  const [stosReward, setStosRewards] = useState<string>("0");
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const [maxWeeks, setMaxWeeks] = useState<number>(0);
  const [unlockTime, setUnlockTime] = useState<number>(0);
  const { LockTOS_CONTRACT } = useCallContract();
  const { inputValue } = useInput("Stake_screen", "update_modal");
  const modalContractData = useModalContract();
  const { epochUnit } = useLockTOS();

  useEffect(() => {
    async function fetchStosRewardData() {
      if (
        LockTOS_CONTRACT &&
        inputValue.stake_updateModal_tos_balance &&
        inputValue.stake_updateModal_period &&
        modalContractData?.currentEndTimeStamp
      ) {
        const value =
          inputValue.stake_updateModal_tos_balance === ""
            ? 0
            : inputValue.stake_updateModal_tos_balance;
        const weekPeriod =
          inputValue.stake_updateModal_period === ""
            ? 1
            : inputValue.stake_updateModal_period;

        const oneWeek = parseInt(await LockTOS_CONTRACT.epochUnit());
        const maxTime = parseInt(await LockTOS_CONTRACT.maxTime());
        const numValue = Number(value.replaceAll(",", ""));
        const avgProfit = numValue / maxTime;

        const now = getNowTimeStamp();
        const date =
          Math.floor((now + weekPeriod * oneWeek) / oneWeek) * oneWeek;

        const estimatedReward = avgProfit * (date - now);
        const deciamlNum = new Decimal(estimatedReward);
        const resultNum = deciamlNum.toFixed(3, Decimal.ROUND_HALF_UP);
        const stosReward = Number(resultNum).toFixed(2);

        return setStosRewards(stosReward);
      }
    }
    fetchStosRewardData().catch((e) => {
      console.log("**fetchStosRewardData err**");
      console.log(e);
    });
  }, [
    LockTOS_CONTRACT,
    inputValue.stake_updateModal_tos_balance,
    inputValue.stake_updateModal_period,
    modalContractData,
  ]);

  useEffect(() => {
    async function fetchStosRewardData() {
      if (
        LockTOS_CONTRACT &&
        inputValue.stake_updateModal_period &&
        modalContractData?.currentEndTimeStamp
      ) {
        //calculate max weeks
        const weekPeriod = inputValue.stake_updateModal_period;

        if (weekPeriod === "") {
          return;
        }

        const oneWeek = parseInt(await LockTOS_CONTRACT.epochUnit());
        const maxTime = parseInt(await LockTOS_CONTRACT.maxTime());
        const now = getNowTimeStamp();
        const endTime = modalContractData?.currentEndTimeStamp;
        const timeLeft = endTime - now;
        const maxPeriod = maxTime - timeLeft;
        const maxWeeks = Math.floor(maxPeriod / oneWeek);

        return setMaxWeeks(maxWeeks);
      }
    }
    fetchStosRewardData().catch((e) => {
      console.log("**fetchStosRewardData err**");
      console.log(e);
    });
  }, [
    LockTOS_CONTRACT,
    inputValue.stake_updateModal_period,
    modalContractData,
  ]);

  useEffect(() => {
    //endTime
    async function calculateUnlockTime() {
      if (LockTOS_CONTRACT && inputPeriod) {
        const unlockTimeStamp =
          getNowTimeStamp() + inputPeriod * Number(epochUnit);
        return setUnlockTime(unlockTimeStamp);
      }
    }

    calculateUnlockTime().catch((e) => {
      console.log("**fetchStosRewardData3 err**");
      console.log(e);
    });
  }, [LockTOS_CONTRACT, inputPeriod, epochUnit]);

  return { stosReward, newEndTime, maxWeeks, unlockTime };
}

export default useStosReward;
