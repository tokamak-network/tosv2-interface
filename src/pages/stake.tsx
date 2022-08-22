import { Flex, useTheme,useColorMode } from "@chakra-ui/react";
import TopCardContainer from "pages/components/bond/TopCardContrainer";
import PageLayout from "pages/components/layout/PageLayout";
import StakeCardContainer from "pages/components/stake/StakeCardContainer";
import StakeModal from "pages/components/stake/StakeModal";
import UnstakeModal from "pages/components/stake/UnstakeModal";
import { StakeTopCardProps } from "types/stake";
import UpdateModal from "pages/components/bond/UpdateModal";

const Stake = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();  
  const cardList: StakeTopCardProps[] = [
    {
      title: "Total Value Staked",
      price: "5,000,000,000",
      priceUnit: "$",
      tooltip:'The total dollar value of all the LTOS.'
    },
    {
      title: "TOS APY",
      price: "1.00%",
      priceUnit: undefined,
      tooltip:'The annualized percentage yield in TOS for staking. This value is used to increase LTOS index at every rebase period.'
    },
    {
      title: "LTOS Index",
      price: "1.00",
      priceUnit: "$",
      tooltip:'Number of TOS you get when you unstake 1 LTOS. LTOS index increases at every rebase period.'
    },
  ];

  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)} bg={colorMode === 'light'? "#fafbfc" : "black.100"}>
      <PageLayout></PageLayout>
      <TopCardContainer cardList={cardList}></TopCardContainer>
      <StakeCardContainer></StakeCardContainer>
      <StakeModal></StakeModal>
      <UnstakeModal></UnstakeModal>
      <UpdateModal></UpdateModal>
    </Flex>
  );
};

export default Stake;
