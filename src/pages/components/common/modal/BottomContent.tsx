import { Flex, Text, useColorMode } from "@chakra-ui/react";
import BasicTooltip from "common/tooltip";
import useModal from "hooks/useModal";
import { useMemo } from "react";
import GradientSpinner from "../GradientSpinner";

function BottomContent(props: {
  title: string;
  content: string | { ltos: string | undefined; stos: string | undefined };
  tooltip?: boolean;
  tooltipMessage?: string;
  secondTooltip?: string;
  thirdTooltip?: string;
}) {
  const {
    title,
    content,
    tooltip,
    tooltipMessage,
    secondTooltip,
    thirdTooltip,
  } = props;
  const { colorMode } = useColorMode();
  const { isModalLoading } = useModal();

  const ContentComponent = useMemo(() => {
    switch (title) {
      case "You Will Get":
        if (typeof content === "string") {
          return (
            <Flex>
              <Text
                color={colorMode === "dark" ? "white.200" : "gray.800"}
                fontWeight={600}
                mr={"6px"}
              >
                {content}
              </Text>
              <BasicTooltip label={secondTooltip} />
            </Flex>
          );
        }
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
              mr={"6px"}
            >
              {(typeof content !== "string" && content.ltos) || "-"} LTOS
            </Text>
            <BasicTooltip label={secondTooltip} />
            <Text color={"#64646f"} mx={"5px"}>
              /
            </Text>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
              mr={"6px"}
            >
              {(typeof content !== "string" && content.stos) || "-"} sTOS
            </Text>
            <BasicTooltip label={thirdTooltip} />
          </Flex>
        );
      default:
        return (
          <Flex>
            <Text
              color={colorMode === "dark" ? "white.200" : "gray.800"}
              fontWeight={600}
            >
              {content as string}
            </Text>
            {secondTooltip && (
              <Flex ml={"6px"}>
                <BasicTooltip label={secondTooltip} />
              </Flex>
            )}
          </Flex>
        );
    }
  }, [title, content, colorMode, secondTooltip, thirdTooltip]);

  return (
    <Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        fontSize={14}
        mt={"9px"}
      >
        <Flex alignItems={"center"}>
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.1000"}
            mr={"6px"}
          >
            {title}
          </Text>
          {tooltip ? <BasicTooltip label={tooltipMessage} /> : <></>}
        </Flex>
        {isModalLoading ? (
          <Flex w={"100px"} h={"21px"}>
            <GradientSpinner></GradientSpinner>
          </Flex>
        ) : (
          ContentComponent
        )}
      </Flex>
    </Flex>
  );
}

export default BottomContent;
