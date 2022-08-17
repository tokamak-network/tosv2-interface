import { useWeb3React } from "@web3-react/core";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";
import { MyCardProps } from "types/bond";

function useMyHistory() {
  const [cardList, setCardList] = useState<MyCardProps[] | undefined>(
    undefined
  );
  const { account } = useWeb3React();

  const { BondDepository_CONTRACT, StakingV2_CONTRACT } = useCallContract();

  useEffect(() => {
    const fetchListdata = async () => {
      if (BondDepository_CONTRACT && StakingV2_CONTRACT) {
        const depositList = await BondDepository_CONTRACT.getDepositList(
          account
        );
      }
    };
    fetchListdata().catch((e) => {
      console.log("**fetchListdata err**");
      console.log(e);
    });
  }, [BondDepository_CONTRACT, StakingV2_CONTRACT, account]);

  return { cardList };
}

export default useMyHistory;
