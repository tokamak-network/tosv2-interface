import { convertNumber } from "@/utils/number";
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
        const endTime = locksInfo.end.toString();
        const amount = convertNumber({ amount: amountBN }) || "0";

        setLocksInfo({
          amount: Number(amount.replaceAll(",", "")),
          amountBN,
          endTime: Number(endTime),
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
