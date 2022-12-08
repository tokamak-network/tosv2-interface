import commafy from "@/utils/commafy";
import { convertNumber } from "@/utils/number";
import { convertTimeStamp, isTimeOver } from "@/utils/time";
import { useWeb3React } from "@web3-react/core";
import {
  stake_filter_radio,
  stake_filter_sort,
  T_SortValues,
} from "atom/stake/filter";
import { useBlockNumber } from "hooks/useBlockNumber";
import useCallContract from "hooks/useCallContract";
import usePrice from "hooks/usePrice";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { StakeCardProps } from "types/stake";

function useStakeList() {
  const [stakeCards, setStakeCards] = useState<StakeCardProps[] | undefined>(
    undefined
  );
  const [hasList, setHasList] = useState<boolean>(false);
  const filterValue = useRecoilValue(stake_filter_radio);
  const selectFilterValue = useRecoilValue<T_SortValues>(stake_filter_sort);

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
        //connectedId(stakeId) returns 0 -> it means BOND without lockup periods
        //connectedId(stakeId) returns lockTOS ID -> it means BOND with lockup periods
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
              // if (stakedInfo.deposit.toString() === "0") {
              //   return undefined;
              // }
              return {
                staked: {
                  ltos,
                  stos: undefined,
                },
                principal,
                isOver: false,
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
                      stos: undefined,
                    },
                    principal,
                    isOver,
                    stakedType: "Bond",
                    endTime,
                    tokenType: "ETH",
                    stakedId,
                    isWithoutLockup: true,
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
                      round: false,
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

        if (stakedList.length > 0) {
          setHasList(true);
        }

        if (filterValue === "All") {
          if (selectFilterValue === "Recently") {
            const reversedList = stakedList.reverse();
            const ltosStaking = stakedList.filter((stakeData) => {
              if (stakeData?.stakedType === "LTOS Staking") {
                return stakeData;
              }
            });
            const stakeList = reversedList.filter((stakeData) => {
              if (stakeData?.stakedType !== "LTOS Staking") {
                return stakeData;
              }
            });

            const recentlyList = ltosStaking.concat(stakeList);
            return setStakeCards(recentlyList);
          }
          if (selectFilterValue === "Earliest") {
            const ealiestList = stakedList.sort((a, b) => {
              if (a && b) {
                return a?.endTime > b?.endTime ? 1 : -1;
              }
              return 0;
            });
            return setStakeCards(ealiestList);
          }
          if (selectFilterValue === "Latest") {
            const sortedList = stakedList
              .sort((a, b) => {
                if (a && b) {
                  return a?.endTime > b?.endTime ? -1 : 1;
                }
                return 0;
              })
              .sort((a, b) => {
                if (a?.stakedType === "LTOS Staking") {
                  return -1;
                }
                return 1;
              });
            return setStakeCards(sortedList);
          }
        }

        if (filterValue === "Bond") {
          const bondFilteredList = stakedList.filter((stakeData) => {
            if (stakeData?.stakedType === "Bond") {
              return stakeData;
            }
          });
          if (selectFilterValue === "Recently") {
            const reversedList = bondFilteredList.reverse();
            return setStakeCards(reversedList);
          }
          if (selectFilterValue === "Earliest") {
            const ealiestList = bondFilteredList.sort((a, b) => {
              if (a && b) {
                return a?.endTime > b?.endTime ? 1 : -1;
              }
              return 0;
            });
            return setStakeCards(ealiestList);
          }
          if (selectFilterValue === "Latest") {
            const sortedList = bondFilteredList.sort((a, b) => {
              if (a && b) {
                return a?.endTime > b?.endTime ? -1 : 1;
              }
              return 0;
            });
            return setStakeCards(sortedList);
          }
        }
        if (filterValue === "Stake") {
          const stakeFilteredList = stakedList.filter((stakeData) => {
            if (
              stakeData?.stakedType === "LTOS Staking" ||
              stakeData?.stakedType === "Staking"
            ) {
              return stakeData;
            }
          });

          if (selectFilterValue === "Recently") {
            const reversedList = stakeFilteredList.reverse();
            const ltosStaking = stakeFilteredList.filter((stakeData) => {
              if (stakeData?.stakedType === "LTOS Staking") {
                return stakeData;
              }
            });
            const stakeList = reversedList.filter((stakeData) => {
              if (stakeData?.stakedType !== "LTOS Staking") {
                return stakeData;
              }
            });

            const recentlyList = ltosStaking.concat(stakeList);
            return setStakeCards(recentlyList);
          }

          if (selectFilterValue === "Earliest") {
            const ealiestList = stakeFilteredList.sort((a, b) => {
              if (a?.stakedType === "LTOS Staking") {
                return 0;
              }
              if (a && b) {
                return a?.endTime > b?.endTime ? 1 : -1;
              }
              return 0;
            });

            return setStakeCards(ealiestList);
          }
          if (selectFilterValue === "Latest") {
            const latestList = stakeFilteredList
              .sort((a, b) => {
                if (a?.stakedType === "LTOS Staking") {
                  return 0;
                }
                if (a && b) {
                  return a?.endTime > b?.endTime ? -1 : 1;
                }
                return 0;
              })
              .sort((a, b) => {
                if (a?.stakedType === "LTOS Staking") {
                  return -1;
                }
                return 1;
              });

            return setStakeCards(latestList);
          }
        }
      }
    };
    fetchData().catch((e) => {
      console.log("**useStakeList err**");
      console.log(e);
    });
  }, [
    StakingV2Proxy_CONTRACT,
    account,
    LockTOS_CONTRACT,
    blockNumber,
    filterValue,
    selectFilterValue,
  ]);

  return { stakeCards, hasList };
}

export default useStakeList;
