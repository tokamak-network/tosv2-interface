import { bond_modal } from "atom/bond/modal";
import { BigNumber } from "ethers";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { BondCardProps } from "types/bond";
import { getRateInfo } from "@/utils/contract/bond/getRateInfo";
import { useWeb3React } from "@web3-react/core";

export function useBondDepository(lockupWeeks?: number) {
  const [basePrice, setBasePrice] = useState<BigNumber | undefined>(undefined);
  const [bondingPrice, setBondingPrice] = useState<BigNumber | undefined>(
    undefined
  );
  const [bonusRateInfo, setBonusRateInfo] = useState<number[] | undefined>(
    undefined
  );
  const { library } = useWeb3React();
  const { selectedModalData } = useModal<BondCardProps>();
  const marketId = selectedModalData?.index ?? undefined;

  const { BondDepositoryProxy_CONTRACT } = useCallContract();
  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const bondModalRecoilValue = useRecoilValue(bond_modal);
  const { fiveDaysLockup } = bondModalRecoilValue;

  const _weeks = fiveDaysLockup
    ? 0
    : lockupWeeks ?? inputValue?.bond_modal_period + 1;

  useEffect(() => {
    async function fetchRateInfo() {
      if (marketId && BondDepositoryProxy_CONTRACT) {
        const bonusRateInfo = await getRateInfo(
          marketId,
          BondDepositoryProxy_CONTRACT,
          library
        );
        if (bonusRateInfo) {
          return setBonusRateInfo(bonusRateInfo);
        }
        return setBonusRateInfo(undefined);
      }
    }
    fetchRateInfo().catch((e) => {
      console.log("**fetchRateInfo err**");
      console.log(e);
    });
  }, [marketId, BondDepositoryProxy_CONTRACT, library]);

  useEffect(() => {
    async function fetchBasePrice() {
      if (BondDepositoryProxy_CONTRACT && marketId) {
        const basePriceInfo = await BondDepositoryProxy_CONTRACT.getBasePrice(
          marketId
        );
        const basePrice = basePriceInfo[0];
        return setBasePrice(basePrice);
      }
    }

    fetchBasePrice().catch((e) => {
      console.log("**useBondDepository err**");
      console.log(e);
      return setBasePrice(undefined);
    });
  }, [BondDepositoryProxy_CONTRACT, marketId]);

  useEffect(() => {
    async function getBondingPriceWithBonusRate() {
      if (
        basePrice &&
        _weeks !== undefined &&
        marketId &&
        BondDepositoryProxy_CONTRACT &&
        bonusRateInfo
      ) {
        const bonusRate = bonusRateInfo[_weeks] ?? bonusRateInfo[_weeks - 1];
        const bonusValue = basePrice.mul(bonusRate).div(10000);
        const result = basePrice.add(bonusValue);
        return setBondingPrice(result);
      }
    }
    getBondingPriceWithBonusRate().catch((e) => {
      console.log("**getBondingPriceWithBonusRate err**");
      console.log(e);
    });
  }, [
    basePrice,
    _weeks,
    marketId,
    BondDepositoryProxy_CONTRACT,
    bonusRateInfo,
  ]);

  const bondingPricePerWeeks = useMemo(() => {
    if (basePrice && bonusRateInfo) {
      let bondPriceArr = [];
      for (let i = 0; i < 54; i++) {
        const rate = bonusRateInfo[i] ?? bonusRateInfo[i - 1];
        const plusValue = basePrice.mul(rate).div(10000);
        const result = basePrice.add(plusValue);
        bondPriceArr.push(result);
      }
      return bondPriceArr;
    }
    return undefined;
  }, [basePrice, bonusRateInfo]);

  return { basePrice, bondingPrice, bondingPricePerWeeks };
}
