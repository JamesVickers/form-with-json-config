import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import { InputItem } from "./types";
import { getData } from "./utils";
import FormElements from './components/FormElements';

const StaticForm = (): JSX.Element => {
  const [localData, setLocalData] = useState<InputItem[]>([]);
  const [savedObject, setSavedObject] = useState<InputItem[]>();

  useEffect(() => {
    const data = getData();
    setLocalData(data);
  }, []);


  const onSaveChanges = () => {
    setSavedObject(localData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper variant="elevation" style={{ margin: "10px" }}>
          <Typography variant="h4">Vehicle details</Typography>
          <FormElements data={localData} setData={setLocalData} />
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
