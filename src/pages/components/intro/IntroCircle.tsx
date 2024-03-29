import { motion, useAnimationControls } from "framer-motion";

//background lines
import bgLine1 from "assets/circles/dark/background/d-bb-line-01.svg";
import bgLine2 from "assets/circles/dark/background/d-bb-line-02.svg";
import bgLine3 from "assets/circles/dark/background/d-bb-line-03.svg";
import bgLine4 from "assets/circles/dark/background/d-bb-line-04.svg";
import bgLine5 from "assets/circles/dark/background/d-bb-line-05.svg";
import bgLine6 from "assets/circles/dark/background/d-bb-line-06.svg";
import bgBLine1 from "assets/circles/dark/background/d-bo-line-01.svg";
import bgBLine2 from "assets/circles/dark/background/d-bo-line-02.svg";
import bgBLine3 from "assets/circles/dark/background/d-bo-line-03.svg";
import bgBLine4 from "assets/circles/dark/background/d-bo-line-04.svg";
import bgBLine5 from "assets/circles/dark/background/d-bo-line-05.svg";
import bgBLine6 from "assets/circles/dark/background/d-bo-line-06.svg";

import l_bgLine1 from "assets/circles/light/background/w-bb-line-01.svg";
import l_bgLine2 from "assets/circles/light/background/w-bb-line-02.svg";
import l_bgLine3 from "assets/circles/light/background/w-bb-line-03.svg";
import l_bgLine4 from "assets/circles/light/background/w-bb-line-04.svg";
import l_bgLine5 from "assets/circles/light/background/w-bb-line-05.svg";
import l_bgLine6 from "assets/circles/light/background/w-bb-line-06.svg";
import l_bgBLine1 from "assets/circles/light/background/w-bo-line-01.svg";
import l_bgBLine2 from "assets/circles/light/background/w-bo-line-02.svg";
import l_bgBLine3 from "assets/circles/light/background/w-bo-line-03.svg";
import l_bgBLine4 from "assets/circles/light/background/w-bo-line-04.svg";
import l_bgBLine5 from "assets/circles/light/background/w-bo-line-05.svg";
import l_bgBLine6 from "assets/circles/light/background/w-bo-line-06.svg";

//big lines
import bigLine1 from "assets/circles/dark/big/db-line-01.svg";
import bigLine2 from "assets/circles/dark/big/db-line-02.svg";
import bigLine3 from "assets/circles/dark/big/db-line-03.svg";
import bigLine4 from "assets/circles/dark/big/db-line-04.svg";
import bigLine5 from "assets/circles/dark/big/db-line-05.svg";
import bigLine6 from "assets/circles/dark/big/db-line-06.svg";
import bigLine7 from "assets/circles/dark/big/db-line-07.svg";
import bigLine8 from "assets/circles/dark/big/db-line-08.svg";
import bigLine9 from "assets/circles/dark/big/db-line-09.svg";
import bigLine10 from "assets/circles/dark/big/db-line-10.svg";
import bigLine11 from "assets/circles/dark/big/db-line-11.svg";
import bigLine12 from "assets/circles/dark/big/db-line-12.svg";
import bigLine13 from "assets/circles/dark/big/db-line-13.svg";

import l_bigLine1 from "assets/circles/light/big/wb-line-01.svg";
import l_bigLine2 from "assets/circles/light/big/wb-line-02.svg";
import l_bigLine3 from "assets/circles/light/big/wb-line-03.svg";
import l_bigLine4 from "assets/circles/light/big/wb-line-04.svg";
import l_bigLine5 from "assets/circles/light/big/wb-line-05.svg";
import l_bigLine6 from "assets/circles/light/big/wb-line-06.svg";
import l_bigLine7 from "assets/circles/light/big/wb-line-07.svg";
import l_bigLine8 from "assets/circles/light/big/wb-line-08.svg";
import l_bigLine9 from "assets/circles/light/big/wb-line-09.svg";
import l_bigLine10 from "assets/circles/light/big/wb-line-10.svg";
import l_bigLine11 from "assets/circles/light/big/wb-line-11.svg";
import l_bigLine12 from "assets/circles/light/big/wb-line-12.svg";
import l_bigLine13 from "assets/circles/light/big/wb-line-13.svg";

