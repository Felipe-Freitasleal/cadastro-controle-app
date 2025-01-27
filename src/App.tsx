import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./routes";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./database/initializeDatabase";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useDrizzleStudioPlugin from "./hooks/useDrizzleStudioPlugin";

export default function App() {
  const dbName = "cadastroAppDatabase.db";

  useDrizzleStudioPlugin(dbName);

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
