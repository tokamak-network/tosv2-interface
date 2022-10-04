import { selector, useRecoilValue } from "recoil";
import { filterState } from "atom//dashboard";
import {
  Flex,
  Text,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import question from "assets/icons/question.svg";
import Image from "next/image";
import moment from "moment";
import BasicTooltip from "common/tooltip";
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
  console.log('data',data);
  
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
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  return (
    <Flex
      w={"100%"}
      minWidth={"336px"}
      // maxWidth={smallerThan1024? "556px":'476px'}
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
      <Flex flexDir={"row"}>
        <Text
          mr="6px"
          fontSize={"12px"}
          fontWeight={600}
          color={colorMode === "dark" ? "gray.100" : "gray.1000"}
        >
          {title}{" "}
        </Text>
        <BasicTooltip label={tooltipTitle} />
      
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
      
        margin={{ top: 14, right: 20, bottom: 65, left: 50 }}
      
        colors={["#405df9", "#e23738", "#50d1b2"]}
        xScale={{
          type: "time",
          format: "%Y-%m-%d %H:%M:%S",
       
          useUTC: false,
        }}
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
          tickValues: 4,
          legendPosition: "middle",
          format: function (value) {
            return moment(value).format("MMM DD");
          },
        }}
        enableSlices="x"
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues:4,
          legendOffset: -40,
          legendPosition: "middle",
          format: function (value) {
            if (title === "Runway") {

              return value === 0 ? `${value} Days`:`${Number(value)}`;
            } else {
              if (Number(value) > 1000000) {
                return `$${Number(value) / 1000000}M`;
              } else {
                return `$${Number(value)}`;
              }
            }
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
              {/* <div
                  style={{
                    background: "#405df9",
                    marginRight: "9px",
                    borderRadius: "50%",
                    height: "10px",
                    width: "10px",
                  }}
                ></div>

                <div style={{ color: "#d0d0da" }}>
                  $
                  {Number(slice.points[0].data.y).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  })}
                </div> */}

              <div
                style={{ color: colorMode === "dark" ? "#d0d0da" : "#9a9aaf" }}
              >
                {moment(slice.points[0].data.x).format("MMM DD, YYYY")}
              </div>
            </div>
          );
        }}
        enableArea={true}
        enableGridX={false}
        enableGridY={false}
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: "left-to-right",
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemBackground: "rgba(0, 0, 0, .03)",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </Flex>
  );
}

export default Graph;
