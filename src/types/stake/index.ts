import { TokenTypes } from "types";

export type StakeTopCardProps = {
  title: string;
  price: string | number;
  priceUnit: string;
};

export type StakeCardProps =
  | {
      staked: {
        ltos: string;
        stos: string;
      };
      principal: string;
      endTime: string;
      isOver: boolean;
      stakedType: "TOS Staking" | "Bonding";
      tokenType: TokenTypes;
    }
  | undefined;
