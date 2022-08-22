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
      title: "TOS Price",
      price: "5,000,000,000",
      priceUnit: "$",
      tooltip:''
    },
    {
      title: "Backing per TOS",
      price: "1.00",
      priceUnit: "$",
      tooltip:''
    },
    {
      title: "LTOS Index",
      price: "1.00",
      priceUnit: "$",
      tooltip:''
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
