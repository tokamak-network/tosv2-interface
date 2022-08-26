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
      stakedType: "Staking" | "LTOS Staking" | "Bond";
      tokenType: TokenTypes;
      stakedId: string;
    }
  | undefined;
