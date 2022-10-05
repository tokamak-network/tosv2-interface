import commafy from "@/components/commafy";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_CARD } from "graphql/dashboard/getDashboard";
import { useEffect, useState } from "react";

function useLtosIndex() {
  const [ltosIndex, setLtosIndex] = useState<string>("-");
  const { loading, error, data } = useQuery(GET_DASHBOARD_CARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  useEffect(() => {
    if (data) {
      const { ltosIndex } = data?.getDashboardCard[0];
      setLtosIndex(commafy(ltosIndex, 7));
    }
  }, [data]);

  return { ltosIndex };
}

export default useLtosIndex;
