// components/CowAgePicker.js
import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CowAgePicker = ({ onChange }) => {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);

  const handleYearChange = (selectedYear) => {
    setYears(selectedYear);
    onChange(selectedYear * 12 + months);
  };

  const handleMonthChange = (selectedMonth) => {
    setMonths(selectedMonth);
    onChange(years * 12 + selectedMonth);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Picker
        selectedValue={years}
        style={{ height: 50, width: 100 }}
        onValueChange={handleYearChange}
      >
        {[...Array(10)].map((_, i) => (
          <Picker.Item key={i} label={`${i} Year(s)`} value={i} />
        ))}
      </Picker>
      <Picker
        selectedValue={months}
        style={{ height: 50, width: 100 }}
        onValueChange={handleMonthChange}
      >
        {[...Array(12)].map((_, i) => (
          <Picker.Item key={i} label={`${i} Month(s)`} value={i} />
        ))}
      </Picker>
    </View>
  );
};

export default CowAgePicker;
