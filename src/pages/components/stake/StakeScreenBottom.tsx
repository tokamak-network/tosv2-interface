import { Flex, useColorMode } from "@chakra-ui/react";
import NextButton from "common/button/NextButton";
import SubmitButton from "common/button/SubmitButton";
import Pagination from "common/table/Pagination";
import Image from "next/image";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import useModal from "hooks/useModal";
import useStakeList from "hooks/stake/useStakeList";

function StakeScreenBottom(props: {
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  currentPage: number;
  pageSize: number;
}) {
  const { setCurrentPage, currentPage, pageSize } = props;
  const newArr = new Array(pageSize);
  const { stakeCards } = useStakeList();

  const { openModal } = useModal("stake_stake_modal");
  const { colorMode } = useColorMode();
  const pageButtonList = useMemo(() => {
    if (pageSize) {
      let arr = [];
      for (let i = 0; i < pageSize; i++) {
        arr.push(i);
      }
      return arr;
    }
  }, [pageSize]);


  return (
    <Flex h={"40px"} mt={"27px"} mb={"3px"}>
      <Flex>
        <Flex mr={"27px"}>
          {stakeCards &&
            stakeCards.length > 0 &&
            pageButtonList?.map((page, index) => {
              return (
                <Pagination
                  currentPage={currentPage}
                  onClick={setCurrentPage}
                  pageNumber={index + 1}
                  key={`key_${index}`}
                ></Pagination>
              );
            })}
        </Flex>
        <Flex>
          <NextButton
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></NextButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default StakeScreenBottom;
