import { convertNumber } from "@/utils/number";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { useBlockNumber } from "./useBlockNumber";
import useCallContract from "./useCallContract";
import useUserBalance from "./useUserBalance";

type UseUser = {
  tosAllowance: number | undefined;
  stakeList: string[] | undefined;
  simpleStakingId: string | undefined;
};

function useUser(): UseUser {
  const [userData, setUserData] = useState<UseUser>({
    tosAllowance: undefined,
    stakeList: undefined,
    simpleStakingId: undefined,
  });
  const { TOS_CONTRACT } = useCallContract();
  const { account } = useWeb3React();
  const { StakingV2Proxy } = CONTRACT_ADDRESS;
  const { blockNumber } = useBlockNumber();
  const { StakingV2Proxy_CONTRACT } = useCallContract();

  useEffect(() => {
    async function fetchUseUser() {
      if (TOS_CONTRACT && account && StakingV2Proxy_CONTRACT) {
        const allowanceBN = await TOS_CONTRACT.allowance(
          account,
          StakingV2Proxy
        );
        const stakeList = await StakingV2Proxy_CONTRACT.stakingOf(account);

        return setUserData({
          tosAllowance: Number(ethers.utils.formatUnits(allowanceBN)),
          stakeList,
          simpleStakingId: stakeList[1]?.toString(),
        });
      }
    }
    fetchUseUser().then((e) => {
      if (e !== undefined) {
        console.log("**fetchUseUser err**");
        console.log(e);
      }
    });
  }, [
    TOS_CONTRACT,
    account,
    StakingV2Proxy,
    blockNumber,
    StakingV2Proxy_CONTRACT,
  ]);

  return userData;
}

export default useUser;
