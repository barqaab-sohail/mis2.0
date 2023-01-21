import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useContext, useState } from "react";
import Api from "../../../api/Api";
const END_POINT = "/employees";
import { useQuery } from "react-query";
import { AuthContext } from "../../context/AuthContext";

const EmployeeListScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, error, data } = useQuery(
    ["employees"],
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
  function clickEventListener(item) {}

  //   Api.get("employees").then((res) => {
  //     if (res.status === 200) {
  //     } else {
  //       Alert.alert("Alert", "Network Error", [{ text: "OK" }]);
  //     }
  //   });
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
            <View>
              <TouchableOpacity
                onPress={() => {
                  clickEventListener(item);
                }}
              >
                <Image
                  style={styles.cardImage}
                  source={{ uri: item.picture }}
                />
              </TouchableOpacity>

              <View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 40,
                  }}
                >
                  <Text>{item.full_name}</Text>
                  <Text>{item.designation}</Text>
                  <Text>Date of Joining: {item.date_of_joining}</Text>
                  <Text>CNIC: {item.cnic}</Text>
                  <Text>Date of Birth: {item.date_of_birth}</Text>
                  <Text>Contact No.: {item.mobile}</Text>
                  <Text>Current Status: {item.status}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default EmployeeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#f6f6f6",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#f6f6f6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
    width: 120,
    height: 120,
    // borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
});
