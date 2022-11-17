import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
  useMediaQuery,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Logo from "./Logo";

import DASHBOARD_ICON from "assets/icons/dashboard.svg";
import BOND_ICON from "assets/icons/bond.svg";
import STAKE_ICON from "assets/icons/stake.svg";
import DAO_ICON from "assets/icons/DAO.svg";

import DASHBOARD_GRAY_ICON from "assets/icons/dashboard-gray.svg";
import BOND_GRAY_ICON from "assets/icons/bond-gray.svg";
import STAKE_GRAY_ICON from "assets/icons/stake-gray.svg";
import DAO_GRAY_ICON from "assets/icons/DAO-gray.svg";

import BOND_LIGHT_HOVER from "assets/icons/bond-LightHover.svg";
import STAKE_LIGHT_HOVER from "assets/icons/stake-LightHover.svg";
import DASHBOARD_LIGHT_HOVER from "assets/icons/dashboard-LightHover.svg";
import DAO_LIGHT_HOVER from "assets/icons/DAO-LightHover.svg";

import TONSTARTER_GRAY_ICON from "assets/icons/lnb-icon-ton-starter.svg";
import TONSTARTER_HOVER from "assets/icons/TONStarter-HOVER.svg";
import TONSTARTER_LIGHT from "assets/icons/ton-starter-light.svg";

import USERGUIDE_GRAY_ICON from "assets/icons/User_guide.svg";
import USERGUIDE_HOVER_ICON from "assets/icons/User_guide_hover.svg";

import MEDIUM_ICON from "assets/icons/medium.svg";
import TWITTER_ICON from "assets/icons/twitter.svg";
import GITHUB_ICON from "assets/icons/github.svg";
import TELEGRAM_ICON from "assets/icons/telegram.svg";
import ARROW_LEFT_ICON from "assets/icons/arrow-left.svg";
import ARROW_RIGHT_ICON from "assets/icons/arrow-right.svg";
import ARROW_LEFT_LIGHT_ICON from "assets/icons/arrow-leftLight.svg";
import ARROW_RIGHT_LIGHT_ICON from "assets/icons/arrow-rightLight.svg";
import TOOLTIP_ARROW_LEFT_ICON from "assets/icons/Tooltips_left_arrow.svg";
import TOOLTIP_ARROW_LEFT_LIGHT_ICON from "assets/icons/Tooltips_left_arrow_light.svg";

import MEDIUM_W_ICON from "assets/icons/medium-w.svg";
import TWITTER_W_ICON from "assets/icons/twitter-w.svg";
import GITHUB_W_ICON from "assets/icons/github-w.svg";
import TELEGRAM_W_ICON from "assets/icons/telegram-w.svg";

import Line from "common/line/Line";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import useMediaView from "hooks/useMediaView";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarSelectedState, sidebarState } from "atom//header";

const iconList = [
  {
    icon: MEDIUM_ICON,
    hoverIcon: MEDIUM_W_ICON,
    href: "https://medium.com/onther-tech",
  },
  {
    icon: TWITTER_ICON,
    hoverIcon: TWITTER_W_ICON,
    href: "https://twitter.com/tokamak_network?lang=en",
  },
  {
    icon: GITHUB_ICON,
    hoverIcon: GITHUB_W_ICON,
    href: "https://github.com/Onther-Tech",
  },
  {
    icon: TELEGRAM_ICON,
    hoverIcon: TELEGRAM_W_ICON,
    href: "http://bit.ly/3gH1bCr",
  },
];

const navItemList = [
  // {
  //   icon: DASHBOARD_GRAY_ICON,
  //   hoverIcon: DASHBOARD_ICON,
  //   lightHoverIcon: DASHBOARD_LIGHT_HOVER,
  //   link: "dashboard",
  // },
  {
    icon: BOND_GRAY_ICON,
    hoverIcon: BOND_ICON,
    lightHoverIcon: BOND_LIGHT_HOVER,
    link: "bond",
  },
  {
    icon: STAKE_GRAY_ICON,
    hoverIcon: STAKE_ICON,
    lightHoverIcon: STAKE_LIGHT_HOVER,
    link: "stake",
  },
  {
    icon: DAO_GRAY_ICON,
    hoverIcon: DAO_ICON,
    lightHoverIcon: DAO_LIGHT_HOVER,
    link: "dao",
  },
];

