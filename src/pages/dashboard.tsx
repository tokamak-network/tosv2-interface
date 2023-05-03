import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import { filterState } from "atom/dashboard";
import useMediaView from "hooks/useMediaView";
import GraphContainer from "pages/components/dashboard/GraphContainer";
import SmallCardContainer from "pages/components/dashboard/SmallCardContainer";
import PageLayout from "pages/components/layout/PageLayout";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const DashBoard = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [selectedFilter, setSelectedFilter] = useRecoilState(filterState);
  const { bp500px } = useMediaView();

  useEffect(() => {
    setSelectedFilter("1 Week");
  }, []);

  return (
    <Flex
      {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)}
      bg={colorMode === "light" ? "#fafbfc" : "black.100"}
      mt={bp500px ? "18px" : "66px"}
    >
      <PageLayout></PageLayout>
      <SmallCardContainer></SmallCardContainer>
      <GraphContainer></GraphContainer>
    </Flex>
  );
};

export default DashBoard;
