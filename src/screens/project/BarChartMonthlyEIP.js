import React, { useContext } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Api from "../../../api/Api";
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  processColor,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
const END_POINT = "/projectExpenseChart/";
import { AuthContext } from "../../context/AuthContext";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
} from "victory-native";

const data1 = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const data2 = [
  { x: "jan", y: 1 },
  { x: "feb", y: 2 },
  { x: "mar", y: 5 },
];

const BarChartMonthlyEIP = (props) => {
  const { userInfo } = useContext(AuthContext);
  const months = [];
  const expenses = [];
  const invoices = [];
  const payments = [];
  const id = props.route.params.projectId;
  const { isLoading, error, data } = useQuery(
    ["projectExpenseChart", id],
    () => {
      return Api.get(END_POINT + id, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    },
    {
      staleTime: 30000, //refresh on swich screen
      refetchInterval: 60000, //refresh on some time
    }
  );

  if (isLoading) {
    return <Text>Loading .....</Text>;
  }
  const isAllZero = false;
  return isAllZero === false ? (
    <>
      <View>
        <Text>Bezier Line Chart</Text>
        <View style={styles.container}>
          <VictoryChart>
            <VictoryGroup offset={20} colorScale={"qualitative"}>
              <VictoryBar
                data={[
                  { x: "jan", y: 1 },
                  { x: "feb", y: 2 },
                  { x: "mar", y: 5 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: "jan", y: 2 },
                  { x: "feb", y: 2 },
                  { x: "mar", y: 5 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: "jan", y: 5 },
                  { x: "feb", y: 2 },
                  { x: "mar", y: 5 },
                ]}
              />
            </VictoryGroup>
          </VictoryChart>
        </View>
      </View>
    </>
  ) : (
    <>
      <View>
        <Text>
          Necessary Data is not Avaiable for Monthly Invoices, Payments and
          Expenses Chart
        </Text>
      </View>
    </>
  );
};

export default BarChartMonthlyEIP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
