import { Box, Flex, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex w={"100%"} mt={"auto"} pt={"24px"} ml={"24px"} flexDir="column">
      <Flex borderWidth={1} mb={"25px"} borderColor={"gray.300"}></Flex>
      <Flex fontSize={12} h={"43px"} color={"gray.700"}>
        <Text>© 2022 </Text>
        <Text mx={1} color={"blue.200"}>
          {" "}
          Onther
        </Text>
        <Text>PTE.LTD</Text>
        <Flex alignItems={"center"} h={"18px"}>
          <Box
            mx={"15px"}
            w={"4px"}
            h={"4px"}
            borderRadius={25}
            bgColor={"gray.700"}
          ></Box>
        </Flex>
        <Text color={"blue.200"}>hello</Text>
        <Text>@tokamak.network</Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
