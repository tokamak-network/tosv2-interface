import { Box, Flex, Text } from "@chakra-ui/react";
import usePathName from "hooks/usePathName";
import { useRouter } from "next/router";
import HOME_ICON from "assets/icons/home.svg";
import Image from "next/image";

const PageTitle = () => {
  const { pathName } = usePathName();

  return (
    <Flex flexDir={"column"} mb={"36px"}>
      <Text
        fontSize={28}
        h={"39px"}
        fontWeight={"bold"}
        color={"white.100"}
        mb={"12px"}
      >
        {pathName}
      </Text>
      <Flex fontSize={12}>
        <Image src={HOME_ICON} alt={"HOME_ICON"}></Image>
        <Text ml={"3px"}>Home</Text>
        <Text mx={"7px"}>{">"}</Text>
        <Text color={"blue.200"}>{pathName}</Text>
      </Flex>
    </Flex>
  );
};

export default PageTitle;
