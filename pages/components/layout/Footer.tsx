import { Flex, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex
      w={"100%"}
      h={"68px"}
      mt={"auto"}
      pt={"24px"}
      ml={"24px"}
      flexDir="column"
    >
      <Flex borderWidth={1} borderColor={"gray.300"}></Flex>
      <Flex mt="25px" pb={"25px"} fontSize={12}>
        <Text>© 2022 Onther PTE.LTD</Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
