import { convertNumber, convertToWei } from "@/components/number";
import { convertTimeStamp, getNowTimeStamp } from "@/components/time";
import { BigNumber } from "ethers";
import useLockTOS from "hooks/contract/useLockTOS";
import useModalContract from "hooks/contract/useModalContract";
import useStakeId from "hooks/contract/useStakeId";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import moment from "moment";
import { useEffect, useState } from "react";
import useStosReward from "./useStosReward";

type Balance = {
  ltos: string;
  stos: string;
};

type UseUpdateModalData = {
  currentBalance: Balance;
  newBalance: Balance;
  currentEndTime: string;
  newEndTime: string;
  leftWeeks: number;
};

const defaultBalanceValue = {
  ltos: "0",
  stos: "0",
};

function useUpdateModalData(): UseUpdateModalData {
  const [currentBalance, setCurrentBalance] =
    useState<Balance>(defaultBalanceValue);
  const [newBalance, setNewBalance] = useState<Balance>(defaultBalanceValue);
  const [currentEndTime, setCurrentEndTime] = useState<string>("-");
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const [leftWeeks, setLeftWeeks] = useState<number>(1);

  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { stakeId } = useStakeId();
  const modalContractData = useModalContract();
  const { inputValue } = useInput("Stake_screen", "update_modal");
  const { stosReward, unlockTime } = useStosReward(
    inputValue.stake_updateModal_period
  );
  const { epochUnit } = useLockTOS();

  //current
  useEffect(() => {
    async function fetchUpdateModalData() {
      if (StakingV2Proxy_CONTRACT && stakeId && modalContractData) {
        //current balance
        const ltos = modalContractData.ltosBalance;
        const stos = modalContractData.stosBalance;
        const currentBalance = { ltos, stos };
        const currentEndTime = modalContractData.currentEndTime;
        const currentEndTimeStamp = modalContractData.currentEndTimeStamp;

        setCurrentEndTime(currentEndTime);
        setCurrentBalance(currentBalance);

        //weeks left
        const now = getNowTimeStamp();
        const timeDiff = currentEndTimeStamp - now;
        const timeLeft = timeDiff / epochUnit;
        setLeftWeeks(Math.ceil(timeLeft));

        console.log(now, timeDiff, timeLeft, epochUnit);
      }
    }
    fetchUpdateModalData().catch((e) => {
      console.log("**useUpdateModalData1 err**");
      console.log(e);
    });
  }, [stakeId, StakingV2Proxy_CONTRACT, modalContractData, epochUnit]);

  //new
  useEffect(() => {
    async function fetchUpdateModalData() {
      if (StakingV2Proxy_CONTRACT && stakeId && inputValue) {
        //new balance
        //case1
        //Only increate amount
        if (
          inputValue.stake_updateModal_tos_balance !== "" &&
          inputValue.stake_updateModal_period === ""
        ) {
          console.log("--1--");
          const tosAmount = convertToWei(
            inputValue.stake_updateModal_tos_balance
          );
          const newLTOS =
            await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(tosAmount);

          const ltos =
            convertNumber({
              amount: newLTOS.toString(),
              localeString: true,
              round: false,
            }) || "0";

          const newEndTime = modalContractData?.currentEndTime;
          setNewEndTime(newEndTime || "-");
          return setNewBalance({
            ltos,
            stos: stosReward,
          });
        }

        //case2
        //Only increase period
        if (
          inputValue.stake_updateModal_tos_balance === "" &&
          inputValue.stake_updateModal_period !== ""
        ) {
          console.log("--2--");
          return setNewEndTime(
            convertTimeStamp(unlockTime, "YYYY. MM.DD. HH:mm")
          );
        }

        //case3
        //increase amount and period
        if (
          inputValue.stake_updateModal_tos_balance !== "" &&
          inputValue.stake_updateModal_period !== ""
        ) {
          console.log("--3--");
          const tosAmount = convertToWei(
            inputValue.stake_updateModal_tos_balance
          );
          const newLTOS =
            await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(tosAmount);

          const ltos =
            convertNumber({
              amount: newLTOS.toString(),
              localeString: true,
              round: false,
            }) || "0";
          setNewBalance({
            ltos,
            stos: stosReward,
          });
          return setNewEndTime(
            convertTimeStamp(unlockTime, "YYYY. MM.DD. HH:mm")
          );
        }
      }
    }
    fetchUpdateModalData().catch((e) => {
      console.log("**useUpdateModalData2 err**");
      console.log(e);
    });
  }, [
    stakeId,
    StakingV2Proxy_CONTRACT,
    inputValue,
    stosReward,
    modalContractData,
  ]);

  return {
    currentBalance,
    newBalance,
    currentEndTime,
    newEndTime,
    leftWeeks,
  };
}

export default useUpdateModalData;
