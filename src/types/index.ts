import { BondTopCardProps } from "./bond";
import { StakeTopCardProps } from "./stake";

export type TokenTypes = "ETH" | "TON" | "WTON" | "TOS" | "LTOS" | "STOS";
export type SupportedInputTokenTypes = TokenTypes;

export type SupportedInputTokenPair = "LTOS-STOS";

export type TopCardList = BondTopCardProps[] | StakeTopCardProps[];

export type Pages = "Intro" | "Dashboard" | "Bond" | "Stake" | "DAO";
export type PageKey = "Stake_screen" | "Bond_screen";

export type CheckBoxValueType = {
  page: Pages;
  values: any;
  key: string;
  pageKey: PageKey;
};

export type CheckBoxValuesType = CheckBoxValueType[] | undefined;
