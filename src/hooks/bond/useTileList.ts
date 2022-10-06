import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_CARD } from "graphql/dashboard/getDashboard";
import { useEffect, useState } from "react";

type TileList = { title: string; content: string | number }[];

function useTileList() {
  const tileList = useState<TileList | undefined>(undefined);

  //fetch server datas
  const { loading, error, data } = useQuery(GET_DASHBOARD_CARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
    pollInterval: 10000,
  });

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  return { tileList };
}

export default useTileList;
