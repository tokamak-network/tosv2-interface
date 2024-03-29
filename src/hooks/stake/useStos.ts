import constant from "constant";
import useStakeV2 from "hooks/contract/useStakeV2";
import { useBlockNumber } from "hooks/useBlockNumber";
import useInput from "hooks/useInput";
import { useEffect, useMemo, useState } from "react";
import useLocksInfo from "./useLocksInfo";
import useStosReward from "./useStosReward";
import useUpdateModalData from "./useUpdateModalData";

/* 
This is a new script to estimate sTOS 
ref link : https://docs.google.com/spreadsheets/d/1_ihg1mG6FeV1DPr4qfnKYJ8dhW2fHPmpiSD8euWbfVU/edit#gid=0
*/

function useStos() {
  const { inputValue } = useInput("Stake_screen", "update_modal");
  const increaseTos = Number(inputValue.stake_updateModal_tos_balance);

  const { leftWeeks } = useUpdateModalData();

  const increaseWeeks = Number(inputValue.stake_updateModal_period) - leftWeeks;

  const { rebasePerEpoch } = constant;

  //make a hook to get locksInfo
  const { locksInfo } = useLocksInfo();

  //make a hook to get block.timeStamp
  const { blockTimeStamp } = useBlockNumber();

  //B11_total weeks locked after update)
  //(B8-B7)/604800+B6
  //lockupWeeksUpdated= (locksinfo.end-block.timestamp)/604800+increaseWeeks
  const lockupWeeksUpdated = useMemo(() => {
    if (locksInfo?.endTime && blockTimeStamp && increaseWeeks !== undefined) {
      const timeDiff = locksInfo.endTime - blockTimeStamp;
      return timeDiff / 604800 + increaseWeeks;
    }
  }, [locksInfo?.endTime, blockTimeStamp, increaseWeeks]);

  //B12
  //B9*(1+B4)^(B6*21)
  //interestAfterEnd = locksinfo.amount*(1+rebasePerEpoch)^(increaseWeek*21)
  const interestAfterEnd = useMemo(() => {
    if (locksInfo?.amount && rebasePerEpoch && increaseWeeks !== undefined) {
      return locksInfo.amount * (1 + rebasePerEpoch) ** (increaseWeeks * 21);
    }
  }, [locksInfo?.amount, rebasePerEpoch, increaseWeeks]);

  //B13
  //floor((B8-B7+604800*B6)/28800)
  //additionalRebaseNumber = floor((locksinfo.end-block.timestamp+604800*increaseWeeks)/28800)
  const additionalRebaseNumber = useMemo(() => {
    if (locksInfo?.endTime && blockTimeStamp && increaseWeeks !== undefined) {
      return Math.floor(
        (locksInfo.endTime - blockTimeStamp + 604800 * increaseWeeks) / 28800
      );
    }
  }, [locksInfo?.endTime, blockTimeStamp, increaseWeeks]);

  //B14
  //B5*(1+B4)^B13+B12
  //ltosPrincipalUpdated = increaseTOS*(1+rebasePerEpoch)^additionalRebaseNumber+interestAfterEnd
  const ltosPrincipalUpdated = useMemo(() => {
    if (
      increaseTos !== undefined &&
      rebasePerEpoch &&
      additionalRebaseNumber &&
      interestAfterEnd
    ) {
      return (
        increaseTos * (1 + rebasePerEpoch) ** additionalRebaseNumber +
        interestAfterEnd
      );
    }
  }, [increaseTos, rebasePerEpoch, additionalRebaseNumber, interestAfterEnd]);

  const newBalanceStos = useMemo(() => {
    if (
      ltosPrincipalUpdated !== undefined &&
      lockupWeeksUpdated !== undefined
    ) {
      return (ltosPrincipalUpdated * lockupWeeksUpdated) / 156;
    }
  }, [ltosPrincipalUpdated, lockupWeeksUpdated]);

  // useEffect(() => {
  //   console.log("***start***");
  //   console.log({
  //     blockTimeStamp,
  //     rebasePerEpoch,
  //     locksInfo,
  //     lockupWeeksUpdated,
  //     interestAfterEnd,
  //     additionalRebaseNumber,
  //     ltosPrincipalUpdated,
  //     newBalanceStos,
  //   });
  // }, [
  //   blockTimeStamp,
  //   rebasePerEpoch,
  //   locksInfo,
  //   lockupWeeksUpdated,
  //   interestAfterEnd,
  //   additionalRebaseNumber,
  //   ltosPrincipalUpdated,
  //   newBalanceStos,
  // ]);

  return { newBalanceStos };
}

export default useStos;
