import useInput from "hooks/useInput";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useStakeModalCondition() {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const { userTOSBalance } = useUserBalance();
  const { inputValue } = useInput("Stake_screen", "stake_modal");
  const inputTosAmount = inputValue.stake_modal_balance;

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

  return { inputOver, btnDisabled };
}

export default useStakeModalCondition;
