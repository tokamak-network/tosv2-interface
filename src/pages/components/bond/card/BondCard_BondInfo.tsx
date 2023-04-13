import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import BasicTooltip from "common/tooltip";
import { ReactNode } from "react";

export type BondInfoDataMap = { title: ReactNode; content: ReactNode }[];
export type BondInfoProps = { bondInfoData: BondInfoDataMap };

export function TitleComponent(props: {
  title: string;
  subTitle?: string;
  tooltip?: boolean;
  label?: string;
}) {
  const { title, subTitle, tooltip, label } = props;
  return (
    <Flex
      color={"gray.100"}
      fontSize={14}
      alignItems={"center"}
      lineHeight={"20px"}
      h={"100%"}
    >
      <Flex>
        <Text>{title}</Text>
        {subTitle && (
          <Text fontSize={12} ml={"3px"}>
            {" / "}
            {subTitle}
          </Text>
        )}
      </Flex>
      {tooltip && (
        <Flex pb={"2px"} ml={"3px"}>
          <BasicTooltip label={label} placement={"bottom"} />
        </Flex>
      )}
    </Flex>
  );
}

export function ContentComponent(props: {
  content: string;
  customContentNode?: ReactNode;
  subContent?: string;
  subContentHighlight?: boolean;
  subContentNode?: ReactNode;
  style?: {};
}) {
  const {
    content,
    customContentNode,
    subContent,
    subContentHighlight,
    subContentNode,
    style,
  } = props;
  return (
    <Flex
      color={"white.200"}
      fontWeight={600}
      fontSize={14}
      height={"20px"}
      lineHeight={"20px"}
      alignItems={"end"}
      textAlign={"end"}
      {...style}
    >
      {customContentNode ?? (
        <>
          <Text>{content}</Text>
          <Text
            fontSize={subContentHighlight ? 14 : 12}
            fontWeight={subContentHighlight ? 600 : "normal"}
            ml={subContent ? "3px" : ""}
            display={"flex"}
          >
            {subContent && " / "}
            {subContent && <Box>{subContent}</Box>}
            {subContentNode}
          </Text>
        </>
      )}
    </Flex>
  );
}

function InfoComponent(props: { title: ReactNode; content: ReactNode }) {
  const { title, content } = props;
  const { colorMode } = useColorMode();
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"end"}
      fontSize={14}
      // h={"20px"}
    >
      {title}
      {content}
    </Flex>
  );
}

export default function BondCard_BondInfo(props: BondInfoProps) {
  const { bondInfoData } = props;
  return (
    <Flex flexDir={"column"} rowGap={"9px"}>
      {bondInfoData?.map((data, index) => {
        return (
          <InfoComponent
            title={data.title}
            content={data.content}
            key={`bondInfodata_${index}`}
          ></InfoComponent>
        );
      })}
    </Flex>
  );
}
