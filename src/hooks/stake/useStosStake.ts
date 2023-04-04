import useStakeV2 from "hooks/contract/useStakeV2";
import { useBlockNumber } from "hooks/useBlockNumber";
import useInput from "hooks/useInput";
import { useEffect, useMemo, useState } from "react";
import useLocksInfo from "./useLocksInfo";
import useStosReward from "./useStosReward";
import useUpdateModalAfterEndTime from "./useUpdateModalAfterEndTime";
import useUpdateModalData from "./useUpdateModalData";
import constant from "constant";
import { PageKey } from "types";
import { InputKey } from "types/atom";
import moment from "moment";
import { getNowTimeStamp, getTimeZone } from "@/utils/time";
import Moment from "moment-timezone";
import useLockTOS from "hooks/contract/useLockTOS";

/* 
This is a new script to estimate sTOS 
ref link : https://docs.google.com/spreadsheets/d/1_ihg1mG6FeV1DPr4qfnKYJ8dhW2fHPmpiSD8euWbfVU/edit#gid=0
*/

function useStosStake(
  pageKey: PageKey,
  inputKey: InputKey,
  balanceAtomKey:
    | string
    | "stake_modal_balance"
    | "stake_updateModal_tos_balance",
  periodAtomKey: string | "stake_modal_period" | "stake_updateModal_period"
) {
  const { inputValue } = useInput(pageKey, inputKey);
  const inputBalance = inputValue[balanceAtomKey];
  const inputWeeks = inputValue[periodAtomKey];

  const increaseTos = Number(inputBalance?.replaceAll(",", ""));

  const { leftDays, leftHourAndMin } = useStosReward(0, inputWeeks);

  const increaseWeeks =
    inputWeeks === undefined || inputWeeks === ""
      ? undefined
      : Number(inputWeeks);

  const increaseWeeksDecimal = useMemo(() => {
    if (
      leftDays !== undefined &&
      leftHourAndMin !== undefined &&
      increaseWeeks !== undefined
    ) {
      return (
        (Number(leftDays) * 86400 +
          Number(leftHourAndMin.split(":")[0]) * 3600 +
          Number(leftHourAndMin.split(":")[1]) * 60) /
          604800 +
        increaseWeeks
      );
    }
  }, [leftDays, leftHourAndMin, increaseWeeks]);

  const { rebasePerEpoch } = constant;

  //make a hook to get block.timeStamp
  const { blockTimeStamp } = useBlockNumber();

  const rebaseNumber = useMemo(() => {
    if (increaseWeeksDecimal !== undefined) {
      return Math.floor(increaseWeeksDecimal * 21);
    }
  }, [increaseWeeksDecimal]);

  const ltosPrincipalUpdated = useMemo(() => {
    if (increaseTos !== undefined && rebasePerEpoch && rebaseNumber) {
      return increaseTos * (1 + rebasePerEpoch) ** rebaseNumber;
    }
  }, [increaseTos, rebasePerEpoch, rebaseNumber]);

  const newBalanceStos = useMemo(() => {
    if (
      ltosPrincipalUpdated !== undefined &&
      increaseWeeksDecimal !== undefined
    ) {
      return (ltosPrincipalUpdated * increaseWeeksDecimal) / 156;
    }
  }, [ltosPrincipalUpdated, increaseWeeksDecimal]);

  //calculte newEndTime with lockup weeks
  const { epochUnit } = useLockTOS();

  const newEndTime = useMemo(() => {
    const _weeks = inputWeeks + 1;
    //old script
    const now = getNowTimeStamp();
    const date = Math.floor((now + _weeks * epochUnit) / epochUnit) * epochUnit;
    const endTime = moment.unix(date).format("YYYY.MM.DD");
    const endTimeWithTimezone = moment.tz(
      `${endTime} 00:00`,
      Moment.tz.guess()
    );
    const endTimeWithTz = endTimeWithTimezone.format("YYYY.MM.DD. HH:mm");
    return `${endTimeWithTz} (${getTimeZone()})` || "-";
  }, [epochUnit, inputWeeks]);

  return { newBalanceStos, newEndTime };
}

export default useStosStake;
