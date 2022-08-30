import { getNowTimeStamp } from "@/components/time";
import Decimal from "decimal.js";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";

type UseStosReward = {
  stosReward: string;
  newEndTime: string;
};

function useStosReward(): UseStosReward {
  const [stosReward, setStosRewards] = useState<string>("0");
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const { LockTOS_CONTRACT } = useCallContract();
  const { inputValue } = useInput("Stake_screen", "update_modal");

  useEffect(() => {
    async function fetchStosRewardData() {
      if (
        LockTOS_CONTRACT &&
        inputValue.stake_updateModal_tos_balance &&
        inputValue.stake_updateModal_period
      ) {
        const value = inputValue.stake_updateModal_tos_balance;
        const weekPeriod = inputValue.stake_updateModal_period;

        if (value === "" || weekPeriod === "") {
          return;
        }

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
  ]);

  return { stosReward, newEndTime };
}

export default useStosReward;