//small lines
import smallLine1 from "assets/circles/dark/small/ds-line-01.svg";
import smallLine2 from "assets/circles/dark/small/ds-line-02.svg";
import smallLine3 from "assets/circles/dark/small/ds-line-03.svg";
import smallLine4 from "assets/circles/dark/small/ds-line-04.svg";
import smallLine5 from "assets/circles/dark/small/ds-line-05.svg";
import smallLine6 from "assets/circles/dark/small/ds-line-06.svg";
import smallLine7 from "assets/circles/dark/small/ds-line-07.svg";
import smallLine8 from "assets/circles/dark/small/ds-line-08.svg";
import smallLine9 from "assets/circles/dark/small/ds-line-09.svg";
import smallLine10 from "assets/circles/dark/small/ds-line-10.svg";
import smallLine11 from "assets/circles/dark/small/ds-line-11.svg";
import smallLine12 from "assets/circles/dark/small/ds-line-12.svg";
import smallLine13 from "assets/circles/dark/small/ds-line-13.svg";

import l_smallLine1 from "assets/circles/light/small/ws-line-01.svg";
import l_smallLine2 from "assets/circles/light/small/ws-line-02.svg";
import l_smallLine3 from "assets/circles/light/small/ws-line-03.svg";
import l_smallLine4 from "assets/circles/light/small/ws-line-04.svg";
import l_smallLine5 from "assets/circles/light/small/ws-line-05.svg";
import l_smallLine6 from "assets/circles/light/small/ws-line-06.svg";
import l_smallLine7 from "assets/circles/light/small/ws-line-07.svg";
import l_smallLine8 from "assets/circles/light/small/ws-line-08.svg";
import l_smallLine9 from "assets/circles/light/small/ws-line-09.svg";
import l_smallLine10 from "assets/circles/light/small/ws-line-10.svg";
import l_smallLine11 from "assets/circles/light/small/ws-line-11.svg";
import l_smallLine12 from "assets/circles/light/small/ws-line-12.svg";
import l_smallLine13 from "assets/circles/light/small/ws-line-13.svg";

//mobile circle
import MobileCircle from "assets/circles/dark-mg-intro-t-01.svg";
import l_MobileCircle from "assets/circles/bright-mg-intro-t-01.svg";

//lights
import lightPoint from "assets/circles/light-point.png";

import Image from "next/image";
import {
  Box,
  Flex,
  Text,
  position,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { introTextHover, introTextHoverSelectedState } from "atom/intro";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import useMediaView from "hooks/useMediaView";
import { zIndexStyle } from "theme/styles";

let isAlreadyMoved = false;

const randomNums = () => {
  let nums = [5, 6, 7, 8, 9, 10, 11];
  let ranNums = [];
  let i = nums.length;
  let j = 0;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[j]);
    nums.splice(j, 1);
  }
  return ranNums;
};

function LightPoint() {
  const selectText = useRecoilValue(introTextHoverSelectedState);
  const [width, height] = useWindowDimensions();
  const isMobile = width < 1024;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <>
      <motion.div
        animate={
          isMobile
            ? {
                width: "100px",
                height: "97px",
                top: "-130px",
                left: "-130px",
              }
            : selectText === 1 || selectText === 2
            ? {
                width: "100px",
                height: "97px",
                top: "-130px",
                left: "-130px",
              }
            : {
                width: "40px",
                height: "39px",
                top: "-100px",
                left: "-100px",
              }
        }
        transition={{ duration: 1 }}
        style={{ position: "absolute", zIndex: 100 }}
      >
        <Image src={lightPoint} alt={"light-point"}></Image>
      </motion.div>
      <motion.div
        animate={
          isMobile
            ? {
                width: "100px",
                height: "97px",
                top: "-130px",
                left: "30px",
              }
            : selectText === 3
            ? {
                width: "100px",
                height: "97px",
                top: "-130px",
                left: "30px",
              }
            : {
                width: "40px",
                height: "39px",
                top: "-100px",
                left: "60px",
              }
        }
        transition={{ duration: 1 }}
        style={{ position: "absolute", zIndex: 100 }}
      >
        <Image src={lightPoint} alt={"light-point"}></Image>
      </motion.div>
      <motion.div
        animate={
          isMobile
            ? {
                width: "100px",
                height: "97px",
                top: "35px",
                left: "30px",
              }
            : selectText === 3
            ? {
                width: "100px",
                height: "97px",
                top: "35px",
                left: "30px",
              }
            : {
                width: "40px",
                height: "39px",
                top: "65px",
                left: "60px",
              }
        }
        transition={{ duration: 1 }}
        style={{ position: "absolute", zIndex: 100 }}
      >
        <Image src={lightPoint} alt={"light-point"}></Image>
      </motion.div>
      <motion.div
        animate={
          isMobile
            ? {
                width: "100px",
                height: "97px",
                top: "35px",
                left: "-130px",
              }
            : selectText === 1
            ? {
                width: "100px",
                height: "97px",
                top: "35px",
                left: "-130px",
              }
            : {
                width: "40px",
                height: "39px",
                top: "65px",
                left: "-100px",
              }
        }
        transition={{ duration: 1 }}
        style={{ position: "absolute", zIndex: 100 }}
      >
        <Image src={lightPoint} alt={"light-point"}></Image>
      </motion.div>
    </>
  );
}

