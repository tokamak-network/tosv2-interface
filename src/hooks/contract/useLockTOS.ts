import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";

type UseLockTOS = {
  epochUnit: number;
};

function useLockTOS(): UseLockTOS {
  const [epochUnit, setEpochUnit] = useState<number>(604800);
  const { LockTOS_CONTRACT } = useCallContract();

  useEffect(() => {
    async function fetchUnstakeData() {
      if (LockTOS_CONTRACT) {
        const epochUnit = parseInt(await LockTOS_CONTRACT.epochUnit());
        setEpochUnit(epochUnit);
      }
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useLockTOS err**");
      console.log(e);
    });
  }, [LockTOS_CONTRACT]);

  return { epochUnit };
}

export default useLockTOS;
