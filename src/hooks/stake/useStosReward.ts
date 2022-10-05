import commafy from "@/components/commafy";
import { convertNumber } from "@/components/number";
import { convertTimeStamp, getNowTimeStamp } from "@/components/time";
import { modalLoadingState } from "atom/global/modal";
import constant from "constant";
import Decimal from "decimal.js";
import useLockTOS from "hooks/contract/useLockTOS";
import useModalContract from "hooks/contract/useModalContract";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type UseStosReward = {
  stosReward: string;
  originalTosAmount: string;
  newEndTime: string;
  maxWeeks: number;
  unlockTime: number;
};

function useStosReward(
  inputTosAmount?: number,
  inputPeriod?: number
): UseStosReward {
  const [stosReward, setStosRewards] = useState<string>("0");
  const [originalTosAmount, setOriginalTosAmount] = useState<string>("-");
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const [maxWeeks, setMaxWeeks] = useState<number>(156);
  const [unlockTime, setUnlockTime] = useState<number>(0);
  const { LockTOS_CONTRACT } = useCallContract();
  const modalContractData = useModalContract();
  const { epochUnit } = useLockTOS();
  const { rebasePeriod } = constant;
  const [isLoading, setLoading] = useRecoilState(modalLoadingState);

  useEffect(() => {
    async function fetchStosRewardData() {
      if (typeof inputTosAmount === "number" && isNaN(inputTosAmount)) {
        return setStosRewards("-");
      }
      if (inputTosAmount === undefined) {
        return setStosRewards("-");
      }
      if (inputTosAmount === 0) {
        return setStosRewards("0");
      }
      if (LockTOS_CONTRACT && inputTosAmount && inputPeriod) {
        const weekPeriod = inputPeriod || 1;

        //New script
        const interestRate = 0.00008704505; // 이자율 0.0087% = 0.000087 (APY =9.994%)
        const periodWeeksTimeStamp = Math.floor(Number(inputPeriod) * 604800);
        const n = Math.floor(periodWeeksTimeStamp / rebasePeriod);
        const pow = (1 + interestRate) ** n;
        const resultInputAmount = inputTosAmount * pow;

        setOriginalTosAmount(commafy(resultInputAmount));

        //Old script
        const oneWeek = parseInt(await LockTOS_CONTRACT.epochUnit());
        const maxTime = parseInt(await LockTOS_CONTRACT.maxTime());
        const avgProfit = resultInputAmount / maxTime;
        const now = getNowTimeStamp();
        const date =
          Math.floor((now + weekPeriod * oneWeek) / oneWeek) * oneWeek;
        const estimatedReward = avgProfit * (date - now);
        const deciamlNum = new Decimal(estimatedReward);
        const resultNum = deciamlNum.toFixed(3, Decimal.ROUND_HALF_UP);

        if (n > 0) {
          return setStosRewards(commafy(resultNum.toString()) || "-");
        } else {
          return setStosRewards("0");
        }
      }
    }
    fetchStosRewardData()
      .catch((e) => {
        console.log("**fetchStosRewardData err**");
        console.log(e);
      })
      .finally(() => {
        setLoading({ ...isLoading, stosReward: false });
      });
  }, [LockTOS_CONTRACT, inputTosAmount, inputPeriod, rebasePeriod]);

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

  return { stosReward, newEndTime, maxWeeks, unlockTime, originalTosAmount };
}

export default useStosReward;
