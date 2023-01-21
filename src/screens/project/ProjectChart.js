import React, { useContext } from "react";
import Chart from "react-apexcharts";
import Api from "../../../api/Api";
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
const END_POINT = "/projectExpenseChart/";
import { AuthContext } from "../../context/AuthContext";

const ExpenseChart = (props) => {
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
    return "Loading .....";
  }
  const isAllZero = expenses.every((item) => item === 0);
  return isAllZero === false ? (
    <>
      <Chart
        options={{
          chart: {
            id: "expense-chart",
          },
          title: {
            text: "Monthly Invoices, Expenses and Receipts Chart ",
            align: "center",
            margin: 100,
            style: {
              fontSize: "18px",
              fontWeight: "bold",
              color: "#263238",
            },
          },
          xaxis: {
            categories: months,
          },
          yaxis: {
            show: true,
            labels: {
              show: true,
              formatter: function (val, index) {
                var parts = val?.toString().split(".") || "";
                if (parts) {
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return parts.join(".");
                } else {
                  return "";
                }
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val, index) {
              var parts = val?.toString().split(".") || "";
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return parts.join(".");
            },
          },

          tooltip: {
            enabled: true,
          },
        }}
        series={[
          {
            name: "Expenses",
            data: expenses,
            color: "#fc1403",
          },
          {
            name: "Invoices",
            data: invoices,
            color: "#0307fc",
          },
          {
            name: "Receipts",
            data: payments,
            color: "#f502a0",
          },
        ]}
        type="bar"
        width={"100%"}
        height={500}
      />
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

export default ExpenseChart;
