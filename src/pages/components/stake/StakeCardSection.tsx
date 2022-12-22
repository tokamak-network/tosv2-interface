import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import { stake_filter_radio } from "atom/stake/filter";
import TabButton from "common/button/TabButton";
import useStakeList from "hooks/stake/useStakeList";
import usePagination from "hooks/usePagination";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { StakeCardProps } from "types/stake";
import MsgComponent from "./MsgComponent";
import StakeCard from "./StakeCard";
import StakeScreenBottom from "./StakeScreenBottom";

function StakeCardSection() {
  const { stakeCards } = useStakeList();

  const { pageSize, currentPage, currentPageList, setCurrentPage } =
    usePagination(stakeCards);
  const radioValue = useRecoilValue(stake_filter_radio);

  return (
    <Flex flexDir={"column"}>
      <Flex
        // columns={3} gridRowGap={"24px"} columnGap={"25px"}
        columnGap={"2%"}
        rowGap={["", "25px", "25px"]}
        justifyContent={["center", "flex-start", "flex-start"]}
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
          <MsgComponent
            msg={
              radioValue === "Bond" ? "No Bond History" : "No Staking History"
            }
          ></MsgComponent>
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
