import { Flex, useColorMode } from "@chakra-ui/react";
import NextButton from "common/button/NextButton";
import SubmitButton from "common/button/SubmitButton";
import Pagination from "common/table/Pagination";
import Image from "next/image";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import useModal from "hooks/useModal";

function StakeScreenBottom(props: {
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  pageSize: number;
}) {
  const { setCurrentPage, pageSize } = props;
  const newArr = new Array(pageSize);
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
          {pageButtonList?.map((page, index) => {
            return (
              <Pagination
                onClick={setCurrentPage}
                pageNumber={index + 1}
                key={`key_${index}`}
              ></Pagination>
            );
          })}
        </Flex>
        <Flex>
          <NextButton></NextButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default StakeScreenBottom;
