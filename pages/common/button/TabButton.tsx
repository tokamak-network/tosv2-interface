import { Box, Flex } from "@chakra-ui/react";

type TabButtonProps = {
  nameList: string[];
  tabIndex: number;
  onClick: React.SetStateAction<any>;
};

function TabButton(props: TabButtonProps) {
  const { nameList, tabIndex, onClick } = props;
  return (
    <Flex
      fontSize={14}
      fontWeight={600}
      textAlign="center"
      lineHeight={"40px"}
      justifyContent="center"
    >
      {nameList.map((name, index) => {
        return (
          <Box
            onClick={() => onClick(index)}
            cursor={"pointer"}
            key={name + index}
            w={"102px"}
            h={"40px"}
            borderWidth={1}
            borderColor={"gray.300"}
            borderLeftRadius={index === 0 ? 14 : 0}
            borderLeftWidth={index !== 0 ? 0 : 1}
            borderRightRadius={index === nameList.length - 1 ? 14 : 0}
            _hover={{ color: "white.100", bgColor: "blue.100" }}
            bgColor={tabIndex === index ? "blue.100" : ""}
            color={tabIndex === index ? "white.100" : "gray.200"}
          >
            {name}
          </Box>
        );
      })}
    </Flex>
  );
}

export default TabButton;
