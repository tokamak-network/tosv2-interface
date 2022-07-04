import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "./Graph";
import GraphFilter from "./GraphFilter";

function GraphContainer() {
  return (
    <Flex flexDir={"column"}>
      <GraphFilter></GraphFilter>
      <SimpleGrid w={"100%"} columns={2} spacingY={"24px"}>
        <Graph></Graph>
        <Graph></Graph>
        <Graph></Graph>
        <Graph></Graph>
      </SimpleGrid>
    </Flex>
  );
}

export default GraphContainer;
