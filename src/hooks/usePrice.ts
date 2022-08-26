import { useQuery } from "@apollo/client";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { GET_TOKEN_PRICE } from "graphql/general/getTokenPrice";
import { useEffect, useState } from "react";

type UsePrice = {
  tosPrice: number;
  ethPrice: number;
};

function usePrice() {
  const [priceData, setPriceData] = useState<UsePrice | undefined>(undefined);
  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });
  const { data: TokenData } = useQuery(GET_TOKEN_PRICE, {
    variables: {
      tokenId: "ethereum",
    },
  });

  useEffect(() => {
    if (data && TokenData) {
      const tosPrice = data.getDashboard[0].tosPrice;
      const {
        getTokenPrice: { price: ethPrice },
      } = TokenData;
      setPriceData({ tosPrice: Number(tosPrice), ethPrice: Number(ethPrice) });
    }
  }, [data, TokenData]);

  return { priceData };
}

export default usePrice;
