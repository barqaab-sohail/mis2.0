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
import { Card } from "react-native-paper";
import Api from "../../../api/Api";
const END_POINT = "/assets";
import { useQuery } from "react-query";
import { AuthContext } from "../../context/AuthContext";

const AssetListScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, error, data } = useQuery(
    ["assets"],
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

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        data={data?.data.filter((asset) =>
          JSON.stringify(asset)
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
                    <Text>{item.name}</Text>
                    {item.allocation ? (
                      <Text>Allocation: {item.allocation}</Text>
                    ) : (
                      <Text>Location: {item.location}</Text>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default AssetListScreen;

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
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 40,
  },
});
