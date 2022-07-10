import { Flex, Text } from "@chakra-ui/react";
import CustomCheckBox from "common/input/CustomCheckBox";

function StakeCheckbox() {
  return (
    <Flex alignItems={"center"}>
      <CustomCheckBox></CustomCheckBox>
      <Text ml={"9px"} mr={"17px"}>
        Selected : {0}
      </Text>
      <Flex
        w={"160px"}
        h={"45px"}
        borderWidth={1}
        borderColor={"#535353"}
        borderRadius={8}
        color={"#5a5a5a"}
        alignItems="center"
        justifyContent={"center"}
      >
        <Text fontSize={14}>Unstake Selected</Text>
      </Flex>
    </Flex>
  );
}

export default StakeCheckbox;
