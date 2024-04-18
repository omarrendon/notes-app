import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { ImageGalery } from "../components/index";

export const NoteView = () => {
  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ mb: 1 }}
      alignItems={"center"}
    >
      <Grid item>
        <Typography fontSize={38} fontWeight={"light"}>
          {" "}
          April 16, 2024
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Add title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
        />
      </Grid>
      <ImageGalery />
    </Grid>
  );
};
