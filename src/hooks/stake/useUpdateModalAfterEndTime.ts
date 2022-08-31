import { convertNumber, convertToWei } from "@/components/number";
import { convertTimeStamp, getNowTimeStamp } from "@/components/time";
import { BigNumber } from "ethers";
import useStakeId from "hooks/contract/useStakeId";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import useStosReward from "./useStosReward";

type Balance = {
  ltos: string;
  stos: string;
};

type UseUpdateMAfterEndTime = {
  newBalance: Balance;
  newEndTime: string;
};

const defaultBalanceValue = {
  ltos: "0",
  stos: "0",
};

function useUpdateModalAfterEndTime(): UseUpdateMAfterEndTime {
  const [newBalance, setNewBalance] = useState<Balance>(defaultBalanceValue);
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();
  const { stakeId } = useStakeId();
  const { inputValue } = useInput("Stake_screen", "update_modal");
  const { stosReward } = useStosReward();

  //new
  useEffect(() => {
    async function fetchUpdateModalData() {
      if (StakingV2Proxy_CONTRACT && stakeId && inputValue) {
        //new balance
        //case1
        //Only put amount and period
        if (
          inputValue.stake_updateModal_tos_balance !== "" &&
          inputValue.stake_updateModal_period !== ""
        ) {
          const tosAmount = convertToWei(
            inputValue.stake_updateModal_tos_balance
          );
          const LTOS_Index = await StakingV2Proxy_CONTRACT.possibleIndex();
          const LTOS_BN = BigNumber.from(tosAmount).mod(LTOS_Index);
          const remainedLtos = await StakingV2Proxy_CONTRACT.remainedLtos(
            stakeId
          );
          const newLTOS = BigNumber.from(LTOS_BN).add(remainedLtos);
          const ltos =
            convertNumber({ amount: newLTOS.toString(), localeString: true }) ||
            "0";

          return setNewBalance({
            ltos,
            stos: stosReward,
          });
        }
      }
    }
    fetchUpdateModalData().catch((e) => {
      console.log("**useUpdateModalData2 err**");
      console.log(e);
    });
  }, [stakeId, StakingV2Proxy_CONTRACT, inputValue, stosReward]);

  useEffect(() => {
    async function fetchEndTime() {
      if (LockTOS_CONTRACT && inputValue?.stake_updateModal_period) {
        //endTime
        const inputPeriod = inputValue.stake_updateModal_period;
        const sTosEpochUnit = await LockTOS_CONTRACT.epochUnit();
        const unlockTimeStamp =
          getNowTimeStamp() + inputPeriod * Number(sTosEpochUnit.toString());
        const endTime = convertTimeStamp(unlockTimeStamp, "YYYY. MM.DD. HH:mm");
        setNewEndTime(endTime || "-");
      }
    }
    fetchEndTime().catch((e) => {
      console.log("**useUpdateMAfterEndTime2 err**");
      console.log(e);
    });
  }, [LockTOS_CONTRACT, inputValue.stake_updateModal_period]);

  return {
    newBalance,
    newEndTime,
  };
}

export default useUpdateModalAfterEndTime;
