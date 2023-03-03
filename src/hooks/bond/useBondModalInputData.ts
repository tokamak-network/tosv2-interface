import { convertNumber, convertToWei } from "@/utils/number";
import { BigNumber, ethers, FixedNumber } from "ethers";
import useStosReward from "hooks/stake/useStosReward";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import JSBI from "jsbi";
import constant from "constant";
import { useRecoilState } from "recoil";
import { modalBottomLoadingState } from "atom/global/modal";
import { getTimeZone } from "@/utils/time";
import useStosBond from "./useStosBond";
import commafy from "@/utils/commafy";
import { BondCardProps } from "types/bond";
import useModal from "hooks/useModal";
import usePrice from "hooks/usePrice";

function useBondModalInputData() {
  const { selectedModalData } = useModal<BondCardProps>();
  const marketId = selectedModalData?.index ?? undefined;

  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);
  const [inputTosAmount, setInputTosAmount] = useState<string | undefined>(
    undefined
  );
  const [originalTosAmount, setOriginalTosAmount] = useState<string>("-");
  const [bondDiscount, setBondDiscount] = useState<string>("-");
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

  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const bondInputPeriod = inputValue?.bond_modal_period;
  const { newEndTime } = useStosReward(Number(inputTosAmount), bondInputPeriod);
  const { newBalanceStos } = useStosBond(Number(inputTosAmount));
  const { priceData } = usePrice();
  const { rebasePeriod } = constant;
  const [isLoading, setLoading] = useRecoilState(modalBottomLoadingState);

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
        marketId
      ) {
        const ethAmount = inputValue.bond_modal_balance;
        const ethAmountWei = convertToWei(ethAmount);

        //new script
        const bondList = await BondDepositoryProxy_CONTRACT.viewMarket(
          marketId
        );

        const tosPrice = bondList.market.tosPrice;
        // const tosValuation =
        //   await BondDepositoryProxy_CONTRACT.calculateTosAmountForAsset(
        //     tosPrice,
        //     ethAmountWei
        //   );
        const tosValuation = BigNumber.from(ethAmountWei)
          .mul(tosPrice)
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
        marketId
      ) {
        const ethAmountWei = convertToWei(ethAmount);
        const bondList = await BondDepositoryProxy_CONTRACT.viewMarket(
          marketId
        );

        const tosPrice = bondList.market.tosPrice;
        // const tosAmount =
        //   await BondDepositoryProxy_CONTRACT.calculateTosAmountForAsset(
        //     tosPrice,
        //     ethAmountWei
        //   );

        const tosValuation = BigNumber.from(ethAmountWei)
          .mul(tosPrice)
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
        console.log("**fetchLtosData err**");
        console.log(e);
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
        bondInputPeriod &&
        priceData &&
        priceData?.tosPrice &&
        priceData?.ethPrice
      ) {
        const { ethPrice, tosPrice } = priceData;
        const basePriceInfo = await BondDepositoryProxy_CONTRACT.getBasePrice(
          marketId
        );
        const bondingPrice = await BondDepositoryProxy_CONTRACT.getBondingPrice(
          marketId,
          bondInputPeriod,
          basePriceInfo[0]
        );
        const bondingPriceCom = convertNumber({ amount: bondingPrice });
        const bondingPricePerTos =
          (priceData.ethPrice / Number(bondingPriceCom)) * 0.995;
        const minimumBondPrice = Number(
          commafy(bondingPricePerTos).replaceAll(",", "")
        );
        const discount = ((tosPrice - minimumBondPrice) / tosPrice) * 100;
        const mininmumTosPrice = BigInt(
          Number(bondingPrice.toString()) / 1.005
        );

        setMinimumTosPrice(BigNumber.from(mininmumTosPrice.toString()));
        setBondDiscount(commafy(discount));
      }
    }
    fetchBondDiscount().catch((e) => {
      console.log("**fetchBondDiscount err**");
      console.log(e);
    });
  }, [BondDepositoryProxy_CONTRACT, marketId, bondInputPeriod, priceData]);

  useEffect(() => {
    async function fetchMaxValue() {
      if (BondDepositoryProxy_CONTRACT && marketId) {
        const capacity = await BondDepositoryProxy_CONTRACT.possibleMaxCapacity(
          marketId
        );
        const basePriceInfo = await BondDepositoryProxy_CONTRACT.getBasePrice(
          marketId
        );
        const bondingPrice = await BondDepositoryProxy_CONTRACT.getBondingPrice(
          marketId,
          bondInputPeriod,
          basePriceInfo[0]
        );

        const currentCapacityETH_BN = BigNumber.from(
          capacity.currentCapacity
        ).div(bondingPrice);

        const currentCapacityETH = commafy(currentCapacityETH_BN.toString(), 2);
        // if (currentCapacityETH)
        //   return setMaxCapacityValue(
        //     Number(currentCapacityETH.replaceAll(",", ""))
        //   );
        setMaxCapacityValue(Number(currentCapacityETH));
      }
    }
    fetchMaxValue().catch((e) => {
      console.log("**fetchMaxValue err**");
      console.log(e);
    });
  }, [BondDepositoryProxy_CONTRACT, marketId, bondInputPeriod]);

  return {
    youWillGet,
    endTime,
    stosReward: commafy(newBalanceStos),
    originalTosAmount,
    bondDiscount,
    minimumTosPrice,
    maxCapacityValue,
  };
}

export default useBondModalInputData;
