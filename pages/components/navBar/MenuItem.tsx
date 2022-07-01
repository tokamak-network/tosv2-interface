import { Flex, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";

type MenuItemProps = {
  icon: any;
  title: string;
};

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { icon, title } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex w={206} h={54} borderRadius={10} alignItems={"center"} pl={15}>
      <Image src={icon} alt={"Menu_Item"}></Image>
      <Text ml={9} fontSize={14}>
        {title}
      </Text>
    </Flex>
  );
};

export default MenuItem;
