import { Flex, useTheme,useColorMode } from "@chakra-ui/react";
import GraphContainer from "components/dashboard/GraphContainer";
import SmallCardContainer from "components/dashboard/SmallCardContainer";
import PageLayout from "components/layout/PageLayout";

const DashBoard = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)} bg={colorMode === 'light'? "#fafbfc" : "black.100"}>
      <PageLayout></PageLayout>
      <SmallCardContainer></SmallCardContainer>
      <GraphContainer></GraphContainer>
    </Flex>
  );
};

export default DashBoard;
