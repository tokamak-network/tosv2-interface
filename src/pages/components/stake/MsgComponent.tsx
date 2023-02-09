import { Flex, Text, useTheme, useColorMode } from "@chakra-ui/react";

function MsgComponent(props: { msg: string }) {
  const { msg } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Flex pt={"20px"} w={"100%"} justifyContent={"center"}>
      <Text fontSize={24} fontWeight={600} color={colorMode ==='dark'? "#f1f1f1":'gray.800'}>
        {msg}
      </Text>
    </Flex>
  );
}

export default MsgComponent;
