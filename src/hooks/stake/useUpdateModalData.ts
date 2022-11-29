import calculateCompound from "@/components/calculateCompound";
import commafy from "@/components/commafy";
import { convertNumber, convertToWei } from "@/components/number";
import {
  convertTimeStamp,
  getDuration,
  getNowTimeStamp,
  getTimeZone,
} from "@/components/time";
import { modalBottomLoadingState } from "atom/global/modal";
import { BigNumber } from "ethers";
import useLockTOS from "hooks/contract/useLockTOS";
import useModalContract from "hooks/contract/useModalContract";
import useStakeId from "hooks/contract/useStakeId";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useStosReward from "./useStosReward";
import constant from "constant/index";

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
  leftDays: string;
  leftTime: string;
  newTosAmount: string;
  newStosBalance: string;
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
  const [leftWeeks, setLeftWeeks] = useState<number>(1);
  const [leftDays, setLeftDays] = useState<string>("-");
  const [leftTime, setLeftTime] = useState<string>("-");

  const [currentWorthTosAmount, setCurrentWorthTosAmount] = useState<
    string | undefined
  >(undefined);

  const [newTosAmount, setNewTosAmount] = useState<string>("-");
  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { stakeId } = useStakeId();
  const modalContractData = useModalContract();
  const { selectedModalData } = useModal<{ principal: string }>();
  const { inputValue } = useInput("Stake_screen", "update_modal");
  const { stosReward } = useStosReward(
    Number(inputValue.stake_updateModal_tos_balance?.replaceAll(",", "")),
    inputValue.stake_updateModal_period
  );
  const { stosReward: secondTypeStosReward } = useStosReward(
    Number(currentWorthTosAmount?.replaceAll(",", "")),
    Number(inputValue.stake_updateModal_period) - leftWeeks
  );

  // console.log(`stos reward ${stosReward} ${secondTypeStosReward}`);
  // console.log(`tosAmount: ${Number(inputValue.stake_updateModal_tos_balance)}`);
  // console.log(`weeks : ${inputValue.stake_updateModal_period} ${leftWeeks}`);
  // console.log(
  //   `currentWorthTosAmount : ${Number(
  //     currentWorthTosAmount?.replaceAll(",", "")
  //   )}`
  // );

  const { newEndTime } = useStosReward(
    inputValue.stake_updateModal_tos_balance,
    inputValue.stake_updateModal_period
  );
  const { epochUnit } = useLockTOS();

  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );

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

        const currentTosAmount =
          StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(ltos);

        setCurrentEndTime(`${currentEndTime} (${getTimeZone()})`);
        setCurrentBalance(currentBalance);

        //weeks left
        const now = getNowTimeStamp();
        const timeDiff = currentEndTimeStamp - now;
        const weeksLeft = timeDiff / epochUnit;
        const daysLeft = (timeDiff - Math.floor(weeksLeft) * 604800) / 86400;
        const timeLeft =
          timeDiff -
          Math.floor(weeksLeft) * 604800 -
          Math.floor(daysLeft) * 86400;

        const hours = getDuration(timeLeft, "HH:mm").hours;
        const mins = getDuration(timeLeft, "HH:mm").mins;
        const hour = hours.toString().length === 1 ? `0${hours}` : `${hours}`;
        const min = mins.toString().length === 1 ? `0${mins}` : `${mins}`;

        setLeftWeeks(Math.floor(weeksLeft));
        setLeftDays(String(Math.floor(daysLeft)));
        setLeftTime(`${hour}:${min}`);
      }
    }
    fetchUpdateModalData().catch((e) => {
      // console.log("**useUpdateModalData1 err**");
      // console.log(e);
    });
  }, [stakeId, StakingV2Proxy_CONTRACT, modalContractData, epochUnit]);

  //cauculate current ltos to stos
  useEffect(() => {
    async function fetchCurrentWorhTosAmount() {
      if (modalContractData && StakingV2Proxy_CONTRACT) {
        const ltosBN = modalContractData.ltosBN;
        const possibleTOS_BN =
          await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(ltosBN);
        const worthTosAmount = convertNumber({
          amount: possibleTOS_BN.toString(),
          localeString: false,
          round: false,
        });
        setCurrentWorthTosAmount(worthTosAmount);
      }
    }
    fetchCurrentWorhTosAmount().catch((e) => {
      console.log("**fetchCurrentWorhTosAmount err**");
      console.log(e);
    });
  }, [modalContractData, StakingV2Proxy_CONTRACT]);

  //new
  useEffect(() => {
    async function fetchUpdateModalData() {
      if (newBalanceType === undefined) {
        setNewBalance({
          ltos: "-",
          stos: "-",
        });
      }

      if (inputValue.stake_updateModal_tos_balance?.length === 0) {
        return setNewBalance({
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

        if (newBalanceType === 1) {
          // console.log("--1--");

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

          const newTOSAmount =
            await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(newLTOS);

          const resultLtos =
            Number(currentBalance.ltos.replaceAll(",", "")) +
            Number(ltos.replaceAll(",", ""));

          const resultStos =
            Number(currentBalance.stos.replaceAll(",", "")) +
            Number(stosReward.replaceAll(",", ""));

          const newTosAmount =
            convertNumber({
              amount: newTOSAmount.toString(),
              localeString: false,
              round: false,
            }) || "-";

          setNewTosAmount(newTosAmount);
          setNewStosBalance(commafy(resultStos));
          return setNewBalance({
            ltos: ltos,
            stos: isNaN(resultStos) ? "-" : commafy(resultStos),
          });
        }

        //case2
        //Only increase period
        if (newBalanceType === 2) {
          // console.log("--2--");

          const resultLtos = Number(currentBalance.ltos.replaceAll(",", ""));
          const resultStos =
            Number(currentBalance.stos.replaceAll(",", "")) +
            Number(secondTypeStosReward.replaceAll(",", ""));

          setNewTosAmount(modalContractData.currentTosAmount);

          setNewStosBalance(commafy(resultStos));
          return setNewBalance({
            ltos: commafy(resultLtos),
            stos: isNaN(resultStos) ? "-" : commafy(resultStos),
          });
        }

        //case3
        //increase amount and period
        if (newBalanceType === 3) {
          // console.log("--3--");

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

          const ltosBN = modalContractData.ltosBN;
          const totalTosAmountBN = BigNumber.from(ltosBN).add(newLTOS);
          const newTosAmountBN =
            await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(
              totalTosAmountBN
            );

          const newTosAmount =
            convertNumber({
              amount: newTosAmountBN.toString(),
              localeString: true,
              round: false,
            }) || "-";

          setNewTosAmount(newTosAmount);

          const resultLtos =
            Number(currentBalance.ltos.replaceAll(",", "")) +
            Number(ltos.replaceAll(",", ""));
          const resultStos =
            Number(secondTypeStosReward.replaceAll(",", "")) +
            Number(stosReward.replaceAll(",", "")) +
            Number(currentBalance.stos.replaceAll(",", ""));

          setNewStosBalance(commafy(resultStos));

          return setNewBalance({
            ltos: commafy(resultLtos),
            stos: isNaN(resultStos) ? "-" : commafy(resultStos),
          });
        }
      }
    }
    fetchUpdateModalData()
      .catch((e) => {
        // console.log("**useUpdateModalData2 err**");
        // console.log(e);
      })
      .finally(() => {
        return setBottomLoading(false);
      });
  }, [
    stakeId,
    StakingV2Proxy_CONTRACT,
    inputValue,
    stosReward,
    modalContractData,
    currentBalance,
    newBalanceType,
    setBottomLoading,
    secondTypeStosReward,
  ]);

  useEffect(() => {
    async function fetchData() {
      if (modalContractData && selectedModalData) {
        const { rebase } = constant;
        const test = await calculateCompound({
          // tosValuation: BigNumber.from(selectedModalData.principal),
          tosValuation: BigNumber.from(
            convertToWei(selectedModalData.principal)
          ),

          rebasePerEpoch: modalContractData.rebasePerEpcoh,
          n: BigNumber.from(inputValue.stake_updateModal_period),
        });
      }
    }
    fetchData();
  }, [modalContractData]);

  return {
    currentBalance,
    newBalance,
    currentEndTime,
    newEndTime,
    leftWeeks,
    leftDays,
    leftTime,
    newTosAmount,
    newStosBalance,
  };
}

export default useUpdateModalData;
