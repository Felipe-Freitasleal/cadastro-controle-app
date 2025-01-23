import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Register from "./pages/register";
import Registered from "./pages/registered";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="/"
        component={Register}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            // if (!focused) {
            //     return <Ionicons size={size} color={color} name="home-outline" />;
            // }
            return <AntDesign size={size} color={color} name="form" />;
          },
        }}
      />
      <Tab.Screen
        name="registered"
        component={Registered}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            // if (!focused) {
            //     return  <Ionicons size={size} color={color} name="lock-closed-outline" />
            // }

            return <Feather size={size} color={color} name="list" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
