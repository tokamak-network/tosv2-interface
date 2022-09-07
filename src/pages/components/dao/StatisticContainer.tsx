import {
  Flex,
  Text,
  useColorMode,
  useTheme,
  Link,
  Button,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";

function StatContainer(props: { title: string; data: any }) {
  const { colorMode } = useColorMode();
  const { title, data } = props;

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w="100%"
      flexDir={"column"}
    >
      <Text
        fontSize={"22px"}
        fontWeight="bold"
        letterSpacing={"0.55px"}
        color={colorMode === "dark" ? "white.200" : "gray.800"}
        mb="24px"
      >
        {title}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" w={"100%"}>
        {data.map((stat: any, index: number) => {
          return (
            <GridItem
              display={"flex"}
              flexDir="column"
              key={index}
              justifyContent="center"
              alignItems={"center"}
              mb={"70px"}
            >
              <Text
                fontSize={"14px"}
                fontWeight={600}
                letterSpacing={"0.14px"}
                color={"blue.200"}
                mb={"6px"}
              >
                {stat.title}
              </Text>
              <Text
                fontSize={"21px"}
                fontWeight={600}
                letterSpacing={"normal"}
                color={colorMode === "dark" ? "white.200" : "gray.800"}
              >
                {stat.value}{" "}
                <span style={{ fontSize: "14px" }}>{stat.symbol}</span>
              </Text>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
}

function UtilityContainer(props: { title: string; data: any }) {
  const { colorMode } = useColorMode();
  const { title, data } = props;

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w="100%"
      flexDir={"column"}
    >
      <Text
        fontSize={"22px"}
        fontWeight="bold"
        letterSpacing={"0.55px"}
        color={colorMode === "dark" ? "white.200" : "gray.800"}
        mb="24px"
      >
        {title}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" w={"100%"}>
        {data.map((utility: any, index: number) => {
          return (
            <GridItem
              display={"flex"}
              flexDir="column"
              key={index}
              justifyContent="center"
              alignItems={"center"}
              mb={"40px"}
            >
              <Text
                fontSize={"14px"}
                fontWeight={600}
                letterSpacing={"0.14px"}
                color={"blue.200"}
                mb={"6px"}
              >
                {utility.title}
              </Text>
              <Text
                w="204px"
                fontSize={"14px"}
                fontWeight={"normal"}
                letterSpacing={"0.35px"}
                color={colorMode === "dark" ? "gray.100" : "gray.1000"}
                textAlign="center"
              >
                {utility.value}
              </Text>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
}

function MobileStatisticContainer(props: { title: string; data: any }) {
  const { colorMode } = useColorMode();
  const { title, data } = props;

  return (
    <Flex
      w={"100%"}
      minWidth={"336px"}
      maxWidth={"556px"}
      h={"334px"}
      bgColor={colorMode === "dark" ? "gray.600" : "white.100"}
      borderRadius={14}
      borderWidth={1}
      flexDir="column"
      alignItems={'center'}
      py={'30px'}
      borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
    >
       <Text
        fontSize={"22px"}
        fontWeight="bold"
        letterSpacing={"0.55px"}
        color={colorMode === "dark" ? "white.200" : "gray.800"}
        mb="24px"
      >
        {title}
      </Text>
      {data.map((stat: any, index: number) => {
        return (
            <Flex flexDir={'column'} alignItems='center' key={index}>
              <Text
                fontSize={"14px"}
                fontWeight={600}
                letterSpacing={"0.14px"}
                color={"blue.200"}
                mb={"6px"}
              >
                {stat.title}
              </Text>
              <Text
                fontSize={"21px"}
                fontWeight={600}
                mb='24px'
                letterSpacing={"normal"}
                color={colorMode === "dark" ? "white.200" : "gray.800"}
              >
                {stat.value}{" "}
                <span style={{ fontSize: "14px" }}>{stat.symbol}</span>
              </Text>
            </Flex>
        )
      })}
    </Flex>
  );
}

function MobileUtilityContainer(props: { title: string; data: any }) {
    const { colorMode } = useColorMode();
    const { title, data } = props;
  return (
    <Flex
      w={"100%"}
      minWidth={"336px"}
      maxWidth={"556px"}
      h={"370px"}
      bgColor={colorMode === "dark" ? "gray.600" : "white.100"}
      borderRadius={14}
      borderWidth={1}
      flexDir="column"
      alignItems={'center'}
      py={'30px'}
      borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
    >
       <Text
        fontSize={"22px"}
        fontWeight="bold"
        letterSpacing={"0.55px"}
        color={colorMode === "dark" ? "white.200" : "gray.800"}
        mb="24px"
      >
        {title}
      </Text>
      {data.map((stat: any, index: number) => {
        return (
            <Flex flexDir={'column'} alignItems='center' key={index}>
             <Text
                fontSize={"14px"}
                fontWeight={600}
                letterSpacing={"0.14px"}
                color={"blue.200"}
                mb={"6px"}
              >
                {stat.title}
              </Text>
              <Text
                w="204px"
                fontSize={"14px"}
                fontWeight={"normal"}
                letterSpacing={"0.35px"}
                mb='24px'
                color={colorMode === "dark" ? "gray.100" : "gray.1000"}
                textAlign="center"
              >
                {stat.value}
              </Text>
            </Flex>
        )
      })}
    </Flex>
  );
}

function StatisticContainer() {
  const { colorMode } = useColorMode();
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const statistics = [
    {
      title: "Total TOS locked",
      value: "1,000,000.00",
      symbol: "TOS",
    },
    {
      title: "Total LTOS",
      value: "1,000,000.00",
      symbol: "LTOS",
    },
    {
      title: "Total sTOS",
      value: "1,000,000.00",
      symbol: "sTOS",
    },
  ];

  const utilities = [
    {
      title: "Get Dividends",
      value: "You can get dividends from Starter project",
    },
    {
      title: "Join Governance",
      value: "You can decide listings of projects for TONStarter",
    },
    {
      title: "Access Exclusive Sales",
      value: "You can join exclusive token sales in TONStarter",
    },
  ];

  return (
    <Flex>
      {smallerThan1024 ? (
        <Flex flexDir={"column"} w={"100%"} alignItems="center" rowGap={'18px'}>
          <MobileStatisticContainer title="DAO statistics" data={statistics} />
          <MobileUtilityContainer title="sTOS Utility" data={utilities} />
        </Flex>
      ) : (
        <Flex
          w={"100%"}
          bgColor={colorMode === "dark" ? "gray.600" : "white.100"}
          borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
          borderRadius={14}
          borderWidth={1}
          pt="40px"
          flexDir={"column"}
        >
          <StatContainer title="DAO statistics" data={statistics} />
          <UtilityContainer title="sTOS Utility" data={utilities} />
        </Flex>
      )}
    </Flex>
  );
}

export default StatisticContainer;
