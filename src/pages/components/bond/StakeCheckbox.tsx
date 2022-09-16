import { color, Flex, Text, useColorMode } from "@chakra-ui/react";
import { checkboxAll, selectedCheckboxState } from "atom/global/checkbox";
import CustomCheckBox from "common/input/CustomCheckBox";
import useModal from "hooks/useModal";
import { useRecoilState, useRecoilValue } from "recoil";

function StakeCheckbox() {
  const { colorMode } = useColorMode();
  const [checkAll, setCheckAll] = useRecoilState(checkboxAll);
  const selectedCards = useRecoilValue(selectedCheckboxState);
  const { openModal } = useModal("stake_multiUnstake_modal", selectedCards);

  return (
    <Flex
      alignItems={"center"}
      justifyContent={["space-between", "space-between", ""]}
      w={["100%", 275, 275]}
    >
      <Flex>
        <CustomCheckBox
          checkAll={true}
          pageKey={"Stake_screen"}
        ></CustomCheckBox>
        <Text
          ml={"9px"}
          // mr={"16px"}
          fontSize={12}
          color={colorMode === "dark" ? "white.200" : "gray.800"}
        >
          Selected : {selectedCards.length}
        </Text>
      </Flex>
      <Flex
        w={"160px"}
        h={"45px"}
        borderWidth={1}
        borderColor={colorMode === "dark" ? "#535353" : "gray.1000"}
        borderRadius={8}
        color={"#5a5a5a"}
        alignItems="center"
        justifyContent={"center"}
        fontSize={14}
        onClick={() => openModal()}
      >
        <Text
          fontSize={14}
          color={colorMode === "dark" ? "#5a5a5a" : "gray.800"}
        >
          Unstake Selected
        </Text>
      </Flex>
    </Flex>
  );
}

export default StakeCheckbox;
