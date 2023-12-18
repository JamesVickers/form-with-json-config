import React, { ChangeEventHandler, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { InputItem, TextInput, EnumInput, IntegerInput } from "./types";
import { setDeepArray } from "./utils";
import { getData } from "./utils";

const StaticForm = (): JSX.Element => {
  const [localData, setLocalData] = useState<InputItem[]>([]);
  const [savedObject, setSavedObject] = useState<InputItem[]>();

  useEffect(() => {
    const data = getData();
    setLocalData(data)
  }, [])

  const onChange = (
    path: string,
    index: number
  ): ChangeEventHandler<HTMLInputElement> => (event) => {
    const newValue = event.target.value;

    setLocalData((prevData) => {
      const updatedData = setDeepArray(prevData, index, path, newValue);
      return updatedData;
    });
  };

  const onSaveChanges = () => {
    setSavedObject(localData);
  };

  const isValidProperty = (obj: object, prop: string): prop is keyof typeof obj => {
    return prop in obj;
  }

  const getValue = (item: InputItem) => {
    const newValue = (isValidProperty(item, item.path) && item[item.path as keyof InputItem] !== undefined)
      ? item[item.path as keyof InputItem] as string
      : ('defaultValue' in item)
        ? item.defaultValue ?? ''
        : ''
    return newValue;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h4">Vehicle details</Typography>
          {localData && localData.map((item, index) => (
            <div key={index}>
              <label htmlFor={item.label}>{item.label}</label>
              <input
                type={item.type}
                id={item.label}
                name={item.label}
                value={getValue(item)}
                onChange={onChange(item.path, index)}
              />
            </div>
          )
          )}
          <Grid item xs={12}>
            <div style={{ margin: "10px", padding: "10px" }}>
              <Button variant="outlined" onClick={onSaveChanges}>
                Save Changes
              </Button>
            </div>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h5">Output</Typography>
          <div style={{ textAlign: "left" }}>
            <pre>{JSON.stringify(savedObject, null, 2)}</pre>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StaticForm;
