import { getDiscountRate } from "@/utils/bond/card/getDiscountRate";
import { bond_modal } from "atom/bond/modal";
import { BigNumber } from "ethers";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { BondCardProps } from "types/bond";

export function useBondDepository(lockupWeeks?: number) {
  const [basePrice, setBasePrice] = useState<BigNumber | undefined>(undefined);
  const [bondingPrice, setBondingPrice] = useState<BigNumber | undefined>(
    undefined
  );

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
    if (basePrice && _weeks !== undefined) {
      const rate = getDiscountRate(_weeks);
      const plusValue = basePrice.mul(rate).div(10000);
      const result = basePrice.add(plusValue);
      return setBondingPrice(result);
    }
  }, [basePrice, _weeks]);

  const bondingPricePerWeeks = useMemo(() => {
    if (basePrice) {
      let bondPriceArr = [];
      for (let i = 1; i < 54; i++) {
        const rate = getDiscountRate(i);
        const plusValue = basePrice.mul(rate).div(10000);
        const result = basePrice.add(plusValue);
        bondPriceArr.push(result);
      }
      return bondPriceArr;
    }
    return undefined;
  }, [basePrice]);

  return { basePrice, bondingPrice, bondingPricePerWeeks };
}
