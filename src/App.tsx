import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./routes";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./database/initializeDatabase";
import { SafeAreaProvider } from "react-native-safe-area-context";

const dbName = "cadastroAppDatabase.db";

export default function App() {
  return (
    <SQLiteProvider databaseName={dbName} onInit={initializeDatabase}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
