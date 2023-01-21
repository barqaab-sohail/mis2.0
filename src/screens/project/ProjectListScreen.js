import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import React, { useContext, useState } from "react";
import Api from "../../../api/Api";
const END_POINT = "/powerRunningProjectsTable";
import { useQuery } from "react-query";
import { AuthContext } from "../../context/AuthContext";

const ProjectListScreen = (props) => {
  const { userInfo } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, error, data } = useQuery(
    ["projects"],
    () => {
      return Api.get(END_POINT, {
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
    return (
      <View>
        <Text>Loading.....</Text>
      </View>
    );
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  function clickEventListener(item) {
    props.navigation.navigate("Project Monthly Chart", { projectId: item.id });
    console.log(item.id);
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        data={data?.data.filter((employee) =>
          JSON.stringify(employee)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )}
        horizontal={false}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <Card style={styles.card}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    clickEventListener(item);
                  }}
                >
                  <View>
                    <View>
                      <Text style={styles.cardTitle}>{item.projectName}</Text>
                      <Text>Payment Received: {item.paymentReceived}</Text>
                      <Text>Pending Payments: {item.pendingPayments}</Text>
                      <Text>Budget Utilization: {item.budgetUtilization}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default ProjectListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#f6f6f6",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
