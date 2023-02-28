import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { SetStateAction } from "react";

type PaginationProps = {
  pageNumber: string | number;
  currentPage: number;
  onClick: React.Dispatch<SetStateAction<number>>;
};

function Pagination(props: PaginationProps) {
  const { pageNumber, currentPage, onClick } = props;
  const { colorMode } = useColorMode();
  const isSelected = currentPage === Number(pageNumber);

  return (
    <Flex
      w={"40px"}
      h={"40px"}
      color={isSelected?"white.200" :colorMode === "dark" ? "white.200" : "#2c2c35"}
      bg={isSelected ? "blue.100" : ""}
      _hover={{ color: isSelected ? "white.200" : "blue.100" }}
      textAlign="center"
      lineHeight={"40px"}
      cursor={"pointer"}
      alignItems="center"
      borderRadius={"6px"}
      onClick={() => onClick(pageNumber as number)}
    >
      <Text w={"100%"}>{pageNumber}</Text>
    </Flex>
  );
}

export default Pagination;
