import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import usePagination from "hooks/usePagination";
import { useEffect, useState } from "react";
import { StakeCardProps } from "types/stake";
import StakeCard from "./StakeCard";
import StakeScreenBottom from "./StakeScreenBottom";

function StakeCardSection() {
  const [cardList, setCardList] = useState<StakeCardProps[]>([]);
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");
  const { rowNum, currentPageList, setCurrentPage } = usePagination(cardList);

  useEffect(() => {
    const dummyData: StakeCardProps[] = [
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: true,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: false,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: true,
      },
      {
        amount: "50",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: false,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: true,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: false,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: true,
      },
      {
        amount: "50",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: false,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: true,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: false,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: true,
      },
      {
        amount: "50",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: false,
      },
      {
        amount: "20",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: true,
      },
      {
        amount: "50",
        discountRate: "0.5%",
        lockupPeriod: "5 Days",
        tokenType: "ETH",
        lockupPeriodDate: "2022. 01. 01 12:58 ~ 12. 24 12:59",
        isDisabled: false,
      },
    ];
    setCardList(dummyData);
  }, []);

  console.log(cardList);

  return (
    <Flex flexDir={"column"}>
      <Flex
        // columns={3} gridRowGap={"24px"} columnGap={"25px"}
        columnGap={"2%"}
        rowGap={"20px"}
        justifyContent={isSmallerThan750 ? "center" : ""}
        flexWrap={"wrap"}
      >
        {currentPageList?.map((cardData, index) => (
          <StakeCard
            amount={cardData.amount}
            discountRate={cardData.discountRate}
            lockupPeriod={cardData.lockupPeriod}
            lockupPeriodDate={cardData.lockupPeriodDate}
            tokenType={cardData.tokenType}
            isDisabled={cardData.isDisabled}
            key={cardData.amount + index}
          ></StakeCard>
        ))}
      </Flex>
      <StakeScreenBottom
        rowNum={rowNum}
        setCurrentPage={setCurrentPage}
      ></StakeScreenBottom>
    </Flex>
  );
}

export default StakeCardSection;
