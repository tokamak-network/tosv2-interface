import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "common/graph/Graph";
import GraphFilter from "./GraphFilter";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { useEffect, useState } from "react";
import moment from "moment";

function GraphContainer() {
  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 365,
    },
  });

  const [filteredValue, setFilteredValue] = useState("1 Week");
  const [marketCapDatas, setMarketCapDatas] = useState<any[]>([]);
  const [totalStakedDatas, setTotalStakedDatas] = useState<any[]>([]);
  const [runwayDatas, setRunwayDatas] = useState<any[]>([]);
  const [treasuryBalanceDatas, setTreasuryBalanceDatas] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const graphData = getGraphData();

      const marketCap = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(arrayData.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          y: arrayData.marketCap === "-Infinity"
          ? 0
          : Number(arrayData.marketCap),
        };
      });

      const marketCapData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...marketCap].reverse(),
        },
      ];

      setMarketCapDatas(marketCapData);
      const totalStaked = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(new Date(arrayData.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          y: arrayData.totalValueStaked === "-Infinity"
          ? 0
          : Number(arrayData.totalValueStaked) || 0,
        };
      });

      const totalStakedData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...totalStaked].reverse(),
        },
      ];
      setTotalStakedDatas(totalStakedData);

      const runway = graphData.map((arrayData: any, index: number) => {

        return {
          x: moment(new Date(arrayData.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          y:
            arrayData.runway === "-Infinity"
              ? 0
              : Number(arrayData.runway) || 0,
        };
      });
      const runwayData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...runway].reverse(),
        },
      ];

      setRunwayDatas(runwayData);

      const treasuryBalance = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(new Date(arrayData.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          y:arrayData.treasuryBalance === "-Infinity"
          ? 0
          :  Number(arrayData.treasuryBalance) || 0,
        };
      });

      const treasuryData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...treasuryBalance].reverse(),
        },
      ];

      setTreasuryBalanceDatas(treasuryData);
    }
  }, [filteredValue, data]);

  const getGraphData = () => {
    switch (filteredValue) {
      case "1 Week":
        return data.getDashboard.slice(0, 7);
      case "1 Month":
        return data.getDashboard.slice(0, 29);
      case "3 Months":
        return data.getDashboard.slice(0, 89);
      case "6 Months":
        return data.getDashboard.slice(0, 181);
      case "1 Year":
        return data.getDashboard.slice(0, 364);
      default:
        return data;
    }
  };

  return (
    <Flex flexDir={"column"}>
      <GraphFilter setFilter={setFilteredValue}></GraphFilter>
      <Flex
        w={"100%"}
        columnGap={"1.5%"}
        rowGap={"24px"}
        flexWrap={"wrap"}
        justifyContent="center"
      >
        {!loading && (
          <Graph
            data={marketCapDatas}
            title="Market Cap"
            amount={
              marketCapDatas[0]
                ? `$ ${Number(
                    marketCapDatas[0].data[marketCapDatas[0].data.length - 1].y
                  ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                : ""
            }
            tooltipTitle="“Market Cap” represents the total
          dollar value of TOS in circulation."
          ></Graph>
        )}

        {!loading && (
          <Graph
            data={totalStakedDatas}
            title="Total Value Staked"
            amount={
              totalStakedDatas[0]
                ? `$ ${Number(
                    totalStakedDatas[0].data[
                      totalStakedDatas[0].data.length - 1
                    ].y
                  ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                : ""
            }
            tooltipTitle="“Total Value Staked” represents 
      the total dollar value of all the LTOS. 
      LTOS represents TOS that are staked
      and their staking interest."
          ></Graph>
        )}
        {!loading && (
          <Graph
            data={treasuryBalanceDatas}
            title="Treasury Balance"
            amount={
              treasuryBalanceDatas[0]
                ? `$ ${Number(
                    treasuryBalanceDatas[0].data[
                      treasuryBalanceDatas[0].data.length - 1
                    ].y
                  ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                : ""
            }
            tooltipTitle="“Treasury Balance” represents the 
          total dollar value of non-TOS assets
          owned by the treasury that can be
          used for backing each TOS."
          ></Graph>
        )}
        {!loading && (
          <Graph
            data={runwayDatas}
            title="Runway"
            amount={`${
              runwayDatas[0]
                ? ` ${Number(
                    runwayDatas[0].data[runwayDatas[0].data.length - 1].y
                  ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                : ""
            } Days`}
            tooltipTitle="“Runway” represents the number of days
          that staking interest can be sustained 
          by the protocol."
          ></Graph>
        )}
      </Flex>
    </Flex>
  );
}

export default GraphContainer;
