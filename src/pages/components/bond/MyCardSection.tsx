import { Flex, SimpleGrid } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { useEffect, useState } from "react";
import { BondCardProps, MyCardProps } from "types/bond";
import BondCard from "./BondCard";
import MyCard from "./MyCard";

function MyCardSection() {
  const [cardList, setCardList] = useState<MyCardProps[]>();

  useEffect(() => {
    const dummyData: MyCardProps[] = [
      {
        info: [
          {
            title: "Amount",
            content: "20",
          },
          {
            title: "Discount Rate",
            content: "10.5%",
          },
          {
            title: "Lock-Up Period",
            content: "5 Days",
          },
        ],
        tokenType: "ETH",
      },
    ];
    setCardList(dummyData);
  }, []);

  return (
    <SimpleGrid columns={3} gridRowGap={"24px"} columnGap={"25px"}>
      {cardList?.map((cardData, index) => (
        <MyCard
          info={cardData.info}
          tokenType={cardData.tokenType}
          key={cardData.tokenType + index}
        ></MyCard>
      ))}
    </SimpleGrid>
  );
}

export default MyCardSection;
