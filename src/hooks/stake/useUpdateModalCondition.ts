import constant from "constant";
import useInput from "hooks/useInput";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useUpdateModalConditon(leftWeeks: number) {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const { userTOSBalance } = useUserBalance();

  const { inputValue } = useInput("Stake_screen", "update_modal");
  const inputTosAmount = inputValue.stake_updateModal_tos_balance;
  const inputPeriod = inputValue.stake_updateModal_period;
  const { modalMaxWeeks: LOCKTOS_maxWeeks } = constant;

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
    if (
      LOCKTOS_maxWeeks < Number(inputPeriod) ||
      Number(inputPeriod) < leftWeeks ||
      Number(inputPeriod) < 0
    ) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, leftWeeks, LOCKTOS_maxWeeks]);

  useEffect(() => {
    setBtnDisabled(
      inputOver ||
        inputPeriodOver ||
        inputTosAmount === undefined ||
        inputTosAmount?.length === 0
    );
  }, [inputOver, inputPeriodOver, inputTosAmount]);

  return { inputOver, inputPeriodOver, btnDisabled };
}

export default useUpdateModalConditon;
