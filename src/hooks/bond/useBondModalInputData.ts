import { convertNumber, convertToWei } from "@/utils/number";
import { BigNumber, ethers } from "ethers";
import useStosReward from "hooks/stake/useStosReward";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useMemo, useState } from "react";
import constant from "constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalBottomLoadingState } from "atom/global/modal";
import useStosBond from "./useStosBond";
import commafy from "@/utils/commafy";
import { BondCardProps } from "types/bond";
import useModal from "hooks/useModal";
import usePrice from "hooks/usePrice";
import useStakeV2 from "hooks/contract/useStakeV2";
import { bond_modal } from "atom/bond/modal";
import { useBondDepository } from "./useBondDepository";
import { useBlockNumber } from "hooks/useBlockNumber";

function useBondModalInputData() {
  const { selectedModalData } = useModal<BondCardProps>();
  const marketId = selectedModalData?.index ?? undefined;
  const ethPrice = selectedModalData?.ethPrice ?? undefined;

  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [inputTosAmount, setInputTosAmount] = useState<string | undefined>(
    undefined
  );
  const [originalTosAmount, setOriginalTosAmount] = useState<string>("-");
  const [bondDiscount, setBondDiscount] = useState<string>("-");
  const [roi, setRoi] = useState<string | undefined>(undefined);

  const [minimumTosPrice, setMinimumTosPrice] = useState<BigNumber | undefined>(
    undefined
  );
  const [maxCapacityValue, setMaxCapacityValue] = useState<number | undefined>(
    undefined
  );

  const {
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    LockTOS_CONTRACT,
  } = useCallContract();

  const bondModalRecoilValue = useRecoilValue(bond_modal);
  const { fiveDaysLockup } = bondModalRecoilValue;

  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const inputPeriod = inputValue?.bond_modal_period;

  const bondInputPeriod = fiveDaysLockup ? 0 : inputPeriod;
  const { newEndTime, newEndTimeStamp, newEndTimeStampWithoutStos } =
    useStosReward(0, 53);
  const { newBalanceStos } = useStosBond(Number(inputTosAmount));

  const { priceData } = usePrice();
  const { rebasePeriod } = constant;
  const [isLoading, setLoading] = useRecoilState(modalBottomLoadingState);

  const { bondingPrice, bondingPricePerWeeks } = useBondDepository();
  const { rebasePerEpoch } = useStakeV2();
  const { blockTimeStamp } = useBlockNumber();

  useEffect(() => {
    async function fetchBondModalInputData() {
      if (
        inputValue?.bond_modal_balance === "" ||
        inputValue?.bond_modal_balance === undefined ||
        inputValue?.bond_modal_balance.length === 0 ||
        marketId === undefined
      ) {
        return setInputTosAmount(undefined);
      }
      if (
        StakingV2Proxy_CONTRACT &&
        BondDepositoryProxy_CONTRACT &&
        LockTOS_CONTRACT &&
        inputValue?.bond_modal_balance &&
        marketId &&
        bondingPrice
      ) {
        const ethAmount = inputValue.bond_modal_balance;
        const ethAmountWei = convertToWei(ethAmount);

        //new script
        //   const bondList = await BondDepositoryProxy_CONTRACT.viewMarket(
        //     marketId
        //   );

        //  const tosPrice = await BondDepositoryProxy_CONTRACT.getBondingPrice(
        //    marketId,
        //    bondInputPeriod,
        //    basePriceInfo[0]
        //  );
        const tosValuation = BigNumber.from(ethAmountWei)
          .mul(bondingPrice)
          .div("1000000000000000000");

        const tosAmount = convertNumber({ amount: tosValuation.toString() });
        return setInputTosAmount(tosAmount);
      }
    }
    fetchBondModalInputData().catch((e) => {
      // console.log("**useBondModalInputData1 err**");
      // console.log(e);
    });
  }, [
    inputValue,
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    LockTOS_CONTRACT,
    rebasePeriod,
    marketId,
    bondingPrice,
  ]);

  useEffect(() => {
    async function fetchLtosData() {
      const ethAmount = inputValue.bond_modal_balance;

      if (ethAmount === undefined || ethAmount === "") {
        return setYouWillGet("-");
      }
      if (
        StakingV2Proxy_CONTRACT &&
        BondDepositoryProxy_CONTRACT &&
        ethAmount &&
        marketId &&
        bondingPrice
      ) {
        const ethAmountWei = convertToWei(ethAmount);

        const tosValuation = BigNumber.from(ethAmountWei)
          .mul(bondingPrice)
          .div("1000000000000000000");

        const LTOS_BN = await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(
          tosValuation
        );
        const ltos = convertNumber({ amount: LTOS_BN, localeString: true });

        setOriginalTosAmount(
          convertNumber({ amount: tosValuation.toString() }) || "-"
        );
        return setYouWillGet(ltos);
      }
    }
    fetchLtosData()
      .catch((e) => {
        // console.log("**fetchLtosData err**");
        // console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    selectedModalData,
    inputValue,
    marketId,
    setLoading,
    bondInputPeriod,
    bondingPrice,
  ]);

  //make arr for discountRate
  const discountRatePerBondingPrice = useMemo(() => {
    if (priceData && priceData?.tosPrice && ethPrice && bondingPricePerWeeks) {
      const { tosPrice } = priceData;

      return bondingPricePerWeeks.map((bondingPrice, index) => {
        const discunt =
          ethPrice /
          Number(ethers.utils.formatUnits(bondingPrice.toString(), 18));
        const discountRate = ((tosPrice - discunt) / tosPrice) * 100;
        return Number(commafy(discountRate));
      });
    }
    return undefined;
  }, [priceData, bondingPricePerWeeks]);

  const roiPerWeeks = useMemo(() => {
    if (newEndTimeStamp && blockTimeStamp && discountRatePerBondingPrice) {
      return discountRatePerBondingPrice.map((bondDiscount) => {
        const discountRate = bondDiscount / 100;

        const LTOSInterest =
          (1 + 87045050000000 / 1e18) **
            ((newEndTimeStamp - blockTimeStamp + 12) /
              constant.rebase.epochLength) -
          1;

        const ROI = ((1 + LTOSInterest) / (1 - discountRate) - 1) * 100;

        // return Math.floor(ROI);
        return Number(commafy(ROI));
      });
    }
  }, [newEndTimeStamp, blockTimeStamp, discountRatePerBondingPrice]);

  useEffect(() => {
    async function fetchBondDiscount() {
      if (bondInputPeriod === undefined || bondInputPeriod === "") {
        return setBondDiscount("-");
      }
      if (priceData && priceData?.tosPrice && ethPrice && bondingPrice) {
        const { tosPrice } = priceData;
        const bondingPriceCom = convertNumber({
          amount: bondingPrice.toString(),
        });

        const discunt =
          ethPrice /
          Number(ethers.utils.formatUnits(bondingPrice.toString(), 18));
        const discountRate = ((tosPrice - discunt) / tosPrice) * 100;

        const mininmumTosPrice = BigInt(
          Number(bondingPrice.toString()) / 1.005
        );

        setMinimumTosPrice(BigNumber.from(mininmumTosPrice.toString()));
        setBondDiscount(commafy(discountRate));
      }
    }
    fetchBondDiscount().catch((e) => {
      console.log("**fetchBondDiscount err**");
      console.log(e);
    });
  }, [priceData, bondingPrice, bondInputPeriod]);

  useEffect(() => {
    async function fetchROI() {
      if (
        newEndTimeStamp &&
        newEndTimeStampWithoutStos &&
        blockTimeStamp &&
        bondDiscount
      ) {
        const discountRate = Number(bondDiscount) / 100;
        const LTOSInterest =
          (1 + 87045050000000 / 1e18) **
            ((newEndTimeStamp - blockTimeStamp + 12) /
              constant.rebase.epochLength) -
          1;
        const ROI = ((1 + LTOSInterest) / (1 - Number(discountRate)) - 1) * 100;
        setRoi(commafy(ROI));
      }
    }
    fetchROI().catch((e) => {
      console.log("**fetchBondDiscount err**");
      console.log(e);
    });
  }, [
    newEndTimeStamp,
    newEndTimeStampWithoutStos,
    blockTimeStamp,
    bondDiscount,
  ]);

  useEffect(() => {
    async function fetchMaxValue() {
      if (BondDepositoryProxy_CONTRACT && marketId && bondingPrice) {
        const capacity = await BondDepositoryProxy_CONTRACT.possibleMaxCapacity(
          marketId
        );
        const currentCapacityETH_BN = BigNumber.from(
          capacity.currentCapacity
        ).div(bondingPrice);
        const currentCapacityETH = commafy(currentCapacityETH_BN.toString(), 2);

        //apply slippage as dividing 1.005
        const currentCapacityNum =
          Number(capacity.currentCapacity.toString()) / 1.005;
        const bondingPriceNum = Number(bondingPrice);
        const capacityMaxValue = currentCapacityNum / bondingPriceNum;

        setMaxCapacityValue(currentCapacityNum / bondingPriceNum);
      }
    }
    fetchMaxValue().catch((e) => {
      console.log("**fetchMaxValue err**");
      console.log(e);
    });
  }, [BondDepositoryProxy_CONTRACT, marketId, bondInputPeriod, bondingPrice]);

  const isMinusDiscount = useMemo(() => {
    return Number(bondDiscount) < 0;
  }, [bondDiscount]);

  const isMinusROI = useMemo(() => {
    return Number(roi) < 0;
  }, [roi]);

  return {
    youWillGet,
    endTime: newEndTime,
    stosReward: commafy(newBalanceStos),
    originalTosAmount,
    bondDiscount,
    minimumTosPrice,
    maxCapacityValue,
    isMinusDiscount,
    roi,
    isMinusROI,
    roiPerWeeks,
    discountRatePerBondingPrice,
  };
}

export default useBondModalInputData;
