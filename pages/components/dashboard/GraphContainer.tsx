import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "./Graph";
import GraphFilter from "./GraphFilter";

function GraphContainer() {
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
        <Graph></Graph>
        <Graph></Graph>
        <Graph></Graph>
        <Graph></Graph>
      </Flex>
    </Flex>
  );
}

export default GraphContainer;
