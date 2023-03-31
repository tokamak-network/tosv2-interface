import { convertNumber, convertToWei } from "@/utils/number";
import { BigNumber, ethers, FixedNumber } from "ethers";
import useStosReward from "hooks/stake/useStosReward";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useMemo, useState } from "react";
import JSBI from "jsbi";
import constant from "constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalBottomLoadingState } from "atom/global/modal";
import { getTimeZone } from "@/utils/time";
import useStosBond from "./useStosBond";
import commafy from "@/utils/commafy";
import { BondCardProps } from "types/bond";
import useModal from "hooks/useModal";
import usePrice from "hooks/usePrice";
import useStakeV2 from "hooks/contract/useStakeV2";
import { bond_modal } from "atom/bond/modal";
import { useBondDepository } from "./useBondDepository";
import useBondModal from "./useBondModal";
import { useBlockNumber } from "hooks/useBlockNumber";

function useBondModalInputData() {
  const { selectedModalData } = useModal<BondCardProps>();
  const marketId = selectedModalData?.index ?? undefined;
  const ethPrice = selectedModalData?.ethPrice ?? undefined;

  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);
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
  const bondInputPeriod = fiveDaysLockup ? 0 : inputValue?.bond_modal_period;
  const { newEndTime, newEndTimeStamp, newEndTimeStampWithoutStos } =
    useStosReward(Number(inputTosAmount), bondInputPeriod);
  const { newBalanceStos } = useStosBond(Number(inputTosAmount));

  const { priceData } = usePrice();
  const { rebasePeriod } = constant;
  const [isLoading, setLoading] = useRecoilState(modalBottomLoadingState);

  const { bondingPrice } = useBondDepository();
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

  useEffect(() => {
    async function fetchBondModalInputData() {
      return setEndTime(`${newEndTime}`);
    }
    fetchBondModalInputData().catch((e) => {
      // console.log("**useBondModalInputData2 err**");
      // console.log(e);
    });
  }, [newEndTime]);

  useEffect(() => {
    async function fetchBondDiscount() {
      if (
        BondDepositoryProxy_CONTRACT &&
        marketId &&
        bondInputPeriod !== "" &&
        bondInputPeriod !== undefined &&
        priceData &&
        priceData?.tosPrice &&
        ethPrice &&
        bondingPrice
      ) {
        const { tosPrice } = priceData;
        const bondingPriceCom = convertNumber({
          amount: bondingPrice.toString(),
        });

        const discunt =
          priceData.ethPrice /
          Number(ethers.utils.formatUnits(bondingPrice.toString(), 18)) /
          1.005;
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
  }, [
    BondDepositoryProxy_CONTRACT,
    marketId,
    bondInputPeriod,
    priceData,
    bondingPrice,
    ethPrice,
  ]);

  useEffect(() => {
    async function fetchROI() {
      if (
        marketId &&
        rebasePerEpoch &&
        endTime &&
        newEndTimeStamp &&
        newEndTimeStampWithoutStos &&
        blockTimeStamp &&
        bondDiscount
      ) {
        const discountRate = Math.floor(Number(bondDiscount) / 100);
        const LTOSInterest =
          (1 + 87045050000000 / 1e18) **
            ((newEndTimeStamp - blockTimeStamp + 12) /
              constant.rebase.epochLength) -
          1;
        const ROI = (1 + LTOSInterest) / 1 - Number(discountRate) - 1;
        console.log("**ROI TEST**");

        console.log(LTOSInterest);
        console.log(ROI);
        setRoi(commafy(ROI));
      }
    }
    fetchROI().catch((e) => {
      console.log("**fetchBondDiscount err**");
      console.log(e);
    });
  }, [
    marketId,
    rebasePerEpoch,
    endTime,
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
    endTime,
    stosReward: commafy(newBalanceStos),
    originalTosAmount,
    bondDiscount,
    minimumTosPrice,
    maxCapacityValue,
    isMinusDiscount,
    roi,
    isMinusROI,
  };
}

export default useBondModalInputData;
