import { compareBN } from "@/utils/bigNumber";
import constant from "constant";
import { BigNumber, ethers } from "ethers";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useStakeModalCondition() {
  const [inputOver, setInputOver] = useState<boolean>(false);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(false);
  const [inputBalanceIsEmpty, setInputBalanceIsEmpty] =
    useState<boolean>(false);

  const { userTokenBalance } = useUserBalance();
  const { isModalLoading } = useModal();
  const { inputValue } = useInput("Stake_screen", "stake_modal");
  const inputTosAmount = inputValue.stake_modal_balance;
  const inputPeriod = inputValue.stake_modal_period;
  const { modalMaxWeeks: LOCKTOS_maxWeeks } = constant;
  const minimumWeeks = 0;

  useEffect(() => {
    if (isModalLoading) {
      setInputOver(false);
      setZeroInputBalance(false);
      return setInputBalanceIsEmpty(false);
    }
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
  }, [inputTosAmount, userTokenBalance, isModalLoading]);

  useEffect(() => {
    if (
      Number(inputPeriod) > LOCKTOS_maxWeeks ||
      Number(inputPeriod) < minimumWeeks ||
      inputPeriod.length === 0
    ) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, LOCKTOS_maxWeeks, isModalLoading]);

  useEffect(() => {
    setBtnDisabled(inputOver || inputPeriodOver || zeroInputBalance);
  }, [inputOver, inputPeriodOver, zeroInputBalance]);

  return {
    inputOver,
    inputPeriodOver,
    zeroInputBalance,
    btnDisabled,
    inputBalanceIsEmpty,
  };
}

export default useStakeModalCondition;
