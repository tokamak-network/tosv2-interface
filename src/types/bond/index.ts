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
  endTime: number;
  tokenType: TokenTypes;
  index: number;
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
  lockUpDate: string;
  isOver: boolean;
};

export type GetMyHistory = {
  contract: string;
  contractName: string;
  eventName: string;
  from: string;
  data: any;
  chainId: number;
  blockNumber: number;
  transactionHash: string;
  blockTimestamp: number;
  createdTime: Date;
  updated: Date;
};
