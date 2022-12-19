import { Flex, Link, Text } from "@chakra-ui/react";

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

function IntroText(props: { selectedTab1: boolean }) {
  const { selectedTab1 } = props;
  return (
    <Flex mt={"45px"} rowGap={"45px"} flexDir={"column"}>
      {contents.map((content, index) => (
        <ContentContainer
          title={content.title}
          content={content.content}
          key={index}
        ></ContentContainer>
      ))}
    </Flex>
  );
}

export default IntroText;
