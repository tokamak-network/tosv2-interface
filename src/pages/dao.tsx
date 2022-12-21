import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import PageLayout from "pages/components/layout/PageLayout";
import DaoTopContainer from "./components/dao/DaoTopContainer";
import StatisticContainer from "./components/dao/StatisticContainer";
import GraphContainer from "./components/dao/GraphContainer";
import useMediaView from "hooks/useMediaView";
const DAO = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { bp500px } = useMediaView();

  return (
    <Flex
      {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)}
      bg={colorMode === "light" ? "#fafbfc" : "black.100"}
      mt={bp500px ? "42px" : "66px"}
    >
      <PageLayout></PageLayout>
      <DaoTopContainer />
      <StatisticContainer />
      <GraphContainer />
    </Flex>
  );
};

export default DAO;
