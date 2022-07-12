import { Box, Flex, Text } from "@chakra-ui/react";
import usePathName from "hooks/usePathName";
import { useRouter } from "next/router";
import HOME_ICON from "assets/icons/home.svg";
import CALENDAR_ICON from "assets/icons/calendar.svg";
import Image from "next/image";
import { useMemo } from "react";
import { useWindowDimensions } from "hooks/useWindowDimensions";

const PageTitle = () => {
  const { pathName } = usePathName();
  const [width] = useWindowDimensions();
  const isMobile = width < 510;

  const PathComponent = useMemo(() => {
    switch (pathName) {
      case "Bond":
        return (
          <Flex
            flexDir={isMobile ? "column" : "row"}
            fontSize={12}
            w={"100%"}
            justifyContent={"space-between"}
            h={isMobile ? "66px" : ""}
          >
            <Flex>
              <Image src={HOME_ICON} alt={"HOME_ICON"}></Image>
              <Text ml={"3px"}>Home</Text>
              <Text mx={"7px"}>{">"}</Text>
              <Text>Bond</Text>
              <Text mx={"7px"}>{">"}</Text>
              <Text color={"blue.200"}>Bondlist</Text>
            </Flex>
            <Flex>
              <Image src={CALENDAR_ICON} alt={"CALENDAR_ICON"}></Image>
              <Text ml={"7px"}>Updated on 2022.06.01 20:00 (UTC+9)</Text>
            </Flex>
          </Flex>
        );
      default:
        return (
          <Flex
            flexDir={isMobile ? "column" : "row"}
            fontSize={12}
            w={"100%"}
            justifyContent={"space-between"}
            h={isMobile ? "66px" : ""}
          >
            <Flex>
              <Image src={HOME_ICON} alt={"HOME_ICON"}></Image>
              <Text ml={"3px"}>Home</Text>
              <Text mx={"7px"}>{">"}</Text>
              <Text color={"blue.200"}>{pathName}</Text>
            </Flex>
            <Flex>
              <Image src={CALENDAR_ICON} alt={"CALENDAR_ICON"}></Image>
              <Text ml={"7px"}>Updated on 2022.06.01 20:00 (UTC+9)</Text>
            </Flex>
          </Flex>
        );
    }
  }, [pathName, isMobile]);

  return (
    <Flex flexDir={"column"} mb={isMobile ? "12px" : "36px"} w={"100%"}>
      <Text
        fontSize={28}
        h={"39px"}
        fontWeight={"bold"}
        color={"white.100"}
        mb={"12px"}
      >
        {pathName}
      </Text>
      {PathComponent}
    </Flex>
  );
};

export default PageTitle;
