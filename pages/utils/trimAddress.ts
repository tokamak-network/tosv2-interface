import { isArgumentsObject } from "util/types";

function trimAddress(args: {
  address: string;
  firstChar: number;
  lastChar: number;
  dotLength: number;
}): string {
  const { address, firstChar, lastChar, dotLength } = args;
  const firstChatAt = address.substring(0, firstChar);
  const lastCharAt = address.substring(address.length - lastChar);
  return `${firstChar}${"."}${lastCharAt}`;
}
