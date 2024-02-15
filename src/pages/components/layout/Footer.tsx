import { Box, Flex, Text, useMediaQuery, useColorMode } from "@chakra-ui/react";
import useModal from "hooks/useModal";
import { useWindowDimensions } from "hooks/useWindowDimensions";

function Footer() {
  const [width] = useWindowDimensions();
  const mobile = width < 500;
  const { colorMode } = useColorMode();
  const { openModal } = useModal("termsOfUse");

  return null;
}

export default Footer;
