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

//lights
import lightPoint from "assets/circles/light-point.png";

import Image from "next/image";
import { Box, Flex, Text, position } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { introTextHover, introTextHoverSelectedState } from "atom/intro";

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

  return (
    <>
      <motion.div
        animate={
          selectText === 1 || selectText === 2
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
          selectText === 3
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
          selectText === 3
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
          selectText === 1
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
  const selectText = useRecoilValue(introTextHoverSelectedState);
  return (
    <motion.div
      style={{ position: "relative", opacity: 0 }}
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
              duration: 10,
            }
      }
    >
      <LightPoint></LightPoint>
      <Box
        display={"flex"}
        flexDir={"column"}
        color={selectText === 1 || selectText === 2 ? "#8b8b93" : "#64646f"}
        fontSize={14}
        textAlign={"right"}
        pos="absolute"
        left={"-230px"}
        top={"-130px"}
      >
        <Text
          color={selectText === 1 || selectText === 2 ? "#ec8c56" : "#64646f"}
          fontSize={24}
          fontWeight={"bold"}
        >
          LTOS
        </Text>
        <Text>Earn interest</Text>
        <Text>in TOS</Text>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        color={selectText === 1 ? "#8b8b93" : "#64646f"}
        fontSize={14}
        textAlign={"right"}
        pos="absolute"
        left={"-320px"}
        top={"90px"}
      >
        <Text
          color={selectText === 1 ? "#ec8c56" : "#64646f"}
          fontSize={24}
          fontWeight={"bold"}
        >
          sTOS
        </Text>
        <Text>Participate in governance </Text>
        <Text>Earn airdrop </Text>
        <Text>Participate in IDO</Text>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        color={selectText === 3 ? "#8b8b93" : "#64646f"}
        fontSize={14}
        textAlign={"left"}
        pos="absolute"
        left={"150px"}
        top={"-130px"}
        w={"150px"}
      >
        <Text
          color={selectText === 3 ? "#ec8c56" : "#64646f"}
          fontSize={24}
          fontWeight={"bold"}
        >
          dTOS
        </Text>
        <Text>High discount rate</Text>
        <Text>for bonding</Text>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        color={selectText === 3 ? "#8b8b93" : "#64646f"}
        fontSize={14}
        textAlign={"left"}
        pos="absolute"
        left={"150px"}
        top={"90px"}
        w={"200px"}
      >
        <Text
          color={selectText === 3 ? "#ec8c56" : "#64646f"}
          fontSize={24}
          fontWeight={"bold"}
        >
          BOND
        </Text>
        <Text>Raise capital for</Text>
        <Text>TONStarter Ecosystem</Text>
      </Box>
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
      style={{ position: "absolute", opacity: opacity ?? 1, ...style }}
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

  return (
    <Flex pos={"absolute"}>
      <motion.div
        animate={
          selectedTab1
            ? {}
            : {
                x: -150,
                opacity: 0,
              }
        }
        transition={
          selectedTab1
            ? {}
            : {
                duration: 4,
              }
        }
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "800px",
          height: "800px",
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

function TabOneCircle(props: { selectedTab1: boolean }) {
  const { selectedTab1 } = props;
  const randomNumsArr = randomNums();
  const secondRandomNumsArr = randomNums();

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
            selectedTab1
              ? {}
              : {
                  opacity: 0.4,
                  x: -150,
                }
          }
          transition={
            selectedTab1
              ? {}
              : {
                  duration: 4,
                }
          }
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1000px",
            height: "1000px",
            opacity: 1,
          }}
        >
          {[
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
      <Flex pos={"absolute"}>
        <motion.div
          animate={
            selectedTab1
              ? {}
              : {
                  x: 150,
                  y: -250,
                  opacity: 1,
                }
          }
          transition={
            selectedTab1
              ? {}
              : {
                  duration: 4,
                }
          }
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "550px",
            height: "550px",
            opacity: 0.5,
          }}
        >
          {selectedTab1 === false && (
            <LightPointText selectedTab1={selectedTab1}></LightPointText>
          )}
          {[
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
            ,
          ].map((imgSrc: any, index: number) => {
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
              ></MotionWapper>
            );
          })}
        </motion.div>
      </Flex>
      <motion.div
        animate={
          selectedTab1
            ? {}
            : {
                x: -150,
              }
        }
        transition={
          selectedTab1
            ? {}
            : {
                duration: 4,
              }
        }
      >
        <Flex
          pos={"relative"}
          fontSize={28}
          fontWeight={"bold"}
          color={"white.100"}
          top={"-10px"}
        >
          <Text pos={"absolute"} left={"-350px"}>
            TON
          </Text>
          <Text pos={"absolute"} left={"284px"}>
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
  return (
    <Flex
      w={"700px"}
      h={"700px"}
      pos="relative"
      mt={"120px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <TabOneCircle selectedTab1={selectedTab1} />
      <BackgroundLines selectedTab1={selectedTab1} />
    </Flex>
  );
}

export default IntroCircle;
