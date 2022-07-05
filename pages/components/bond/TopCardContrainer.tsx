import { Flex } from "@chakra-ui/react";
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

function TopCardContainer() {
  return (
    <Flex flexDir={"column"}>
      <TipMessage></TipMessage>
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
    </Flex>
  );
}

export default TopCardContainer;
