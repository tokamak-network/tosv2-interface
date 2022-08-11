import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { useQuery } from "@apollo/client";
import commafy from "@/components/commafy";

type UseCardData = {
  tosPrice: number | string | undefined;
};

function useCardData(): UseCardData {
  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  console.log(data.getDashboard);

  const { tosPrice } = data.getDashboard[0];

  return { tosPrice: commafy(tosPrice) };
}

export default useCardData;
