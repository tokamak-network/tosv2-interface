import commafy from "@/utils/commafy";
import { convertNumber } from "@/utils/number";
import {
  convertTimeStamp,
  getModalTimeleft,
  getNowTimeStamp,
  getTimeZone,
} from "@/utils/time";
import { stosLoadingState } from "atom/global/modal";
import constant from "constant";
import Decimal from "decimal.js";
import useLockTOS from "hooks/contract/useLockTOS";
import useModalContract from "hooks/contract/useModalContract";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import moment from "moment";
import Moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// type UseStosReward = {
//   stosReward: string;
//   originalTosAmount: string;
//   newEndTime: string;
//   newEndTimeWithoutStos: string;
//   maxWeeks: number;
//   leftWeeks: string;
//   leftDays: string;
//   leftHourAndMin: string;
// };

function useStosReward(inputTosAmount?: number, inputPeriod?: number) {
  const [stosReward, setStosRewards] = useState<string>("0");
  const [originalTosAmount, setOriginalTosAmount] = useState<string>("-");
  const [newEndTime, setNewEndTime] = useState<string>("-");
  const [newEndTimeWithoutStos, setNewEndTimeWithoutStos] =
    useState<string>("-");
  const [maxWeeks, setMaxWeeks] = useState<number>(156);
  const [leftWeeks, setLeftWeeks] = useState<string>("-");
  const [leftDays, setLeftDays] = useState<string>("-");
  const [leftHourAndMin, setLeftHourAndMin] = useState<string>("-");
  const [newEndTimeStamp, setNewEndTimeStamp] = useState<number | undefined>(
    undefined
  );
  const [newEndTimeStampWithoutStos, setNewEndTimeStampWithoutStos] = useState<
    number | undefined
  >(undefined);

  const { LockTOS_CONTRACT } = useCallContract();
  const modalContractData = useModalContract();
  const { epochUnit } = useLockTOS();
  const { rebasePeriod } = constant;
  const [isLoading, setLoading] = useRecoilState(stosLoadingState);

  useEffect(() => {
    async function fetchStosRewardData() {
      if (
        inputTosAmount?.toString() === "" ||
        inputTosAmount?.toString().length === 0
      ) {
        return setStosRewards("-");
      }
      if (inputTosAmount === undefined) {
        return setStosRewards("-");
      }
      if (typeof inputTosAmount === "number" && isNaN(inputTosAmount)) {
        return setStosRewards("-");
      }
      // if (inputTosAmount === 0) {
      //   return setStosRewards("0.00");
      // }
      if (LockTOS_CONTRACT && inputTosAmount && inputPeriod) {
        const weekPeriod = inputPeriod + 1 || 1;

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
        // console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [LockTOS_CONTRACT, inputTosAmount, inputPeriod, rebasePeriod, setLoading]);

  useEffect(() => {
    //endTime
    async function calculateUnlockTime() {
      if (LockTOS_CONTRACT && inputPeriod !== undefined) {
        const _inputPeriod = inputPeriod + 1;
        const now = getNowTimeStamp();
        const unlockTimeStamp =
          getNowTimeStamp() + _inputPeriod * Number(epochUnit);
        setNewEndTimeWithoutStos(
          convertTimeStamp(unlockTimeStamp, "YYYY. MM.DD. HH:mm")
        );
        setNewEndTimeStampWithoutStos(unlockTimeStamp);

        //old script
        const date =
          Math.floor((now + _inputPeriod * epochUnit) / epochUnit) * epochUnit;
        const endTime = moment.unix(date).format("YYYY.MM.DD");
        const endTimeWithTimezone = moment.tz(
          `${endTime} 00:00`,
          Moment.tz.guess()
        );
        const endTimeWithTz = endTimeWithTimezone.format("YYYY.MM.DD. HH:mm");
        setNewEndTime(`${endTimeWithTz} (${getTimeZone()})` || "-");
        setNewEndTimeStamp(date);

        const { leftWeeks, leftDays, leftHourAndMin } = getModalTimeleft({
          currentEndTimeStamp: date,
        });

        setLeftWeeks(leftWeeks);
        setLeftDays(leftDays);
        setLeftHourAndMin(leftHourAndMin);
      }
    }

    calculateUnlockTime().catch((e) => {
      console.log("**fetchStosRewardData3 err**");
      // console.log(e);
    });
  }, [LockTOS_CONTRACT, inputPeriod, epochUnit]);

  return {
    stosReward,
    newEndTime,
    newEndTimeWithoutStos,
    maxWeeks,
    originalTosAmount,
    leftWeeks,
    leftDays,
    leftHourAndMin,
    newEndTimeStamp,
    newEndTimeStampWithoutStos,
  };
}

export default useStosReward;
