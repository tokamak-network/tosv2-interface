import { TokenTypes } from "types";

export type StakeTopCardProps = {
  title: string;
  price: string;
  priceUnit: "$";
};

export type StakeCardProps = {
  amount: string;
  discountRate: string;
  lockupPeriod: string;
  lockupPeriodDate: string;
  tokenType: TokenTypes;
  isDisabled: boolean;
};