import { Flex, useTheme } from "@chakra-ui/react";
import BondCardContainer from "components/bond/BondCardContainer";
import TopCardContainer from "components/bond/TopCardContrainer";
import GraphContainer from "components/dashboard/GraphContainer";
import SmallCardContainer from "components/dashboard/SmallCardContainer";
import PageLayout from "components/layout/PageLayout";

const Bond = () => {
  const theme = useTheme();

  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE}>
      <PageLayout></PageLayout>
      <TopCardContainer></TopCardContainer>
      <BondCardContainer></BondCardContainer>
    </Flex>
  );
};

export default Bond;
