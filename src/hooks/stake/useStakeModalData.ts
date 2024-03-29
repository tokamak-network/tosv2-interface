import useModal from "hooks/useModal";
import { useCallback, useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import commafy from "@/utils/commafy";
import useCallContract from "hooks/useCallContract";
import { convertNumber, convertToWei } from "@/utils/number";
import { BigNumber } from "ethers";
import moment from "moment";
import Decimal from "decimal.js";
import { useWeb3React } from "@web3-react/core";
import useInput from "hooks/useInput";
import { convertTimeStamp, getNowTimeStamp } from "@/utils/time";
import useUser from "hooks/useUser";
import useStosReward from "./useStosReward";
import { StakeModalBottomContents } from "types/stake";
import { useRecoilState } from "recoil";
import { modalBottomLoadingState } from "atom/global/modal";

function useStakeModaldata(): StakeModalBottomContents {
  const { selectedModalData, isModalLoading } = useModal<BondCardProps>();
  const propData = selectedModalData;
  const { inputValue } = useInput("Stake_screen", "stake_modal");

  const [ltos, setLtos] = useState<string | undefined>(undefined);
  const [currentBalance, setCurrentBlaance] = useState<string | undefined>(
    undefined
  );
  const [newBalance, setNewBalance] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

  const [currentTosValue, setCurrentTosValue] = useState<string | undefined>(
    undefined
  );
  const [newBalanceTosValue, setNewBalanceTosValue] = useState<
    string | undefined
  >(undefined);

  const { BondDepositoryProxy_CONTRACT, StakingV2Proxy_CONTRACT } =
    useCallContract();
  const { account } = useWeb3React();
  const { simpleStakingId } = useUser();
  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );

  useEffect(() => {
    const inputAmount = inputValue.stake_modal_balance;
    const inputPeriod = inputValue.stake_modal_period;
    const fetchListdata = async () => {
      if (isModalLoading) {
        return;
      }
      if (String(inputAmount).length === 0 || inputAmount === undefined) {
        setLtos("-");
        return setNewBalance("-");
      }

      if (
        BondDepositoryProxy_CONTRACT &&
        StakingV2Proxy_CONTRACT &&
        account &&
        inputAmount
      ) {
        const tosAmount = convertToWei(
          inputAmount.replaceAll(",", "").toString()
        );
        const LTOS_Index = await StakingV2Proxy_CONTRACT.possibleIndex();
        const LTOS_BN = BigNumber.from(tosAmount).div(LTOS_Index);
        //youWIllGet
        const youWillGetLTOS =
          await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(tosAmount);
        const ltos =
          convertNumber({
            amount: youWillGetLTOS.toString(),
            localeString: true,
          }) || "-";
        setLtos(ltos);

        //currentBalance
        const currentBalanceWei = simpleStakingId
          ? await StakingV2Proxy_CONTRACT.remainedLtos(
              simpleStakingId.toString()
            )
          : 0;
        const currentBalance =
          convertNumber({
            amount: currentBalanceWei.toString(),
            localeString: true,
          }) || "-";
        const tosBalanceBN =
          await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(
            currentBalanceWei
          );
        const tosBalance =
          convertNumber({
            amount: tosBalanceBN.toString(),
            localeString: true,
          }) || "-";

        setCurrentBlaance(currentBalance);
        setCurrentTosValue(tosBalance);

        //new balance
        const newBalance =
          Number(ltos.replaceAll(",", "")) +
          Number(currentBalance.replaceAll(",", ""));
        setNewBalance(commafy(String(newBalance)));

        const newBalanceBN = convertToWei(String(newBalance));
        const newBalanceTosBN =
          await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(newBalanceBN);
        const newBlanaceTos =
          convertNumber({
            amount: newBalanceTosBN.toString(),
            localeString: true,
          }) || "-";

        setNewBalanceTosValue(newBlanaceTos);
      }
    };
    fetchListdata()
      .catch((e) => {
        console.log("**useStakeModalData err**");
        console.log(e);
      })
      .finally(() => {
        return setBottomLoading(false);
      });
  }, [
    BondDepositoryProxy_CONTRACT,
    StakingV2Proxy_CONTRACT,
    inputValue,
    account,
    simpleStakingId,
    setBottomLoading,
    isModalLoading,
  ]);

  return {
    ltos,
    currentBalance,
    newBalance,
    currentTosValue,
    newBalanceTosValue,
  };
}

export default useStakeModaldata;
