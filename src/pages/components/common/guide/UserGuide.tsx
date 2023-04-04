import { Flex, Text } from "@chakra-ui/react";
import USER_GUIDE from "assets/icons/bond/sicon-user_guide.svg";
import Image from "next/image";

export function UserGuide(props: { title?: string }) {
  return (
    <Flex columnGap={"6px"} pl={"4px"} cursor={"pointer"} onClick={() => {}}>
      <Image src={USER_GUIDE} alt={"USER_GUIDE"}></Image>
      <Text fontSize={13} color={"gray.100"}>
        {props.title ?? "User Guide"}
      </Text>
    </Flex>
  );
}
