import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { useEffect, useState } from "react";
import { StakeCardProps } from "types/stake";
import StakeCard from "./StakeCard";

function StakeCardSection() {
  const [cardList, setCardList] = useState<StakeCardProps[]>();
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    const dummyData: StakeCardProps[] = [
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
      },
    ];
    setCardList(dummyData);
  }, []);

  return (
    <Flex
      // columns={3} gridRowGap={"24px"} columnGap={"25px"}
      columnGap={"2%"}
      rowGap={"20px"}
      justifyContent={isSmallerThan750 ? "center" : ""}
      flexWrap={"wrap"}
    >
      {cardList?.map((cardData, index) => (
        <StakeCard
          amount={cardData.amount}
          discountRate={cardData.discountRate}
          lockupPeriod={cardData.lockupPeriod}
          lockupPeriodDate={cardData.lockupPeriodDate}
          tokenType={cardData.tokenType}
          key={cardData.bondCapacity + index}
        ></StakeCard>
      ))}
    </Flex>
  );
}

export default StakeCardSection;
