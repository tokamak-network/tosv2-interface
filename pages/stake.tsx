import { Flex, useTheme } from "@chakra-ui/react";
import BondCardContainer from "components/bond/BondCardContainer";
import BondModal from "components/bond/BondModal";
import TopCardContainer from "components/bond/TopCardContrainer";
import GraphContainer from "components/dashboard/GraphContainer";
import SmallCardContainer from "components/dashboard/SmallCardContainer";
import PageLayout from "components/layout/PageLayout";
import StakeCardContainer from "components/stake/StakeCardContainer";
import { StakeTopCardProps } from "types/stake";

const Stake = () => {
  const theme = useTheme();

  const cardList: StakeTopCardProps[] = [
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
    {
      title: "Backing per TOS",
      price: "1.00",
      priceUnit: "$",
    },
  ];

  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE}>
      <PageLayout></PageLayout>
      <TopCardContainer cardList={cardList}></TopCardContainer>
      <StakeCardContainer></StakeCardContainer>
      <BondModal></BondModal>
    </Flex>
  );
};

export default Stake;
