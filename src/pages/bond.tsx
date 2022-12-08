import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import BondCardContainer from "pages/components/bond/BondCardContainer";
import BondModal from "pages/components/bond/BondModal";
import GraphContainer from "pages/components/dashboard/GraphContainer";
import SmallCardContainer from "pages/components/dashboard/SmallCardContainer";
import PageLayout from "pages/components/layout/PageLayout";
import { BondTopCardProps } from "types/bond";
import BondTip from "pages/components/bond/BondTip";
import TopCardContainer from "./components/common/card/TopCardContainer";
import NewBondModal from "./components/bond/NewBondModal";

const Bond = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Flex
      {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)}
      bg={colorMode === "light" ? "#fafbfc" : "black.100"}
    >
      <PageLayout></PageLayout>
      <BondTip />
      <TopCardContainer pageKey={"Bond_screen"}></TopCardContainer>
      <BondCardContainer></BondCardContainer>
      <BondModal></BondModal>
      <NewBondModal></NewBondModal>
    </Flex>
  );
};

export default Bond;
