import { Box, Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

type IconProps = {
  filledColor: string;
  clickAction: () => void;
  isDisabled: boolean;
};

const filledStyle = (isHover: boolean, props: IconProps) => {
  return {
    fill: isHover && !props.isDisabled ? "#2775ff" : props.filledColor,
  };
};

function FirstIcon(props: IconProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      cursor={props.isDisabled ? "not-allowed" : "pointer"}
      onClick={() => props.clickAction()}
    >
      <path style={{ fill: "none" }} d="M0 0h20v20H0z" />
      <path
        data-name="패스 2075"
        d="M31.43 60.148a1.081 1.081 0 0 0-1.128.037L22.37 65.4v-4.261a1.121 1.121 0 0 0-.569-.99 1.081 1.081 0 0 0-1.128.037l-8.165 5.366a1.149 1.149 0 0 0 0 1.906l8.165 5.369a1.081 1.081 0 0 0 1.128.037 1.12 1.12 0 0 0 .569-.988v-4.262l7.93 5.216a1.081 1.081 0 0 0 1.128.037 1.121 1.121 0 0 0 .569-.99V61.139a1.121 1.121 0 0 0-.567-.991zm-9.8 11.728a.361.361 0 0 1-.185.32.352.352 0 0 1-.37-.012l-8.168-5.369a.37.37 0 0 1 0-.616l8.168-5.369a.357.357 0 0 1 .2-.06.366.366 0 0 1 .362.368zm9.629 0a.361.361 0 0 1-.185.32.352.352 0 0 1-.37-.012l-8.164-5.369a.37.37 0 0 1 0-.616l8.16-5.368a.357.357 0 0 1 .2-.06.366.366 0 0 1 .362.368z"
        transform="translate(-11.999 -56.008)"
        style={filledStyle(isHover, props)}
      />
    </svg>
  );
}

function PrevIcon(props: IconProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      cursor={props.isDisabled ? "not-allowed" : "pointer"}
      onClick={() => props.clickAction()}
    >
      <path style={{ fill: "none" }} d="M0 0h20v20H0z" />
      <g data-name="패스 2076" style={{ fill: "none" }}>
        <path
          d="m68.372 33.844 9.434-5.727a.785.785 0 0 1 .8-.015.76.76 0 0 1 .4.671v11.455a.76.76 0 0 1-.4.671.785.785 0 0 1-.8-.015l-9.434-5.727a.765.765 0 0 1 0-1.313z"
          style={{ stroke: "none" }}
          transform="translate(-64 -24)"
        />
        <path
          d="M78.217 28.75a.04.04 0 0 0-.022.008l-9.436 5.728c-.006.004-.01.01-.01.015 0 .005.004.01.012.015l9.438 5.73c.01.006.024.006.034 0l.01-.005c.005-.003.007-.006.007-.013V28.769c0-.002-.002-.006-.007-.009l-.01-.005a.034.034 0 0 0-.016-.004m0-.75c.133 0 .266.033.385.101a.76.76 0 0 1 .398.672v11.454a.76.76 0 0 1-.398.671.785.785 0 0 1-.797-.015l-9.433-5.727a.767.767 0 0 1 0-1.313l9.433-5.727a.784.784 0 0 1 .412-.116z"
          style={filledStyle(isHover, props)}
          transform="translate(-64 -24)"
        />
      </g>
    </svg>
  );
}

function NextIcon(props: IconProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      cursor={props.isDisabled ? "not-allowed" : "pointer"}
      onClick={() => props.clickAction()}
    >
      <path style={{ fill: "none" }} d="M0 0h20v20H0z" />
      <g data-name="패스 2077" style={{ fill: "none" }}>
        <path
          d="m78.628 33.844-9.434-5.727a.785.785 0 0 0-.8-.015.76.76 0 0 0-.4.671v11.455a.76.76 0 0 0 .4.671.785.785 0 0 0 .8-.015l9.434-5.727a.765.765 0 0 0 0-1.313z"
          style={{ stroke: "none" }}
          transform="translate(-63 -24)"
        />
        <path
          d="M68.783 28.75a.034.034 0 0 0-.017.005l-.01.005c-.004.003-.006.007-.006.014v11.458c0 .003.002.006.006.009l.01.005c.01.006.02.008.039-.003l9.435-5.728c.006-.003.01-.009.01-.014 0-.006-.004-.011-.011-.016l-9.438-5.73a.034.034 0 0 0-.018-.004m0-.75c.143 0 .285.039.411.116l9.434 5.727a.767.767 0 0 1 0 1.313l-9.434 5.727a.785.785 0 0 1-.797.015.76.76 0 0 1-.397-.671V28.774a.76.76 0 0 1 .397-.672.784.784 0 0 1 .386-.101z"
          style={filledStyle(isHover, props)}
          transform="translate(-63 -24)"
        />
      </g>
    </svg>
  );
}

