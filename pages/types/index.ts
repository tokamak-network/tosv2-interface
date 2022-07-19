import { BondTopCardProps } from "./bond";
import { StakeTopCardProps } from "./stake";

export type TokenTypes = "ETH" | "TON" | "WTON" | "TOS";

export type TopCardList = BondTopCardProps[] | StakeTopCardProps[];

export type pages = "Dashboard" | "Bond" | "Stake";
export type PageKey = "Stake_screen";

export type CheckBoxValueType = {
  page: pages;
  values: any;
  key: string;
  pageKey: PageKey;
};

export type CheckBoxValuesType = CheckBoxValueType[] | undefined;
