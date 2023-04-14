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
  while (i < saleTotalRound) {
    const roundStartTimeStamp = startTime + i * capacityPeriod;
    eachSaleRoundTimeStamp.push(
      i + 1 === saleTotalRound ? endTime : roundStartTimeStamp
    );
    i++;
  }
  const saleRoundTimeStamp = eachSaleRoundTimeStamp.filter(
    (time) => time > currentTimeStamp
  );

  return { roundNums: saleRoundTimeStamp.length + 1, saleRoundTimeStamp };
}
