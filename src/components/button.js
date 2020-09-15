import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const StyledButton = withStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#C4A643",
    "&:hover": {
      backgroundColor: "#C4A643",
    },
  },
}))(Button);

export default class HelloWorldApp extends Component {
  render() {
    return (
      <StyledButton type="submit" fullWidth variant="contained" color="primary">
        {this.props.text}
      </StyledButton>
    );
  }
}
