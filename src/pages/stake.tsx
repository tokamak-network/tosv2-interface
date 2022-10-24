import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import PageLayout from "pages/components/layout/PageLayout";
import StakeCardContainer from "pages/components/stake/StakeCardContainer";
import StakeModal from "pages/components/stake/StakeModal";
import UnstakeModal from "pages/components/stake/UnstakeModal";
import UpdateModal from "pages/components/stake/UpdateModal";
import UpdateModalAfterEndTime from "pages/components/stake/UpdateModalAfterEndTime";
import TopCardContainer from "./components/common/card/TopCardContainer";
import TipCard from "./components/common/tip/TipCard";
import MultiUnstakeModal from "./components/stake/MultiUnstakeModal";

const Stake = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Flex
      {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)}
      bg={colorMode === "light" ? "#fafbfc" : "black.100"}
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
      <StakeModal></StakeModal>
      <UnstakeModal></UnstakeModal>
      <UpdateModal></UpdateModal>
      <UpdateModalAfterEndTime></UpdateModalAfterEndTime>
      <MultiUnstakeModal></MultiUnstakeModal>
    </Flex>
  );
};

export default Stake;
