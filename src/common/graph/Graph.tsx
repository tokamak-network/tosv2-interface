import { selector, useRecoilValue } from "recoil";
import { filterState } from "atom//dashboard";
import {
  Box,
  Flex,
  Text,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { DatumValue, ResponsiveLine } from "@nivo/line";
import question from "assets/icons/question.svg";
import Image from "next/image";
import moment from "moment";
import BasicTooltip from "common/tooltip";
import { useEffect, useRef, useState } from "react";

function Graph(props: {
  data: any[];
  title: string;
  amount: string;
  tooltipTitle: string;
}) {
  const { data, title, amount, tooltipTitle } = props;
  const { colorMode } = useColorMode();
  const [hoverDataIndex, setHoverDataIndex] = useState<number | undefined>(
    undefined
  );
  const [mouseLeave, setMouseLeave] = useState<boolean>(true);
  const filterValue = useRecoilValue(filterState);

  const theme = {
    axis: {
      ticks: {
        text: {
          fontSize: 11,
          fill: colorMode === "dark" ? "#64646f" : "#9a9aaf",
        },
      },
    },
    crosshair: {
      line: {
        stroke: colorMode === "dark" ? "#ffffff" : "#9a9aaf",
        strokeWidth: 2,
        strokeOpacity: 0.4,
        strokeDasharray: "0",
      },
    },
  };

  // console.log("--hoverData--");
  // console.log(hoverData);
  // const selectedFilter = useRecoilValue(selectedFilterState);

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const CustomPoint = (props: any) => {
    const { currentPoint, borderWidth, borderColor, points } = props;

    // it will show the current point
    if (hoverDataIndex !== props.datum.dataIndex) {
      return null;
    }

    if (mouseLeave) {
      return null;
    }

    return (
      <g>
        <circle
          fill="#ffffff"
          r={5}
          strokeWidth={borderWidth}
          stroke={borderColor}
        />
        <circle
          r={4}
          strokeWidth={borderWidth}
          stroke={borderColor}
          fill={"#2775ff"}
        />
      </g>
    );
  };

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
      onMouseEnter={() => setMouseLeave(false)}
      onMouseLeave={() => setMouseLeave(true)}
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
          type: "point",
          // format: "%Y-%m-%d %H:%M:%S",
          // precision: "millisecond",
          // useUTC: false,
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
          legendPosition: "end",
          // renderTick: (e) => {
          //   // console.log(e);
          //   const test = moment(e.value).format("MMM DD");

          //   return (
          //     <g>
          //       <text style={{ top: "-10px", background: "red" }}>test</text>
          //     </g>
          //   );
          // },
          format: (value) => {
            const splitedValue = value.split("_");
            const indexNum = Number(splitedValue[1]);

            const filterCondition =
              filterValue === "1 Week"
                ? indexNum === 0 ||
                  indexNum === 2 ||
                  indexNum === 4 ||
                  indexNum === 6
                : filterValue === "1 Month"
                ? indexNum === 0 ||
                  indexNum === 9 ||
                  indexNum === 19 ||
                  indexNum === 29
                : filterValue === "3 Months"
                ? indexNum === 0 ||
                  indexNum === 29 ||
                  indexNum === 59 ||
                  indexNum === 89
                : filterValue === "6 Months"
                ? indexNum === 0 ||
                  indexNum === 60 ||
                  indexNum === 120 ||
                  indexNum === 181
                : indexNum === 0 ||
                  indexNum === 121 ||
                  indexNum === 242 ||
                  indexNum === 364;

            if (indexNum !== undefined && filterCondition) {
              return moment(splitedValue[0]).format("MMM DD");
            }

            return "";
          },
        }}
        enableSlices="x"
        enableCrosshair={true}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 4,
          legendOffset: -40,
          legendPosition: "middle",
          format: function (value) {
            if (title === "Runway") {
              return value === 0
                ? `${value} Days`
                : `${Number(value).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`;
            }
            if (title === "Total sTOS" || title === "Total LTOS") {
              if (Number(value) > 999999) {
                return `${(Number(value) / 1000000).toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}M`;
              } else {
                return `${Number(value).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`;
              }
            } else {
              if (Number(value) > 999999) {
                return `$${(Number(value) / 1000000).toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}M`;
              } else {
                return `$${Number(value).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`;
              }
            }
          },
        }}
        // pointSize={10}
        enablePoints={true}
        pointSymbol={CustomPoint}
        // pointColor={{ theme: "background" }}
        // layers={[CustomPoint]}
        // pointBorderWidth={0}
        // pointBorderColor={"#405df9"}
        useMesh={true}
        pointLabelYOffset={-12}
        tooltip={() => {
          return <Flex w={100} h={100} bg={"red"}></Flex>;
        }}
        sliceTooltip={({ slice }) => {
          //@ts-ignore
          const thisIndex = slice.points[0].data.dataIndex;
          setHoverDataIndex(thisIndex);

          return (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              {/* <Box
                pos={"absolute"}
                w={100}
                h={10}
                bg={"#2775ff"}
                top={-10}
              ></Box> */}
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
                  position: "absolute",
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
                        marginBottom: "12px",
                      }}
                      key={`${index}_${point.serieColor}`}
                    >
                      <div
                        style={{
                          background: "#2775ff",
                          marginRight: "9px",
                          borderRadius: "50%",
                          height: "10px",
                          width: "10px",
                        }}
                      ></div>

                      <div
                        style={{
                          color: colorMode === "dark" ? "#d0d0da" : "#07070c",
                        }}
                      >
                        {" "}
                        {title === "Runway"
                          ? `${Number(point.data.y).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })} Days`
                          : title === "Total sTOS"
                          ? `${Number(point.data.y).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })} sTOS`
                          : title === "Total LTOS"
                          ? `${Number(point.data.y).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })} LTOS`
                          : `$
                      ${Number(point.data.y).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}`}
                        {/* $
                      {Number(point.data.y).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })} */}
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
                  style={{
                    color: colorMode === "dark" ? "#64646f" : "#9a9aaf",
                  }}
                >
                  {
                    //@ts-ignore
                    moment(slice.points[0].data.x.split("_")[0]).format(
                      "MMM DD, YYYY"
                    )
                  }
                </div>
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
