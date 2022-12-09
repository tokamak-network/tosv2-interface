import { BigNumber } from "ethers";
import useStakeId from "hooks/contract/useStakeId";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";

type LocksInfo = {
  amount: number;
  amountBN: BigNumber;
  endTime: number;
};

function useLocksInfo() {
  const [locksInfo, setLocksInfo] = useState<LocksInfo | undefined>(undefined);
  const { stakeId, connectId } = useStakeId();
  const { LockTOS_CONTRACT } = useCallContract();

  useEffect(() => {
    async function fetchLocksInfo() {
      if (connectId && LockTOS_CONTRACT) {
        const locksInfo = await LockTOS_CONTRACT.locksInfo(connectId);
        const amountBN = locksInfo.amount;
        const endTime = locksInfo.endTime;

          setLocksInfo({
            amount:
        });
      }
    }
    fetchLocksInfo().catch((e) => {
      console.log("**useLocksInfo err**");
      console.log(e);
    });
  }, [connectId, LockTOS_CONTRACT]);

  return {
    locksInfo,
  };
}

export default useLocksInfo;
