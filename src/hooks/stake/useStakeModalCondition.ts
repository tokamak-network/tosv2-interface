import constant from "constant";
import useInput from "hooks/useInput";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useStakeModalCondition() {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(true);

  const { userTOSBalance } = useUserBalance();
  const { inputValue } = useInput("Stake_screen", "stake_modal");
  const inputTosAmount = inputValue.stake_modal_balance;
  const inputPeriod = inputValue.stake_modal_period;
  const { LOCKTOS_maxWeeks } = constant;

  useEffect(() => {
    if (
      inputTosAmount === undefined ||
      inputTosAmount === "" ||
      Number(inputTosAmount) <= 0
    ) {
      setZeroInputBalance(true);
      return setInputOver(false);
    }
    if (userTOSBalance && inputTosAmount) {
      if (Number(inputTosAmount) > Number(userTOSBalance.replaceAll(",", ""))) {
        setZeroInputBalance(false);
        return setInputOver(true);
      }
      setZeroInputBalance(false);
      return setInputOver(false);
    }
  }, [inputTosAmount, userTOSBalance]);

  useEffect(() => {
    if (Number(inputPeriod) > LOCKTOS_maxWeeks || Number(inputPeriod) < 1) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, LOCKTOS_maxWeeks]);

  useEffect(() => {
    setBtnDisabled(inputOver || inputPeriodOver || zeroInputBalance);
  }, [inputOver, inputPeriodOver, zeroInputBalance]);

  return { inputOver, inputPeriodOver, zeroInputBalance, btnDisabled };
}

export default useStakeModalCondition;
