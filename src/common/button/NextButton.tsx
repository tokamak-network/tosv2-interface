import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function NextButton() {
  const { colorMode } = useColorMode();
  return (
    <Flex
      w={"82px"}
      h={"40px"}
      border={colorMode ===  'dark'? "solid 1px #313442": '1px solid #e8edf2'}
      borderRadius={6}
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      color={colorMode ===  'dark'? 'gray.200':'gray.700'}
      _hover={{ color: "#257eee", borderColor: "#257eee" }}
      _disabled={{ color: colorMode === 'dark'? "#2c2c35":'#c6cbd9', borderColor:  colorMode === 'dark'? "#2c2c35":'#e8edf2' }}
    >
      <Text mr={"9px"} fontSize={12}>
        Next
      </Text>
      <ArrowForwardIcon></ArrowForwardIcon>
    </Flex>
  );
}

export default NextButton;
