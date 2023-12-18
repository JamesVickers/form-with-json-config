import React, { ChangeEventHandler, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { InputItem } from "./types";
// import { setDeep } from "./utils";

type StaticFormProps = {
  data: InputItem[];
};

const StaticForm = ({ data }: StaticFormProps): JSX.Element => {
  console.log('StaticForm > data: ', data)
  const [localData, setLocalData] = useState<InputItem[]>(data);
  const [savedObject, setSavedObject] = useState<InputItem[]>();

  const onChange = (
    path: string,
    index: number
  ): ChangeEventHandler<HTMLInputElement> => (event) => {
    const newValue = event.target.value;

    setLocalData((prevData) => {
      const updatedData = prevData.map((item, i) => {
        if (i === index) {
          const updatedItem = {
            ...item,
            [path]: newValue,
          };
          return updatedItem;
        }
        return item;
      });
      return updatedData;
    });
  };

  // const onChange =
  // (
  //   path: string,
  // ): ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =>
  // (event) =>
  //   setLocalData(setDeep(localData, path, event.target.value));

  const onSaveChanges = () => {
    setSavedObject(localData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h4">Vehicle details</Typography>
          {data.map((property, index) => (
            <div key={index}>
              <label htmlFor={property.label}>{property.label}</label>
              <input
                type={property.type}
                id={property.label}
                name={property.label}
                value={('defaultValue' in property) ? property.defaultValue ?? '' : ''}
                onChange={onChange(property.path, index)}
              />
            </div>
          )
          )}
          {/* <Grid container alignItems="flex-start" spacing={2} padding={5}>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Driver Name"
                value={localData.driver?.name || ""}
                onChange={onChange("driver.name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Vehicle Regplate"
                value={localData.vehicle?.regplate || ""}
                onChange={onChange("vehicle.regplate")}
              />
            </Grid>
          </Grid> */}
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