const LinkContainer = (props: { isExpended: boolean }) => {
  const [isHover, setIsHover] = useState<number | undefined>(undefined);

  return (
    <Flex
      mt={"auto"}
      mb={"15px"}
      flexDir={props.isExpended ? "row" : "column"}
      columnGap={"10px"}
    >
      {iconList.map((item, index) => {
        return (
          <Flex
            w={"36px"}
            h={"36px"}
            alignItems="center"
            justifyContent={"center"}
            borderRadius={10}
            _hover={{ backgroundColor: "blue.100" }}
            key={`link-container-${index}`}
            mb={"10px"}
            cursor={"pointer"}
            onClick={() => window.open(item.href)}
            onMouseEnter={() => setIsHover(index)}
            onMouseLeave={() => setIsHover(undefined)}
          >
            <Image
              src={isHover === index ? item.hoverIcon : item.icon}
              alt={"icon"}
            ></Image>
          </Flex>
        );
      })}
    </Flex>
  );
};

const NavItem = (props: { isExpended: boolean }) => {
  const [isHover, setIsHover] = useState<number | undefined>(undefined);
  const { isExpended } = props;
  const router = useRouter();
  const { pathname } = router;
  const pName = pathname.replaceAll("/", "");
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);
  const { colorMode } = useColorMode();
  return (
    <>
      {navItemList.map((item, index) => {
        const capitalLinkName =
          item.link !== "dao"
            ? item.link.charAt(0).toUpperCase() + item.link.slice(1)
            : "DAO";
        return (
          <Link href={`${item.link}`} key={`nav-item-${index}`} passHref>
            <Flex pos={"relative"}>
              <Flex
                w={isExpended ? 206 : 54}
                h={54}
                alignItems="center"
                justifyContent={isExpended ? "flex-start" : "center"}
                borderRadius={10}
                bg={pName === item.link ? "blue.100" : "transparent"}
                color={
                  isHover === index
                    ? pName === item.link
                      ? "white.200"
                      : "#2775ff"
                    : pName === item.link
                    ? "white.200"
                    : colorMode === "dark"
                    ? "#8b8b93"
                    : "#7e7e8f"
                }
                cursor={"pointer"}
                onMouseEnter={() => setIsHover(index)}
                onMouseLeave={() => setIsHover(undefined)}
                pl={isExpended ? 15 : 0}
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={
                    isHover === index && pName !== item.link
                      ? item.lightHoverIcon
                      : pName === item.link
                      ? item.hoverIcon
                      : item.icon
                  }
                  alt={"icon"}
                ></Image>
                {isExpended && <Text ml={"9px"}>{capitalLinkName}</Text>}
              </Flex>
              {isHover === index && !isExpended && (
                <Flex
                  pos={"absolute"}
                  ml={"90px"}
                  mt={2}
                  px={18}
                  py={"9px"}
                  bg={colorMode === "dark" ? "gray.600" : "white.100"}
                  // bg={'red'}
                  borderRadius={3}
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"#2775ff"}
                  fontSize={14}
                  border={
                    colorMode === "dark"
                      ? "1px solid #313442"
                      : "1px solid #e8edf2"
                  }
                  zIndex={1000}
                >
                  <Flex pos={"relative"}>
                    <Box
                      pos={"absolute"}
                      left={-6}
                      // bg={"red"}
                      top={-3}
                      style={{ transform: `rotate(180deg)` }}
                      zIndex={10000}
                    >
                      <Image
                        src={
                          colorMode === "dark"
                            ? TOOLTIP_ARROW_LEFT_ICON
                            : TOOLTIP_ARROW_LEFT_LIGHT_ICON
                        }
                        alt={"TOOLTIP_ARROW_LEFT_ICON"}
                      ></Image>
                    </Box>
                  </Flex>
                  <Text>{capitalLinkName}</Text>
                </Flex>
              )}
            </Flex>
          </Link>
        );
      })}
    </>
  );
};

