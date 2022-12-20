import constant from "constant";
import useStosReward from "hooks/stake/useStosReward";
import { useBlockNumber } from "hooks/useBlockNumber";
import useInput from "hooks/useInput";
import { useEffect, useMemo, useState } from "react";

/* 
This is a new script to estimate sTOS 
ref link : https://docs.google.com/spreadsheets/d/1_ihg1mG6FeV1DPr4qfnKYJ8dhW2fHPmpiSD8euWbfVU/edit#gid=0
*/

function useStosBond(increaseTos: number) {
  const { inputValue } = useInput("Bond_screen", "bond_modal");

  const { leftDays, leftHourAndMin } = useStosReward(
    increaseTos,
    inputValue.bond_modal_period
  );

  const increaseWeeks = Number(inputValue.bond_modal_period);
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

  // useEffect(() => {
  //   console.log("***useStosRelock***");
  //   console.log(increaseTos);

  //   console.log({
  //     blockTimeStamp,
  //     rebasePerEpoch,
  //     locksInfo,
  //     rebaseNumber,
  //     ltosPrincipalUpdated,
  //     newBalanceStos,
  //     increaseWeeksDecimal,
  //   });
  // }, [
  //   blockTimeStamp,
  //   rebasePerEpoch,
  //   locksInfo,
  //   ltosPrincipalUpdated,
  //   newBalanceStos,
  //   rebaseNumber,
  //   inputValue,
  //   increaseWeeksDecimal,
  //   newBalance,
  //   increaseTos,
  // ]);

  return { newBalanceStos };
}

export default useStosBond;
