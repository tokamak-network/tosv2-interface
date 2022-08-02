import { Flex, Text } from "@chakra-ui/react";
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
  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={"gray.100"}>{title}</Text>
      <Text color={"white.200"}>{content}</Text>
    </Flex>
  );
}

function MyCard(props: MyCardProps) {
  const { info, tokenType } = props;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return (
    <Flex
      flexDir={"column"}
      w={"362px"}
      h={"250px"}
      borderWidth={1}
      borderColor={"gray.600"}
      borderRadius={10}
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
            color={"white.200"}
            ml={"12px"}
          >
            {tokenType}
          </Text>
        </Flex>
        <Flex
          fontSize={12}
          color={isDisabled ? "blue.200" : "red.100"}
          textAlign={"center"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Text>{isDisabled ? "Pending" : "Ended"}</Text>
        </Flex>
      </Flex>
      {info.map((infoData, index: number) => {
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
        <Text>2022. 12. 26 12:58 ~ 12. 31 12:59</Text>
      </Flex>
      <Flex alignItems="center" justifyContent={isDisabled ? "" : "center"}>
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
        <BasicButton
          name={isDisabled ? "Pending" : "Unstake"}
          h={"33px"}
          isDisabled={isDisabled}
        ></BasicButton>
      </Flex>
    </Flex>
  );
}

export default MyCard;
