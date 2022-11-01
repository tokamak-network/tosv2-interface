import constant from "constant";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useRelockModalCondition(addTos: boolean) {
  const [inputOver, setInputOver] = useState<boolean>(false);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(false);

  const { userTOSBalance } = useUserBalance();
  const { isModalLoading } = useModal();
  const { inputValue } = useInput("Stake_screen", "relock_modal");

  const inputTosAmount = addTos
    ? inputValue.stake_relockModal_tos_balance
    : inputValue.stake_relockModal_ltos_balance;
  //   const inputLTosAmount = inputValue.stake_relockModal_ltos_balance;
  const inputPeriod = inputValue.stake_relockModal_period;
  const { modalMaxWeeks: LOCKTOS_maxWeeks } = constant;

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
    if (userTOSBalance && inputTosAmount) {
      if (Number(inputTosAmount) > Number(userTOSBalance.replaceAll(",", ""))) {
        setZeroInputBalance(false);
        return setInputOver(true);
      }
      setZeroInputBalance(false);
      return setInputOver(false);
    }
    return () => {
      setZeroInputBalance(false);
      setInputOver(false);
    };
  }, [inputTosAmount, userTOSBalance, isModalLoading]);

  useEffect(() => {
    if (Number(inputPeriod) > LOCKTOS_maxWeeks || Number(inputPeriod) < 1) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, LOCKTOS_maxWeeks, isModalLoading]);

  useEffect(() => {
    setBtnDisabled(inputOver || inputPeriodOver || zeroInputBalance);
  }, [inputOver, inputPeriodOver, zeroInputBalance]);

  return { inputOver, inputPeriodOver, zeroInputBalance, btnDisabled };
}

export default useRelockModalCondition;
