import { TokenTypes } from "types";

export type BondTopCardProps = {
  title: string;
  price: string;
  priceUnit: "$";
  tooltip: string;
};

export type BondCardProps = {
  bondCapacity: string;
  bondingPrice: string;
  discountRate: string;
  totalSold: string;
  endTime: number;
  tokenType: TokenTypes;
  index: number;
  tooltip?: string;
};

export type BondRawdata = {
  bondPrice: number;
  capacity: number;
  index: number;
  tokenLogo: string;
  totalSold: number;
  endTime: number;
};

export type MyCardProps = {
  info: { title: string; content: string }[];
  tokenType: TokenTypes;
  isOver: boolean;
};

export type GetMyHistory = {
  contract: String;
  contractName: String;
  eventName: String;
  from: String;
  data: any;
  chainId: Number;
  blockNumber: Number;
  transactionHash: String;
  blockTimestamp: Number;
  createdTime: Date;
  updated: Date;
};
