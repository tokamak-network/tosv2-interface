import { convertNumber } from "@/utils/number";
import { convertTimeStamp } from "@/utils/time";
import { BigNumber, ethers, utils } from "ethers";
import { useBlockNumber } from "hooks/useBlockNumber";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";

type UseStakeV2 = {
  ltosIndex: string;
  ltosIndexBN: BigNumber;
  nextRebase: string;
};

function useStakeV2() {
  const [stakeV2, setStakeV2] = useState<UseStakeV2 | undefined>(undefined);
  const [rebasePerEpoch, setRebasePerEpoch] = useState<number | undefined>(
    undefined
  );

  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { blockNumber } = useBlockNumber();

  useEffect(() => {
    async function fetchAsyncData() {
      if (StakingV2Proxy_CONTRACT) {
        const ltosIndexBN = await StakingV2Proxy_CONTRACT.possibleIndex();
        const rebasePerEpochBN = await StakingV2Proxy_CONTRACT.rebasePerEpoch();
        const rebaseperEpoch = ethers.utils.formatEther(rebasePerEpochBN);

        const ltosIndex = utils.formatUnits(ltosIndexBN.toString(), 18);
        const splitedLtosIndex = ltosIndex.split(".");
        const ltosIndexResult =
          splitedLtosIndex[0] + "." + splitedLtosIndex[1].slice(0, 7);

        const rebase = await StakingV2Proxy_CONTRACT.epoch();
        const rebaseTime = rebase.end;
        const nextRebase = convertTimeStamp(rebaseTime.toString(), "HH:mm:ss");
        setStakeV2({
          ltosIndex: ltosIndexResult,
          ltosIndexBN,
          nextRebase,
        });
        setRebasePerEpoch(Number(rebaseperEpoch));
      }
    }
    fetchAsyncData().catch((e) => {
      {
        console.log("**useStakeV2 err**");
        console.log(e);
      }
    });
  }, [StakingV2Proxy_CONTRACT, blockNumber]);

  return { stakeV2, rebasePerEpoch };
}

export default useStakeV2;
