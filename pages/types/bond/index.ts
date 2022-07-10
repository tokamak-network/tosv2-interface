import { TokenTypes } from "types";

export type BondCardProps = {
  bondCapacity: string;
  bondingPrice: string;
  discountRate: string;
  tokenType: TokenTypes;
};

export type MyCardProps = {
  info: { title: string; content: string }[];
  tokenType: TokenTypes;
};
