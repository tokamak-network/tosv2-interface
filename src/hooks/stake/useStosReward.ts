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

function useStosReward(
  inputTosAmount?: number,
  inputPeriod?: number
): UseStosReward {
  const [stosReward, setStosRewards] = useState<string>("0");
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const [maxWeeks, setMaxWeeks] = useState<number>(0);
  const [unlockTime, setUnlockTime] = useState<number>(0);
  const { LockTOS_CONTRACT } = useCallContract();
  const modalContractData = useModalContract();
  const { epochUnit } = useLockTOS();

  useEffect(() => {
    async function fetchStosRewardData() {
      if (LockTOS_CONTRACT && inputTosAmount && inputPeriod) {
        const numValue = inputTosAmount || 0;
        const weekPeriod = inputPeriod || 1;

        const oneWeek = parseInt(await LockTOS_CONTRACT.epochUnit());
        const maxTime = parseInt(await LockTOS_CONTRACT.maxTime());
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
  }, [LockTOS_CONTRACT, inputTosAmount, inputPeriod]);

  useEffect(() => {
    async function fetchStosRewardData() {
      if (
        LockTOS_CONTRACT &&
        inputPeriod &&
        modalContractData?.currentEndTimeStamp
      ) {
        //calculate max weeks
        const weekPeriod = inputPeriod;

        if (weekPeriod === undefined) {
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
  }, [LockTOS_CONTRACT, inputPeriod, modalContractData]);

  useEffect(() => {
    //endTime
    async function calculateUnlockTime() {
      if (LockTOS_CONTRACT && inputPeriod) {
        const unlockTimeStamp =
          getNowTimeStamp() + inputPeriod * Number(epochUnit);
        setNewEndTime(convertTimeStamp(unlockTimeStamp, "YYYY. MM.DD. HH:mm"));
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
