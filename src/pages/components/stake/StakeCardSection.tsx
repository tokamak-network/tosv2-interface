import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import useStakeList from "hooks/stake/useStakeList";
import usePagination from "hooks/usePagination";
import { useEffect, useState } from "react";
import { StakeCardProps } from "types/stake";
import StakeCard from "./StakeCard";
import StakeScreenBottom from "./StakeScreenBottom";

function StakeCardSection() {
  const [cardList, setCardList] = useState<StakeCardProps[]>([]);
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");
  const { rowNum, currentPageList, setCurrentPage } = usePagination(cardList);
  const { stakeCards } = useStakeList();

  console.log(stakeCards);

  return (
    <Flex flexDir={"column"}>
      <Flex
        // columns={3} gridRowGap={"24px"} columnGap={"25px"}
        columnGap={"2%"}
        rowGap={"20px"}
        justifyContent={isSmallerThan750 ? "center" : ""}
        flexWrap={"wrap"}
      >
        {stakeCards?.map((cardData: StakeCardProps, index: number) => {
          if (cardData) {
            return (
              <StakeCard
                cardData={cardData}
                key={cardData.principal + index}
              ></StakeCard>
            );
          }
        })}
      </Flex>
      <StakeScreenBottom
        rowNum={rowNum}
        setCurrentPage={setCurrentPage}
      ></StakeScreenBottom>
    </Flex>
  );
}

export default StakeCardSection;
