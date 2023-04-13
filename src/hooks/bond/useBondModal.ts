import { useMemo } from "react";
import useBondModalCondition from "./useBondModalCondition";
import useInput from "hooks/useInput";
import useStosReward from "hooks/stake/useStosReward";
import useBondModalInputData from "./useBondModalInputData";
import useUserBalance from "hooks/useUserBalance";
import { TokenTypes } from "types";

function useBondModal() {
  //stos
  const { inputValue, setValue, setResetValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );

  const { leftDays, leftWeeks, leftHourAndMin } = useStosReward(
    inputValue.bond_modal_balance,
    inputValue.bond_modal_period ?? 0
  );

  //need to put marketId
  const {
    youWillGet,
    endTime,
    stosReward,
    originalTosAmount,
    maxCapacityValue,
  } = useBondModalInputData();

  //calculate maxValue
  const { userETHBalance, userETHBalanceWei } = useUserBalance();
  const maxValue = useMemo(() => {
    if (userETHBalanceWei === undefined || maxCapacityValue === undefined) {
      return 0;
    }
    if (userETHBalanceWei !== undefined && maxCapacityValue !== undefined) {
      return maxCapacityValue > userETHBalanceWei
        ? userETHBalanceWei
        : maxCapacityValue;
    }
  }, [userETHBalanceWei, maxCapacityValue]);

  //modal condition
  const {
    inputOver,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    inputPeriodIsEmpty,
    inputBalanceisEmpty,
  } = useBondModalCondition(maxValue);

  //maxValue for each case(token type)
  let tempTokenType: TokenTypes = "ETH";
  const userTokenBalance = useMemo(() => {
    switch (tempTokenType) {
      case "ETH":
        return {
          balance: userETHBalance,
          balanceNum: userETHBalanceWei,
          name: "ETH",
          maxValue,
        };
      default:
        return {
          balance: "-",
          balanceNum: 0,
          name: "-",
          maxValue: 0,
        };
    }
  }, [tempTokenType, userETHBalance, userETHBalanceWei, maxValue]);

  return {
    sTos: {
      leftDays,
      leftWeeks,
      leftHourAndMin,
    },
    modalCondition: {
      inputOver,
      inputPeriodOver,
      btnDisabled,
      zeroInputBalance,
      inputPeriodIsEmpty,
      inputBalanceisEmpty,
    },
    bondModalInputData: {
      youWillGet,
      endTime,
      stosReward,
      originalTosAmount,
    },
    userTokenBalance,
  };
}

export default useBondModal;
