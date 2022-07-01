import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Logo from "./Logo";
import DASHBOARD_ICON from "assets/icons/dashboard.svg";
import BOND_ICON from "assets/icons/bond.svg";
import STAKE_ICON from "assets/icons/stake.svg";

import MEDIUM_ICON from "assets/icons/medium.svg";
import TWITTER_ICON from "assets/icons/twitter.svg";
import GITHUB_ICON from "assets/icons/github.svg";
import TELEGRAM_ICON from "assets/icons/telegram.svg";

import ARROW_RIGHT_ICON from "assets/icons/arrow-right.svg";

import Line from "common/line/Line";
import Link from "next/link";

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
    icon: DASHBOARD_ICON,
    link: "dashboard",
  },
  {
    icon: BOND_ICON,
    link: "bond",
  },
  {
    icon: STAKE_ICON,
    link: "stake",
  },
];

const LinkContainer = () => {
  return (
    <Flex mt={"auto"} mb={"15px"} flexDir={"column"}>
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

const NavItem = () => {
  return (
    <>
      {navItemList.map((item, index) => {
        return (
          <Link href={`${item.link}`} key={`nav-item-${index}`} passHref>
            <Flex
              w={54}
              h={54}
              alignItems="center"
              justifyContent={"center"}
              borderRadius={10}
              _hover={{ backgroundColor: "blue.100" }}
              cursor={"pointer"}
            >
              <Image src={item.icon} alt={"icon"}></Image>
            </Flex>
          </Link>
        );
      })}
    </>
  );
};

const MenuButton = () => {
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
      <Image src={ARROW_RIGHT_ICON} alt={"ARROW_RIGHT_ICON"}></Image>
    </Flex>
  );
};

const NavBar = () => {
  return (
    <Flex
      w={104}
      minH={"100vh"}
      flexDir="column"
      pt={33}
      alignItems="center"
      bg={"#1f2128"}
      pos={"relative"}
    >
      {/* menu button */}
      <MenuButton></MenuButton>
      <Box mb={50}>
        <Logo></Logo>
      </Box>
      <NavItem></NavItem>
      <Box w={"100%"} mt={18} px={25}>
        <Line></Line>
      </Box>
      <LinkContainer></LinkContainer>
    </Flex>
  );
};

export default NavBar;
