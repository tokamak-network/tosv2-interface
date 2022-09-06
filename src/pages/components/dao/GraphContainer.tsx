import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "common/graph/Graph";
function GraphContainer() {
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
  return (
    <Flex w={"100%"}  columnGap={"1.5%"}
    rowGap={"24px"}
    flexWrap={"wrap"}
    justifyContent="center" mt="24px">
      <Graph
        data={data}
        title="Total sTOS"
        amount="2,000,000.00 sTOS"
        tooltipTitle="Total number of sTOS owned by users."
      />
      <Graph
        data={data}
        title="Total LTOS"
        amount="2,000,000.00 LTOS"
        tooltipTitle="Total number of LTOS owned by users."
      />
    </Flex>
  );
}

export default GraphContainer;
