import {
  Box,
  Flex,
  Text,
  useMediaQuery,
  Tooltip,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { TopCardList } from "types";
import TopCard from "./TopCard";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

function MobileTopCard(props: {
  cardList: {
    title: string;
    price: string;
    priceUnit: string;
    tooltip: string;
  }[];
}) {
  const { cardList } = props;
  const { colorMode } = useColorMode();
  return (
    <Flex
      py={"18px"}
      pl={"15px"}
      bgColor={colorMode === 'dark'? "gray.600": 'white.100'}
      flexDir={"column"}
      borderWidth={1}
      borderColor={colorMode === 'dark'?"gray.600":'gray.900'}
      borderRadius={14}
      w={"100%"}
    >
      {cardList.map((cardData, index) => {
        const { title, price, priceUnit,tooltip } = cardData;

        return (
          <Flex
            flexDir={"column"}
            key={title + index}
            mb={index !== cardList.length - 1 ? "24px" : 0}
          >
            <Flex>
            <Text
              color={colorMode === 'dark'?"gray.100":'gray.1000'}
              fontSize={12}
              fontWeight={600}
              h={17}
              mb={"7px"}
              mr={'6px'}
            >
             
              {title}
            </Text>
            <Tooltip
                label={tooltip}
                bg={colorMode === "dark" ? "#1f2128" : "#fff"}
                borderRadius={"3px"}
                color={colorMode === "light" ? "#07070c" : "#8b8b93"}
                fontSize="12px"
                border={
                  colorMode === "light"
                    ? "solid 1px #e8edf2"
                    : "solid 1px #313442"
                }
              >
                <IconButton
                  aria-label="Search database"
                  h={"16px"}
                  minW={"16px"}
                  icon={<QuestionOutlineIcon />}
                  bg={"transparent"}
                  p={0}
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                />

              </Tooltip>
              </Flex>
            <Text fontSize={22} color={colorMode === 'dark'? "white.200":'gray.800'} fontWeight={"bold"}>
              {priceUnit} {price}
            </Text>
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
          {cardList?.map((cardData, index) => {
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
