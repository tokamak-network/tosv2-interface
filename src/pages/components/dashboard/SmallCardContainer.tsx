import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import useCallContract from "hooks/useCallContract";
import useContract from "hooks/useContract";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useEffect, useState } from "react";

import CONTRACT_ADDRESS from "services/addresses/contract";
import TreasuryAbi from "services/abis/Treasury.json";

import { Dashboard_SmallCardArrType } from "types/dashboard";
import SmallCard from "./SmallCard";
import useCardData from "hooks/dashboard/useCardData";

const SmallCardContainer = () => {
  const [cardList, setCardList] = useState<
    Dashboard_SmallCardArrType | undefined
  >(undefined);
  const [width] = useWindowDimensions();
  const { Treasury_CONTRACT } = useCallContract();

  const { tosPrice } = useCardData();

  console.log(tosPrice);

  useEffect(() => {
    const dummyData: Dashboard_SmallCardArrType = [
      {
        price: tosPrice,
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
  }, [Treasury_CONTRACT]);

  if (width < 490) {
    return (
      <Flex
        flexDir={"column"}
        borderWidth={1}
        borderColor={"gray.300"}
        borderRadius={14}
      >
        {cardList?.map(
          (cardData: Dashboard_SmallCardArrType, index: number) => {
            return (
              <Box key={`${cardData.title}_${index}`} w={"100%"} minW={"210px"}>
                <SmallCard
                  price={cardData.price}
                  priceChangePercent={cardData.priceChangePercent}
                  title={cardData.title}
                  priceUnit={cardData.priceUnit}
                  style={
                    index === 0
                      ? { borderTopRadius: 14 }
                      : index === cardList.length - 1
                      ? { borderBottomRadius: 14 }
                      : {}
                  }
                ></SmallCard>
              </Box>
            );
          }
        )}
      </Flex>
    );
  }

  return (
    <SimpleGrid
      columnGap={"24px"}
      rowGap={"24px"}
      justifyContent="center"
      columns={width < 960 ? 2 : 4}
    >
      {cardList?.map((cardData: Dashboard_SmallCardArrType, index: number) => {
        return (
          <Box key={`${cardData.title}_${index}`} w={"100%"} minW={"210px"}>
            <SmallCard
              price={cardData.price}
              priceChangePercent={cardData.priceChangePercent}
              title={cardData.title}
              priceUnit={cardData.priceUnit}
            ></SmallCard>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default SmallCardContainer;
