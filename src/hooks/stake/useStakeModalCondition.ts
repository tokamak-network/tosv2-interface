import { compareBN } from "@/utils/bigNumber";
import constant from "constant";
import { BigNumber, ethers } from "ethers";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState, useMemo } from "react";
import { BondModalInput } from "types/bond";

function useStakeModalCondition() {
  const [inputOver, setInputOver] = useState<boolean>(false);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(false);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(false);
  const [inputBalanceIsEmpty, setInputBalanceIsEmpty] =
    useState<boolean>(false);

  const { userTokenBalance } = useUserBalance();
  const { inputValue } = useInput("Stake_screen", "stake_modal");
  const inputTosAmount = inputValue.stake_modal_balance;
  const inputPeriod = inputValue.stake_modal_period;
  const { stakeModalMaxWeeks } = constant;
  const minimumWeeks = 0;

  useEffect(() => {
    if (inputTosAmount === undefined || inputTosAmount === "") {
      setZeroInputBalance(false);
      setInputOver(false);
      return setInputBalanceIsEmpty(true);
    }
    if (userTokenBalance?.TOS.balanceWei && inputTosAmount) {
      // const inputTosAmountIsGt = compareBN(
      //   BigNumber.from(inputTosAmount.toString()),
      //   BigNumber.from(
      //     ethers.utils.formatUnits(userTokenBalance.TOS.balanceWei)
      //   )
      // );

      if (Number(inputTosAmount) === 0) {
        setZeroInputBalance(true);
        setInputOver(false);
        return setInputBalanceIsEmpty(false);
      }

      if (Number(inputTosAmount) > Number(userTokenBalance.TOS.balanceWei)) {
        setZeroInputBalance(false);
        setInputOver(true);
        return setInputBalanceIsEmpty(false);
      }
      setZeroInputBalance(false);
      setInputOver(false);
      return setInputBalanceIsEmpty(false);
    }
    return () => {
      setZeroInputBalance(false);
      setInputOver(false);
      setInputBalanceIsEmpty(false);
    };
  }, [inputTosAmount, userTokenBalance]);

  useEffect(() => {
    if (
      Number(inputPeriod) > stakeModalMaxWeeks ||
      Number(inputPeriod) < minimumWeeks
    ) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, stakeModalMaxWeeks]);

  const inputPeriodIsEmpty = useMemo(() => {
    if (inputPeriod === undefined || inputPeriod === "") {
      return true;
    }
    return false;
  }, [inputPeriod]);

  const btnDisabled = useMemo(() => {
    if (
      inputOver ||
      inputPeriodOver ||
      zeroInputBalance ||
      inputBalanceIsEmpty ||
      inputPeriodIsEmpty
    ) {
      return true;
    }
    return false;
  }, [
    inputOver,
    inputPeriodOver,
    zeroInputBalance,
    inputBalanceIsEmpty,
    inputPeriodIsEmpty,
  ]);

  return {
    inputOver,
    inputPeriodOver,
    zeroInputBalance,
    btnDisabled,
    inputBalanceIsEmpty,
    inputPeriodIsEmpty,
  };
}

export default useStakeModalCondition;