const NavItemBottom = (props: { isExpended: boolean }) => {
  const [isHover, setIsHover] = useState<number | undefined>(undefined);
  const { isExpended } = props;
  const router = useRouter();
  const { pathname } = router;
  const pName = pathname.replaceAll("/", "");
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);
  const { colorMode } = useColorMode();
  const navItemBottomList = [
    {
      icon: TONSTARTER_GRAY_ICON,
      hoverIcon: TONSTARTER_HOVER,
      lightHoverIcon: TONSTARTER_HOVER,
      link: "TONStarter",
      href: "https://tonstarter.tokamak.network/",
    },
    {
      icon: USERGUIDE_GRAY_ICON,
      hoverIcon: USERGUIDE_HOVER_ICON,
      lightHoverIcon: USERGUIDE_HOVER_ICON,
      link: "User Guide",
      href: "https://onther.gitbook.io/tosv2/website-guide/tosv2",
    },
  ];
  return (
    <>
      {navItemBottomList.map((item, index) => {
        const capitalLinkName =
          item.link !== "dao"
            ? item.link.charAt(0).toUpperCase() + item.link.slice(1)
            : "DAO";
        return (
          <>
            <Flex pos={"relative"}>
              <Flex
                w={isExpended ? 206 : 54}
                h={54}
                alignItems="center"
                justifyContent={isExpended ? "flex-start" : "center"}
                borderRadius={10}
                bg={"transparent"}
                color={
                  isHover === index
                    ? pName === item.link
                      ? "white.200"
                      : "#2775ff"
                    : pName === item.link
                    ? "white.200"
                    : colorMode === "dark"
                    ? "#8b8b93"
                    : "#7e7e8f"
                }
                cursor={"pointer"}
                onMouseEnter={() => setIsHover(index)}
                onMouseLeave={() => setIsHover(undefined)}
                pl={isExpended ? 15 : 0}
                onClick={() => window.open(item.href)}
              >
                <Image
                  src={
                    isHover === index
                      ? colorMode === "dark"
                        ? item.hoverIcon
                        : item.lightHoverIcon
                      : item.icon
                  }
                  alt={"icon"}
                ></Image>
                {isExpended && <Text ml={"9px"}>{capitalLinkName}</Text>}
              </Flex>
              {isHover === index && !isExpended && (
                <Flex
                  pos={"absolute"}
                  ml={"90px"}
                  mt={2}
                  px={18}
                  py={"9px"}
                  bg={colorMode === "dark" ? "gray.600" : "white.100"}
                  // bg={'red'}
                  borderRadius={3}
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"#2775ff"}
                  fontSize={14}
                  border={
                    colorMode === "dark"
                      ? "1px solid #313442"
                      : "1px solid #e8edf2"
                  }
                  zIndex={1000}
                >
                  <Flex pos={"relative"}>
                    <Box
                      pos={"absolute"}
                      left={-6}
                      // bg={"red"}
                      top={-3}
                      style={{ transform: `rotate(180deg)` }}
                    >
                      <Image
                        src={
                          colorMode === "dark"
                            ? TOOLTIP_ARROW_LEFT_ICON
                            : TOOLTIP_ARROW_LEFT_LIGHT_ICON
                        }
                        alt={"TOOLTIP_ARROW_LEFT_ICON"}
                      ></Image>
                    </Box>
                  </Flex>
                  <Text>{capitalLinkName}</Text>
                </Flex>
              )}
            </Flex>
          </>
        );
      })}
    </>
  );
};

const MenuButton = (props: { isExpended: boolean }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      pos={"absolute"}
      w={33}
      h={33}
      border={colorMode === "dark" ? "1px solid #313442" : "1px solid #e8edf2"}
      borderRadius={25}
      right={-4}
      boxShadow={"0 4px 6px 0 rgba(0, 0, 0, 0.05)"}
      alignItems={"center"}
      justifyContent={"center"}
      bg={colorMode === "dark" ? "gray.600" : "#ffffff"}
      cursor={"pointer"}
    >
      <Image
        src={
          colorMode === "dark"
            ? props.isExpended
              ? ARROW_LEFT_ICON
              : ARROW_RIGHT_ICON
            : props.isExpended
            ? ARROW_LEFT_LIGHT_ICON
            : ARROW_RIGHT_LIGHT_ICON
        }
        alt={"ARROW_RIGHT_ICON"}
      ></Image>
    </Flex>
  );
};

