import { Flex, Text } from "@chakra-ui/react";
import { SetStateAction } from "react";

type PaginationProps = {
  pageNumber: string | number;
  onClick: React.Dispatch<SetStateAction<number>>;
};

function Pagination(props: PaginationProps) {
  const { pageNumber, onClick } = props;
  return (
    <Flex
      w={"40px"}
      h={"40px"}
      color={"white.200"}
      _hover={{ bgColor: "blue.100" }}
      textAlign="center"
      lineHeight={"40px"}
      cursor={"pointer"}
      alignItems="center"
      onClick={() => onClick((pageNumber as number) - 1)}
    >
      <Text w={"100%"}>{pageNumber}</Text>
    </Flex>
  );
}

export default Pagination;
