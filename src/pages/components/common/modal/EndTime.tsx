import { getTimeZone } from "@/utils/time";
import { Flex, Text } from "@chakra-ui/react";

function EndTime(props: { time: string }) {
  const { time } = props;
  return (
    <Flex
      h={"19px"}
      color={"#8b8b93"}
      fontSize={12}
      mt={"9px"}
      ml={"auto"}
      mr={"3px"}
    >
      <Text>End Time : {time}</Text>
    </Flex>
  );
}

export default EndTime;
