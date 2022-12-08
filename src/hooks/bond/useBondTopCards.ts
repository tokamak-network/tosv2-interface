import commafy from "@/utils/commafy";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import useStakeV2 from "hooks/contract/useStakeV2";
import useCallContract from "hooks/useCallContract";
import usePrice from "hooks/usePrice";
import { useEffect, useState } from "react";
import { BondTopCardProps } from "types/bond";

function useBondTopCards() {
  const [bondTopsCards, setBondTopsCards] = useState<BondTopCardProps[]>([
    {
      title: "Treasury Balance",
      price: "-",
      priceUnit: "$",
      tooltip: "Total value of non TOS assets held by the Treasury",
    },
    {
      title: "TOS Price",
      price: "-",
      priceUnit: "$",
      tooltip: "TOS market price",
    },
  ]);

  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
    pollInterval: 10000,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (
        data?.getDashboard[0]?.tosPrice &&
        data?.getDashboard[0]?.treasuryBalance
      ) {
        const { tosPrice, treasuryBalance } = data?.getDashboard[0];

        setBondTopsCards([
          {
            title: "Treasury Balance",
            price: commafy(treasuryBalance),
            priceUnit: "$",
            tooltip: "Total value of non TOS assets held by the Treasury",
          },
          {
            title: "TOS Price",
            price: commafy(tosPrice),
            priceUnit: "$",
            tooltip: "TOS market price",
          },
        ]);
      }
    };
    fetchData().catch((e) => {
      console.log("**useStakeTopCards err**");
      console.log(e);
    });
  }, [data]);

  return { bondTopsCards };
}

export default useBondTopCards;
