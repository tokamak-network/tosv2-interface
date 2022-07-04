import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Dashboard_SmallCardArrType } from "types/dashboard";
import SmallCard from "./SmallCard";

const SmallCardContainer = () => {
  const [cardList, setCardList] = useState<
    Dashboard_SmallCardArrType | undefined
  >(undefined);

  useEffect(() => {
    const dummyData: Dashboard_SmallCardArrType = [
      {
        price: "15.75",
        priceUnit: "$",
        priceChangePercent: 15,
        title: "TOS Price",
      },
      {
        price: "15.75",
        priceUnit: "ETH/TOS",
        priceChangePercent: -15,
        title: "Backing per TOS",
      },
      {
        price: "15.75",
        priceUnit: "$",
        priceChangePercent: 15,
        title: "LTOS Price",
      },
      {
        price: "15.75",
        priceUnit: "TOS",
        priceChangePercent: 15,
        title: "LTOS Index",
      },
    ];
    setCardList(dummyData);
  }, []);

  return (
    <Flex>
      {cardList?.map((cardData, index) => {
        return (
          <Box mr={"24px"} key={`${cardData.title}_${index}`}>
            <SmallCard
              price={cardData.price}
              priceChangePercent={cardData.priceChangePercent}
              title={cardData.title}
              priceUnit={cardData.priceUnit}
            ></SmallCard>
          </Box>
        );
      })}
    </Flex>
  );
};

export default SmallCardContainer;
