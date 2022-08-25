import { Flex, Text, useColorMode } from "@chakra-ui/react";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import useModal from "hooks/useModal";
import { MyCardProps } from "types/bond";
import { useState } from "react";
import CustomCheckBox from "common/input/CustomCheckBox";

function ContentComponent(props: {
  title: string;
  content: string;
  style?: any;
}) {
  const { title, content, style } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={colorMode === "dark" ? "gray.100" : "gray.1000"}>
        {title}
      </Text>
      <Text color={colorMode === "dark" ? "white.200" : "gray.800"}>
        {content}
      </Text>
    </Flex>
  );
}

function MyCard(props: MyCardProps) {
  const { info, tokenType, isOver } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={"column"}
      w={"362px"}
      h={"200px"}
      borderWidth={1}
      borderColor={colorMode === "dark" ? "gray3600" : "gray.900"}
      borderRadius={10}
      bg={colorMode === "dark" ? "gray.600" : "white.100"}
      pt={"18px"}
      px={"20px"}
      pb={"21px"}
    >
      <Flex mb={"18px"} justifyContent={"space-between"}>
        <Flex>
          <TokenSymbol tokenType={tokenType}></TokenSymbol>
          <Text
            fontSize={20}
            fontWeight={600}
            textAlign={"center"}
            lineHeight={"46px"}
            color={colorMode === "light" ? "gray.800" : "white.200"}
            ml={"12px"}
          >
            {tokenType}
          </Text>
        </Flex>
        <Flex
          fontSize={12}
          color={isOver ? "blue.200" : "red.100"}
          textAlign={"center"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Text>{isOver ? "Unlocked" : "Locked"}</Text>
        </Flex>
      </Flex>
      {info?.map((infoData, index: number) => {
        return (
          <ContentComponent
            title={infoData.title}
            content={infoData.content}
            style={{ marginBottom: index !== info.length - 1 ? "9px" : "3px" }}
            key={infoData.title + index}
          ></ContentComponent>
        );
      })}
      <Flex
        justifyContent={"flex-end"}
        fontSize={9}
        mb={"21px"}
        color={"#eaeaf4"}
      >
        <Text color={colorMode === "dark" ? "#eaeaf4" : "#16161e"}>
          2022. 12. 26 12:58 ~ 12. 31 12:59
        </Text>
      </Flex>
      {/* <Flex alignItems="center" justifyContent={isDisabled ? "" : "center"}>
        {isDisabled && (
          <>
            <CustomCheckBox
              pageKey="Bond_screen"
              value={""}
              valueKey={""}
            ></CustomCheckBox>
            <Text ml={"9px"} mr={"20px"}>
              Select
            </Text>
          </>
        )}
      </Flex> */}
    </Flex>
  );
}

export default MyCard;
