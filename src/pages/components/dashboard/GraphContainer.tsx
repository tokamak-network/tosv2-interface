import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "./Graph";
import GraphFilter from "./GraphFilter";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
function GraphContainer() {
  const {
    loading,
    error,
    data: testData,
  } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  const data = [
    {
      id: "#2775ff",
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

  return (
    <Flex flexDir={"column"}>
      <GraphFilter></GraphFilter>
      <Flex
        w={"100%"}
        columnGap={"1.5%"}
        rowGap={"24px"}
        flexWrap={"wrap"}
        justifyContent="center"
      >
        <Graph
          data={data}
          title="Market Cap"
          amount="$ 1,000,000,000"
          tooltipTitle="tooltip"
        ></Graph>
        <Graph
          data={data}
          title="Total Value Staked"
          amount="$ 1,000,000,000"
          tooltipTitle="tooltip"
        ></Graph>
        <Graph
          data={data}
          title="Treasury Balance"
          amount="$ 1,000,000,000"
          tooltipTitle="tooltip"
        ></Graph>
        <Graph
          data={data3}
          title="Runway"
          amount="100 Days"
          tooltipTitle="tooltip"
        ></Graph>
      </Flex>
    </Flex>
  );
}

export default GraphContainer;