function LightPointText(props: { selectedTab1: boolean }) {
  const { selectedTab1 } = props;
  const [selectText, setSelectText] = useRecoilState(introTextHover);
  const [width, height] = useWindowDimensions();
  const isMobile = width < 1024;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <motion.div
      style={{ position: "relative", opacity: 0, zIndex: 5000 }}
      animate={
        selectedTab1
          ? {}
          : {
              opacity: 1,
            }
      }
      transition={
        selectedTab1
          ? {}
          : {
              duration: 5,
            }
      }
    >
      <LightPoint></LightPoint>
      {!isMobile ? (
        <Box
          display={"flex"}
          flexDir={"column"}
          color={colorMode === "dark" ? "#8b8b93" : "#7e7e8f"}
          fontSize={14}
          textAlign={"right"}
          pos="absolute"
          left={"-230px"}
          top={"-130px"}
          onMouseEnter={() => setSelectText(2)}
          onMouseLeave={() => setSelectText(undefined)}
          cursor={"pointer"}
        >
          <Text
            color={
              selectText === 1 || selectText === 2
                ? "#ec8c56"
                : colorMode === "dark"
                ? "#64646f"
                : "#9a9aaf"
            }
            fontSize={24}
            fontWeight={"bold"}
          >
            LTOS
          </Text>
          <Text opacity={selectText === 1 || selectText === 2 ? 1 : 0.5}>
            Earn interest
          </Text>
          <Text opacity={selectText === 1 || selectText === 2 ? 1 : 0.5}>
            in TOS
          </Text>
        </Box>
      ) : (
        <Flex
          color={"#ec8c56"}
          fontSize={21}
          fontWeight={"bold"}
          textAlign={"right"}
          pos="absolute"
          left={"-170px"}
          top={"-130px"}
        >
          <Text>LTOS</Text>
        </Flex>
      )}
      {!isMobile ? (
        <Box
          display={"flex"}
          flexDir={"column"}
          color={colorMode === "dark" ? "#8b8b93" : "#7e7e8f"}
          fontSize={14}
          textAlign={"right"}
          pos="absolute"
          left={"-320px"}
          top={"90px"}
          onMouseEnter={() => setSelectText(1)}
          onMouseLeave={() => setSelectText(undefined)}
          cursor={"pointer"}
        >
          <Text
            color={
              selectText === 1
                ? "#ec8c56"
                : colorMode === "dark"
                ? "#64646f"
                : "#9a9aaf"
            }
            fontSize={24}
            fontWeight={"bold"}
          >
            sTOS
          </Text>
          <Flex opacity={selectText === 1 ? 1 : 0.5} flexDir="column">
            <Text>Participate in governance </Text>
            <Text>Earn airdrop </Text>
            <Text>Participate in IDO</Text>
          </Flex>
        </Box>
      ) : (
        <Flex
          color={"#ec8c56"}
          fontSize={21}
          fontWeight={"bold"}
          textAlign={"right"}
          pos="absolute"
          left={"-170px"}
          top={"90px"}
        >
          <Text>sTOS</Text>
        </Flex>
      )}{" "}
      {!isMobile ? (
        <Box
          display={"flex"}
          flexDir={"column"}
          color={colorMode === "dark" ? "#8b8b93" : "#7e7e8f"}
          fontSize={14}
          textAlign={"left"}
          pos="absolute"
          left={"150px"}
          top={"-130px"}
          w={"150px"}
          onMouseEnter={() => setSelectText(3)}
          onMouseLeave={() => setSelectText(undefined)}
          cursor={"pointer"}
        >
          <Text
            color={
              selectText === 3
                ? "#ec8c56"
                : colorMode === "dark"
                ? "#64646f"
                : "#9a9aaf"
            }
            fontSize={24}
            fontWeight={"bold"}
          >
            dTOS
          </Text>
          <Flex opacity={selectText === 3 ? 1 : 0.5} flexDir="column">
            <Text>(Coming soon)</Text>
            <Text>High discount rate</Text>
            <Text>for bonding</Text>
          </Flex>
        </Box>
      ) : (
        <Flex
          color={"#ec8c56"}
          fontSize={21}
          fontWeight={"bold"}
          textAlign={"right"}
          pos="absolute"
          left={"120px"}
          top={"-130px"}
        >
          <Text>dTOS</Text>
        </Flex>
      )}
      {!isMobile ? (
        <Box
          display={"flex"}
          flexDir={"column"}
          color={colorMode === "dark" ? "#8b8b93" : "#7e7e8f"}
          fontSize={14}
          textAlign={"left"}
          pos="absolute"
          left={"150px"}
          top={"90px"}
          w={"200px"}
          onMouseEnter={() => setSelectText(3)}
          onMouseLeave={() => setSelectText(undefined)}
          cursor={"pointer"}
        >
          <Text
            color={
              selectText === 3
                ? "#ec8c56"
                : colorMode === "dark"
                ? "#64646f"
                : "#9a9aaf"
            }
            fontSize={24}
            fontWeight={"bold"}
          >
            Bond
          </Text>
          <Flex opacity={selectText === 3 ? 1 : 0.5} flexDir="column">
            <Text>Raise capital for</Text>
            <Text>TONStarter Ecosystem</Text>
          </Flex>
        </Box>
      ) : (
        <Flex
          color={"#ec8c56"}
          fontSize={21}
          fontWeight={"bold"}
          textAlign={"right"}
          pos="absolute"
          left={"120px"}
          top={"90px"}
        >
          <Text>BOND</Text>
        </Flex>
      )}
    </motion.div>
  );
}

