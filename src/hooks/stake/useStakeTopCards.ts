import commafy from "@/components/commafy";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_CARD } from "graphql/dashboard/getDashboard";
import useStakeV2 from "hooks/contract/useStakeV2";
import useCallContract from "hooks/useCallContract";
import usePrice from "hooks/usePrice";
import { useEffect, useState } from "react";
import { StakeTopCardProps } from "types/stake";

function useStakeTopCards() {
  const [stakeTopCards, setStakeTopCards] = useState<StakeTopCardProps[]>([
    {
      title: "Total Value Staked",
      price: "-",
      priceUnit: "$",
      tooltip: "",
    },
    {
      title: "TOS APY",
      price: "-",
      priceUnit: "%",
      tooltip: "",
    },
    {
      title: "LTOS Index",
      price: "-",
      priceUnit: "TOS",
      tooltip: "",
    },
  ]);

  const { StakingV2Proxy_CONTRACT } = useCallContract();
  const { priceData } = usePrice();
  const { loading, error, data } = useQuery(GET_DASHBOARD_CARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (StakingV2Proxy_CONTRACT && priceData && data) {
        const { tosPrice } = priceData;
        const { ltosIndex } = data.getDashboardCard[0];

        //Calculate TVS
        const totalLTOS = await StakingV2Proxy_CONTRACT.totalLtos();
        const totalTOS =
          await StakingV2Proxy_CONTRACT.getLtosToTosPossibleIndex(totalLTOS);
        const TVS = (Number(totalTOS.toString()) / 1e18) * tosPrice;

        //Calculate TOS APY
        const rebasePerEpoch = await StakingV2Proxy_CONTRACT.rebasePerEpoch();
        const epoch = await StakingV2Proxy_CONTRACT.epoch();
        const epochLength = epoch.length_;
        const oneYearEpoch = 31536000;
        const A = 1 + rebasePerEpoch / 1e18;
        const B = oneYearEpoch / Number(epochLength.toString());
        const TOS_APY = (A ** B - 1) * 100;

        setStakeTopCards([
          {
            title: "Total Value Staked",
            price: commafy(TVS),
            priceUnit: "$",
            tooltip: "",
          },
          {
            title: "TOS APY",
            price: commafy(TOS_APY),
            priceUnit: "%",
            tooltip: "",
          },
          {
            title: "LTOS Index",
            price: commafy(ltosIndex, 7),
            priceUnit: "TOS",
            tooltip: "",
          },
        ]);
      }
    };
    fetchData().catch((e) => {
      console.log("**useStakeTopCards err**");
      console.log(e);
    });
  }, [StakingV2Proxy_CONTRACT, priceData, data]);

  return { stakeTopCards };
}

export default useStakeTopCards;
