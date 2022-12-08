import { convertNumber, convertToWei } from "@/utils/number";
import { BigNumber, ethers } from "ethers";
import useStosReward from "hooks/stake/useStosReward";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import JSBI from "jsbi";
import constant from "constant";
import { useRecoilState } from "recoil";
import { modalBottomLoadingState } from "atom/global/modal";
import { getTimeZone } from "@/utils/time";

type UseUnstake = {
  youWillGet: string | undefined;
  stosReward: string | undefined;
  endTime: string | undefined;
  originalTosAmount: string;
};

function useBondModalInputData(marketId: number): UseUnstake {
  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);
  const [inputTosAmount, setInputTosAmount] = useState<string | undefined>(
    undefined
  );
  const [originalTosAmount, setOriginalTosAmount] = useState<string>("-");

  const {
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    LockTOS_CONTRACT,
  } = useCallContract();

  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const { stosReward, newEndTime } = useStosReward(
    Number(inputTosAmount),
    inputValue?.bond_modal_period
  );
  const { rebasePeriod } = constant;

  const [isLoading, setLoading] = useRecoilState(modalBottomLoadingState);

  useEffect(() => {
    async function fetchBondModalInputData() {
      if (
        inputValue?.bond_modal_balance === "" ||
        inputValue?.bond_modal_balance === undefined ||
        inputValue?.bond_modal_balance.length === 0
      ) {
        return setInputTosAmount(undefined);
      }
      if (
        StakingV2Proxy_CONTRACT &&
        BondDepositoryProxy_CONTRACT &&
        LockTOS_CONTRACT &&
        inputValue?.bond_modal_balance
      ) {
        const ethAmount = inputValue.bond_modal_balance;
        const ethAmountWei = convertToWei(ethAmount);

        //new script
        const bondList = await BondDepositoryProxy_CONTRACT.viewMarket(
          marketId
        );
        const tosPrice = bondList.tosPrice;
        const tosValuation =
          await BondDepositoryProxy_CONTRACT.calculateTosAmountForAsset(
            tosPrice,
            ethAmountWei
          );

        const tosAmount = convertNumber({ amount: tosValuation.toString() });
        return setInputTosAmount(tosAmount);
      }
    }
    fetchBondModalInputData().catch((e) => {
      // console.log("**useBondModalInputData1 err**");
      // console.log(e);
    });
  }, [
    inputValue,
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    LockTOS_CONTRACT,
    marketId,
    rebasePeriod,
  ]);

  useEffect(() => {
    async function fetchLtosData() {
      if (
        inputValue?.bond_modal_balance === undefined ||
        inputValue?.bond_modal_balance === ""
      ) {
        return setYouWillGet("-");
      }
      if (
        StakingV2Proxy_CONTRACT &&
        BondDepositoryProxy_CONTRACT &&
        inputValue?.bond_modal_balance
      ) {
        const ethAmount = inputValue.bond_modal_balance;
        const ethAmountWei = convertToWei(ethAmount);
        const bondList = await BondDepositoryProxy_CONTRACT.viewMarket(
          marketId
        );
        const tosPrice = bondList.tosPrice;
        const tosAmount =
          await BondDepositoryProxy_CONTRACT.calculateTosAmountForAsset(
            tosPrice,
            ethAmountWei
          );

        const LTOS_BN = await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(
          tosAmount
        );
        const ltos = convertNumber({ amount: LTOS_BN, localeString: true });

        setOriginalTosAmount(
          convertNumber({ amount: tosAmount.toString() }) || "-"
        );
        return setYouWillGet(ltos);
      }
    }
    fetchLtosData()
      .catch((e) => {
        // console.log("**useBondModalInputData3 err**");
        // console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    marketId,
    inputValue?.bond_modal_balance,
  ]);

  useEffect(() => {
    async function fetchBondModalInputData() {
      return setEndTime(`${newEndTime}`);
    }
    fetchBondModalInputData().catch((e) => {
      // console.log("**useBondModalInputData2 err**");
      // console.log(e);
    });
  }, [newEndTime]);

  return { youWillGet, endTime, stosReward, originalTosAmount };
}

export default useBondModalInputData;
