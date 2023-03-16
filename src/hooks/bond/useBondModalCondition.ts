import constant from "constant";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

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
  const { modalMaxWeeks: LOCKTOS_maxWeeks } = constant;
  const { isModalLoading } = useModal();

  useEffect(() => {
    if (isModalLoading) {
      setZeroInputBalance(false);
      setInputBalanceisEmpty(false);
      return setInputOver(false);
    }
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
  }, [inputBalance, maxValue, isModalLoading]);

  useEffect(() => {
    if (Number(inputPeriod) > LOCKTOS_maxWeeks) {
      return setInputPeriodOver(true);
    }
    if (String(inputPeriod) === "") {
      return setInputPeriodIsEmpty(true);
    }
    setInputPeriodIsEmpty(false);
    return setInputPeriodOver(false);
  }, [inputPeriod, LOCKTOS_maxWeeks]);

  useEffect(() => {
    setBtnDisabled(inputOver || inputPeriodOver || inputPeriodIsEmpty);
  }, [inputOver, inputPeriodOver, inputPeriodIsEmpty]);

  return {
    inputOver,
    LOCKTOS_maxWeeks,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    inputPeriodIsEmpty,
    inputBalanceisEmpty,
  };
}

export default useBondModalCondition;
