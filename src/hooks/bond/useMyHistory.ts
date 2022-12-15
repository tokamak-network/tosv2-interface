import { convertNumber } from "@/utils/number";
import {
  convertTimeStamp,
  getNowTimeStamp,
  getTimeLeft,
  isTimeOver,
} from "@/utils/time";
import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import { bond_filter_sort } from "atom/bond/filter";
import { GET_BOND_MYHISTORY } from "graphql/bond/getBond";
import { GET_TOKEN_PRICE } from "graphql/general/getTokenPrice";
import useLockTOS from "hooks/contract/useLockTOS";
import useCallContract from "hooks/useCallContract";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { GetMyHistory, MyCardProps } from "types/bond";

function useMyHistory() {
  const [cardList, setCardList] = useState<MyCardProps[] | undefined>(
    undefined
  );
  const { account } = useWeb3React();
  const { StakingV2Proxy_CONTRACT, LockTOS_CONTRACT } = useCallContract();
  const { epochUnit } = useLockTOS();

  const { data, loading, error } = useQuery(GET_BOND_MYHISTORY, {
    variables: {
      account,
      period: "-1",
    },
    pollInterval: 10000,
  });
  const { data: TokenData } = useQuery(GET_TOKEN_PRICE, {
    variables: {
      tokenId: "ethereum",
    },
  });

  const sortValue = useRecoilValue(bond_filter_sort);

  useEffect(() => {
    const fetchListdata = async () => {
      if (data && account && TokenData) {
        const {
          getTokenPrice: { price: ethPrice },
        } = TokenData;
        const myHistoryData = data.getMyHistory;
        const result = myHistoryData.map(async (historyData: GetMyHistory) => {
          if (
            historyData.data &&
            historyData.blockTimestamp &&
            historyData.eventName &&
            StakingV2Proxy_CONTRACT &&
            LockTOS_CONTRACT
          ) {
            const { data, blockTimestamp, eventName } = historyData;
            const { ltos, marketId, tosPrice } = data;
            const convertedLtos = convertNumber({ amount: ltos.toString() });
            const stakeId = data?.stakeId;

            const bondPrice = (1 / tosPrice) * 1e18 * ethPrice;
            const lockId = await StakingV2Proxy_CONTRACT.connectId(stakeId);
            const tosBalance = await LockTOS_CONTRACT.balanceOfLockAt(
              lockId,
              blockTimestamp
            );

            let unlockTime = "-";
            let isOver = false;
            let lockUpPeriod = "5 Days";
            const hasPeriodWeeks = eventName === "StakedGetStosByBond";

            if (hasPeriodWeeks) {
              const nowTimeStmap = getNowTimeStamp();
              const unlockTimeStamp =
                nowTimeStmap + data?.periodWeeks * Number(epochUnit);
              unlockTime = `${convertTimeStamp(
                blockTimestamp,
                "YYYY. MM.DD. HH:mm"
              )}  ~ ${convertTimeStamp(unlockTimeStamp, "MM.DD. HH:mm")}`;
              const timeDiff = unlockTimeStamp - blockTimestamp;
              lockUpPeriod = `${Math.floor(timeDiff / 86400)} Days`;
              isOver = isTimeOver(Number(unlockTimeStamp));
            } else {
              //5days lockup
              unlockTime = `${convertTimeStamp(
                blockTimestamp,
                "YYYY. MM.DD. HH:mm"
              )} ~ ${getTimeLeft(blockTimestamp, 5, "MM.DD HH:mm")}`;
              isOver = isTimeOver(Number(blockTimestamp) + 432000);
            }

            const cardData: MyCardProps = {
              info: [
                {
                  title: "Staked",
                  content: hasPeriodWeeks
                    ? `${convertedLtos} LTOS / ${convertNumber({
                        amount: tosBalance.toString(),
                      })}sTOS`
                    : `${convertedLtos} LTOS`,
                },
                {
                  title: "Bond Price",
                  content: `$ ${bondPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`,
                },
                {
                  title: "Lock-Up Period",
                  content: lockUpPeriod,
                },
              ],
              tokenType: "ETH",
              lockUpDate: unlockTime,
              isOver,
            };
            return cardData;
          }
        });

        const myhistoryList = await Promise.all(result);

        setCardList(myhistoryList);

        // if (sortValue === 'Earliest') {
        // return setCardList();
        // } else {
        // return setCardList();

        // }
      }
    };
    fetchListdata().catch((e) => {
      console.log("**fetchListdata err**");
      console.log(e);
    });
  }, [
    account,
    data,
    TokenData,
    epochUnit,
    StakingV2Proxy_CONTRACT,
    LockTOS_CONTRACT,
    sortValue,
  ]);

  return { cardList };
}

export default useMyHistory;
