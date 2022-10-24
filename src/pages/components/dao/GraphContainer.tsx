import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "common/graph/Graph";
function GraphContainer() {
  const data = [
    {
      id: "#2775ff",
      color: "hsl(218, 100%, 58%)",
      data: [
        {
          x: "2022-09-29 12:00:02",
          y: 500,
        },
        {
          x: "2022-09-29 13:00:02",
          y: 1000,
        },
        {
          x: "2022-09-29 14:00:02",
          y: 1750,
        },
        {
          x: "2022-09-29 15:00:02",
          y: 2000,
        },
        {
          x: "2022-09-30 13:00:02",
          y: 2400,
        },
        {
          x: "2022-09-30 15:00:02",
          y: 2800,
        },
        {
          x: "2022-09-30 16:00:02",
          y: 2500,
        },
        {
          x: "2022-09-30 17:00:02",
          y: 4000,
        },
        {
          x: "2022-10-01 13:00:02",
          y: 4100,
        },
        {
          x: "2022-10-01 15:00:02",
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
        amount="2,000,000 sTOS"
        tooltipTitle="Total number of sTOS owned by users."
      />
      <Graph
        data={data}
        title="Total LTOS"
        amount="2,000,000 LTOS"
        tooltipTitle="Total number of LTOS owned by users."
      />
    </Flex>
  );
}

export default GraphContainer;
