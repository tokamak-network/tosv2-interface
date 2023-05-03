import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import PageLayout from "pages/components/layout/PageLayout";
import StakeCardContainer from "pages/components/stake/StakeCardContainer";

import TopCardContainer from "./components/common/card/TopCardContainer";
import TipCard from "./components/common/tip/TipCard";
import useMediaView from "hooks/useMediaView";
import StakePageModals from "@/stakeComponents/modal";

const Stake = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { bp500px } = useMediaView();
  return (
    <Flex
      {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)}
      bg={colorMode === "light" ? "#fafbfc" : "black.100"}
      mt={bp500px ? "18px" : "66px"}
    >
      <PageLayout></PageLayout>
      <TipCard
        msg={[
          "Tip: LTOS can be unstaked for TOS. # of TOS you get is based on the LTOS index, where # of TOS = # of LTOS x LTOS index.",
          "Every 8 hours LTOS index is increased and LTOS can be unstaked for more TOS.",
        ]}
      ></TipCard>
      <TopCardContainer pageKey={"Stake_screen"}></TopCardContainer>
      <StakeCardContainer></StakeCardContainer>
      <StakePageModals></StakePageModals>
    </Flex>
  );
};

export default Stake;
