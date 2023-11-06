import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CowAgePicker = ({ onChange }) => {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [finalSelection, setFinalSelection] = useState(null);
  const [showPicker, setShowPicker] = useState(true);

  const handleYearChange = (selectedYear) => {
    setYears(selectedYear);
  };

  const handleMonthChange = (selectedMonth) => {
    setMonths(selectedMonth);
  };

  const handleFinalizeSelection = () => {
    const totalMonths = years * 12 + months;
    setFinalSelection(totalMonths);
    onChange(totalMonths);
    setShowPicker(false);
  };

  const handleOpenPicker = () => {
    setShowPicker(true);
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
              {[...Array(10)].map((_, i) => (
                <Picker.Item key={i} label={`${i} Tahun`} value={i} />
              ))}
            </Picker>
            <Picker
              selectedValue={months}
              style={styles.picker}
              onValueChange={handleMonthChange}
            >
              {[...Array(12)].map((_, i) => (
                <Picker.Item key={i} label={`${i} Bulan`} value={i} />
              ))}
            </Picker>
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        {!showPicker ? (
          <Button title='Confirm' onPress={handleFinalizeSelection} />
        ) : (
          <Button
            title='Confirm Age'
            onPress={handleFinalizeSelection}
            color='#4CAF50'
          />
        )}
      </View>
      {finalSelection !== null && !showPicker && (
        <View style={styles.finalSelection}>
          <Text>
            {`Umur Sapi: ${Math.floor(finalSelection / 12)} tahun ${
              finalSelection % 12
            } bulan`}
          </Text>
        </View>
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
