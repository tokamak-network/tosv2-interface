import commafy from "@/components/commafy";
import { convertNumber } from "@/components/number";
import { convertTimeStamp, isTimeOver } from "@/components/time";
import { useWeb3React } from "@web3-react/core";
import { useBlockNumber } from "hooks/useBlockNumber";
import useCallContract from "hooks/useCallContract";
import usePrice from "hooks/usePrice";
import { useEffect, useState } from "react";
import { StakeCardProps } from "types/stake";

function useStakeList() {
  const [stakeCards, setStakeCards] = useState<StakeCardProps[] | undefined>(
    undefined
  );

  const { account } = useWeb3React();
  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();
  const { blockNumber } = useBlockNumber();

  useEffect(() => {
    const fetchData = async () => {
      if (StakingV2Proxy_CONTRACT && LockTOS_CONTRACT && account) {
        //index0 -> meaningless
        //index1 -> TOS Staking without lockup
        //from index2 -> need to check with stakeInfo()
        //if it has no marketId -> it means TOS Staking with lockup periods
        //if it has a marketId -> need to check with connectedId()
        //connectedId(marketId) returns 0 -> it means BOND without lockup periods
        //connectedId(marketId) returns lockTOS ID -> it means BOND with lockup periods
        const stakingList = await StakingV2Proxy_CONTRACT.stakingOf(account);
        const stakedList: StakeCardProps[] = await Promise.all(
          stakingList.map(async (contractData: any, index: number) => {
            const stakedId = stakingList[index].toString();
            const stakedInfo = await StakingV2Proxy_CONTRACT.stakeInfo(
              stakedId
            );
            const LTOSWei = stakedInfo.ltos.toString();
            const principalWei = stakedInfo.deposit.toString();
            const principal = `${convertNumber({
              amount: principalWei,
              localeString: true,
            })} TOS`;
            const endTime = convertTimeStamp(
              stakedInfo.endTime.toString(),
              "YYYY.MM.DD HH:mm"
            );
            const ltos = `${convertNumber({
              amount: LTOSWei,
              localeString: true,
            })} LTOS`;
            const isOver = isTimeOver(stakedInfo.endTime.toString());
            if (index === 1) {
              //   return example
              //   staker   address :  0x8c595DA827F4182bC0E3917BccA8e654DF8223E1
              //   deposit   uint256 :  24242700000000000000
              //   ltos   uint256 :  23323681572147205912
              //   endTime   uint256 :  1661156881
              //   marketId   uint256 :  3
              if (stakedInfo.deposit.toString() === "0") {
                return undefined;
              }
              return {
                staked: {
                  ltos,
                  stos: `${0} sTOS`,
                },
                principal,
                isOver,
                stakedType: "LTOS Staking",
                endTime,
                tokenType: "TOS",
                stakedId,
              };
            }
            if (index > 1) {
              const marketId = stakedInfo.marketId.toString();
              const connectIdBN = await StakingV2Proxy_CONTRACT.connectId(
                stakedId
              );
              const connectId = connectIdBN.toString();
              if (marketId !== "0") {
                //BOND without lockup periods
                if (connectId === "0") {
                  return {
                    staked: {
                      ltos,
                      stos: `${0} sTOS`,
                    },
                    principal,
                    isOver,
                    stakedType: "Bond",
                    endTime,
                    tokenType: "ETH",
                    stakedId,
                  };
                }
                //BOND with lockup periods
                //Need to get sTOS Balance
                const sTOSwei = await LockTOS_CONTRACT.balanceOfLock(connectId);
                return {
                  staked: {
                    ltos,
                    stos: `${convertNumber({
                      amount: sTOSwei.toString(),
                      localeString: true,
                    })} sTOS`,
                  },
                  principal,
                  isOver,
                  stakedType: "Bond",
                  endTime,
                  tokenType: "ETH",
                  stakedId,
                };
              }
              //TOS Staking with lockup periods
              const sTOSwei = await LockTOS_CONTRACT.balanceOfLock(connectId);

              return {
                staked: {
                  ltos,
                  stos: `${convertNumber({
                    amount: sTOSwei.toString(),
                    localeString: true,
                  })} sTOS`,
                },
                principal,
                isOver,
                stakedType: "Staking",
                endTime,
                tokenType: "TOS",
                stakedId,
              };
            }
          })
        );

        setStakeCards(stakedList);
      }
    };
    fetchData().catch((e) => {
      console.log("**useStakeList err**");
      console.log(e);
    });
  }, [StakingV2Proxy_CONTRACT, account, LockTOS_CONTRACT, blockNumber]);

  return { stakeCards };
}

export default useStakeList;
