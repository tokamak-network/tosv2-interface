import { Flex, useColorMode, useTheme } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import IntroContainer from "./components/intro/IntroContainer";

const Intro: NextPage = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "#fafbfc" : "black.100";



  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE.layoutTheme(colorMode)} bg={bgColor} overflowX={'hidden'} overflowY={'hidden'}>
      <IntroContainer></IntroContainer>
    </Flex>
  );
};

export default Intro;
