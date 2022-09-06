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
      period: "1",
      limit: 365,
    },
  });

  const [filteredValue, setFilteredValue] = useState("1 Week");
  const [marketCapDatas, setMarketCapDatas] = useState<any[]>([]);
  const [totalStakedDatas, setTotalStakedDatas] = useState<any[]>([]);
  const [runwayDatas, setRunwayDatas] = useState<any[]>([]);

  const data3 = [
    {
      id: "#1",
      color: "hsl(218, 100%, 58%)",
      data: [
        {
          x: 1656641961,
          y: 500,
        },
        {
          x: 1656814761,
          y: 800,
        },
        {
          x: 1656987561,
          y: 750,
        },
        {
          x: 1657160361,
          y: 1000,
        },
        {
          x: 1657333161,
          y: 1400,
        },
        {
          x: 1657505961,
          y: 800,
        },
        {
          x: 1657678761,
          y: 1500,
        },
        {
          x: 1657851561,
          y: 4200,
        },
        {
          x: 1658024361,
          y: 2100,
        },
        {
          x: 1658197161,
          y: 2300,
        },
      ],
    },
    {
      id: "#2",
      color: "hsl(218, 100%, 58%)",
      data: [
        {
          x: 1656641961,
          y: 1500,
        },
        {
          x: 1656814761,
          y: 1000,
        },
        {
          x: 1656987561,
          y: 2750,
        },
        {
          x: 1657160361,
          y: 2400,
        },
        {
          x: 1657333161,
          y: 2400,
        },
        {
          x: 1657505961,
          y: 1800,
        },
        {
          x: 1657678761,
          y: 3500,
        },
        {
          x: 1657851561,
          y: 1300,
        },
        {
          x: 1658024361,
          y: 3300,
        },
        {
          x: 1658197161,
          y: 2400,
        },
      ],
    },
    {
      id: "#3",
      color: "hsl(218, 100%, 58%)",
      data: [
        {
          x: 1656641961,
          y: 500,
        },
        {
          x: 1656814761,
          y: 1000,
        },
        {
          x: 1656987561,
          y: 1750,
        },
        {
          x: 1657160361,
          y: 2000,
        },
        {
          x: 1657333161,
          y: 2400,
        },
        {
          x: 1657505961,
          y: 2800,
        },
        {
          x: 1657678761,
          y: 2500,
        },
        {
          x: 1657851561,
          y: 4000,
        },
        {
          x: 1658024361,
          y: 4100,
        },
        {
          x: 1658197161,
          y: 5000,
        },
      ],
    },
  ];

  useEffect(() => {
    if (data) {
      const graphData = getGraphData();

      const marketCap = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(arrayData.createdAt).unix(),
          y: Number(arrayData.marketCap),
        };
      });

      const marketCapData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: marketCap,
        },
      ];

      setMarketCapDatas(marketCapData);
      const totalStaked = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(arrayData.createdAt).unix(),
          y: Number(arrayData.totalValueStaked),
        };
      });

      const totalStakedData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: totalStaked,
        },
      ];
      setTotalStakedDatas(totalStakedData);

      const runway = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(arrayData.createdAt).unix(),
          y: Number(arrayData.runway),
        };
      });
      const runwayData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: runway,
        },
      ];

      setRunwayDatas(runwayData);
    }
  }, [filteredValue, data]);

  const getGraphData = () => {
    switch (filteredValue) {
      case "1 Week":
        return data.getDashboard.slice(0, 2);
      case "1 Month":
        return data.getDashboard.slice(0, 3);
      case "3 Months":
        return data.getDashboard.slice(0, 4);
      case "6 Months":
        return data.getDashboard.slice(0, 5);
      case "1 Year":
        return data.getDashboard.slice(0, 23);
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
        <Graph
          data={totalStakedDatas}
          title="Total Value Staked"
          amount={
            totalStakedDatas[0]
              ? `$ ${Number(
                  totalStakedDatas[0].data[totalStakedDatas[0].data.length - 1]
                    .y
                ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              : ""
          }
          tooltipTitle="“Total Value Staked” represents 
          the total dollar value of all the LTOS. 
          LTOS represents TOS that are staked
          and their staking interest."
        ></Graph>
        <Graph
          data={data3}
          title="Treasury Balance"
          amount="$ 1,000,000,000"
          tooltipTitle="“Treasury Balance” represents the 
          total dollar value of non-TOS assets
          owned by the treasury that can be
          used for backing each TOS."
        ></Graph>
        <Graph
          data={runwayDatas}
          title="Runway"
          amount={`${runwayDatas[0] ? runwayDatas[0].data.length : ""} Days`}
          tooltipTitle="“Runway” represents the number of days
          that staking interest can be sustained 
          by the protocol."
        ></Graph>
      </Flex>
    </Flex>
  );
}

export default GraphContainer;
