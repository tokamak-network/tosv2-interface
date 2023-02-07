import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { introTextHover } from "atom/intro";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useRecoilState } from "recoil";
import { zIndexStyle } from "theme/styles";

const contents: {
  title: string;
  content: { contentText: string; link?: string }[];
}[] = [
  {
    title: "Tokamak Network is on-demand Ethereum layer 2 platform",
    content: [
      {
        contentText:
          "A protocol and a platform that easily and securely builds and connects Layer 2 networks",
      },
      {
        contentText:
          "Any projects can easily deploy on Tokamak Network and be connected to each other",
        link: "https://tokamaknetwork.gitbook.io/home/01-basic/what-is-tokamak-network",
      },
    ],
  },
  {
    title: "TONStarter is a decentralized launchpad platform open to everyone",
    content: [
      {
        contentText:
          "You can also earn profits from the projects onboarded in TONStarter",
        link: "https://medium.com/onther-tech/tonstarter-phase-3-starter-guide-en-kr-ab97bb9e50fc",
      },
    ],
  },
  {
    title: "TON is the native token in Tokamak Network ecosystem",
    content: [
      {
        contentText: "You can purchase it from CEX or DEX",
        link: "https://tokamaknetwork.gitbook.io/home/02-service-guide/buy-ton#02.-buy-ton-from-dex",
      },
    ],
  },
];

function ContentContainer(props: {
  title: string;
  content: { contentText: string; link?: string }[];
}) {
  const { title, content } = props;
  const [width] = useWindowDimensions();
  return (
    <Flex flexDir={"column"} textAlign={"center"}>
      <Text color={"white.200"} fontSize={22} fontWeight={"bold"} mb={"12px"}>
        {title}
      </Text>
      {content.map((content, index) => (
        <Text
          key={index}
          lineHeight={1.71}
          fontSize={14}
          color={"gray.100"}
          display={width < 400 ? "flex" : ""}
          flexDir={width < 400 ? "column" : "row"}
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
  const [width, height] = useWindowDimensions();
  const isMobile = width < 650;

  return (
    <Flex flexDir={"column"} rowGap={"45px"}>
      <Flex flexDir={"column"} textAlign={"center"}>
        <Text color={"white.200"} fontSize={22} fontWeight={"bold"} mb={"12px"}>
          TOS is the native token in TONStarter ecosystem
        </Text>
        <Text
          lineHeight={1.71}
          fontSize={14}
          color={"gray.100"}
          mb={isMobile ? "14px" : ""}
        >
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
        <Text lineHeight={1.71} fontSize={14} color={"gray.100"}>
          - TOS is designed to facilitate TON⇄TONStarter ecosystem growth
          <Link href={"https://tokamaknetwork.gitbook.io/home/01-basic/service-summary"} isExternal={true} color={"blue.200"} ml={"11px"}>
            + more
          </Link>
        </Text>
      </Flex>
      <Flex flexDir={"column"} textAlign={"center"}>
        <Text color={"white.200"} fontSize={22} fontWeight={"bold"} mb={"12px"}>
          TOS can be…
        </Text>
        {!isMobile ? (
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
            <Flex lineHeight={1.71} fontSize={14}>
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
            <Text lineHeight={1.71} fontSize={14}>
              receive airdrops from projects, and participate in IDO
              {selectText === 1 && (
                <Link
                  pos={"absolute"}
                  href={"https://medium.com/p/56c12a5440e0"}
                  isExternal={true}
                  color={"blue.200"}
                  ml={"11px"}
                >
                  + more
                </Link>
              )}
            </Text>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDir={"column"}
            color={"gray.100"}
            mb={"12px"}
          >
            <Text lineHeight={1.71} fontSize={14}>
              - locked for <span style={{ color: "#f1f1f1" }}>sTOS</span> and
              <span style={{ color: "#f1f1f1" }}> LTOS</span>, where sTOS is
              used to participate in TONStarter governance, receive airdrops
              from projects, and participate in IDO
            </Text>
            <Link href={"https://medium.com/p/56c12a5440e0"} isExternal={true} color={"blue.200"} ml={"11px"}>
              + more
            </Link>
          </Box>
        )}
        {!isMobile ? (
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
            <Flex lineHeight={1.71} fontSize={14} my={"6px"}>
              - staked for{" "}
              <Text color={"#ec8c56"} ml={"5px"}>
                LTOS
              </Text>
              , that earns compound interest in TOS based on LTOS index every 8
              hours
              <Text w={'20px'}>
                {selectText === 2 && (
                  <Link
                    pos={"absolute"}
                    href={"https://tokamaknetwork.gitbook.io/home/02-service-guide/tosv2/stake"}
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
        ) : (
          <Box
            display={"flex"}
            flexDir={"column"}
            color={"gray.100"}
            mb={"12px"}
          >
            <Text lineHeight={1.71} fontSize={14}>
              - staked for <span style={{ color: "#f1f1f1" }}>LTOS</span>, that
              earns compound interest in TOS based on LTOS index every 8 hours
            </Text>
            <Link href={"https://tokamaknetwork.gitbook.io/home/02-service-guide/tosv2/stake"} isExternal={true} color={"blue.200"} ml={"11px"}>
              + more
              </Link>
          </Box>
        )}
        {!isMobile ? (
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
            <Flex lineHeight={1.71} fontSize={14} justifyContent={"center"}>
              a non transferrable discount token that greatly reduces the price
              for
              <Text color={"#ec8c56"} ml={"5px"}>
                bonding
              </Text>
              <Text>
                {selectText === 3 && (
                  <Link
                    pos={"absolute"}
                    href={"https://tokamaknetwork.gitbook.io/home/03-content/glossary"}
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
        ) : (
          <Box display={"flex"} flexDir={"column"} color={"gray.100"}>
            <Text lineHeight={1.71} fontSize={14}>
              - used to create Uniswap LP token that can be locked to get{" "}
              <span style={{ color: "#f1f1f1" }}>dTOS</span>, a non
              transferrable discount token that greatly reduces the price for
              <span style={{ color: "#f1f1f1" }}> bonding</span>
            </Text>
            <Link href={"https://tokamaknetwork.gitbook.io/home/03-content/glossary"} isExternal={true} color={"blue.200"} ml={"11px"}>
              + more
            </Link>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

function IntroText(props: { selectedTab1: boolean }) {
  const { selectedTab1 } = props;
  return (
    <Flex
      mt={"45px"}
      rowGap={"45px"}
      flexDir={"column"}
      zIndex={zIndexStyle.AlwaysTopBelowHeader+1}
    >
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
