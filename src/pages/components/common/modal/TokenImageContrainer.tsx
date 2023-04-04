import { Flex, Text, useColorMode } from "@chakra-ui/react";
import TokenSymbol from "common/token/TokenSymol";
import { SupportedInputTokenTypes } from "types";
import { SupportedToken } from "types/tokens";

function TokenImageContrainer(props: {
  tokenTypes: SupportedInputTokenTypes;
  name: string;
}) {
  const { colorMode } = useColorMode();

  return (
    <Flex columnGap={"9px"} alignItems={"center"}>
      <TokenSymbol
        tokenType={props.tokenTypes}
        w={"24px"}
        h={"24px"}
        isTokenInput={true}
        // imageW={"8.4px"}
        // imageH={"14.4px"}
      ></TokenSymbol>
      <Text color={colorMode === "dark" ? "white.200" : "gray.800"}>
        {props.name}
      </Text>
    </Flex>
  );
}

export default TokenImageContrainer;