function LastIcon(props: IconProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      cursor={props.isDisabled ? "not-allowed" : "pointer"}
      onClick={() => props.clickAction()}
    >
      <path style={{ fill: "none" }} d="M0 0h20v20H0z" />
      <path
        data-name="패스 2075"
        d="M12.57 60.148a1.081 1.081 0 0 1 1.128.037L21.63 65.4v-4.261a1.121 1.121 0 0 1 .569-.99 1.081 1.081 0 0 1 1.128.037l8.165 5.366a1.149 1.149 0 0 1 0 1.906l-8.165 5.369a1.081 1.081 0 0 1-1.128.037 1.12 1.12 0 0 1-.569-.988v-4.262L13.7 72.83a1.081 1.081 0 0 1-1.128.037 1.121 1.121 0 0 1-.569-.99V61.139a1.121 1.121 0 0 1 .567-.991zm9.8 11.728a.361.361 0 0 0 .185.32.352.352 0 0 0 .37-.012l8.168-5.369a.37.37 0 0 0 0-.616l-8.168-5.369a.357.357 0 0 0-.2-.06.366.366 0 0 0-.362.368zm-9.629 0a.361.361 0 0 0 .185.32.352.352 0 0 0 .37-.012l8.164-5.369a.37.37 0 0 0 0-.616l-8.16-5.368a.357.357 0 0 0-.2-.06.366.366 0 0 0-.362.368z"
        transform="translate(-12.001 -56.008)"
        style={filledStyle(isHover, props)}
      />
    </svg>
  );
}

export default function BondCard_Buttons(props: {
  currentRound: number;
  lastRound: number;
  setCurrentNumber: Dispatch<SetStateAction<number>>;
}) {
  const { currentRound, lastRound, setCurrentNumber } = props;
  const isFirstRound = currentRound === 1;
  const isLastRound = currentRound === lastRound;
  const prevIconColor = isFirstRound ? "#33353b" : "#64646f";
  const nextIconColor = isLastRound ? "#33353b" : "#64646f";

  const firstIconAction = () => {
    setCurrentNumber(1);
  };
  const prevIconAction = () => {
    setCurrentNumber(currentRound > 1 ? currentRound - 1 : currentRound);
  };
  const nextIconAction = () => {
    setCurrentNumber(
      currentRound < lastRound ? currentRound + 1 : currentRound
    );
  };
  const lastIconAction = () => {
    setCurrentNumber(lastRound);
  };

  return (
    <Flex
      w={"100%"}
      justifyContent={"center"}
      columnGap={"12px"}
      alignItems={"center"}
    >
      <FirstIcon
        filledColor={prevIconColor}
        clickAction={firstIconAction}
        isDisabled={isFirstRound}
      />
      <PrevIcon
        filledColor={prevIconColor}
        clickAction={prevIconAction}
        isDisabled={isFirstRound}
      />
      <Flex mx={"3px"} color={"gray.100"} fontSize={12}>
        <Text color={"white.200"} fontWeight={"bold"}>
          {currentRound}
        </Text>
        <Text ml={"5px"} mr={"3px"}>
          /
        </Text>
        <Text>{lastRound}</Text>
      </Flex>
      <NextIcon
        filledColor={nextIconColor}
        clickAction={nextIconAction}
        isDisabled={isLastRound}
      />
      <LastIcon
        filledColor={nextIconColor}
        clickAction={lastIconAction}
        isDisabled={isLastRound}
      />
    </Flex>
  );
}
