import commafy from "@/utils/commafy";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "common/graph/Graph";
import useCallGraph from "hooks/dao/useCallGraph";
function GraphContainer() {
  const { stosGraphData } = useCallGraph();

  console.log(stosGraphData);

  return (
    <Flex
      w={"100%"}
      columnGap={"1.5%"}
      rowGap={"24px"}
      flexWrap={"wrap"}
      justifyContent="center"
      mt="24px"
    >
      {stosGraphData && (
        <Graph
          data={stosGraphData}
          title="Total sTOS"
          amount={`${commafy(stosGraphData[0].data[0].y)} sTOS`}
          tooltipTitle="Total number of sTOS owned by users."
        />
      )}
      {/* <Graph
        data={data}
        title="Total LTOS"
        amount="2,000,000 LTOS"
        tooltipTitle="Total number of LTOS owned by users."
      /> */}
    </Flex>
  );
}

export default GraphContainer;
