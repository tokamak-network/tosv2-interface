import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";

export function useBondRate() {
  const [bonusRate, setBonusRate] = useState<number | null>(null);
  const { BonusRate_CONTRACT } = useCallContract();

  useEffect(() => {}, []);

  return { bonusRate };
}
