import constant from "constant";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useBondModalCondition(maxValue: number | undefined) {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const inputBalance = inputValue.bond_modal_balance;
  const inputPeriod = inputValue.bond_modal_period;
  const { LOCKTOS_maxWeeks } = constant;

  useEffect(() => {
    if (inputBalance === undefined || inputBalance === "") {
      return setInputOver(false);
    }
    if (maxValue && inputBalance) {
      if (Number(inputBalance) > maxValue) {
        return setInputOver(true);
      }
      return setInputOver(false);
    }
  }, [inputBalance, maxValue]);

  useEffect(() => {
    if (Number(inputPeriod) > LOCKTOS_maxWeeks || Number(inputPeriod) < 1) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, LOCKTOS_maxWeeks]);

  return { inputOver, LOCKTOS_maxWeeks, inputPeriodOver };
}

export default useBondModalCondition;
