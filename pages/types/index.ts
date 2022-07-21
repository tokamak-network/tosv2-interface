import { BondTopCardProps } from "./bond";
import { StakeTopCardProps } from "./stake";

export type TokenTypes = "ETH" | "TON" | "WTON" | "TOS";

export type TopCardList = BondTopCardProps[] | StakeTopCardProps[];

export type Pages = "Dashboard" | "Bond" | "Stake";
export type PageKey = "Stake_screen";

export type CheckBoxValueType = {
  page: Pages;
  values: any;
  key: string;
  pageKey: PageKey;
};

export type InputKey = Pages;

export type CheckBoxValuesType = CheckBoxValueType[] | undefined;
