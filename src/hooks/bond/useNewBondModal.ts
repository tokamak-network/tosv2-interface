import useModal from "hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { BondCardProps } from "types/bond";

function useNewBondModal() {
  const { selectedModalData } = useModal<BondCardProps>();
  const [numMaxBond, setNumMaxBond] = useState<number | undefined>(undefined);
  const [strMaxBond, setStrMaxBond] = useState<string | undefined>(undefined);

  const marketId = useMemo(() => {
    return selectedModalData?.index ?? undefined;
  }, [selectedModalData]);

  useEffect(() => {
    async function fetchUseMondModalData() {}
    fetchUseMondModalData().catch((e) => {
      console.log("**useNewBondModal err");
      console.log(e);
    });
  }, [marketId]);

  return {
    numMaxBond,
    strMaxBond,
  };
}

export default useNewBondModal;
