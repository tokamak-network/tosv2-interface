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
        priceChangePercent: 15,
        title: "TOS Price",
      },
      {
        price: "15.75",
        priceChangePercent: 15,
        title: "TOS Price",
      },
      {
        price: "15.75",
        priceChangePercent: 15,
        title: "TOS Price",
      },
      {
        price: "15.75",
        priceChangePercent: 15,
        title: "TOS Price",
      },
    ];
    setCardList(dummyData);
  }, []);

  return (
    <Flex>
      {cardList?.map((cardData) => {
        return (
          <Box mr={"24px"} key={cardData.title}>
            <SmallCard
              price={cardData.price}
              priceChangePercent={cardData.priceChangePercent}
              title={cardData.title}
            ></SmallCard>
          </Box>
        );
      })}
    </Flex>
  );
};

export default SmallCardContainer;
