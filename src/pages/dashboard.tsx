import { Flex, useTheme } from "@chakra-ui/react";
import GraphContainer from "pages/components/dashboard/GraphContainer";
import SmallCardContainer from "pages/components/dashboard/SmallCardContainer";
import PageLayout from "pages/components/layout/PageLayout";

const DashBoard = () => {
  const theme = useTheme();

  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE}>
      <PageLayout></PageLayout>
      <SmallCardContainer></SmallCardContainer>
      <GraphContainer></GraphContainer>
    </Flex>
  );
};

export default DashBoard;
