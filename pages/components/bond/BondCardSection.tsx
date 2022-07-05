import { Flex, SimpleGrid } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { useEffect, useState } from "react";
import { BondCardProps } from "types/bond";
import BondCard from "./BondCard";

function BondCardSection() {
  const [cardList, setCardList] = useState<BondCardProps[]>();

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
    <SimpleGrid columns={3} gridRowGap={"24px"} columnGap={"25px"}>
      {cardList?.map((cardData, index) => (
        <BondCard
          bondCapacity={cardData.bondCapacity}
          bondingPrice={cardData.bondingPrice}
          discountRate={cardData.discountRate}
          tokenType={cardData.tokenType}
          key={cardData.bondCapacity + index}
        ></BondCard>
      ))}
    </SimpleGrid>
  );
}

export default BondCardSection;
