import constant from "constant";
import commafy from "../../commafy";

export function getROI(params: {
  bondDiscount: number;
  newEndTimeStamp: number;
  blockTimeStamp: number;
}): number {
  const { bondDiscount, newEndTimeStamp, blockTimeStamp } = params;
  const discountRate = Number(bondDiscount) / 100;
  const LTOSInterest =
    (1 + 87045050000000 / 1e18) **
      ((newEndTimeStamp - blockTimeStamp + 12) / constant.rebase.epochLength) -
    1;
  const ROI = ((1 + LTOSInterest) / (1 - Number(discountRate)) - 1) * 100;

  return Number(commafy(ROI));
}
