import { Flex } from "@chakra-ui/react";
import NextButton from "common/button/NextButton";
import SubmitButton from "common/button/SubmitButton";
import Pagination from "common/table/Pagination";
import Image from "next/image";
import React, { SetStateAction } from "react";
import PlusIcon from "assets/icons/Plus.svg";
import useModal from "hooks/useModal";

function StakeScreenBottom(props: {
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  rowNum: number;
}) {
  const { setCurrentPage, rowNum } = props;
  const newArr = new Array(rowNum);
  const { openModal } = useModal("stake_stake_modal");

  return (
    <Flex h={"40px"} mt={"27px"} mb={"3px"} justifyContent={"space-between"}>
      <Flex>
        <Flex mr={"27px"}>
          <Pagination
            onClick={setCurrentPage}
            pageNumber={1}
            key={"key"}
          ></Pagination>
          <Pagination
            onClick={setCurrentPage}
            pageNumber={2}
            key={"key2"}
          ></Pagination>
        </Flex>
        <Flex>
          <NextButton></NextButton>
        </Flex>
      </Flex>
      <Flex>
        <Image src={PlusIcon} alt={"PlusIcon"}></Image>
        <SubmitButton
          name="Stake"
          style={{ fontSize: 14 }}
          onClick={openModal}
        ></SubmitButton>
      </Flex>
    </Flex>
  );
}

export default StakeScreenBottom;
