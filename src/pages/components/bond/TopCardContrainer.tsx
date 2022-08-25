import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import useStakeTopCards from "hooks/stake/useStakeTopCards";
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
        const { title, price, priceUnit } = cardData;

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
  const { stakeTopCards } = useStakeTopCards();

  return (
    <Flex flexDir={"column"}>
      {smallerThan510 ? (
        <MobileTopCard cardList={stakeTopCards}></MobileTopCard>
      ) : (
        <Flex justifyContent={"space-between"} columnGap={"24px"}>
          {stakeTopCards?.map((cardData, index) => {
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
