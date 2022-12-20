import { Flex, Text, useColorMode } from "@chakra-ui/react";
import BasicTooltip from "common/tooltip";
import useModal from "hooks/useModal";
import { IBottomContentProps } from "types/common/modal";
import GradientSpinner from "../GradientSpinner";

function IBottomContent(props: IBottomContentProps) {
  const {
    title,
    content,
    tooltip,
    secondContent,
    thirdContent,
    secondTooltip,
    thirdTooltip,
    fourthTooltip,
  } = props;
  const { colorMode } = useColorMode();
  const { isModalLoading } = useModal();
  return (
    <Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        fontSize={14}
        mt={"9px"}
      >
        <Flex justifyContent={"flex-start"}>
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.1000"}
            mr={"6px"}
          >
            {title}
          </Text>
          {tooltip ? <BasicTooltip label={tooltip} /> : <></>}
        </Flex>
        {isModalLoading ? (
          <Flex w={"150px"}>
            <GradientSpinner></GradientSpinner>
          </Flex>
        ) : (
          <Flex justifyContent={"flex-end"}>
            <Flex>
              <Text
                color={colorMode === "dark" ? "white.200" : "gray.800"}
                fontWeight={600}
                mr="6px"
              >
                {content}
              </Text>
              {secondTooltip && <BasicTooltip label={secondTooltip} />}
              {secondContent && (
                <Text color={"#64646f"} mx={"5px"}>
                  /
                </Text>
              )}
              {secondContent && (
                <Text
                  color={colorMode === "dark" ? "white.200" : "gray.800"}
                  fontWeight={600}
                  mr={"6px"}
                >
                  {secondContent}
                </Text>
              )}
              {thirdTooltip && <BasicTooltip label={thirdTooltip} />}
              {thirdContent && (
                <Text color={"#64646f"} mx={"5px"}>
                  /
                </Text>
              )}
              {thirdContent && (
                <Text
                  color={colorMode === "dark" ? "white.200" : "gray.800"}
                  fontWeight={600}
                  mr={"6px"}
                >
                  {thirdContent}
                </Text>
              )}
              {fourthTooltip && <BasicTooltip label={fourthTooltip} />}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default IBottomContent;
