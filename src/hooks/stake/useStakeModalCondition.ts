import constant from "constant";
import useInput from "hooks/useInput";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useStakeModalCondition() {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const { userTOSBalance } = useUserBalance();
  const { inputValue } = useInput("Stake_screen", "stake_modal");
  const inputTosAmount = inputValue.stake_modal_balance;
  const inputPeriod = inputValue.stake_modal_period;
  const { LOCKTOS_maxWeeks } = constant;

  useEffect(() => {
    if (inputTosAmount === undefined || inputTosAmount === "") {
      return setInputOver(false);
    }
    if (userTOSBalance && inputTosAmount) {
      if (Number(inputTosAmount) > Number(userTOSBalance.replaceAll(",", ""))) {
        return setInputOver(true);
      }
      return setInputOver(false);
    }
  }, [inputTosAmount, userTOSBalance]);

  useEffect(() => {
    if (Number(inputPeriod) > LOCKTOS_maxWeeks || Number(inputPeriod) < 1) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, LOCKTOS_maxWeeks]);

  console.log("inputPeriodOver");
  console.log(inputPeriodOver);

  return { inputOver, inputPeriodOver, btnDisabled };
}

export default useStakeModalCondition;
