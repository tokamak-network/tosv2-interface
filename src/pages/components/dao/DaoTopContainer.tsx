import {
  Flex,
  Text,
  useColorMode,
  useTheme,
  Link,
  Button,
  useMediaQuery
  
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import SubmitButton from "common/button/SubmitButton";
import Image from "next/image";
import ResourcesIcon from "assets/icons/resources_icon.png";

function DaoTopContainer() {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const theme = useTheme();
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const sendToStake = () => {
    router.push("/stake");
  };

  return (
    <Flex
      display={isOpen ? "Flex" : "none"}
      w={"100%"}
      mb={smallerThan1024?'30px' :"60px"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems="center"
      px="102px"
    >
      <Text
        color={colorMode === "dark" ? "gray.100" : "gray.1000"}
        textAlign="center"
        fontSize={"14px"}
        lineHeight={1.71}
        letterSpacing="0.35px"
        fontWeight={"normal"}
      >
        Stake TOS to get LTOS & sTOS.
      </Text>
      <Text
        color={colorMode === "dark" ? "gray.100" : "gray.1000"}
        textAlign="center"
        fontSize={"14px"}
        mb={smallerThan1024?'30px' :"40px"}
        lineHeight={1.71}
        letterSpacing="0.35px"
        fontWeight={"normal"}
      >
        LTOS is an indexed token that increases your TOS holding and sTOS token
        is required to obtain the rights for decision making or sharing
        additional profits made from the TONStarter platform.
      </Text>

      <SubmitButton
        name="Go to Stake"
        w={"200px"}
        h={"40px"}
        style={{ fontSize: "14px" }}
        onClick={sendToStake}
      ></SubmitButton>
      <Text
        fontSize={"22px"}
        color={colorMode === "light" ? "gray.800" : "white.200"}
        letterSpacing="0.55px"
        fontWeight="bold"
        mt={smallerThan1024? '45px':"60px"}
      >
        Governance
      </Text>
      <Text
        mt="12px"
        mb="30px"
        color={colorMode === "dark" ? "gray.100" : "gray.1000"}
      >
        Go vote and be an owner of TONStarter
      </Text>
      <Link
        _hover={{ textDecoration: "none" }}
        style={{ textDecoration: "none" }}
        isExternal
        href={`https://snapshot.org/#/tonstarter.eth`}
      >
        <Button
          w={"200px"}
          h={"40px"}
          _hover={{ textDecoration: "none" }}
          _focus={{ backgroundColor: "#257eee" }}
          {...theme.BUTTON_STYLE.submitButtonStyle(colorMode)}
          fontSize={"14px"}
        >
          <Text mr="23px">Go to governance</Text>
          <Image src={ResourcesIcon} />
        </Button>
      </Link>
      {/* <SubmitButton
        name="Go to governance"
        w={"200px"}
        h={"40px"}
        style={{ fontSize: "14px" }}
        onClick={sendToStake}
        iconName={"ResourcesIcon"}
        iconLocation={'right'}
      ></SubmitButton> */}
    </Flex>
  );
}

export default DaoTopContainer;
