import { convertNumber, convertToWei } from "@/components/number";
import { BigNumber } from "ethers";
import useModalContract from "hooks/contract/useModalContract";
import useStakeId from "hooks/contract/useStakeId";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
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
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { stakeId } = useStakeId();
  const { modalContractData } = useModalContract();
  const { inputValue } = useInput("Stake_screen", "update_modal");
  const { stosReward } = useStosReward();

  //current
  useEffect(() => {
    async function fetchUpdateModalData() {
      if (StakingV2Proxy_CONTRACT && stakeId && modalContractData) {
        //current balance
        const ltos = modalContractData.ltosBalance;
        const stos = modalContractData.stosBalance;
        const currentBalance = { ltos, stos };
        const currentEndTime = modalContractData.currentEndTime;

        setCurrentBalance(currentBalance);

        //current end time
        const stakeInfo = await StakingV2Proxy_CONTRACT.stakeInfo(stakeId);
        setCurrentEndTime(currentEndTime);
      }
    }
    fetchUpdateModalData().catch((e) => {
      console.log("**useUpdateModalData1 err**");
      console.log(e);
    });
  }, [stakeId, StakingV2Proxy_CONTRACT, modalContractData]);

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
          const LTOS_Index = await StakingV2Proxy_CONTRACT.possibleIndex();
          const LTOS_BN = BigNumber.from(tosAmount).mod(LTOS_Index);
          const remainedLtos = await StakingV2Proxy_CONTRACT.remainedLtos(
            stakeId
          );
          const newLTOS = BigNumber.from(LTOS_BN).add(remainedLtos);
          const ltos =
            convertNumber({ amount: newLTOS.toString(), localeString: true }) ||
            "0";

          const newEndTime = modalContractData?.currentEndTime;
          setNewEndTime(newEndTime);
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
        }

        //case3
        //increase amount and period
        if (
          inputValue.stake_updateModal_tos_balance !== "" &&
          inputValue.stake_updateModal_period !== ""
        ) {
          console.log("--3--");
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
  };
}

export default useUpdateModalData;
