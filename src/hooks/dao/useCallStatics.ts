import { convertNumber } from "@/utils/number";
import { useBlockNumber } from "hooks/useBlockNumber";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";

function useCallStatics() {
  const [totalTos, setTotalTos] = useState<string>("-");
  const [totalLTos, setTotalLTos] = useState<string>("-");
  const [totalSTos, setTotalSTos] = useState<string>("-");

  const { blockNumber } = useBlockNumber();

  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();

  useEffect(() => {
    async function fetchCallStatics() {
      if (StakingV2Proxy_CONTRACT) {
        const totalSupply_BN = await StakingV2Proxy_CONTRACT.stakingPrincipal();
        const totalSupply = convertNumber({
          amount: totalSupply_BN,
          round: false,
          localeString: true,
        });
        setTotalTos(totalSupply ?? "-");
      }
      if (StakingV2Proxy_CONTRACT) {
        const totalSupply_BN = await StakingV2Proxy_CONTRACT.totalLtos();
        const totalSupply = convertNumber({
          amount: totalSupply_BN,
          round: false,
          localeString: true,
        });
        setTotalLTos(totalSupply ?? "-");
      }
      if (LockTOS_CONTRACT) {
        const totalSupply_BN = await LockTOS_CONTRACT.totalSupply();
        const totalSupply = convertNumber({
          amount: totalSupply_BN,
          round: false,
          localeString: true,
        });
        setTotalSTos(totalSupply ?? "-");
      }
    }
    fetchCallStatics().catch((e) => {
      console.log("**useCallStatics Err**");
      console.log(e);
    });
  }, [blockNumber, StakingV2Proxy_CONTRACT, LockTOS_CONTRACT]);

  return {
    totalTos,
    totalLTos,
    totalSTos,
  };
}

export default useCallStatics;
