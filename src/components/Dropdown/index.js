import React, { useEffect, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  ToucrhableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/AntDesign";

const Dropdowns = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  searchPlaceholder,
  search,
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedValue);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.unrolled}>
      <Dropdown
        styles={[styles.dropdown]}
        iconStyle={[styles.iconStyle]}
        iconColor='#FBFBFB'
        placeholderStyle={[styles.placeholderStyle]}
        selectedTextStyle={[styles.selectedTextStyle]}
        itemContainerStyle={[styles.itemContainerStyle]}
        itemTextStyle={[styles.itemTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle]}
        containerStyle={[styles.containerStyle]}
        activeColor='#0D0D0D'
        data={options}
        search={search}
        maxHeight={200}
        labelField='label'
        valueField='value'
        value={selectedOption}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        onFocus={() => setIsFocus(true)}
        onChange={(value) => {
          setSelectedOption(value);
          onSelect(value);
        }}
      />
    </View>
  );
};
export default Dropdowns;

const styles = StyleSheet.create({
  unrolled: {
    backgroundColor: "#2E78A6",
    borderRadius: 50,
    width: 200,
    margin: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  containerStyle: {
    backgroundColor: "#2E78A6",
    borderRadius: 10,
  },
  dropdown: {
    height: "50px",
    flex: 1,
  },
  label: {
    position: "absolute",
    backgroundColor: "#2E78A6",
    fontSize: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    color: "#FBFBFB",
    textAlign: "center",
  },
  selectedTextStyle: {
    color: "#FBFBFB",
    textAlign: "center",
  },
  itemContainerStyle: {
    backgroundColor: "#2E78A6",
    borderRadius: 10,
  },
  inputSearchStyle: {
    backgroundColor: "#FBFBFB",
    borderRadius: 7,
  },
  itemTextStyle: {
    color: "#FBFBFB",
  },
});
