import constant from "constant";
import useInput from "hooks/useInput";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useUpdateModalConditon() {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const { userTOSBalance } = useUserBalance();

  const { inputValue } = useInput("Stake_screen", "update_modal");
  const inputTosAmount = inputValue.stake_updateModal_tos_balance;
  const inputPeriod = inputValue.stake_updateModal_period;
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

  useEffect(() => {
    setBtnDisabled(inputOver || inputPeriodOver);
  }, [inputOver, inputPeriodOver]);

  return { inputOver, inputPeriodOver, btnDisabled };
}

export default useUpdateModalConditon;
