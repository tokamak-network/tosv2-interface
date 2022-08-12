import { TokenTypes } from "types";

export type BondTopCardProps = {
  title: string;
  price: string;
  priceUnit: "$";
};

export type BondCardProps = {
  bondCapacity: string;
  bondingPrice: string;
  discountRate: string;
  totalSold: string;
  timeLeft: string;
  tokenType: TokenTypes;
};

export type BondRawdata = {
  bondPrice: number;
  capacity: number;
  index: number;
  tokenLogo: string;
  totalSold: number;
};

export type MyCardProps = {
  info: { title: string; content: string }[];
  tokenType: TokenTypes;
};
