import commafy from "@/components/commafy";
import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import { GET_DASHBOARD_CARD } from "graphql/dashboard/getDashboard";
import useStakeV2 from "hooks/contract/useStakeV2";
import { useBlockNumber } from "hooks/useBlockNumber";
import { useEffect, useState } from "react";

function useLtosIndex() {
  const [ltosIndex, setLtosIndex] = useState<string>("-");
  const { account } = useWeb3React();
  const { stakeV2 } = useStakeV2();
  const { loading, error, data } = useQuery(GET_DASHBOARD_CARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
    pollInterval: 10000,
  });
  const { blockNumber } = useBlockNumber();

  useEffect(() => {
    if (account) {
      const ltosIndex = stakeV2?.ltosIndex;
      if (ltosIndex) return setLtosIndex(ltosIndex);
    }
    if (data) {
      const { ltosIndex } = data?.getDashboardCard[0];
      return setLtosIndex(commafy(ltosIndex, 7));
    }
  }, [data, account, stakeV2, blockNumber]);

  return { ltosIndex };
}

export default useLtosIndex;
