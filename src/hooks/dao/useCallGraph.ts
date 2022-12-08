import { useQuery } from "@apollo/client";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import moment from "moment";
import { useEffect, useState } from "react";

const getGraphData = (data: { getDashboard: any[] }) => {
  const slicedData = data.getDashboard.slice(0, 31);
  const filteredData = slicedData.filter((data: any, index: number) => {
    if (index !== 1) {
      return data;
    }
  });
  return filteredData;
};

function useCallGraph() {
  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 365,
    },
  });

  const [stosGraphData, setStosGraphData] = useState<any[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchUnstakeData() {
      if (data) {
        const graphData = getGraphData(data);
        let indexNum = -1;

        const sTOSdata = graphData.map((arrayData: any, index: number) => {
          indexNum += 1;
          return {
            x: `${moment(arrayData.createdAt).format(
              "YYYY-MM-DD HH:mm:ss"
            )}_${indexNum}`,
            y:
              arrayData.marketCap === "-Infinity"
                ? 0
                : Number(arrayData.marketCap),
            dataIndex: indexNum,
          };
        });

        const stosGraphData = [
          {
            id: "#2775ff",
            color: "hsl(218, 100%, 58%)",
            data: [...sTOSdata].reverse(),
          },
        ];
        setStosGraphData(stosGraphData);
      }
    }
    fetchUnstakeData().catch((e) => {
      console.log("**useCallGraph err**");
      console.log(e);
    });
  }, [data]);

  return {
    stosGraphData,
  };
}

export default useCallGraph;
