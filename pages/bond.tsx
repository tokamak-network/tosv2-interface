import { Flex, useTheme } from "@chakra-ui/react";
import PageLayout from "components/layout/PageLayout";

const Bond = () => {
  const theme = useTheme();

  return (
    <Flex w={"100%"}>
      <Flex {...theme.PAGE_LAYOUT_STYLE} bg={"red"}>
        <PageLayout></PageLayout>
      </Flex>
    </Flex>
  );
};

export default Bond;
