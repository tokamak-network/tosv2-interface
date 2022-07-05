import { Flex, useTheme } from "@chakra-ui/react";
import GraphContainer from "components/dashboard/GraphContainer";
import SmallCardContainer from "components/dashboard/SmallCardContainer";
import PageLayout from "components/layout/PageLayout";

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
