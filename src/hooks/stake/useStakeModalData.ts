import useModal from "hooks/useModal";
import { useCallback, useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import commafy from "@/components/commafy";
import useCallContract from "hooks/useCallContract";
import { convertNumber, convertToWei } from "@/components/number";
import { BigNumber } from "ethers";
import moment from "moment";
import Decimal from "decimal.js";
import { useWeb3React } from "@web3-react/core";
import useInput from "hooks/useInput";
import { convertTimeStamp, getNowTimeStamp } from "@/components/time";
import useUser from "hooks/useUser";
import useStosReward from "./useStosReward";

type stakeModalInputData = {
  youWillGet: {
    ltos: string;
  };
  currentBalance: string;
  newBalance: string;
  endTime: string;
};

function useStakeModaldata() {
  const { selectedModalData } = useModal();
  const propData = selectedModalData as BondCardProps;
  const { inputValue } = useInput("Stake_screen", "stake_modal");
  const inputAmount = inputValue.stake_modal_balance;
  const inputPeriod = inputValue.stake_modal_period;

  const [stakeModalInputData, setStakeModalInputData] = useState<
    stakeModalInputData | undefined
  >(undefined);
  const { stosReward } = useStosReward(inputAmount, inputPeriod);

  const {
    BondDepositoryProxy_CONTRACT,
    StakingV2Proxy_CONTRACT,
    LockTOS_CONTRACT,
  } = useCallContract();
  const { account } = useWeb3React();
  const { simpleStakingId } = useUser();

  // set Estimated reward;
  const getEstimatedReward = useCallback(
    async (date: number) => {
      if (
        inputAmount &&
        inputAmount !== "" &&
        inputAmount !== "0" &&
        inputPeriod > 0 &&
        LockTOS_CONTRACT
      ) {
        const maxTime = await LockTOS_CONTRACT.maxTime();
        const maxPeriod = parseInt(maxTime);
        const numValue = Number(inputAmount.replaceAll(",", ""));
        const avgProfit = numValue / maxPeriod;
        const estimatedReward = avgProfit * (date - moment().unix());
        const deciamlNum = new Decimal(estimatedReward);
        const resultNum = deciamlNum.toFixed(3, Decimal.ROUND_HALF_UP);
        const result = Number(resultNum).toFixed(2);
        return String(Number(result));
      }
      return "-";
    },
    [LockTOS_CONTRACT, inputPeriod, inputAmount]
  );

  useEffect(() => {
    const fetchListdata = async () => {
      if (inputAmount === "") {
        return setStakeModalInputData({
          youWillGet: {
            ltos: "0",
          },
          currentBalance: "0",
          newBalance: "0",
          endTime: "-",
        });
      }
      if (
        BondDepositoryProxy_CONTRACT &&
        StakingV2Proxy_CONTRACT &&
        LockTOS_CONTRACT &&
        account &&
        simpleStakingId
      ) {
        const tosAmount = convertToWei(inputAmount);
        const LTOS_Index = await StakingV2Proxy_CONTRACT.possibleIndex();
        const LTOS_BN = BigNumber.from(tosAmount).div(LTOS_Index);

        //youWIllGet
        const youWillGetLTOS =
          await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(tosAmount);
        const ltos =
          convertNumber({
            amount: youWillGetLTOS.toString(),
            localeString: true,
          }) || "0";
        //currentBalance
        const currentBalanceWei = await StakingV2Proxy_CONTRACT.remainedLtos(
          simpleStakingId.toString()
        );
        const currentBalance =
          convertNumber({
            amount: currentBalanceWei.toString(),
            localeString: true,
          }) || "0";

        //new balance
        const newBalanceBN = BigNumber.from(currentBalanceWei).add(
          convertToWei(LTOS_BN.toString())
        );
        const newBalance =
          convertNumber({ amount: newBalanceBN.toString() }) || "0";

        //endTime
        const sTosEpochUnit = await LockTOS_CONTRACT.epochUnit();
        const unlockTimeStamp =
          getNowTimeStamp() + inputPeriod * Number(sTosEpochUnit.toString());
        const endTime = convertTimeStamp(unlockTimeStamp, "YYYY. MM.DD. HH:mm");

        setStakeModalInputData({
          youWillGet: {
            ltos: ltos,
          },
          currentBalance,
          newBalance,
          endTime,
        });
      }
    };
    fetchListdata().catch((e) => {
      console.log("**useStakeModalData err**");
      console.log(e);
    });
  }, [
    BondDepositoryProxy_CONTRACT,
    StakingV2Proxy_CONTRACT,
    inputAmount,
    inputPeriod,
    getEstimatedReward,
    account,
    LockTOS_CONTRACT,
    simpleStakingId,
  ]);

  return {
    stakeModalInputData,
    stosReward,
  };
}

export default useStakeModaldata;
