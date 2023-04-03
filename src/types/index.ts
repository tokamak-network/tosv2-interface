import { BondTopCardProps } from "./bond";
import { StakeTopCardProps } from "./stake";

export type TokenTypes = "ETH" | "TON" | "WTON" | "TOS";
export type SupportedInputTokenTypes = TokenTypes;

export type TopCardList = BondTopCardProps[] | StakeTopCardProps[];

export type Pages = "Intro" | "Dashboard" | "Bond" | "Stake" | "DAO";
export type PageKey = "Stake_screen" | "Bond_screen";

export type CheckBoxValueType = {
  page: Pages;
  values: any;
  key: string;
  pageKey: PageKey;
};

export type InputKey = Pages;

export type CheckBoxValuesType = CheckBoxValueType[] | undefined;
