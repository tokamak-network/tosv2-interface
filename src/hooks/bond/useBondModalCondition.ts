import constant from "constant";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";

function useBondModalCondition(maxValue: number | undefined) {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [inputPeriodIsEmpty, setInputPeriodIsEmpty] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(false);
  const [inputBalanceisEmpty, setInputBalanceisEmpty] =
    useState<boolean>(false);

  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const inputBalance = inputValue.bond_modal_balance;
  const inputPeriod = inputValue.bond_modal_period;
  const { bondModalMaxWeeks } = constant;

  useEffect(() => {
    if (inputBalance === undefined || inputBalance === "") {
      setInputBalanceisEmpty(true);
      setZeroInputBalance(false);
      return setInputOver(false);
    }
    if (maxValue && inputBalance) {
      if (Number(inputBalance) > maxValue) {
        setZeroInputBalance(false);
        setInputBalanceisEmpty(false);
        return setInputOver(true);
      }
      if (Number(inputBalance) === 0) {
        setZeroInputBalance(true);
        setInputBalanceisEmpty(false);
        return setInputOver(false);
      }
      setInputBalanceisEmpty(false);
      setZeroInputBalance(false);
      return setInputOver(false);
    }
  }, [inputBalance, maxValue]);

  useEffect(() => {
    if (String(inputPeriod) === "" || inputPeriod === undefined) {
      setInputPeriodOver(false);
      return setInputPeriodIsEmpty(true);
    }
    if (Number(inputPeriod) > bondModalMaxWeeks || Number(inputPeriod) < 1) {
      setInputPeriodIsEmpty(false);
      return setInputPeriodOver(true);
    }

    setInputPeriodIsEmpty(false);
    return setInputPeriodOver(false);
  }, [inputPeriod, bondModalMaxWeeks]);

  useEffect(() => {
    setBtnDisabled(
      inputOver || inputPeriodOver || inputPeriodIsEmpty || inputBalanceisEmpty
    );
  }, [inputOver, inputPeriodOver, inputPeriodIsEmpty, inputBalanceisEmpty]);

  return {
    inputOver,
    bondModalMaxWeeks,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    inputPeriodIsEmpty,
    inputBalanceisEmpty,
  };
}

export default useBondModalCondition;
