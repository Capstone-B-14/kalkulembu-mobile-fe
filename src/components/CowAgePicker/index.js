import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CowAgePicker = ({ onChange }) => {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  // const [finalSelection, setFinalSelection] = useState(null);
  const [showPicker, setShowPicker] = useState(true);

  const handleYearChange = (selectedYear) => {
    setYears(selectedYear);
    // Call the passed onChange prop function
    onChange(selectedYear, months);
  };

  const handleMonthChange = (selectedMonth) => {
    setMonths(selectedMonth);
    // Call the passed onChange prop function
    onChange(years, selectedMonth);
  };

  return (
    <View style={styles.container}>
      {showPicker && (
        <>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={years}
              style={styles.picker}
              onValueChange={handleYearChange}
            >
              {[...Array(101)].map((_, i) => (
                <Picker.Item key={i} label={`${i} tahun`} value={i} />
              ))}
            </Picker>
            <Picker
              selectedValue={months}
              style={styles.picker}
              onValueChange={handleMonthChange}
            >
              {[...Array(12)].map((_, i) => (
                <Picker.Item key={i} label={`${i} bulan`} value={i} />
              ))}
            </Picker>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FBFBFB",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: 150,
    width: 150,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#FBFBFB",
    borderRadius: 5,
    overflow: "hidden", // Ensures the button rounded corners are displayed
  },
  finalSelection: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default CowAgePicker;
