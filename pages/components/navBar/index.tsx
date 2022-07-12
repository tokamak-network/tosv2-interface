import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import Logo from "./Logo";
import DASHBOARD_ICON from "assets/icons/dashboard.svg";
import BOND_ICON from "assets/icons/bond.svg";
import STAKE_ICON from "assets/icons/stake.svg";
import DASHBOARD_GRAY_ICON from "assets/icons/dashboard-gray.svg";
import BOND_GRAY_ICON from "assets/icons/bond-gray.svg";
import STAKE_GRAY_ICON from "assets/icons/stake-gray.svg";

import MEDIUM_ICON from "assets/icons/medium.svg";
import TWITTER_ICON from "assets/icons/twitter.svg";
import GITHUB_ICON from "assets/icons/github.svg";
import TELEGRAM_ICON from "assets/icons/telegram.svg";
import ARROW_LEFT_ICON from "assets/icons/arrow-left.svg";
import ARROW_RIGHT_ICON from "assets/icons/arrow-right.svg";
import TOOLTIP_ARROW_LEFT_ICON from "assets/icons/Tooltips_left_arrow.svg";

import Line from "common/line/Line";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import useMediaView from "hooks/useMediaView";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarSelectedState, sidebarState } from "atom/header";

const iconList = [
  {
    icon: MEDIUM_ICON,
  },
  {
    icon: TWITTER_ICON,
  },
  {
    icon: GITHUB_ICON,
  },
  {
    icon: TELEGRAM_ICON,
  },
];

const navItemList = [
  {
    icon: DASHBOARD_GRAY_ICON,
    hoverIcon: DASHBOARD_ICON,
    link: "dashboard",
  },
  {
    icon: BOND_GRAY_ICON,
    hoverIcon: BOND_ICON,
    link: "bond",
  },
  {
    icon: STAKE_GRAY_ICON,
    hoverIcon: STAKE_ICON,
    link: "stake",
  },
];

const LinkContainer = (props: { isExpended: boolean }) => {
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
          >
            <Image src={item.icon} alt={"icon"}></Image>
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

  return (
    <>
      {navItemList.map((item, index) => {
        const capitalLinkName =
          item.link.charAt(0).toUpperCase() + item.link.slice(1);
        return (
          <Link href={`${item.link}`} key={`nav-item-${index}`} passHref>
            <Flex pos={"relative"}>
              <Flex
                w={isExpended ? 206 : 54}
                h={54}
                alignItems="center"
                justifyContent={isExpended ? "flex-start" : "center"}
                borderRadius={10}
                _hover={{ backgroundColor: "blue.100", color: "white.200" }}
                cursor={"pointer"}
                onMouseEnter={() => setIsHover(index)}
                onMouseLeave={() => setIsHover(undefined)}
                pl={isExpended ? 15 : 0}
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={
                    isHover === index || pName === item.link
                      ? item.hoverIcon
                      : item.icon
                  }
                  alt={"icon"}
                ></Image>
                {isExpended && (
                  <Text
                    ml={"9px"}
                    color={pName === item.link ? "white.200" : ""}
                  >
                    {capitalLinkName}
                  </Text>
                )}
              </Flex>
              {isHover === index && !isExpended && (
                <Flex
                  pos={"absolute"}
                  ml={"90px"}
                  mt={2}
                  px={18}
                  py={"9px"}
                  bg={"gray.600"}
                  borderRadius={3}
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"#2775ff"}
                  fontSize={14}
                  border={"1px solid #313442"}
                  zIndex={1000}
                >
                  <Flex pos={"relative"}>
                    <Box
                      pos={"absolute"}
                      left={-7}
                      // bg={"red"}
                      top={-3}
                      style={{ transform: `rotate(270deg)` }}
                    >
                      <Image
                        src={TOOLTIP_ARROW_LEFT_ICON}
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

const MenuButton = (props: { isExpended: boolean }) => {
  return (
    <Flex
      pos={"absolute"}
      w={33}
      h={33}
      border={"1px solid #313442"}
      borderRadius={25}
      right={-4}
      alignItems={"center"}
      justifyContent={"center"}
      bg={"gray.600"}
      cursor={"pointer"}
    >
      <Image
        src={props.isExpended ? ARROW_LEFT_ICON : ARROW_RIGHT_ICON}
        alt={"ARROW_RIGHT_ICON"}
      ></Image>
    </Flex>
  );
};

function MobileSideBar() {
  const sidebarOpenState = useRecoilValue(sidebarSelectedState);
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);
  const isExpended = true;
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
        bg={"#1f2128"}
      >
        <Box mb={50}>
          <Logo isExpended={isExpended}></Logo>
        </Box>
        <NavItem isExpended={isExpended}></NavItem>
        <Box w={"100%"} mt={18} px={25}>
          <Line></Line>
        </Box>
        <LinkContainer isExpended={isExpended}></LinkContainer>
      </DrawerContent>
    </Drawer>
  );
}

const NavBar = () => {
  const [isExpended, setIsExpended] = useState<boolean>(false);
  const { pcView } = useMediaView();

  if (!pcView) {
    return <MobileSideBar />;
  }

  return (
    <Flex
      minW={isExpended ? 256 : [0, 0, 104]}
      w={0}
      minH={"100vh"}
      flexDir="column"
      pt={33}
      alignItems="center"
      bg={"#1f2128"}
      pos={"relative"}
      // mr={isExpended ? "50%" : "100px"}
    >
      {/* menu button */}
      <Box onClick={() => setIsExpended(!isExpended)}>
        <MenuButton isExpended={isExpended}></MenuButton>
      </Box>
      <Box mb={50}>
        <Logo isExpended={isExpended}></Logo>
      </Box>
      <NavItem isExpended={isExpended}></NavItem>
      <Box w={"100%"} mt={18} px={25}>
        <Line></Line>
      </Box>
      <LinkContainer isExpended={isExpended}></LinkContainer>
    </Flex>
  );
};

export default NavBar;
