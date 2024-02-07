import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import { activities } from "../../constants/Data";
import ActivityListItem from "../components/ActivityListItem";

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/1.png")}
        // source={require("../../../assets/images/clouds-splash.jpeg")}
        style={styles.backgroundImage}
      >
        <FlatList data={activities} contentContainerStyle={{ gap: 5 }} style={{ padding: 10 }} keyExtractor={(item, index) => item.lineOne + index} renderItem={({ item }) => <ActivityListItem item={item} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'contain' for different scaling options
    justifyContent: "center" // Adjust as needed
  }
});
