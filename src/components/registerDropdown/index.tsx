import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface RegisterDropdownProps {
  listItem: any[];
  setItem: React.Dispatch<React.SetStateAction<any>>;
  placeHold: string;
  renderProp: string;
  defaultValue: number;
  dropdownRef: React.MutableRefObject<null>;
}

export function RegisterDropdown({
  listItem,
  setItem,
  placeHold,
  renderProp,
  defaultValue,
  dropdownRef,
}: RegisterDropdownProps) {
  return (
    <SelectDropdown
      ref={dropdownRef}
      data={listItem}
      onSelect={(item) => setItem(item.id)}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {selectedItem && selectedItem.id !== 0
                ? selectedItem[renderProp]
                : placeHold}
            </Text>
            <Ionicons
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <ScrollView
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item[renderProp]}</Text>
          </ScrollView>
        );
      }}
      dropdownStyle={styles.dropdownMenuStyle}
      defaultValue={defaultValue}
      showsVerticalScrollIndicator={true}
    />
  );
}

const styles = StyleSheet.create({
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    marginTop: -25,
    height: 185,
  },
  dropdownButtonStyle: {
    height: 54,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999",
    paddingHorizontal: 16,

    // backgroundColor: "#E9ECEF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButtonIconStyle: {
    fontSize: 20,
    marginRight: 8,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
