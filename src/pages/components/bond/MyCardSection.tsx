import { Flex, SimpleGrid } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import useMyHistory from "hooks/bond/useMyHistory";
import { useEffect, useState } from "react";
import { BondCardProps, MyCardProps } from "types/bond";
import BondCard from "./BondCard";
import MyCard from "./MyCard";

function MyCardSection() {
  const { cardList } = useMyHistory();
console.log(cardList);

  return (
    <SimpleGrid columns={3} gridRowGap={"24px"} columnGap={"25px"}>
      {cardList?.map((cardData, index) => (
        <MyCard
          info={cardData.info}
          tokenType={cardData.tokenType}
          key={cardData.tokenType + index}
          isOver={cardData.isOver}
          lockUpDate={cardData.lockUpDate}
        ></MyCard>
      ))}
    </SimpleGrid>
  );
}

export default MyCardSection;
