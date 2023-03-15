import constant from "constant";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useBondModalCondition(maxValue: number | undefined) {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(false);

  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const inputBalance = inputValue.bond_modal_balance;
  const inputPeriod = 155;
  const { modalMaxWeeks: LOCKTOS_maxWeeks } = constant;
  const { isModalLoading } = useModal();

  useEffect(() => {
    if (isModalLoading) {
      setZeroInputBalance(false);
      return setInputOver(false);
    }
    if (inputBalance === undefined || inputBalance === "") {
      setZeroInputBalance(true);
      return setInputOver(true);
    }
    if (maxValue && inputBalance) {
      if (Number(inputBalance) > maxValue) {
        setZeroInputBalance(false);
        return setInputOver(true);
      }
      if (Number(inputBalance) <= 0) {
        setZeroInputBalance(true);
        return setInputOver(true);
      }
      setZeroInputBalance(false);
      return setInputOver(false);
    }
  }, [inputBalance, maxValue, isModalLoading]);

  useEffect(() => {
    if (Number(inputPeriod) > LOCKTOS_maxWeeks || Number(inputPeriod) < 1) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, LOCKTOS_maxWeeks]);

  useEffect(() => {
    setBtnDisabled(inputOver || inputPeriodOver);
  }, [inputOver, inputPeriodOver]);

  return {
    inputOver,
    LOCKTOS_maxWeeks,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
  };
}

export default useBondModalCondition;
