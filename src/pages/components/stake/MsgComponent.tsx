import { Flex, Text } from "@chakra-ui/react";

function MsgComponent(props: { msg: string }) {
  const { msg } = props;
  return (
    <Flex pt={"20px"} w={"100%"} justifyContent={"center"}>
      <Text fontSize={24} fontWeight={600} color={"#f1f1f1"}>
        {msg}
      </Text>
    </Flex>
  );
}

export default MsgComponent;
