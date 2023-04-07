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
  discountRate: number;
  totalSold: string;
  startDay: string;
  startTime: number;
  leftDay: string;
  endDay: string;
  endTime: number;
  sellTokenType: TokenTypes;
  buyTokenType: TokenTypes;
  index: number;
  tooltip?: string;
  minimumBondPrice: string;
  version: string;
  blueProgress: number;
  isHighest?: boolean;
  isDiscountMinus: boolean;
  currentCapacityProgress: string;
  currentProgressOnCurrentCapacity: string;
  currentBondable: string;
  currentCapacity: string;
  status: "open" | "closed" | "will be open";
  marketId: number;
  ethPrice: number;
  totalRound: number;
  roundEthCapacity: number;
  tosPrice: number;
};

export type BondRawdata = {
  index: number;
  version: string;
  capacity: number;
  quoteToken: string;
  totalSold: number;
  bondPrice: number;
  endTime: number;
  updatedTime: number;
  startTime: number;
  maxPayout: number;
  initialMaxPayout: number;
  capacityUpdatePeriod: number;
  bonusRatesAddress: string;
  bonusRatesId: number;
  bondType: number;
  closed: boolean;
  periodicCapacity: number;
  currentCapacity: number;
  ethPrice: number;
  createdAt: Date;
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
  blocknumber: number;
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

export type SupportedBondToken = "ETH";
