import { selector, useRecoilValue } from "recoil";
import { filterState } from "atom//dashboard";
import {
  Flex,
  Text,
  Tooltip,
  useColorMode,
  Button,
  IconButton,
  color,
} from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import question from "assets/icons/question.svg";
// import Image from "next/image";
import moment from "moment";

const selectedFilterState = selector({
  key: "selectedFilterState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedFilter = get(filterState);

    return selectedFilter;
  },
});

// typeof global.ResizeObserver === "undefined";
function Graph(props: {
  data: any[];
  title: string;
  amount: string;
  tooltipTitle: string;
}) {
  const { data, title, amount, tooltipTitle } = props;
  const { colorMode } = useColorMode();
  const theme = {
    axis: {
      ticks: {
        text: {
          fontSize: 11,
          fill: colorMode === "dark" ? "#64646f" : "#9a9aaf",
        },
      },
    },
  };

  const selectedFilter = useRecoilValue(selectedFilterState);
  return (
    <Flex
      w={"100%"}
      minWidth={"336px"}
      maxWidth={"556px"}
      h={"350px"}
      bgColor={colorMode === "dark" ? "gray.600" : "white.100"}
      borderRadius={14}
      borderWidth={1}
      flexDir="column"
      borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
      // pt={'18px'}
      // pl={'20px'}
      p={" 18px 20px 10px 20px"}
    >
      <Flex flexDir={"row"} alignItems='center'>
        <Text
          mr="6px"
          fontSize={"12px"}
          fontWeight={600}
          color={colorMode === "dark" ? "gray.100" : "gray.1000"}
        >
          {title}{" "}
        </Text>

        {/* <Tooltip
          label={tooltipTitle}
          aria-label="A tooltip"
          placement="left"
          isOpen
          zIndex={100}
          top={100}
        >
          <Image src={question} alt={""} />
        </Tooltip> */}
        <Tooltip
          label={tooltipTitle}
       
          bg={colorMode === "dark" ? "#1f2128" : "#fff"}
          borderRadius={"3px"}
          color={colorMode==='light'? '#07070c': '#8b8b93'}
          fontSize='12px'
          border={
            colorMode === "light" ? "solid 1px #e8edf2" : "solid 1px #313442"
          }
        >
          <IconButton
            aria-label="Search database"
            h={"16px"}
            minW={"16px"}
            icon={<QuestionOutlineIcon />}
            bg={"transparent"}
            p={0}
            _hover={{ bg: "transparent" }}
          />
        </Tooltip>

        {/* <Image src={question} /> */}
      </Flex>
      <Text
        color={colorMode === "dark" ? "white.100" : "gray.800"}
        fontWeight={600}
        fontSize="20px"
      >
        {amount}
      </Text>

      <ResponsiveLine
        data={data}
        theme={theme}
        // width={516}
        margin={{ top: 14, right: 20, bottom: 65, left: 50 }}
        // colors={{datum: 'data.color'}}
        colors={["#405df9", "#e23738", "#50d1b2"]}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        lineWidth={1}
        areaBaselineValue={0}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 20,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
          format: function (value) {
            return moment.unix(value).format("MMM DD");
          },
        }}
        enableSlices="x"
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          tickValues: 3,
          legendOffset: -40,
          legendPosition: "middle",
          format: function (value) {
            return `$${Number(value) / 1000000}M`;
          },
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={0}
        pointBorderColor={"#405df9"}
        pointLabelYOffset={-12}
        useMesh={true}
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: colorMode === "dark" ? "#1f2128" : "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "24px",
                fontSize: "11px",
                border:
                  colorMode === "dark"
                    ? "1px solid #313442"
                    : "1px solid #e8edf2",
                borderRadius: "14px",
                height: slice.points.length !== 1 ? "112px" : "74px",
                width: "155px",
              }}
            >
              {slice.points.map((point, index) => {
                const color = point.borderColor.toString();
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    key={`${index}_${point.serieColor}`}
                  >
                    <div
                      style={{
                        background: point.serieColor,
                        marginRight: "9px",
                        borderRadius: "50%",
                        height: "10px",
                        width: "10px",
                        marginBottom: "12px",
                      }}
                    ></div>

                    <div
                      style={{
                        color: colorMode === "dark" ? "#d0d0da" : "#07070c",
                      }}
                    >
                      $
                      {Number(point.data.y).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                );
              })}

              <div
                style={{ color: colorMode === "dark" ? "#64646f" : "#9a9aaf" }}
              >
                {moment
                  .unix(Number(slice.points[0].data.x))
                  .format("MMM DD, YYYY")}
              </div>
            </div>
          );
        }}
        enableArea={true}
        enableGridX={false}
        enableGridY={false}
      />
    </Flex>
  );
}

export default Graph;
