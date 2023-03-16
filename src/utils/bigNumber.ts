import { BigNumber } from "ethers";

export function compareBN(num1: BigNumber, num2: BigNumber) {
  return BigNumber.from(num1).gt(num2);
}
