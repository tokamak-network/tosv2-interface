import commafy from "@/components/commafy";
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
  ltos: "-",
  stos: "-",
};

function useUpdateModalData(
  newBalanceType: 1 | 2 | 3 | undefined
): UseUpdateModalData {
  const [currentBalance, setCurrentBalance] =
    useState<Balance>(defaultBalanceValue);
  const [newStosBalance, setNewStosBalance] = useState<string>("-");
  const [newLtosBalance, setNewLtosBalance] = useState<string>("-");
  const [newBalance, setNewBalance] = useState<Balance>(defaultBalanceValue);
  const [currentEndTime, setCurrentEndTime] = useState<string>("-");
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const [leftWeeks, setLeftWeeks] = useState<number>(1);

  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { stakeId } = useStakeId();
  const modalContractData = useModalContract();
  const { inputValue } = useInput("Stake_screen", "update_modal");
  const { stosReward } = useStosReward(
    inputValue.stake_updateModal_tos_balance,
    inputValue.stake_updateModal_period - leftWeeks
  );
  const { unlockTime } = useStosReward(
    inputValue.stake_updateModal_tos_balance,
    inputValue.stake_updateModal_period + leftWeeks
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
      if (newBalanceType === undefined) {
        setNewBalance({
          ltos: "-",
          stos: "-",
        });
      }
      if (
        StakingV2Proxy_CONTRACT &&
        stakeId &&
        inputValue &&
        modalContractData &&
        newBalanceType
      ) {
        //new balance
        //case1
        //Only increate amount
        const ltosBN = modalContractData.ltosBN;
        const stosBN = modalContractData.stosBN;

        console.log(newBalanceType);

        if (newBalanceType === 1) {
          console.log("--1--");

          const tosAmount = convertToWei(
            inputValue.stake_updateModal_tos_balance
          );
          const possibleLTOS =
            await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(tosAmount);
          const newLTOS = BigNumber.from(possibleLTOS).add(ltosBN);
          const ltos =
            convertNumber({
              amount: newLTOS.toString(),
              localeString: false,
              round: false,
            }) || "0";
          const resultLtos =
            Number(currentBalance.ltos.replaceAll(",", "")) +
            Number(ltos.replaceAll(",", ""));
          const resultStos =
            Number(currentBalance.stos.replaceAll(",", "")) +
            Number(stosReward.replaceAll(",", ""));

          console.log(currentBalance.stos);
          console.log(stosReward);

          const newEndTime = modalContractData?.currentEndTime;
          setNewEndTime(newEndTime || "-");
          setNewBalance({
            ltos: commafy(resultLtos),
            stos: commafy(resultStos),
          });
          return setNewEndTime(
            convertTimeStamp(unlockTime, "YYYY. MM.DD. HH:mm")
          );
        }

        //case2
        //Only increase period
        if (newBalanceType === 2) {
          console.log("--2--");

          const resultLtos = Number(currentBalance.ltos.replaceAll(",", ""));
          const resultStos =
            Number(currentBalance.stos.replaceAll(",", "")) +
            Number(stosReward.replaceAll(",", ""));

          setNewStosBalance(commafy(resultStos));
          setCurrentBalance({
            ltos: commafy(resultLtos),
            stos: commafy(resultStos),
          });
          return setNewEndTime(
            convertTimeStamp(unlockTime, "YYYY. MM.DD. HH:mm")
          );
        }

        //case3
        //increase amount and period
        if (newBalanceType === 3) {
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

          const resultLtos =
            Number(currentBalance.ltos.replaceAll(",", "")) +
            Number(ltos.replaceAll(",", ""));
          const resultStos =
            Number(currentBalance.stos.replaceAll(",", "")) +
            Number(stosReward.replaceAll(",", ""));

          setNewBalance({
            ltos: commafy(resultLtos),
            stos: commafy(resultStos),
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
    unlockTime,
    currentBalance,
    newBalanceType,
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
