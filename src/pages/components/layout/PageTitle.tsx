import { Box, color, Flex, Text, useColorMode } from "@chakra-ui/react";
import usePathName from "hooks/usePathName";
import { useRouter } from "next/router";
import HOME_ICON from "assets/icons/home.svg";
import HOME_LIGHT_ICON from "assets/icons/homeLight.svg";
import CALENDAR_ICON_DARK from "assets/icons/calendar.svg";
import CALENDAR_ICON_LIGHT from "assets/icons/calendarLight.svg";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import useStakeV2 from "hooks/contract/useStakeV2";
import { convertTimeStamp, getNowTimeStamp, getTimeZone } from "@/utils/time";
import useRebaseTime from "hooks/useRebaseTime";
import { useBlockNumber } from "hooks/useBlockNumber";
import useMediaView from "hooks/useMediaView";

const UpdatedOn = () => {
  const { colorMode } = useColorMode();
  const [updatedTime, setUpdatedTime] = useState("-");
  const { blockNumber } = useBlockNumber();

  useEffect(() => {
    const nowTime = convertTimeStamp(getNowTimeStamp(), "YYYY.MM.DD HH:mm");
    setUpdatedTime(nowTime);
  }, [blockNumber]);

  return (
    <Flex>
      <Image
        src={colorMode === "dark" ? CALENDAR_ICON_DARK : CALENDAR_ICON_LIGHT}
        alt={"CALENDAR_ICON"}
      ></Image>
      <Text color={colorMode === "light" ? "#7e7e8f" : "#8b8b93"} ml={"7px"}>
        Updated on {updatedTime} ({getTimeZone()})
      </Text>
    </Flex>
  );
};

const AdditionalInfo = () => {
  const { pathName } = usePathName();
  const rebaseTime = useRebaseTime(":");
  const { bp500px } = useMediaView();

  switch (pathName) {
    default:
      return (
        <Flex
          fontSize={12}
          alignItems="center"
          mt={bp500px ? "30px" : ""}
          mb={bp500px ? "12px" : ""}
        >
          <Text mr={"5px"} color={"#2775ff"}>
            {rebaseTime}
          </Text>
          <Text color={"#9a9aaf"}>to next rebase</Text>
        </Flex>
      );
  }
};

const PageTitle = () => {
  const { pathName } = usePathName();
  const { colorMode } = useColorMode();
  const { bp500px } = useMediaView();

  const PathComponent = useMemo(() => {
    switch (pathName) {
      case "Bond":
        return (
          <Flex
            flexDir={bp500px ? "column" : "row"}
            fontSize={12}
            w={"100%"}
            justifyContent={"space-between"}
            h={bp500px ? "66px" : ""}
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
            {bp500px ? <AdditionalInfo></AdditionalInfo> : null}
            <UpdatedOn></UpdatedOn>
          </Flex>
        );
      case "DAO":
        return null;
      case "Intro":
        return (
          <Flex
            flexDir={bp500px ? "column" : "row"}
            fontSize={12}
            w={"100%"}
            justifyContent={"space-between"}
            h={bp500px ? "66px" : ""}
          >
            <Flex></Flex>
            <UpdatedOn></UpdatedOn>
          </Flex>
        );
      default:
        return (
          <Flex
            flexDir={bp500px ? "column" : "row"}
            fontSize={12}
            w={"100%"}
            justifyContent={"space-between"}
            h={bp500px ? "66px" : ""}
          >
            <Flex>
              <Image src={HOME_ICON} alt={"HOME_ICON"}></Image>
              <Text ml={"3px"}>Home</Text>
              <Text mx={"7px"}>{">"}</Text>
              <Text color={"blue.200"}>{pathName}</Text>
            </Flex>
            {bp500px ? <AdditionalInfo></AdditionalInfo> : null}
            <UpdatedOn></UpdatedOn>
          </Flex>
        );
    }
  }, [pathName, colorMode, bp500px]);

  return (
    <Flex flexDir={"column"} mb={bp500px ? "42px" : "36px"} w={"100%"}>
      <Flex
        // flexDir={bp500px ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Text
          fontSize={28}
          h={"39px"}
          fontWeight={"bold"}
          mb={"12px"}
          color={colorMode === "light" ? "#07070c" : "#ffffff"}
        >
          {pathName}
        </Text>
        {bp500px === false && pathName !== "DAO" && (
          <AdditionalInfo></AdditionalInfo>
        )}
      </Flex>
      {PathComponent}
    </Flex>
  );
};

export default PageTitle;
