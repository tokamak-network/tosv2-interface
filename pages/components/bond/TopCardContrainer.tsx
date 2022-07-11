import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import TipMessage from "./TipMessage";
import TopCard from "./TopCard";

const cardList = [
  {
    title: "TOS Price",
    price: "5,000,000,000",
    priceUnit: "$",
  },
  {
    title: "Backing per TOS",
    price: "1.00",
    priceUnit: "$",
  },
];

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

function TopCardContainer() {
  const [smallerThan510] = useMediaQuery("(max-width: 510px)");

  return (
    <Flex flexDir={"column"}>
      <TipMessage></TipMessage>
      {smallerThan510 ? (
        <MobileTopCard cardList={cardList}></MobileTopCard>
      ) : (
        <Flex justifyContent={"space-between"}>
          {cardList.map((cardData, index) => {
            const { title, price, priceUnit } = cardData;
            return (
              <TopCard
                title={title}
                price={price}
                priceUnit={priceUnit}
                key={title}
                style={index === 0 ? { marginRight: "24px" } : {}}
              ></TopCard>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}

export default TopCardContainer;
