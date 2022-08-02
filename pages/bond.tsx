import { Flex, useTheme,useColorMode } from "@chakra-ui/react";
import BondCardContainer from "components/bond/BondCardContainer";
import BondModal from "components/bond/BondModal";
import TopCardContainer from "components/bond/TopCardContrainer";
import GraphContainer from "components/dashboard/GraphContainer";
import SmallCardContainer from "components/dashboard/SmallCardContainer";
import PageLayout from "components/layout/PageLayout";
import { BondTopCardProps } from "types/bond";

const Bond = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const cardList: BondTopCardProps[] = [
    {
      title: "TOS Price",
      price: "5,000,000,000",
      priceUnit: "$",
    },
    {
      title: "Backing per TOS",
      price: "1.00",
      priceUnit: "$",
    },
  ];

  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)} bg={colorMode === 'light'? "#fafbfc" : "black.100"}>
      <PageLayout></PageLayout>
      <TopCardContainer cardList={cardList}></TopCardContainer>
      <BondCardContainer></BondCardContainer>
      <BondModal></BondModal>
    </Flex>
  );
};

export default Bond;
