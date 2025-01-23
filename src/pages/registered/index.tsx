// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Registered() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Pessoas cadastradas</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
});
