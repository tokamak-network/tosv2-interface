import { Box, color, Flex, Text, useColorMode } from "@chakra-ui/react";
import usePathName from "hooks/usePathName";
import { useRouter } from "next/router";
import HOME_ICON from "assets/icons/home.svg";
import HOME_LIGHT_ICON from "assets/icons/homeLight.svg";
import CALENDAR_ICON_DARK from "assets/icons/calendar.svg";
import CALENDAR_ICON_LIGHT from "assets/icons/calendarLight.svg";
import Image from "next/image";
import { useMemo } from "react";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import useStakeV2 from "hooks/contract/useStakeV2";
import { convertTimeStamp, getNowTimeStamp } from "@/components/time";
import useRebaseTime from "hooks/useRebaseTime";

const UpdatedOn = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex>
      <Image
        src={colorMode === "dark" ? CALENDAR_ICON_DARK : CALENDAR_ICON_LIGHT}
        alt={"CALENDAR_ICON"}
      ></Image>
      <Text color={colorMode === "light" ? "#7e7e8f" : "#8b8b93"} ml={"7px"}>
        Updated on {convertTimeStamp(getNowTimeStamp(), "YYYY.MM.DD HH:mm")}{" "}
        (UTC+9)
      </Text>
    </Flex>
  );
};

const PageTitle = () => {
  const { pathName } = usePathName();
  const [width] = useWindowDimensions();
  const isMobile = width < 510;
  const { colorMode } = useColorMode();

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
              <Image
                src={colorMode === "light" ? HOME_LIGHT_ICON : HOME_ICON}
                alt={"HOME_ICON"}
              ></Image>
              <Text ml={"3px"}>Home</Text>
              <Text mx={"7px"}>{">"}</Text>
              <Text>Bond</Text>
              <Text mx={"7px"}>{">"}</Text>
              <Text color={"blue.200"}>Bond List</Text>
            </Flex>
            <UpdatedOn></UpdatedOn>
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
            <UpdatedOn></UpdatedOn>
          </Flex>
        );
    }
  }, [pathName, isMobile, colorMode]);

  const rebaseTime = useRebaseTime();

  const AdditionalInfo = () => {
    switch (pathName) {
      default:
        return (
          <Flex fontSize={12} alignItems="center">
            <Text mr={"5px"} color={"#2775ff"}>
              {rebaseTime}
            </Text>
            <Text color={"#9a9aaf"}>to next rebase</Text>
          </Flex>
        );
    }
  };

  return (
    <Flex flexDir={"column"} mb={isMobile ? "12px" : "36px"} w={"100%"}>
      <Flex justifyContent={"space-between"}>
        <Text
          fontSize={28}
          h={"39px"}
          fontWeight={"bold"}
          mb={"12px"}
          color={colorMode === "light" ? "#07070c" : "#ffffff"}
        >
          {pathName}
        </Text>
        <AdditionalInfo></AdditionalInfo>
      </Flex>
      {PathComponent}
    </Flex>
  );
};

export default PageTitle;
