import { Flex, useTheme } from "@chakra-ui/react";
import SmallCardContainer from "components/dashboard/SmallCardContainer";
import PageLayout from "components/layout/PageLayout";

const DashBoard = () => {
  const theme = useTheme();

  return (
    <Flex {...theme.PAGE_LAYOUT_STYLE}>
      <PageLayout></PageLayout>
      <SmallCardContainer></SmallCardContainer>
    </Flex>
  );
};

export default DashBoard;
