import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import { filterState } from "atom/dashboard";
import GraphContainer from "pages/components/dashboard/GraphContainer";
import SmallCardContainer from "pages/components/dashboard/SmallCardContainer";
import PageLayout from "pages/components/layout/PageLayout";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const DashBoard = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [selectedFilter, setSelectedFilter] = useRecoilState(filterState);

  useEffect(() => {
    setSelectedFilter("1 Week");
  }, []);

  return (
    <Flex
      {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)}
      bg={colorMode === "light" ? "#fafbfc" : "black.100"}
    >
      <PageLayout></PageLayout>
      <SmallCardContainer></SmallCardContainer>
      <GraphContainer></GraphContainer>
    </Flex>
  );
};

export default DashBoard;
