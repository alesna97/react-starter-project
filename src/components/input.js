import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
const StyledInput = withStyles({
  root: {
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C4A643",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C4A643",
    },
  },
})(TextField);
const warning = require("../assets/icon/warning.png");

export default class HelloWorldApp extends Component {
  render() {
    return (
      <StyledInput
        variant="outlined"
        margin="normal"
        autoComplete="off"
        fullWidth
        onFocus={() => {
          this.removeValidate("email");
        }}
        error={this.props.error}
        helperText={this.props.error}
        value={this.props.value}
        onChange={(event) => {
          this.handleChange(event, "email");
        }}
        placeholder="Email atau NIK"
        name="email"
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={this.props.mail} />
            </InputAdornment>
          ),
          endAdornment: this.props.validator ? (
            <InputAdornment position="start">
              <img src={warning} />
            </InputAdornment>
          ) : (
            <div />
          ),
        }}
      />
    );
  }
}
