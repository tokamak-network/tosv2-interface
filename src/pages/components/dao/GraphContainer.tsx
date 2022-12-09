import commafy from "@/utils/commafy";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { filterState } from "atom/dashboard";
import Graph from "common/graph/Graph";
import useCallGraph from "hooks/dao/useCallGraph";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
function GraphContainer() {
  const { stosGraphData, ltosGraphData } = useCallGraph();
  const [selectedFilter, setSelectedFilter] = useRecoilState(filterState);

  useEffect(() => {
    setSelectedFilter("1 Month");
  }, []);

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
          amount={`${commafy(
            stosGraphData[0].data[stosGraphData[0].data.length - 1].y
          )} sTOS`}
          tooltipTitle="Total number of sTOS owned by users."
        />
      )}
      {ltosGraphData && (
        <Graph
          data={ltosGraphData}
          title="Total LTOS"
          amount={`${commafy(
            ltosGraphData[0].data[ltosGraphData[0].data.length - 1].y
          )} LTOS`}
          tooltipTitle="Total number of LTOS owned by users."
        />
      )}
    </Flex>
  );
}

export default GraphContainer;
