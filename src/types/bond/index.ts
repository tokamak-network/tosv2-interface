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
  startDay: string;
  leftDay: string;
  endDay: string;
  endTime: number;
  sellTokenType: TokenTypes;
  buyTokenType: TokenTypes;
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

export type BondModalInput = {
  bond_modal_period: number;
  bond_modal_balance: number | undefined;
};

export enum BondPool {
  "TOS-ETH" = "TOS-ETH",
}
