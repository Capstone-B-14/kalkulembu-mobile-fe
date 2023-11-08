import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [touchedFields, setTouchedFields] = useState({});

  const setValue = (field, value) => {
    if (values[field] === value) return;
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  // Function to get only changed values
  const getChangedValues = () => {
    return Object.keys(touchedFields).reduce((acc, field) => {
      if (touchedFields[field] && initialValues[field] !== values[field]) {
        acc[field] = values[field];
      }
      return acc;
    }, {});
  };

  return [values, setValue, getChangedValues];
};

export default useForm;
