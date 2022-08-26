import { convertNumber } from "@/components/number";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { useBlockNumber } from "./useBlockNumber";
import useCallContract from "./useCallContract";
import useUserBalance from "./useUserBalance";

type UseUser = {
  tosAllowance: number;
};

function useUser() {
  const [userData, setUserData] = useState<UseUser | undefined>(undefined);
  const { TOS_CONTRACT } = useCallContract();
  const { account } = useWeb3React();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { blockNumber } = useBlockNumber();

  useEffect(() => {
    async function fetchUseUser() {
      if (TOS_CONTRACT && account) {
        const allowance = await TOS_CONTRACT.allowance(account, StakingV2Proxy);
        return setUserData({
          tosAllowance: Number(convertNumber({ amount: allowance.toString() })),
        });
      }
    }
    fetchUseUser().then((e) => {
      if (e !== undefined) {
        console.log("**fetchUseUser err**");
        console.log(e);
      }
    });
  }, [TOS_CONTRACT, account, StakingV2Proxy, blockNumber]);

  return { userData };
}

export default useUser;
