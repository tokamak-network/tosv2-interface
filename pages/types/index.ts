import { BondTopCardProps } from "./bond";
import { StakeTopCardProps } from "./stake";

export type TokenTypes = "ETH" | "TON" | "WTON" | "TOS";

export type TopCardList = BondTopCardProps[] | StakeTopCardProps[];

type pages = "Dashboard" | "Bond" | "Stake";

export type CheckBoxValueType = {
  page: pages;
  values: any;
};

export type CheckBoxValuesType = CheckBoxValueType[] | undefined;