const MotionWapper = (props: {
  src: any;
  duration?: number;
  opacity?: number;
  clockDirection?: boolean;
  initialRotate?: number;
  style?: {};
}) => {
  const { src, duration, opacity, clockDirection, initialRotate, style } =
    props;

  const rotateAngle = clockDirection ? 360 : -360;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <motion.div
      animate={{
        rotate: initialRotate ? rotateAngle + initialRotate : rotateAngle,
      }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: duration ?? Math.floor(Math.random() * 25) + 4,
      }}
      style={{
        position: "absolute",
        opacity: opacity ?? 1,
        ...style,
        outline: "none",
      }}
      initial={{ rotate: initialRotate }}
    >
      <Image src={src} alt={"bgLine"}></Image>
    </motion.div>
  );
};

function BackgroundLines(props: { selectedTab1: boolean }) {
  const { selectedTab1 } = props;

  const randomNumsArr = randomNums();
  const secondRandomNumsArr = randomNums();
  const [width, height] = useWindowDimensions();
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const bgBLineArr =
    colorMode === "dark"
      ? [
          bgLine1,
          bgLine2,
          bgLine3,
          bgLine4,
          bgLine5,
          bgLine6,
          bgBLine1,
          bgBLine2,
          bgBLine3,
          bgBLine4,
          bgBLine5,
          bgBLine6,
        ]
      : [
          l_bgLine1,
          l_bgLine2,
          l_bgLine3,
          l_bgLine4,
          l_bgLine5,
          l_bgLine6,
          l_bgBLine1,
          l_bgBLine2,
          l_bgBLine3,
          l_bgBLine4,
          l_bgBLine5,
          l_bgBLine6,
        ];

  if (width < 1024) {
    return null;
  }

  return (
    <Flex pos={"absolute"}>
      <motion.div
        animate={
          selectedTab1
            ? isAlreadyMoved
              ? {
                  x: 150,
                  opacity: 0.5,
                }
              : {}
            : {
                x: -150,
                opacity: 0,
              }
        }
        transition={{
          duration: 2,
        }}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1000px",
          height: "1000px",
          opacity: 0.5,
        }}
      >
        {[
          bgLine1,
          bgLine2,
          bgLine3,
          bgLine4,
          bgLine5,
          bgLine6,
          bgBLine1,
          bgBLine2,
          bgBLine3,
          bgBLine4,
          bgBLine5,
          bgBLine6,
        ].map((imgSrc: any, index: number) => {
          return (
            <MotionWapper
              src={imgSrc}
              key={`${index}_bgline`}
              duration={
                index < 6
                  ? randomNumsArr[index]
                  : secondRandomNumsArr[index - 6]
              }
            ></MotionWapper>
          );
        })}
      </motion.div>
    </Flex>
  );
}

