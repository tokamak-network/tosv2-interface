import useModal from "hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { BondCardProps } from "types/bond";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { useQuery } from "@apollo/client";
import commafy from "@/utils/commafy";
import useCallContract from "hooks/useCallContract";
import { convertNumber, convertToWei } from "@/utils/number";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers, utils } from "ethers";
import usePrice from "hooks/usePrice";
import constant from "constant";
import useBondModalCondition from "./useBondModalCondition";
import useInput from "hooks/useInput";
import useStosReward from "hooks/stake/useStosReward";
import useBondModalInputData from "./useBondModalInputData";
import useUserBalance from "hooks/useUserBalance";
import { TokenTypes } from "types";

function useBondModal() {
  //1.5
  const { selectedModalData } = useModal();

  //stos
  const { inputValue, setValue, setResetValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );
  const { leftDays, leftWeeks, leftHourAndMin } = useStosReward(
    inputValue.bond_modal_balance,
    inputValue.bond_modal_period
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
  const { userETHBalance, userETHBalanceNum } = useUserBalance();
  const maxValue = useMemo(() => {
    if (userETHBalanceNum === undefined || maxCapacityValue === undefined) {
      return 0;
    }
    if (userETHBalanceNum !== undefined && maxCapacityValue !== undefined) {
      return maxCapacityValue > userETHBalanceNum
        ? userETHBalanceNum
        : maxCapacityValue;
    }
  }, [userETHBalanceNum, maxCapacityValue]);

  //modal condition
  const { inputOver, inputPeriodOver, btnDisabled, zeroInputBalance } =
    useBondModalCondition(maxValue);

  //maxValue for each case(token type)
  let tempTokenType: TokenTypes = "ETH";
  const userTokenBalance = useMemo(() => {
    switch (tempTokenType) {
      case "ETH":
        return {
          balacne: userETHBalance,
          balanceNum: userETHBalanceNum,
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
  }, [tempTokenType, userETHBalance, userETHBalanceNum, maxValue]);

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
