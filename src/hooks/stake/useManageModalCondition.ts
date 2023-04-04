import constant from "constant";
import { useCheckInput } from "hooks/input/useCheckInput";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState, useMemo } from "react";
import { BondModalInput } from "types/bond";

function useManageModalConditon(leftWeeks: number) {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(false);
  const [zeroInputPeriod, setZeroInputPeriod] = useState<boolean>(false);
  const [bothConditionsErr, setBothConditionsErr] = useState<boolean>(false);

  const { userTokenBalance } = useUserBalance();
  const { isModalLoading } = useModal();

  const { inputValue } = useInput("Stake_screen", "update_modal");
  const inputTosAmount = inputValue.stake_updateModal_tos_balance;
  const inputPeriod = inputValue.stake_updateModal_period;
  const { stakeModalMaxWeeks } = constant;

  useEffect(() => {
    if (isModalLoading) {
      return setZeroInputBalance(false);
    }
    if (
      inputTosAmount === undefined ||
      inputTosAmount.length === 0 ||
      Number(inputTosAmount) <= 0
    ) {
      setZeroInputBalance(true);
      return setInputOver(false);
    }
    if (userTokenBalance?.TOS && inputTosAmount) {
      if (Number(inputTosAmount) > Number(userTokenBalance.TOS.balanceWei)) {
        setZeroInputBalance(false);
        return setInputOver(true);
      }
      setZeroInputBalance(false);
      return setInputOver(false);
    }
    // return () => {
    //   setZeroInputBalance(false);
    //   setInputOver(false);
    // };
  }, [inputTosAmount, userTokenBalance, isModalLoading]);

  useEffect(() => {
    if (
      stakeModalMaxWeeks < Number(inputPeriod) ||
      Number(inputPeriod) < leftWeeks ||
      Number(inputPeriod) < 0 ||
      inputPeriod?.length === 0
    ) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, leftWeeks, stakeModalMaxWeeks]);

  useEffect(() => {
    if (
      inputOver ||
      inputPeriodOver ||
      inputTosAmount === undefined ||
      inputTosAmount?.length === 0
    ) {
      return setBtnDisabled(true);
    }
    if (Number(inputTosAmount) === 0 && inputPeriod - leftWeeks === 0) {
      return setBtnDisabled(true);
    }
    return setBtnDisabled(false);
  }, [inputOver, inputPeriodOver, inputTosAmount, inputPeriod, leftWeeks]);

  useEffect(() => {
    if (
      (inputTosAmount === undefined ||
        inputTosAmount?.length === 0 ||
        Number(inputTosAmount) === 0) &&
      (inputPeriod - leftWeeks === 0 || inputPeriod?.length === 0)
    ) {
      setBothConditionsErr(true);
    } else {
      setBothConditionsErr(false);
    }
  }, [inputPeriod, inputTosAmount, leftWeeks]);

  const inputBalanceIsEmpty = useCheckInput(inputTosAmount);
  const inputPeriodIsEmpty = useCheckInput(inputPeriod);

  return {
    inputOver,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    bothConditionsErr,
    inputBalanceIsEmpty,
    inputPeriodIsEmpty,
  };
}

export default useManageModalConditon;
