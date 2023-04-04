import { TokenTypes } from "types";

export type StakeTopCardProps = {
  title: string;
  price: string | number;
  priceUnit: string;
  tooltip: string;
};

export type StakeCardProps =
  | {
      staked: {
        ltos: string;
        ltosWei: string;
        stos: string | undefined;
      };
      principal: string;
      endTime: string;
      isOver: boolean;
      stakedType: "Staking" | "LTOS Staking" | "Bond";
      tokenType: TokenTypes;
      stakedId: string;
      isWithoutLockup?: boolean;
    }
  | undefined;

export type StakeModalBottomContents = {
  ltos: string | undefined;
  currentBalance: string | undefined;
  newBalance: string | undefined;
  currentTosValue: string | undefined;
  newBalanceTosValue: string | undefined;
  newEndTime: string | undefined;
};
