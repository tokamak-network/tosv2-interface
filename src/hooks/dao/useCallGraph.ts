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
  const [ltosGraphData, setLtosGraphData] = useState<any[] | undefined>(
    undefined
  );

  //stosGraphData
  useEffect(() => {
    async function fetchGraphData() {
      if (data) {
        const graphData = getGraphData(data);
        let indexNum = -1;

        const sTOSdata = graphData.map(
          (
            arrayData: { sTosSupply: number; createdAt: string },
            index: number
          ) => {
            indexNum += 1;
            return {
              x: `${moment(arrayData.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}_${indexNum}`,
              y: arrayData.sTosSupply === null ? 0 : arrayData.sTosSupply,
              dataIndex: indexNum,
            };
          }
        );

        if (sTOSdata.length < 31) {
          const difference = 31 - sTOSdata.length;

          for (let i = 1; i <= difference; i++) {
            indexNum += 1;

            const date =
              moment(graphData[graphData.length - 1].createdAt).unix() -
              86400 * i;
            const formattedDate = moment
              .unix(date)
              .format("YYYY-MM-DD HH:mm:ss");
            sTOSdata.push({
              x: `${formattedDate}_${indexNum}`,
              y:
                i === 1
                  ? 1923717.69
                  : i === 2
                  ? 1925785.03
                  : i === 3
                  ? 1905532.72
                  : 1907581.51,
              dataIndex: indexNum,
            });
          }
        }

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
    fetchGraphData().catch((e) => {
      console.log("**useCallGraph err**");
      console.log(e);
    });
  }, [data]);

  //ltosGraphData
  useEffect(() => {
    async function fetchGraphData() {
      if (data) {
        const graphData = getGraphData(data);
        let indexNum = -1;

        const lTosdata = graphData.map(
          (
            arrayData: { lTosSupply: number; createdAt: string },
            index: number
          ) => {
            indexNum += 1;
            return {
              x: `${moment(arrayData.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}_${indexNum}`,
              y: arrayData.lTosSupply === null ? 0 : arrayData.lTosSupply,
              dataIndex: indexNum,
            };
          }
        );

        if (lTosdata.length < 31) {
          const difference = 31 - lTosdata.length;

          for (let i = 1; i <= difference; i++) {
            indexNum += 1;

            const date =
              moment(graphData[graphData.length - 1].createdAt).unix() -
              86400 * i;
            const formattedDate = moment
              .unix(date)
              .format("YYYY-MM-DD HH:mm:ss");
            lTosdata.push({
              x: `${formattedDate}_${indexNum}`,
              y: 0,
              dataIndex: indexNum,
            });
          }
        }

        const lTosGraphData = [
          {
            id: "#2775ff",
            color: "hsl(218, 100%, 58%)",
            data: [...lTosdata].reverse(),
          },
        ];
        setLtosGraphData(lTosGraphData);
      }
    }
    fetchGraphData().catch((e) => {
      console.log("**useCallGraph err**");
      console.log(e);
    });
  }, [data]);

  return {
    stosGraphData,
    ltosGraphData,
  };
}

export default useCallGraph;
