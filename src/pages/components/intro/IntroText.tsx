import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { introTextHover } from "atom/intro";
import { useRecoilState } from "recoil";

const contents: {
  title: string;
  content: { contentText: string; link?: string }[];
}[] = [
  {
    title: "Tokamak Network is ON-DEMAND ETHEREUM LAYER 2 PLATFORM",
    content: [
      {
        contentText:
          "A protocol and a platform that easily and securely builds and connects Layer 2 networks",
      },
      {
        contentText:
          "Any projects can easily deploy on Tokamak Network and be connected to each other",
        link: "go",
      },
    ],
  },
  {
    title: "TONStarter is a launching platform for L2 Project",
    content: [
      {
        contentText:
          "This includes the right to invest in projects launched in TONStarter launchpad platform",
        link: "go",
      },
    ],
  },
  {
    title: "TON is the native token in Tokamak network ecosystem",
    content: [
      {
        contentText: "You can purchase it from CEX or DEX",
        link: "go",
      },
    ],
  },
];

function ContentContainer(props: {
  title: string;
  content: { contentText: string; link?: string }[];
}) {
  const { title, content } = props;
  return (
    <Flex flexDir={"column"} textAlign={"center"}>
      <Text
        color={"white.200"}
        fontSize={22}
        fontWeight={"bold"}
        h={"31px"}
        mb={"12px"}
      >
        {title}
      </Text>
      {content.map((content, index) => (
        <Text
          key={index}
          h={"22px"}
          lineHeight={1.71}
          fontSize={14}
          color={"gray.100"}
        >
          - {content.contentText}
          {content.link && (
            <Link
              href={content.link}
              isExternal={true}
              color={"blue.200"}
              ml={"11px"}
            >
              + more
            </Link>
          )}
        </Text>
      ))}
    </Flex>
  );
}

function TosContentContainer() {
  const [selectText, setSelectText] = useRecoilState(introTextHover);

  return (
    <Flex flexDir={"column"} rowGap={"45px"}>
      <Flex flexDir={"column"} textAlign={"center"}>
        <Text
          color={"white.200"}
          fontSize={22}
          fontWeight={"bold"}
          h={"31px"}
          mb={"12px"}
        >
          TOS is the native token in TONStarter ecosystem
        </Text>
        <Text h={"22px"} lineHeight={1.71} fontSize={14} color={"gray.100"}>
          - You can get TOS using{" "}
          <Link
            isExternal={true}
            href={"https://swap.tokamak.network/"}
            color={"white.100"}
            textDecoration={"underline"}
          >
            Swap
          </Link>{" "}
          or from staking TON
        </Text>
        <Text h={"22px"} lineHeight={1.71} fontSize={14} color={"gray.100"}>
          - TOS is designed to facilitate TON⇄TONStarter ecosystem growth
          <Link href={""} isExternal={true} color={"blue.200"} ml={"11px"}>
            + more
          </Link>
        </Text>
      </Flex>
      <Flex flexDir={"column"} textAlign={"center"}>
        <Text
          color={"white.200"}
          fontSize={22}
          fontWeight={"bold"}
          h={"31px"}
          mb={"12px"}
        >
          TOS can be…
        </Text>
        <Box
          display={"flex"}
          flexDir={"column"}
          color={selectText === 1 ? "white.200" : "gray.100"}
          _hover={{
            cursor: "pointer",
          }}
          onMouseOver={() => setSelectText(1)}
          onMouseLeave={() => setSelectText(undefined)}
        >
          <Flex h={"22px"} lineHeight={1.71} fontSize={14}>
            - locked for sTOS and{" "}
            <Text color={"#ec8c56"} ml={"5px"}>
              LTOS
            </Text>
            , where{" "}
            <Text color={"#ec8c56"} mx={"5px"}>
              sTOS
            </Text>{" "}
            is used to participate in TONStarter governance,
          </Flex>
          <Text h={"22px"} lineHeight={1.71} fontSize={14}>
            receive airdrops from projects, and participate in IDO
            {selectText === 1 && (
              <Link
                pos={"absolute"}
                href={""}
                isExternal={true}
                color={"blue.200"}
                ml={"11px"}
              >
                + more
              </Link>
            )}
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          color={selectText === 2 ? "white.200" : "gray.100"}
          _hover={{
            cursor: "pointer",
          }}
          onMouseOver={() => setSelectText(2)}
          onMouseLeave={() => setSelectText(undefined)}
        >
          <Flex h={"22px"} lineHeight={1.71} fontSize={14} my={"6px"}>
            - staked for{" "}
            <Text color={"#ec8c56"} ml={"5px"}>
              LTOS
            </Text>
            , that earns compound interest in TOS based on LTOS index every 8
            hours
            <Text>
              {selectText === 2 && (
                <Link
                  pos={"absolute"}
                  href={""}
                  isExternal={true}
                  color={"blue.200"}
                  ml={"11px"}
                >
                  + more
                </Link>
              )}
            </Text>
          </Flex>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          color={selectText === 3 ? "white.200" : "gray.100"}
          _hover={{
            cursor: "pointer",
          }}
          onMouseOver={() => setSelectText(3)}
          onMouseLeave={() => setSelectText(undefined)}
        >
          <Flex
            h={"22px"}
            lineHeight={1.71}
            fontSize={14}
            alignItems={"center"}
            justifyContent={"center"}
          >
            - used to create Uniswap LP token that can be locked to get
            <Text color={"#ec8c56"} ml={"5px"}>
              dTOS
            </Text>
            ,
          </Flex>
          <Flex
            h={"22px"}
            lineHeight={1.71}
            fontSize={14}
            justifyContent={"center"}
          >
            a non transferrable discount token that greatly reduces the price
            for
            <Text color={"#ec8c56"} ml={"5px"}>
              bonding
            </Text>
            <Text>
              {selectText === 3 && (
                <Link
                  pos={"absolute"}
                  href={""}
                  isExternal={true}
                  color={"blue.200"}
                  ml={"11px"}
                >
                  + more
                </Link>
              )}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

function IntroText(props: { selectedTab1: boolean }) {
  const { selectedTab1 } = props;
  return (
    <Flex mt={"45px"} rowGap={"45px"} flexDir={"column"} zIndex={1000}>
      {selectedTab1 ? (
        contents.map((content, index) => (
          <ContentContainer
            title={content.title}
            content={content.content}
            key={index}
          ></ContentContainer>
        ))
      ) : (
        <TosContentContainer />
      )}
    </Flex>
  );
}

export default IntroText;
