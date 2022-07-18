import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { TopCardList } from "types";
import TopCard from "./TopCard";

function MobileTopCard(props: {
  cardList: { title: string; price: string; priceUnit: string }[];
}) {
  const { cardList } = props;

  return (
    <Flex
      py={"18px"}
      pl={"15px"}
      bgColor={"gray.600"}
      flexDir={"column"}
      borderWidth={1}
      borderColor={"gray.600"}
      borderRadius={14}
      w={"100%"}
    >
      {cardList.map((cardData, index) => {
        const { title, price, priceUnit } = cardData;

        return (
          <Flex
            flexDir={"column"}
            key={title + index}
            mb={index !== cardList.length - 1 ? "24px" : 0}
          >
            <Box
              color={"gray.100"}
              fontSize={12}
              fontWeight={600}
              h={17}
              mb={"7px"}
            >
              {title}
            </Box>
            <Box fontSize={22} color={"white.200"} fontWeight={"bold"}>
              {priceUnit} {price}
            </Box>
          </Flex>
        );
      })}
    </Flex>
  );
}

function TopCardContainer(props: { cardList: TopCardList }) {
  const [smallerThan510] = useMediaQuery("(max-width: 510px)");
  const { cardList } = props;

  return (
    <Flex flexDir={"column"}>
      {smallerThan510 ? (
        <MobileTopCard cardList={cardList}></MobileTopCard>
      ) : (
        <Flex justifyContent={"space-between"} columnGap={"24px"}>
          {cardList.map((cardData, index) => {
            const { title, price, priceUnit } = cardData;
            return (
              <TopCard
                title={title}
                price={price}
                priceUnit={priceUnit}
                key={title}
              ></TopCard>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}

export default TopCardContainer;
