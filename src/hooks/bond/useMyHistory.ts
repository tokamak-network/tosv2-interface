import { convertNumber } from "@/components/number";
import { isTimeOver } from "@/components/time";
import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import { GET_BOND_MYHISTORY } from "graphql/bond/getBond";
import { GET_TOKEN_PRICE } from "graphql/general/getTokenPrice";
import useCallContract from "hooks/useCallContract";
import { useEffect, useState } from "react";
import { GetMyHistory, MyCardProps } from "types/bond";

function useMyHistory() {
  const [cardList, setCardList] = useState<MyCardProps[] | undefined>(
    undefined
  );
  const { account } = useWeb3React();

  const { BondDepository_CONTRACT, StakingV2_CONTRACT } = useCallContract();

  const { data, loading, error } = useQuery(GET_BOND_MYHISTORY, {
    variables: {
      account,
    },
  });
  const { data: TokenData } = useQuery(GET_TOKEN_PRICE, {
    variables: {
      tokenId: "ethereum",
    },
  });

  useEffect(() => {
    const fetchListdata = async () => {
      if (data && account && TokenData) {
        const {
          getTokenPrice: { price: ethPrice },
        } = TokenData;
        const myHistoryData = data.getMyHistory;
        const result = myHistoryData.map((historyData: GetMyHistory) => {
          if (historyData.data) {
            const { data, blockTimestamp } = historyData;
            const { ltos, marketId, tosPrice } = data;
            const convertedLtos = convertNumber({ amount: ltos.toString() });
            const bondPrice = (1 / tosPrice) * 1e18 * ethPrice;
            const isOver = isTimeOver(Number(blockTimestamp));

            const cardData: MyCardProps = {
              info: [
                {
                  title: "Staked",
                  content: `${convertedLtos} LTOS / ${""} TOS`,
                },
                {
                  title: "Bond Price",
                  content: `$ ${bondPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`,
                },
                {
                  title: "Lock-Up Period",
                  content: isOver ? `5 days` : "5 days",
                },
              ],
              tokenType: "ETH",
              isOver,
            };
            return cardData;
          }
        });
        return setCardList(result);
      }
    };
    fetchListdata().catch((e) => {
      console.log("**fetchListdata err**");
      console.log(e);
    });
  }, [account, data, TokenData]);

  // useEffect(() => {
  //   const fetchListdata = async () => {
  //     if (BondDepository_CONTRACT && StakingV2_CONTRACT) {
  //       const depositList = await BondDepository_CONTRACT.getDepositList(
  //         account
  //       );
  //     }
  //   };
  //   fetchListdata().catch((e) => {
  //     console.log("**fetchListdata err**");
  //     console.log(e);
  //   });
  // }, [BondDepository_CONTRACT, StakingV2_CONTRACT, account]);

  return { cardList };
}

export default useMyHistory;
