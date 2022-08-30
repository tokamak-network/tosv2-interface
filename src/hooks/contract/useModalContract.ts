import { convertNumber } from "@/components/number";
import { convertTimeStamp } from "@/components/time";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";
import useStakeId from "./useStakeId";

type UseModalContract = {
  ltosBalance: string;
  stosBalance: string;
  currentEndTime: string;
};

function useModalContract() {
  const [modalContractData, setModalContractData] = useState<
    UseModalContract | undefined
  >(undefined);
  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();
  const { stakeId, connectId } = useStakeId();

  useEffect(() => {
    async function fetchUnstakeData() {
      if (StakingV2Proxy_CONTRACT && LockTOS_CONTRACT && stakeId && connectId) {
        const ltosBalanceBN = await StakingV2Proxy_CONTRACT.remainedLtos(
          stakeId
        );
        const stosBalanceBN = await LockTOS_CONTRACT.balanceOfLock(connectId);
        const stakeInfo = await StakingV2Proxy_CONTRACT.stakeInfo(stakeId);

        const ltosBalance =
          convertNumber({
            amount: ltosBalanceBN.toString(),
            localeString: true,
          }) || "0";
        const stosBalance =
          convertNumber({
            amount: stosBalanceBN.toString(),
            localeString: true,
          }) || "0";
        const currentEndTime = convertTimeStamp(
          stakeInfo.endTime,
          "YYYY. MM.DD. HH:mm"
        );

        setModalContractData({
          ltosBalance,
          stosBalance,
          currentEndTime,
        });
      }
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useModalContract err**");
      console.log(e);
    });
  }, [stakeId, connectId, StakingV2Proxy_CONTRACT, LockTOS_CONTRACT]);

  return { modalContractData };
}

export default useModalContract;
