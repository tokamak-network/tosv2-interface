import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import BondCard from "./BondCard";

function BondCardSection() {
  const [cardList, setCardList] = useState<BondCardProps[]>();
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    const dummyData: BondCardProps[] = [
      {
        bondCapacity: "10 ETH / 100 TOS",
        bondingPrice: "$ 100",
        discountRate: "0.5%",
        tokenType: "ETH",
      },
      {
        bondCapacity: "10 ETH / 100 TOS",
        bondingPrice: "$ 100",
        discountRate: "0.5%",
        tokenType: "WTON",
      },
      {
        bondCapacity: "10 ETH / 100 TOS",
        bondingPrice: "$ 100",
        discountRate: "0.5%",
        tokenType: "ETH",
      },
      {
        bondCapacity: "10 ETH / 100 TOS",
        bondingPrice: "$ 100",
        discountRate: "0.5%",
        tokenType: "ETH",
      },
    ];
    setCardList(dummyData);
  }, []);

  return (
    <Flex
      // columns={3} gridRowGap={"24px"} columnGap={"25px"}
      columnGap={"2%"}
      rowGap={"20px"}
      justifyContent={isSmallerThan750 ? "center" : ""}
      flexWrap={"wrap"}
    >
      {cardList?.map((cardData, index) => (
        <BondCard
          bondCapacity={cardData.bondCapacity}
          bondingPrice={cardData.bondingPrice}
          discountRate={cardData.discountRate}
          tokenType={cardData.tokenType}
          key={cardData.bondCapacity + index}
        ></BondCard>
      ))}
    </Flex>
  );
}

export default BondCardSection;
