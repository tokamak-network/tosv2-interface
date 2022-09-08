import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { SetStateAction } from "react";

type PaginationProps = {
  pageNumber: string | number;
  onClick: React.Dispatch<SetStateAction<number>>;
};

function Pagination(props: PaginationProps) {
  const { pageNumber, onClick } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex
      w={"40px"}
      h={"40px"}
      color={colorMode === "dark" ? "white.200" : "#2c2c35"}
      _hover={{ color: "white.200", bgColor: "blue.100" }}
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