function TabOneCircle(props: { selectedTab1: boolean; width: number }) {
  const { selectedTab1, width } = props;
  const randomNumsArr = randomNums();
  const secondRandomNumsArr = randomNums();
  const selectText = useRecoilValue(introTextHoverSelectedState);
  const [height] = useWindowDimensions();
  const isMobile = width < 530;
  const isMobileAnimation = width < 1024;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const bigLineArr =
    colorMode === "dark"
      ? [
          bigLine1,
          bigLine2,
          bigLine3,
          bigLine4,
          bigLine5,
          bigLine6,
          bigLine7,
          bigLine8,
          bigLine9,
          bigLine10,
          bigLine11,
          bigLine12,
          bigLine13,
        ]
      : [
          l_bigLine1,
          l_bigLine2,
          l_bigLine3,
          l_bigLine4,
          l_bigLine5,
          l_bigLine6,
          l_bigLine7,
          l_bigLine8,
          l_bigLine9,
          l_bigLine10,
          l_bigLine11,
          l_bigLine12,
          l_bigLine13,
        ];

  const smallLineArr =
    colorMode === "dark"
      ? [
          smallLine1,
          smallLine2,
          smallLine3,
          smallLine4,
          smallLine5,
          smallLine6,
          smallLine7,
          smallLine8,
          smallLine9,
          smallLine10,
          smallLine11,
          smallLine12,
          smallLine13,
        ]
      : [
          l_smallLine1,
          l_smallLine2,
          l_smallLine3,
          l_smallLine4,
          l_smallLine5,
          l_smallLine6,
          l_smallLine7,
          l_smallLine8,
          l_smallLine9,
          l_smallLine10,
          l_smallLine11,
          l_smallLine12,
          l_smallLine13,
        ];
  useEffect(() => {
    if (selectedTab1 === false) {
      isAlreadyMoved = true;
    }
    isAlreadyMoved = false;
  }, [selectedTab1]);

  return (
    // <Flex
    //   w={"700px"}
    //   h={"700px"}
    //   pos="relative"
    //   mt={"100px"}
    //   alignItems={"center"}
    //   justifyContent={"center"}
    // >
    <>
      <Flex pos={"absolute"}>
        <motion.div
          animate={
            isMobileAnimation
              ? selectedTab1
                ? {
                    opacity: 1,
                  }
                : { opacity: 0 }
              : selectedTab1
              ? isAlreadyMoved
                ? {
                    opacity: 1,
                    x: 150,
                  }
                : {}
              : {
                  opacity: 0.4,
                  x: -150,
                }
          }
          transition={{ duration: 2 }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 1,
            width: "100vh",
            // width: `${width - 100}px`,
          }}
        >
          {!isMobile ? (
            bigLineArr.map((imgSrc: any, index: number) => {
              return (
                <MotionWapper
                  src={imgSrc}
                  key={`${index}_bgline`}
                  duration={
                    index < 6
                      ? randomNumsArr[index]
                      : secondRandomNumsArr[index - 6]
                  }
                ></MotionWapper>
              );
            })
          ) : (
            <MotionWapper
              src={colorMode === "dark" ? MobileCircle : l_MobileCircle}
              duration={8}
            ></MotionWapper>
          )}
        </motion.div>
      </Flex>
      <Flex pos={"absolute"} zIndex={zIndexStyle.AlwaysTopBelowHeader}>
        <motion.div
          animate={
            isMobileAnimation
              ? selectedTab1
                ? {}
                : {
                    opacity: 1,
                  }
              : selectedTab1
              ? isAlreadyMoved
                ? {
                    x: -150,
                    y: 250,
                    opacity: 0.5,
                  }
                : {}
              : {
                  x: 150,
                  y: -250,
                  opacity: 1,
                }
          }
          transition={{
            duration: selectedTab1 && isAlreadyMoved ? 1 : 2,
          }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "360px",
            // width: `${width - 100}px`,
            opacity: 0.5,
          }}
        >
          {selectedTab1 === false && (
            <LightPointText selectedTab1={selectedTab1}></LightPointText>
          )}
          {smallLineArr.map((imgSrc: any, index: number) => {
            if (width < 1040 && index < 2) {
              return null;
            }
            return (
              <MotionWapper
                src={imgSrc}
                clockDirection={true}
                key={`${index}_bgline`}
                duration={
                  selectedTab1
                    ? index < 6
                      ? randomNumsArr[index]
                      : secondRandomNumsArr[index - 6]
                    : index < 6
                    ? randomNumsArr[index] - 3
                    : secondRandomNumsArr[index - 6] - 3
                }
                style={
                  width < 530
                    ? selectedTab1
                      ? {
                          width: "200px",
                        }
                      : { border: "none" }
                    : {}
                }
              ></MotionWapper>
            );
          })}
          <motion.div
            style={{ position: "absolute", opacity: 0 }}
            animate={
              selectedTab1
                ? {}
                : {
                    opacity: 1,
                  }
            }
            transition={
              selectedTab1
                ? {}
                : {
                    duration: 5,
                  }
            }
          >
            <Text
              fontSize={28}
              fontWeight={"bold"}
              color={colorMode === "dark" ? "white.100" : "gray.800"}
            >
              TOS
            </Text>
          </motion.div>
        </motion.div>
      </Flex>
      <motion.div
        animate={
          isMobileAnimation
            ? selectedTab1
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                }
            : selectedTab1
            ? isAlreadyMoved
              ? { x: 150 }
              : {}
            : {
                x: -150,
              }
        }
        transition={{
          duration: 2,
        }}
      >
        <Flex
          pos={"relative"}
          fontSize={width > 530 ? 28 : 21}
          fontWeight={"bold"}
          color={
            colorMode === "dark"
              ? selectedTab1
                ? "white.100"
                : "#64646f"
              : selectedTab1
              ? "gray.800"
              : "gray.700"
          }
          top={"-10px"}
          width={"100%"}
          minW={"100%"}
          justifyContent={"center"}
          zIndex={zIndexStyle.AlwaysTopBelowHeader}
        >
          <Text
            pos={"absolute"}
            left={width > 900 ? "-330px" : width > 530 ? "-230px" : "-150px"}
          >
            TON
          </Text>
          <Text
            pos={"absolute"}
            left={width > 900 ? "270px" : width > 530 ? "100px" : "50px"}
            color={
              colorMode === "dark"
                ? selectText === 1
                  ? ""
                  : selectedTab1
                  ? "white.100"
                  : "#64646f"
                : selectText === 1
                ? ""
                : selectedTab1
                ? "gray.800"
                : "gray.700"
            }
          >
            TONStarter
          </Text>
        </Flex>
      </motion.div>
      {/* </Flex> */}
    </>
  );
}

function IntroCircle(props: { selectedTab1: boolean }) {
  const { selectedTab1 } = props;
  const [width] = useWindowDimensions();
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const height = useMemo(() => {
    if (width > 1024) {
      return "730px";
    }
    if (width > 530) {
      return "400px";
    }
    return "310px";
  }, [width]);

  return (
    <Flex
      // minW={"100vh"}
      // maxW={"100vh"}
      w={"350px"}
      h={height}
      mt={width < 530 ? "40px" : "120px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <TabOneCircle selectedTab1={selectedTab1} width={width} />
      <BackgroundLines selectedTab1={selectedTab1} />
    </Flex>
  );
}

export default IntroCircle;
