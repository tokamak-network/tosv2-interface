import useCallContract from "hooks/useCallContract";
import useModal from "hooks/useModal";
import { useEffect, useState } from "react";

function useStakeId(): {
  stakeId: string | undefined;
  connectId: string | undefined;
} {
  const [stakeId, setStakeId] = useState<string | undefined>(undefined);
  const [connectId, setConnectId] = useState<string | undefined>(undefined);

  const { selectedModalData } = useModal<{ stakeId: string | undefined }>();
  const { StakingV2Proxy_CONTRACT } = useCallContract();

  useEffect(() => {
    async function getConnetId() {
      if (StakingV2Proxy_CONTRACT && stakeId) {
        const connetIdBN = await StakingV2Proxy_CONTRACT.connectId(stakeId);
        setConnectId(connetIdBN?.toString() || undefined);
      }
    }
    getConnetId().catch((e) => {
      console.log("**useStakeId err**");
      console.log(e);
    });
    setStakeId(selectedModalData?.stakeId);
  }, [selectedModalData, StakingV2Proxy_CONTRACT, stakeId]);

  return { stakeId, connectId };
}

export default useStakeId;
