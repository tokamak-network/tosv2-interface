import { BondTopCardProps } from "./bond";
import { StakeTopCardProps } from "./stake";

export type TokenTypes = "ETH" | "TON" | "WTON" | "TOS";

export type TopCardList = BondTopCardProps[] | StakeTopCardProps[];
