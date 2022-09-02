import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import useBondTopCards from "hooks/bond/useBondTopCards";
import { TopCardList } from "types";
import { StakeTopCardProps } from "types/stake";
import TopCard from "./TopCard";

function MobileTopCard(props: { cardList: StakeTopCardProps[] }) {
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
        const { title, price, priceUnit, tooltip } = cardData;

        return (
          <Flex
            flexDir={"column"}
            key={title + index}
            mb={index !== cardList.length - 1 ? "24px" : 0}
          >
            <Text
              color={"gray.100"}
              fontSize={12}
              fontWeight={600}
              h={17}
              mb={"7px"}
            >
              {title}
            </Text>
            <Text fontSize={22} color={"white.200"} fontWeight={"bold"}>
              {priceUnit} {price}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

function TopCardContainer() {
  const [smallerThan510] = useMediaQuery("(max-width: 510px)");
  const { bondTopsCards } = useBondTopCards();

  return (
    <Flex flexDir={"column"}>
      {smallerThan510 ? (
        <MobileTopCard cardList={bondTopsCards}></MobileTopCard>
      ) : (
        <Flex justifyContent={"space-between"} columnGap={"24px"}>
          {bondTopsCards?.map((cardData, index) => {
            const { title, price, priceUnit,tooltip } = cardData;
            return (
              <TopCard
                title={title}
                price={price}
                priceUnit={priceUnit}
                key={title}
                tooltip={tooltip}
              ></TopCard>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}

export default TopCardContainer;
