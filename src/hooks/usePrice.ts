import { useQuery } from "@apollo/client";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { useEffect, useState } from "react";

type UsePrice = {
  tosPrice: number;
};

function usePrice() {
  const [priceData, setPriceData] = useState<UsePrice | undefined>(undefined);
  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  useEffect(() => {
    if (data) {
      const tosPrice = data.getDashboard[0].tosPrice;
      setPriceData({ tosPrice: Number(tosPrice) });
    }
  }, [data]);

  return { priceData };
}

export default usePrice;
