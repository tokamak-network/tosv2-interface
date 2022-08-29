import { convertNumber } from "@/components/number";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";

type UseUnstake = {
  currentBalance: {
    ltos: string;
    stos: string;
  };
  newBalance: {
    ltos: string;
    stos: string;
  };
  currentEndTIme: string;
  newEndTime: string;
};

function useUpdate(stakeId: string | string[]) {
  const [updateData, setUpdateData] = useState<UseUnstake | undefined>(
    undefined
  );
  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();
  useEffect(() => {
    async function fetchUnstakeData() {
      if (StakingV2Proxy_CONTRACT && LockTOS_CONTRACT) {
        //current balanace
        const LTOSWei = await StakingV2Proxy_CONTRACT.remainedLtos(stakeId);
        const sTOSstakeId = await StakingV2Proxy_CONTRACT.connectId(stakeId);
        const sTOSWei = await LockTOS_CONTRACT.balanceOf(sTOSstakeId);
        const ltos = convertNumber({ amount: LTOSWei.toString() });
        const stos = convertNumber({ amount: sTOSWei.toString() });
        const currentBalance = { ltos, stos };

        //new balance
      }
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useUnstake err**");
      console.log(e);
    });
  }, [stakeId, StakingV2Proxy_CONTRACT, LockTOS_CONTRACT]);

  return { updateData };
}

export default useUpdate;
