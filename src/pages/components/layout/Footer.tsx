import { Box, Flex, Text, useMediaQuery, useColorMode } from "@chakra-ui/react";
import useModal from "hooks/useModal";
import { useWindowDimensions } from "hooks/useWindowDimensions";

function Footer() {
  const [width] = useWindowDimensions();
  const mobile = width < 460;
  const { colorMode } = useColorMode();
  const { openModal } = useModal("termsOfUse");

  return (
    <Flex w={"100%"} mt={"auto"} pt={"24px"} flexDir="column">
      <Flex
        borderWidth={0.5}
        mb={"25px"}
        borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
      ></Flex>
      <Flex
        fontSize={12}
        color={"gray.700"}
        flexDir={mobile ? "column-reverse" : "row"}
        justifyContent={"space-between"}
        pb={"25px"}
        rowGap={mobile ? "15px" : 0}
      >
        <Flex h={"17px"} justifyContent={mobile ? "space-between" : ""}>
          <Flex>
            <Text>© 2022 </Text>
            <Text mx={1} color={"blue.200"}>
              {" "}
              Onther
            </Text>
            <Text>PTE.LTD</Text>
          </Flex>
          <Flex>
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

        <Flex
          h={"17px"}
          justifyContent={mobile ? "center" : "flex-end"}
          onClick={() => openModal()}
        >
          <Text
            cursor={"pointer"}
            color={colorMode === "light" ? "gray.200" : "gray.1000"}
          >
            Terms of Use
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
