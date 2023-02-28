import { Box, Flex, Text, useMediaQuery,useColorMode, useTheme } from "@chakra-ui/react";
import useBondTopCards from "hooks/bond/useBondTopCards";
import { TopCardList } from "types";
import { StakeTopCardProps } from "types/stake";
import TopCard from "./TopCard";

function MobileTopCard(props: { cardList: StakeTopCardProps[] }) {
  const { cardList } = props;
  const { colorMode } = useColorMode();
  const theme = useTheme()

  return (
    <Flex
      py={"18px"}
      pl={"15px"}
      bgColor={colorMode==='dark'? "gray.600":'white.100'}
      flexDir={"column"}
      borderWidth={1}
      borderColor={colorMode==='dark'?"gray.600":'#e8edf2'}
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
               color={colorMode==='dark'? 'gray.100':"gray.1000"}
              fontSize={12}
              fontWeight={600}
              h={17}
              mb={"7px"}
            >
              {title}
            </Text>
            <Text fontSize={22} color={colorMode==='dark'?"white.200":'gray.800'}  fontWeight={"bold"}>
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
