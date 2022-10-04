import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import useStakeList from "hooks/stake/useStakeList";
import usePagination from "hooks/usePagination";
import { useEffect, useState } from "react";
import { StakeCardProps } from "types/stake";
import StakeCard from "./StakeCard";
import StakeScreenBottom from "./StakeScreenBottom";
import { useRecoilValue } from "recoil";
import { stake_filter_radio, stake_filter_sort } from "atom/stake/filter";

function StakeCardSection() {
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");
  const { stakeCards } = useStakeList();

  console.log("**stake card**");
  console.log(stakeCards);

  const { pageSize, currentPage, currentPageList, setCurrentPage } =
    usePagination(stakeCards);
  const filterValue = useRecoilValue(stake_filter_radio);
  const sortValue = useRecoilValue(stake_filter_sort);

  return (
    <Flex flexDir={"column"}>
      <Flex
        // columns={3} gridRowGap={"24px"} columnGap={"25px"}
        columnGap={"2%"}
        rowGap={"20px"}
        justifyContent={isSmallerThan750 ? "center" : ""}
        flexWrap={"wrap"}
      >
        {currentPageList.length > 0 ? (
          currentPageList?.map((cardData: StakeCardProps, index: number) => {
            if (cardData) {
              return (
                <StakeCard
                  cardData={cardData}
                  key={cardData.principal + index}
                ></StakeCard>
              );
            }
          })
        ) : (
          <Flex>go</Flex>
        )}
      </Flex>
      <StakeScreenBottom
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></StakeScreenBottom>
    </Flex>
  );
}

export default StakeCardSection;
