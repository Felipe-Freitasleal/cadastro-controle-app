import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./routes";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./database/initializeDatabase";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./redux/store";

const dbName = "cadastroAppDatabase.db";

export default function App() {
  return (
    <SQLiteProvider databaseName={dbName} onInit={initializeDatabase}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Provider store={store}>
            <Routes />
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
