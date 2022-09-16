import { convertNumber, convertToWei } from "@/components/number";
import { BigNumber, ethers } from "ethers";
import useStosReward from "hooks/stake/useStosReward";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import JSBI from "jsbi";

type UseUnstake = {
  youWillGet: string | undefined;
  stosReward: string | undefined;
  endTime: string | undefined;
};

function useBondModalInputData(marketId: number): UseUnstake {
  const [youWillGet, setYouWillGet] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);
  const [inputTosAmount, setInputTosAmount] = useState<string | undefined>(
    undefined
  );

  const {
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    LockTOS_CONTRACT,
  } = useCallContract();
  const { inputValue } = useInput("Bond_screen", "bond_modal");
  const { newEndTime } = useStosReward(
    inputValue?.bond_modal_balance,
    inputValue?.bond_modal_period
  );
  const { stosReward } = useStosReward(
    Number(inputTosAmount),
    inputValue?.bond_modal_period
  );

  useEffect(() => {
    const calculateCompound = async ({
      tosValuation,
      rebasePerEpoch,
      n,
    }: {
      tosValuation: BigNumber;
      rebasePerEpoch: BigNumber;
      n: BigNumber;
    }) => {
      // console.log('calculateCompound tosValuation',tosValuation, 'rebasePerEpoch',rebasePerEpoch, "n", n) ;
      // console.log('n.toString()', n.toString());

      const bigIntEther = JSBI.BigInt("1000000000000000000");
      const bigIntN = JSBI.BigInt(n.toString());
      let bnAmountCompound = JSBI.BigInt("0");

      if (n.gt(ethers.BigNumber.from("2"))) {
        bnAmountCompound = JSBI.divide(
          JSBI.multiply(
            JSBI.BigInt(tosValuation.toString()),
            JSBI.divide(
              JSBI.exponentiate(
                JSBI.add(bigIntEther, JSBI.BigInt(rebasePerEpoch.toString())),
                bigIntN
              ),
              JSBI.exponentiate(
                bigIntEther,
                JSBI.subtract(bigIntN, JSBI.BigInt("2"))
              )
            )
          ),
          JSBI.exponentiate(bigIntEther, JSBI.BigInt("2"))
        );
      } else {
        bnAmountCompound = JSBI.divide(
          JSBI.multiply(
            JSBI.BigInt(tosValuation.toString()),
            JSBI.divide(
              JSBI.exponentiate(
                JSBI.add(bigIntEther, JSBI.BigInt(rebasePerEpoch.toString())),
                bigIntN
              ),
              JSBI.exponentiate(
                bigIntEther,
                JSBI.subtract(bigIntN, JSBI.BigInt("1"))
              )
            )
          ),
          JSBI.exponentiate(bigIntEther, JSBI.BigInt("1"))
        );
      }
      return bnAmountCompound;
    };

    async function fetchBondModalInputData() {
      if (
        StakingV2Proxy_CONTRACT &&
        BondDepositoryProxy_CONTRACT &&
        LockTOS_CONTRACT &&
        inputValue?.bond_modal_balance &&
        inputValue?.bond_modal_period
      ) {
        const ethAmount = inputValue.bond_modal_balance;
        const lockPeriod = inputValue.bond_modal_period;
        const ethAmountWei = convertToWei(ethAmount);
        const LTOS_BN = await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(
          ethAmountWei
        );
        const ltos = convertNumber({ amount: LTOS_BN, localeString: true });

        //stosReward
        const bondList = await BondDepositoryProxy_CONTRACT.viewMarket(
          marketId
        );
        const tosPrice = bondList.tosPrice;
        const tosValuation =
          await BondDepositoryProxy_CONTRACT.calculateTosAmountForAsset(
            tosPrice,
            ethAmountWei
          );

        // console.log("tosPrice, ethAmount");
        // console.log(tosPrice.toString(), ethAmountWei);

        const rebasePerEpoch = await StakingV2Proxy_CONTRACT.rebasePerEpoch();
        const stosEpochUnit = await LockTOS_CONTRACT.epochUnit();
        const epochAfter = await StakingV2Proxy_CONTRACT.epoch();
        // const lockPeriod_BN = convertToWei(lockPeriod);
        // console.log("lockPeriod_BN");
        // console.log(lockPeriod_BN);
        const n = BigNumber.from(lockPeriod)
          .mul(stosEpochUnit)
          .div(epochAfter.length_);
        const bnAmountCompound = await calculateCompound({
          tosValuation,
          rebasePerEpoch,
          n,
        });
        // console.log("tosValuation", "rebasePerEpoch", "n");
        // console.log(
        //   tosValuation.toString(),
        //   rebasePerEpoch.toString(),
        //   n.toString()
        // );
        const amountCompound = ethers.BigNumber.from(
          bnAmountCompound.toString()
        );
        // console.log("amountCompound");
        // console.log(amountCompound.toString());
        const gweiAmountCompound = Math.floor(
          parseFloat(ethers.utils.formatUnits(amountCompound, "wei"))
        );
        // console.log("gweiAmountCompoundWei");
        // console.log(gweiAmountCompound.toString());
        // console.log(ethers.utils.formatUnits(amountCompound, "wei"));
        const inputTosAmount = convertNumber({
          amount: ethers.utils.formatUnits(amountCompound, "wei").toString(),
        });

        return setInputTosAmount(inputTosAmount);
      }
    }
    fetchBondModalInputData().catch((e) => {
      console.log("**useBondModalInputData1 err**");
      console.log(e);
    });
  }, [
    inputValue,
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    LockTOS_CONTRACT,
    marketId,
  ]);

  useEffect(() => {
    async function fetchLtosData() {
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

        // console.log("gogo");
        // console.log(tosPrice.toString());
        // console.log(ethAmountWei.toString());
        // console.log(tosAmount.toString());

        const LTOS_BN = await StakingV2Proxy_CONTRACT.getTosToLtosPossibleIndex(
          tosAmount
        );
        const ltos = convertNumber({ amount: LTOS_BN, localeString: true });

        return setYouWillGet(ltos);
      }
    }
    fetchLtosData().catch((e) => {
      console.log("**useBondModalInputData3 err**");
      console.log(e);
    });
  }, [
    StakingV2Proxy_CONTRACT,
    BondDepositoryProxy_CONTRACT,
    marketId,
    inputValue?.bond_modal_balance,
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
