import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import PageLayout from "pages/components/layout/PageLayout";
import DaoTopContainer from "./components/dao/DaoTopContainer";
import StatisticContainer from "./components/dao/StatisticContainer";
import GraphContainer from "./components/dao/GraphContainer";
const DAO = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Flex
      {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)}
      bg={colorMode === "light" ? "#fafbfc" : "black.100"}
    >
      <PageLayout></PageLayout>
      <DaoTopContainer />
      <StatisticContainer />
      {/* <GraphContainer/> */}
    </Flex>
  );
};

export default DAO;
