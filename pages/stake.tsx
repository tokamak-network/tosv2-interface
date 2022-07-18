import { Flex, useTheme } from "@chakra-ui/react";
import TopCardContainer from "components/bond/TopCardContrainer";
import PageLayout from "components/layout/PageLayout";
import StakeCardContainer from "components/stake/StakeCardContainer";
import StakeModal from "components/stake/StakeModal";
import UnstakeModal from "components/stake/UnstakeModal";
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
      <StakeModal></StakeModal>
      <UnstakeModal></UnstakeModal>
    </Flex>
  );
};

export default Stake;