function MobileSideBar() {
  const sidebarOpenState = useRecoilValue(sidebarSelectedState);
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);
  const isExpended = true;
  const { colorMode } = useColorMode();
  return (
    <Drawer
      isOpen={sidebarOpenState}
      onClose={() => setIsOpen(false)}
      placement={"left"}
    >
      <DrawerOverlay backdropFilter={"blur(17.9px)"} />
      <DrawerContent
        maxW={"256px"}
        w={"256px"}
        minH={"100vh"}
        flexDir="column"
        pt={33}
        alignItems="center"
        bg={colorMode === "light" ? "#ffffff" : "#1f2128"}
        // zIndex={10}
      >
        <Flex
          flexDir={isExpended ? "row" : "column"}
          w={"100%"}
          mb={50}
          alignItems={"center"}
          pl={isExpended ? "35px" : "0px"}
        >
          <Logo isExpended={isExpended}></Logo>
          {/* <Text
            mt={isExpended ? "0px" : "9px"}
            ml={isExpended ? "15px" : "0px"}
            w={"41px"}
            h={"17px"}
            bg={"#f29b37"}
            fontSize={10}
            color={"#1f2128"}
            fontWeight={"bold"}
            textAlign={"center"}
            lineHeight={"17px"}
            borderRadius={3}
          >
            Goerli
          </Text> */}
        </Flex>
        <NavItem isExpended={isExpended}></NavItem>
        <Box w={"100%"} my={18} px={25}>
          <Line></Line>
        </Box>
        <NavItemBottom isExpended={isExpended}></NavItemBottom>
        <LinkContainer isExpended={isExpended}></LinkContainer>
      </DrawerContent>
    </Drawer>
  );
}

const NavBar = () => {
  const [isExpended, setIsExpended] = useState<boolean>(true);
  const { pcView } = useMediaView();
  const { colorMode } = useColorMode();
  if (!pcView) {
    return <MobileSideBar />;
  }

  return (
    <Flex
      minW={isExpended ? 256 : [0, 0, 104]}
      w={0}
      flexDir="column"
      pt={33}
      alignItems="center"
      bg={colorMode === "light" ? "#ffffff" : "#1f2128"}
      pos={"relative"}
      borderRight={
        colorMode === "dark" ? "1px solid #313442" : "1px solid #e8edf2"
      }
      position={"sticky"}
      h={"100%"}
      minH={"100vh"}
      top={0}
      zIndex={10000}
      // mr={isExpended ? "50%" : "100px"}
    >
      {/* menu button */}
      <Box onClick={() => setIsExpended(!isExpended)} zIndex={1000}>
        <MenuButton isExpended={isExpended}></MenuButton>
      </Box>
      <Flex
        flexDir={isExpended ? "row" : "column"}
        w={"100%"}
        mb={50}
        alignItems={"center"}
        pl={isExpended ? "35px" : "0px"}
      >
        <Logo isExpended={isExpended}></Logo>
        {/* <Text
          mt={isExpended ? "0px" : "9px"}
          ml={isExpended ? "15px" : "0px"}
          w={"41px"}
          h={"17px"}
          bg={"#f29b37"}
          fontSize={10}
          color={"#1f2128"}
          fontWeight={"bold"}
          textAlign={"center"}
          lineHeight={"17px"}
          borderRadius={3}
        >
          Goerli
        </Text> */}
      </Flex>
      <NavItem isExpended={isExpended}></NavItem>
      <Box w={"100%"} my={18} px={25}>
        <Line></Line>
      </Box>
      <NavItemBottom isExpended={isExpended}></NavItemBottom>
      <LinkContainer isExpended={isExpended}></LinkContainer>
    </Flex>
  );
};

export default NavBar;
