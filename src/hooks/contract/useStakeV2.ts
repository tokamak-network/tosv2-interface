import { convertNumber } from "@/components/number";
import { convertTimeStamp } from "@/components/time";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";

function useStakeV2() {
  const [stakeV2, setStakeV2] = useState<any>(undefined);
  const { StakingV2Proxy_CONTRACT } = useCallContract();

  useEffect(() => {
    async function fetchAsyncData() {
      if (StakingV2Proxy_CONTRACT) {
        const ltosIndexBN = await StakingV2Proxy_CONTRACT.possibleIndex();
        const ltosIndex = convertNumber({
          amount: ltosIndexBN?.toString(),
        }) as string;
        const rebase = await StakingV2Proxy_CONTRACT.epoch();
        const rebaseTime = rebase.end;
        const nextRebase = convertTimeStamp(rebaseTime.toString(), "HH:mm:ss");
        setStakeV2({
          ltosIndex,
          ltosIndexBN,
          nextRebase,
        });
      }
    }
    fetchAsyncData().catch((e) => {
      {
        console.log("**useStakeV2 err**");
        console.log(e);
      }
    });
  }, [StakingV2Proxy_CONTRACT]);

  return { stakeV2 };
}

export default useStakeV2;
