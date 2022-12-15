import commafy from "@/utils/commafy";
import { convertNumber, convertToWei } from "@/utils/number";
import { convertTimeStamp, getNowTimeStamp } from "@/utils/time";
import constant from "constant";
import { BigNumber } from "ethers";
import useStakeId from "hooks/contract/useStakeId";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import useStosReward from "./useStosReward";

function useUpdateModalAfterEndTime(addTos: boolean) {
  const [tosValue, setTosValue] = useState<string>("-");
  const [tosBalance, setTosBalance] = useState<string>("-");
  const [allLtosToTosBalance, setAllLtosToTosBalance] = useState<
    number | undefined
  >(undefined);

  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();
  const { stakeId } = useStakeId();
  const { inputValue } = useInput("Stake_screen", "relock_modal");
  const [inputTosAmount, setInputTosAmount] = useState<number>(0);
  const { stosReward, newEndTime } = useStosReward(
    inputTosAmount,
    inputValue.stake_relockModal_period
  );
  const { selectedModalData, selectedModal } = useModal<{
    stakeId: string;
    ltosAmount: string;
  }>();

  useEffect(() => {
    async function fetchTosBalance() {
      if (
        selectedModalData?.ltosAmount &&
        inputValue?.stake_relockModal_ltos_balance &&
        StakingV2Proxy_CONTRACT
      ) {
        const ltosPrincipalAmount = selectedModalData.ltosAmount;
        const giveLtosAmount =
          Number(ltosPrincipalAmount.replaceAll(",", "")) -
          Number(inputValue.stake_relockModal_ltos_balance.replaceAll(",", ""));
        const ltosAmount = convertToWei(giveLtosAmount.toString());
        const possibleTOSAmountBN =
          await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(ltosAmount);
        const tosAmount = convertNumber({
          amount: possibleTOSAmountBN.toString(),
          localeString: true,
          round: false,
        });
        setAllLtosToTosBalance(Number(ltosPrincipalAmount.replaceAll(",", "")));
        return setTosBalance(tosAmount ?? "-");
      }
    }
    fetchTosBalance();
  }, [
    selectedModalData?.ltosAmount,
    inputValue?.stake_relockModal_ltos_balance,
    StakingV2Proxy_CONTRACT,
  ]);

  //new
  useEffect(() => {
    async function fetchRolockModalData() {
      if (StakingV2Proxy_CONTRACT && stakeId && inputValue) {
        //new balance
        //case1
        //LTOS relock
        if (!addTos) {
          const ltosAmount = convertToWei(
            String(inputValue.stake_relockModal_ltos_balance).replaceAll(
              " ",
              ""
            )
          );
          const possibleTOSAmount =
            await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(ltosAmount);
          const tos =
            convertNumber({
              amount: possibleTOSAmount.toString(),
              localeString: true,
            }) || "-";

          setTosValue(tos);
          setInputTosAmount(Number(tos.replaceAll(",", "")));

          return;
        }

        //case2
        //STOS relock
        if (addTos) {
          const tosAmount = convertToWei(
            inputValue.stake_relockModal_tos_balance
          );
          const possibleLTOSAmount =
            await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(tosAmount);
          const remainedLTOS = await StakingV2Proxy_CONTRACT.remainedLtos(
            stakeId
          );
          const totalAmount =
            BigNumber.from(possibleLTOSAmount).add(remainedLTOS);
          const ltos =
            convertNumber({
              amount: totalAmount.toString(),
              localeString: true,
            }) || "-";
          const tosValueBN =
            await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(
              totalAmount
            );
          const tos =
            convertNumber({
              amount: tosValueBN.toString(),
              localeString: true,
            }) || "-";

          setTosValue(tos);
          setInputTosAmount(
            Number(inputValue.stake_relockModal_tos_balance.replaceAll(",", ""))
          );

          return;
        }
      }
    }
    fetchRolockModalData().catch((e) => {
      // console.log("**useUpdateModalAfterEndTimeData2 err**");
      // console.log(e);
      // return setNewBalance({
      //   tos: "-",
      //   ltos: "-",
      //   stos: "-",
      // });
    });
  }, [stakeId, StakingV2Proxy_CONTRACT, inputValue, stosReward, addTos]);

  return {
    newEndTime,
    inputTosAmount: commafy(inputTosAmount),
    tosValue,
    tosBalance,
    allLtosToTosBalance,
  };
}

export default useUpdateModalAfterEndTime;
