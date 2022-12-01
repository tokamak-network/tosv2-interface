import { Flex, SimpleGrid } from "@chakra-ui/react";
import Graph from "common/graph/Graph";
import GraphFilter from "./GraphFilter";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD } from "graphql/dashboard/getDashboard";
import { useEffect, useState } from "react";
import moment from "moment";

function GraphContainer() {
  const { loading, error, data } = useQuery(GET_DASHBOARD, {
    variables: {
      period: "-1",
      limit: 365,
    },
  });

  const [filteredValue, setFilteredValue] = useState<string>("1 Week");
  const [marketCapDatas, setMarketCapDatas] = useState<any[]>([]);
  const [totalStakedDatas, setTotalStakedDatas] = useState<any[]>([]);
  const [runwayDatas, setRunwayDatas] = useState<any[]>([]);
  const [treasuryBalanceDatas, setTreasuryBalanceDatas] = useState<any[]>([]);
  const [selectedDates, setSelectedDates] = useState<number>(7);

  useEffect(() => {
    if (data) {
      const graphData = getGraphData();

      let indexNum = -1;

      const marketCap = graphData.map((arrayData: any, index: number) => {
        indexNum += 1;
        return {
          x: `${moment(arrayData.createdAt).format(
            "YYYY-MM-DD HH:mm:ss"
          )}_${indexNum}`,
          y:
            arrayData.marketCap === "-Infinity"
              ? 0
              : Number(arrayData.marketCap),
          dataIndex: indexNum,
        };
      });

      if (marketCap.length < selectedDates) {
        const difference = selectedDates - marketCap.length;

        for (let i = 1; i <= difference; i++) {
          indexNum += 1;

          const date =
            moment(graphData[graphData.length - 1].createdAt).unix() -
            86400 * i;
          const formattedDate = moment.unix(date).format("YYYY-MM-DD HH:mm:ss");
          marketCap.push({
            x: `${formattedDate}_${indexNum}`,
            y: 0,
            dataIndex: indexNum,
          });
        }
      }

      const marketCapData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...marketCap].reverse(),
        },
      ];

      console.log("--marketCapData--");

      console.log(marketCapData);

      setMarketCapDatas(marketCapData);

      const totalStaked = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(new Date(arrayData.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          y:
            arrayData.totalValueStaked === "-Infinity"
              ? 0
              : Number(arrayData.totalValueStaked) || 0,
          dataIndex: index,
        };
      });

      if (totalStaked.length < selectedDates) {
        const difference = selectedDates - totalStaked.length;

        for (let i = 1; i <= difference; i++) {
          const date =
            moment(graphData[graphData.length - 1].createdAt).unix() -
            86400 * i;
          const formattedDate = moment.unix(date).format("YYYY-MM-DD HH:mm:ss");
          totalStaked.push({
            x: formattedDate,
            y: 0,
            dataIndex: i,
          });
        }
      }
      const totalStakedData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...totalStaked].reverse(),
        },
      ];
      setTotalStakedDatas(totalStakedData);

      const runway = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(new Date(arrayData.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          y:
            arrayData.runway === "-Infinity"
              ? 0
              : Number(arrayData.runway) || 0,
          dataIndex: index,
        };
      });

      if (runway.length < selectedDates) {
        const difference = selectedDates - runway.length;

        for (let i = 1; i <= difference; i++) {
          const date =
            moment(graphData[graphData.length - 1].createdAt).unix() -
            86400 * i;
          const formattedDate = moment.unix(date).format("YYYY-MM-DD HH:mm:ss");
          runway.push({
            x: formattedDate,
            y: 0,
            dataIndex: i,
          });
        }
      }

      const runwayData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...runway].reverse(),
        },
      ];

      setRunwayDatas(runwayData);

      const treasuryBalance = graphData.map((arrayData: any, index: number) => {
        return {
          x: moment(new Date(arrayData.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          y:
            arrayData.treasuryBalance === "-Infinity"
              ? 0
              : Number(arrayData.treasuryBalance) || 0,
          dataIndex: index,
        };
      });

      if (treasuryBalance.length < selectedDates) {
        const difference = selectedDates - treasuryBalance.length;

        for (let i = 1; i <= difference; i++) {
          const date =
            moment(graphData[graphData.length - 1].createdAt).unix() -
            86400 * i;
          const formattedDate = moment.unix(date).format("YYYY-MM-DD HH:mm:ss");
          treasuryBalance.push({
            x: formattedDate,
            y: 0,
            dataIndex: i,
          });
        }
      }

      const treasuryData = [
        {
          id: "#2775ff",
          color: "hsl(218, 100%, 58%)",
          data: [...treasuryBalance].reverse(),
        },
      ];

      setTreasuryBalanceDatas(treasuryData);
    }
  }, [filteredValue, data, selectedDates]);

  const getGraphData = () => {
    switch (filteredValue) {
      case "1 Week":
        const slicedData = data.getDashboard.slice(0, 8);
        const filteredData = slicedData.filter((data: any, index: number) => {
          if (index !== 1) {
            return data;
          }
        });
        return filteredData;
      case "1 Month":
        const slicedDataMonth = data.getDashboard.slice(0, 31);
        const filteredDataMonth = slicedDataMonth.filter(
          (data: any, index: number) => {
            if (index !== 1) {
              return data;
            }
          }
        );
        return filteredDataMonth;
      case "3 Months":
        const slicedData3Month = data.getDashboard.slice(0, 91);
        const filteredData3Month = slicedData3Month.filter(
          (data: any, index: number) => {
            if (index !== 1) {
              return data;
            }
          }
        );
        return filteredData3Month;
      case "6 Months":
        const slicedData6Month = data.getDashboard.slice(0, 184);
        const filteredData6Month = slicedData6Month.filter(
          (data: any, index: number) => {
            if (index !== 1) {
              return data;
            }
          }
        );
        return filteredData6Month;
      case "1 Year":
        const slicedDataYear = data.getDashboard.slice(0, 367);
        const filteredDataYear = slicedDataYear.filter(
          (data: any, index: number) => {
            if (index !== 1) {
              return data;
            }
          }
        );
        return filteredDataYear;
      default:
        return data;
    }
  };

  return (
    <Flex flexDir={"column"}>
      <GraphFilter
        setFilter={setFilteredValue}
        setSelectedDates={setSelectedDates}
      ></GraphFilter>
      <Flex
        w={"100%"}
        columnGap={"1.5%"}
        rowGap={"24px"}
        flexWrap={"wrap"}
        justifyContent="center"
      >
        {!loading && (
          <Graph
            data={marketCapDatas}
            title="Market Cap"
            amount={
              marketCapDatas[0]
                ? `$ ${Number(
                    marketCapDatas[0].data[marketCapDatas[0].data.length - 1].y
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}`
                : ""
            }
            tooltipTitle="“Market Cap” represents the total
          dollar value of TOS in circulation."
          ></Graph>
        )}

        {!loading && (
          <Graph
            data={totalStakedDatas}
            title="Total Value Staked"
            amount={
              totalStakedDatas[0]
                ? `$ ${Number(
                    totalStakedDatas[0].data[
                      totalStakedDatas[0].data.length - 1
                    ].y
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}`
                : ""
            }
            tooltipTitle="“Total Value Staked” represents 
      the total dollar value of all the LTOS. 
      LTOS represents TOS that are staked
      and their staking interest."
          ></Graph>
        )}
        {!loading && (
          <Graph
            data={treasuryBalanceDatas}
            title="Treasury Balance"
            amount={
              treasuryBalanceDatas[0]
                ? `$ ${Number(
                    treasuryBalanceDatas[0].data[
                      treasuryBalanceDatas[0].data.length - 1
                    ].y
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}`
                : ""
            }
            tooltipTitle="“Treasury Balance” represents the 
          total dollar value of non-TOS assets
          owned by the treasury that can be
          used for backing each TOS."
          ></Graph>
        )}
        {!loading && (
          <Graph
            data={runwayDatas}
            title="Runway"
            amount={`${
              runwayDatas[0]
                ? ` ${Number(
                    runwayDatas[0].data[runwayDatas[0].data.length - 1].y
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}`
                : ""
            } Days`}
            tooltipTitle="“Runway” represents the number of days
          that staking interest can be sustained 
          by the protocol."
          ></Graph>
        )}
      </Flex>
    </Flex>
  );
}

export default GraphContainer;
