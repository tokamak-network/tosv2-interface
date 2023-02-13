import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import BondCardContainer from "pages/components/bond/BondCardContainer";
import BondModal from "pages/components/bond/BondModal";
import GraphContainer from "pages/components/dashboard/GraphContainer";
import SmallCardContainer from "pages/components/dashboard/SmallCardContainer";
import PageLayout from "pages/components/layout/PageLayout";
import { BondTopCardProps } from "types/bond";
import BondTip from "pages/components/bond/BondTip";
import TopCardContainer from "./components/common/card/TopCardContainer";
import useMediaView from "hooks/useMediaView";
import BondPageModals from "@/bondComponents/modal/Index";

const Bond = () => {
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
      <BondTip />
      <TopCardContainer pageKey={"Bond_screen"}></TopCardContainer>
      <BondCardContainer></BondCardContainer>
      <BondPageModals></BondPageModals>
    </Flex>
  );
};

export default Bond;
