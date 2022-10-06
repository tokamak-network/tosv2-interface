import {
  GET_DASHBOARD,
  GET_DASHBOARD_CARD,
} from "graphql/dashboard/getDashboard";
import { useQuery, ApolloError } from "@apollo/client";
import commafy from "@/components/commafy";

type UseCardData = {
  data:
    | {
        tosPrice: number | string | undefined;
        backingPerTos: number | string | undefined;
        ltosPrice: number | string | undefined;
        ltosIndex: number | string | undefined;
      }
    | undefined;
  error: ApolloError | undefined;
  loading: boolean;
};

function useCardData(): UseCardData {
  const { loading, error, data } = useQuery(GET_DASHBOARD_CARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
    pollInterval: 10000,
  });

  if (loading || error || data === undefined) {
    return {
      loading,
      error,
      data,
    };
  }

  const { tosPrice, backingPerTos, ltosPrice, ltosIndex, chainId } =
    data.getDashboardCard[0];

  return {
    loading,
    error,
    data: {
      tosPrice: commafy(tosPrice),
      backingPerTos: commafy(backingPerTos),
      ltosPrice: commafy(ltosPrice),
      ltosIndex: commafy(ltosIndex),
    },
  };
}

export default useCardData;
