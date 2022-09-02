import commafy from "@/components/commafy";
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
    },
    {
      title: "TOS Price",
      price: "-",
      priceUnit: "$",
    },
  ]);

  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  console.log("--data--");
  console.log(data);

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
          },
          {
            title: "TOS Price",
            price: commafy(tosPrice),
            priceUnit: "$",
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
