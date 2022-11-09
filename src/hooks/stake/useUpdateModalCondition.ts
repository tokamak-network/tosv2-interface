import constant from "constant";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import useUserBalance from "hooks/useUserBalance";
import { useEffect, useState } from "react";
import { BondModalInput } from "types/bond";

function useUpdateModalConditon(leftWeeks: number) {
  const [inputOver, setInputOver] = useState<boolean>(true);
  const [inputPeriodOver, setInputPeriodOver] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [zeroInputBalance, setZeroInputBalance] = useState<boolean>(false);
  const [zeroInputPeriod, setZeroInputPeriod] = useState<boolean>(false);
  const [bothConditionsErr, setBothConditionsErr] = useState<boolean>(false);

  const { userTOSBalance } = useUserBalance();
  const { isModalLoading } = useModal();

  const { inputValue } = useInput("Stake_screen", "update_modal");
  const inputTosAmount = inputValue.stake_updateModal_tos_balance;
  const inputPeriod = inputValue.stake_updateModal_period;
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
    console.log("inputPeriod");
    console.log(inputPeriod);
    console.log(inputPeriod?.length);

    if (
      LOCKTOS_maxWeeks < Number(inputPeriod) ||
      Number(inputPeriod) < leftWeeks ||
      Number(inputPeriod) < 0 ||
      inputPeriod?.length === 0
    ) {
      return setInputPeriodOver(true);
    }
    return setInputPeriodOver(false);
  }, [inputPeriod, leftWeeks, LOCKTOS_maxWeeks]);

  useEffect(() => {
    if (
      inputOver ||
      inputPeriodOver ||
      inputTosAmount === undefined ||
      inputTosAmount?.length === 0
    ) {
      return setBtnDisabled(true);
    }
    if (Number(inputTosAmount) === 0 && inputPeriod - leftWeeks === 0) {
      return setBtnDisabled(true);
    }
    return setBtnDisabled(false);
  }, [inputOver, inputPeriodOver, inputTosAmount, inputPeriod, leftWeeks]);

  useEffect(() => {
    if (
      (inputTosAmount === undefined ||
        inputTosAmount?.length === 0 ||
        Number(inputTosAmount) === 0) &&
      (inputPeriod - leftWeeks === 0 || inputPeriod?.length === 0)
    ) {
      setBothConditionsErr(true);
    } else {
      setBothConditionsErr(false);
    }
  }, [inputPeriod, inputTosAmount, leftWeeks]);

  return {
    inputOver,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    bothConditionsErr,
  };
}

export default useUpdateModalConditon;
