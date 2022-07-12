import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useWindowDimensions } from "hooks/useWindowDimensions";

function Footer() {
  const { width } = useWindowDimensions();
  const mobile = width < 460;
  return (
    <Flex w={"100%"} mt={"auto"} pt={"24px"} flexDir="column">
      <Flex borderWidth={1} mb={"25px"} borderColor={"gray.300"}></Flex>
      <Flex
        fontSize={12}
        color={"gray.700"}
        flexDir={mobile ? "column-reverse" : "row"}
        justifyContent={"space-between"}
        pb={"25px"}
        rowGap={mobile ? "15px" : 0}
      >
        <Flex h={"17px"}>
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
        <Flex h={"17px"} justifyContent={mobile ? "center" : "flex-end"}>
          <Text cursor={"pointer"}>Terms of Use</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
