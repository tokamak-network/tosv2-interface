import { getNowTimeStamp } from "@/utils/time";

export function getRound(params: {
  startTime: number;
  endTime: number;
  capacityPeriod: number;
}) {
  const { startTime, endTime, capacityPeriod } = params;
  const currentTimeStamp = getNowTimeStamp();

  //calculate each round start
  const salePeriod = endTime - startTime;
  const saleTotalRound = Math.ceil(salePeriod / capacityPeriod);

  let i = 0;
  let eachSaleRoundTimeStamp: number[] = [];
  //plus one
  while (i < saleTotalRound + 1) {
    const roundStartTimeStamp = startTime + i * capacityPeriod;
    eachSaleRoundTimeStamp.push(
      endTime > roundStartTimeStamp ? roundStartTimeStamp : endTime
    );
    i++;
  }
  const saleRoundTimeStamp = eachSaleRoundTimeStamp.filter((time, index) => {
    if (index === 0 && time > currentTimeStamp) {
      return false;
    }
    return time > currentTimeStamp;
  });

  return { roundNums: saleRoundTimeStamp.length + 1, saleRoundTimeStamp };
}
