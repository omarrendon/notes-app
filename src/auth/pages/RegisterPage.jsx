import React, { useState } from "react";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startCreatingUserEmailPassword } from "../../store/auth";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [value => value?.includes("@"), "The email must have an @."],
  password: [
    value => value.length >= 6,
    "The password must have 6 or more characters.",
  ],
  displayName: [value => value.length >= 1, "The name is required."],
};

export const RegisterPage = () => {
  const [formSubmitted, setformSubmitted] = useState(false);
  const dispatch = useDispatch();
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
  } = useForm(formData, formValidations);

  const onSubmit = event => {
    event.preventDefault();
    setformSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserEmailPassword(formState));
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              type="text"
              placeholder="Jhon Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Create count
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent={"end"}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color={"inherit"} to={"/auth/login"}>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
