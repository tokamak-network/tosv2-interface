import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function NextButton() {
  return (
    <Flex
      w={"82px"}
      h={"40px"}
      border={"solid 1px #313442"}
      borderRadius={6}
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      _hover={{ color: "#257eee", borderColor: "#257eee" }}
    >
      <Text mr={"9px"} fontSize={12}>
        Next
      </Text>
      <ArrowForwardIcon></ArrowForwardIcon>
    </Flex>
  );
}

export default NextButton;
