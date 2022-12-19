import calculateCompound from "@/utils/calculateCompound";
import commafy from "@/utils/commafy";
import { convertNumber, convertToWei } from "@/utils/number";
import {
  convertTimeStamp,
  getDuration,
  getNowTimeStamp,
  getTimeZone,
} from "@/utils/time";
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
import useStos from "./useStos";

function useUpdateModalData() {
  const [newLtosBalance, setNewLtosBalance] = useState<string>("-");
  const [currentEndTime, setCurrentEndTime] = useState<string>("-");
  const [leftWeeks, setLeftWeeks] = useState<number>(1);
  const [leftDays, setLeftDays] = useState<string>("-");
  const [leftTime, setLeftTime] = useState<string>("-");

  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();
  const { stakeId, connectId } = useStakeId();
  const modalContractData = useModalContract();
  const { selectedModalData } = useModal<{ principal: string }>();
  const { inputValue } = useInput("Stake_screen", "update_modal");

  const totalTosAmount =
    Number(modalContractData?.currentTosAmount?.replaceAll(",", "")) +
    Number(inputValue.stake_updateModal_tos_balance);

  const { stosReward, newEndTime } = useStosReward(
    totalTosAmount,
    Number(inputValue.stake_updateModal_period)
  );

  const { epochUnit } = useLockTOS();

  //current
  useEffect(() => {
    async function fetchUpdateModalData() {
      if (StakingV2Proxy_CONTRACT && stakeId && modalContractData) {
        //current balance
        const currentEndTime = modalContractData.currentEndTime;
        const currentEndTimeStamp = modalContractData.currentEndTimeStamp;

        setCurrentEndTime(`${currentEndTime} (${getTimeZone()})`);

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

  //new
  useEffect(() => {
    async function fetchUpdateModalData() {
      if (
        StakingV2Proxy_CONTRACT &&
        modalContractData?.ltosBalance &&
        inputValue.stake_updateModal_tos_balance !== undefined
      ) {
        const newTosAmount = convertToWei(
          inputValue.stake_updateModal_tos_balance.replaceAll(",", "")
        );
        const ltosAmountBN =
          await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(newTosAmount);
        const ltosAmount = convertNumber({ amount: ltosAmountBN });

        const newLtosAmount =
          Number(modalContractData?.ltosBalance.replaceAll(",", "")) +
          Number(ltosAmount?.replaceAll(",", ""));
        setNewLtosBalance(commafy(newLtosAmount));
      }
    }
    fetchUpdateModalData().catch((e) => {
      console.log("**useUpdateModalData2 err**");
      console.log(e);
    });
  }, [StakingV2Proxy_CONTRACT, inputValue, modalContractData]);

  return {
    currentEndTime,
    newEndTime,
    leftWeeks,
    leftDays,
    leftTime,
    newStosBalance: stosReward,
    newLtosBalance,
    totalTosAmount,
  };
}

export default useUpdateModalData;
