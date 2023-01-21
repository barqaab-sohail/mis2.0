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

const BarChartMonthlyEIP = (props) => {
  const { userInfo } = useContext(AuthContext);
  const months = [];
  const expenses = [];
  const invoices = [];
  const payments = [];

  const { isLoading, error, data } = useQuery(
    ["projectExpenseChart", props.route.params.projectId],
    () => {
      return Api.get(END_POINT + props.route.params.projectId, {
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
  data?.data.map((Item) => {
    months.push(Item.months);
    expenses.push(Item.expenses);
    invoices.push(Item.invoices);
    payments.push(Item.payments);
  });
  if (isLoading) {
    return <Text>Loading .....</Text>;
  }
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const chartData = {
    labels: months,
    datasets: [
      {
        data: [20, 45, 28, 80],
      },
    ],
  };

  const isAllZero = expenses.every((item) => item === 0);
  return isAllZero === false ? (
    <>
      <View>
        <Text>Bezier Line Chart</Text>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
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
    backgroundColor: "#F5FCFF",
  },
  chart: {
    flex: 1,
  },
});
