import { selector, useRecoilValue } from "recoil";
import { filterState } from "atom/dashboard";
import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import question from "assets/icons/question.svg";
import Image from "next/image";
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
  const theme = {
   
    "axis": {
       
        "ticks": {
           
            "text": {
                "fontSize": 11,
                "fill": "#64646f"
            }
        }
    },
   
  
}

  const selectedFilter = useRecoilValue(selectedFilterState);
  return (
    <Flex
      w={"100%"}
      minWidth={"336px"}
      maxWidth={"556px"}
      h={"350px"}
      bgColor={"gray.600"}
      borderRadius={14}
      borderWidth={1}
      flexDir="column"
      borderColor={"#313442"}
      // pt={'18px'}
      // pl={'20px'}
      p={" 18px 20px 10px 20px"}
    >
      <Flex flexDir={"row"}>
        <Text mr="6px">{title} </Text>
        {/* <Tooltip label="tooltip message">
          {" "}
          <img src={question}/>
        </Tooltip> */}
        <Image src={question}/>
      </Flex>
      <Text color={"#ffffff"} fontSize="20px">
        {amount}
      </Text>

      <ResponsiveLine
        data={data}
        theme={theme}
        // width={516}
        margin={{ top: 14, right: 20, bottom: 32, left: 55 }}
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
            return `$${value}M`;
          },
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={0}
        pointBorderColor={"#405df9"}
        pointLabelYOffset={-12}
        useMesh={true}
        sliceTooltip={({ slice }) => {
          console.log("slice", slice);

          return (
            <div
              style={{
                background: "#1f2128",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "24px",
                border: "1px solid #313442",
                borderRadius: "14px",
                height: slice.points.length !== 1 ? "112px" : "74px",
                width: "155px",
              }}
            >
              {slice.points.map((point) => {
                const color = point.borderColor.toString();
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        background: point.serieColor,
                        marginRight: "9px",
                        borderRadius: "50%",
                        height: "10px",
                        width: "10px",
                      }}
                    ></div>

                    <div style={{ color: "#d0d0da" }}>
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

              <div>
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
