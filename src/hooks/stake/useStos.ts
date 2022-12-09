import { useEffect, useMemo, useState } from "react";

/* 
This is a new script to estimate sTOS 
ref link : https://docs.google.com/spreadsheets/d/1_ihg1mG6FeV1DPr4qfnKYJ8dhW2fHPmpiSD8euWbfVU/edit#gid=0
*/

function useStos() {
  const [stosBalance, setStosBalance] = useState<number | undefined>(undefined);

  //make a hook to get locksInfo

  //make a hook to get block.timeStamp

  //B11_total weeks locked after update)
  //(B8-B7)/604800+B6
  //lockupWeeksUpdated= (locksinfo.end-block.timestamp)/604800+increaseWeeks
  const totalWeeksLockedAfterUpdate = useMemo(() => {}, []);

  //B12
  //B9*(1+B4)^(B6*21)
  //interestAfterEnd = locksinfo.amount*(1+rebasePerEpoch)^(increaseWeek*21)
  const interestAfterEnd = useMemo(() => {}, []);

  //B13
  //floor((B8-B7+604800*B6)/28800)
  //additionalRebaseNumber = floor((locksinfo.end-block.timestamp+604800*increaseWeeks)/28800)
  const additionalRebaseNumber = useMemo(() => {}, []);

  //B14
  //B5*(1+B4)^B13+B12
  //ltosPrincipalUpdated = increaseTOS*(1+rebasePerEpoch)^additionalRebaseNumber+interestAfterEnd
  const ltosPrincipalUpdated = useMemo(() => {}, []);
}

export default useStos;
