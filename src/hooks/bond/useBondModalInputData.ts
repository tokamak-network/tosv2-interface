import { convertNumber, convertToWei } from "@/components/number";
import useStosReward from "hooks/stake/useStosReward";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";

type UseUnstake = {
  youWillGet: string | undefined;
  stosReward: string | undefined;
  endTime: string | undefined;
};

function useBondModalInputData(marketId: number): UseUnstake {
  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);
  const [stosReward, setStosReward] = useState<string | undefined>(undefined);

  const { StakingV2Proxy_CONTRACT, BondDepositoryProxy_CONTRACT } =
    useCallContract();
  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const { newEndTime } = useStosReward(
    inputValue?.bond_modal_balance,
    inputValue?.bond_modal_period
  );

  useEffect(() => {
    async function fetchBondModalInputData() {
      if (
        StakingV2Proxy_CONTRACT &&
        BondDepositoryProxy_CONTRACT &&
        inputValue?.bond_modal_balance
      ) {
        const ethAmount = inputValue.bond_modal_balance;
        const ethAmountWei = convertToWei(ethAmount);
        const LTOS_BN = await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(
          ethAmountWei
        );
        const ltos = convertNumber({ amount: LTOS_BN, localeString: true });

        //stosReward
        const bondList = await BondDepositoryProxy_CONTRACT.getBond();
        console.log(bondList);
        //         const tosPrice = StakingV2Proxy_CONTRACT.
        // StakingV2Proxy_CONTRACT.BondDepository.calculateTosAmountForAsset(, ethAmountWei);

        return setYouWillGet(ltos);
      }
    }
    fetchBondModalInputData().catch((e) => {
      console.log("**useBondModalInputData1 err**");
      console.log(e);
    });
  }, [
    inputValue?.bond_modal_balance,
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
  ]);

  useEffect(() => {
    async function fetchBondModalInputData() {
      return setEndTime(newEndTime);
    }
    fetchBondModalInputData().catch((e) => {
      console.log("**useBondModalInputData2 err**");
      console.log(e);
    });
  }, [newEndTime]);

  return { youWillGet, endTime, stosReward };
}

export default useBondModalInputData;
