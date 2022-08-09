import { Box, Flex,useColorMode } from "@chakra-ui/react";

type TabButtonProps = {
  nameList: string[];
  tabIndex: number;
  onClick: React.SetStateAction<any>;
};

function TabButton(props: TabButtonProps) {
  const { nameList, tabIndex, onClick } = props;
  const { colorMode } = useColorMode();

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
            borderColor={colorMode === 'dark'? "gray.300": '#c6cbd9'}
            borderLeftRadius={index === 0 ? 10 : 0}
            borderLeftWidth={index !== 0 ? 0 : 1}
            borderRightRadius={index === nameList.length - 1 ? 10 : 0}
            _hover={{ color: tabIndex === index ?'white.100': "blue.200", bgColor: tabIndex === index ? ' "blue.100"': "transparent" }}
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
