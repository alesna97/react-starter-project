import React from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import styles from "./css";
import Button from "../../../components/button";
import Icon from "../../../components/icon";
import { isMobile } from "react-device-detect";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Func from "../../../functions";
import env from "../../../config/env";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validator: [],
      value: [],
      mdlShow: true,
      mobile: false,
      redirect: false,
      show: "password",
      show2: "password",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event, name) {
    var dataSet = this.state.value;
    dataSet[name] = event.target.value;
    this.setState({ value: dataSet });
  }
  
  handleSubmit(event) {
    var validator = [
      {
        name: "email",
        type: "mail|required",
      },
      {
        name: "password",
        type: "required",
      },
      {
        name: "confirm_password",
        type: "same:password|required",
      },
    ];
    var validate = Func.Validator(this.state.value, validator);
    if (validate.success) {
      var str = this.props.location.search;
      fetch(
        env.authApi + env.apiPrefixV1 + "user/reset?token=" + str.split("=")[1],
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.value["email"],
            password: this.state.value["password"],
            confirm_password: this.state.value["confirm_password"],
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "berhasil reset password") {
            Func.Alert(
              "Reset Kata Sandi Berhasil",
              "Silahkan masuk untuk mencoba kata sandi baru.",
              Icon.error_lock
            )
            this.setState({ redirect: true });
          } else if (
            json.message ==
            "Link not valid or expired. Try generating a new link."
          ) {
            Func.Alert(
              "Reset Kata Sandi Gagal",
              "Tautan tidak valid atau kedaluwarsa, Coba buat tautan baru.",
              Icon.error_lock
            );
          } else {
            Func.Alert(
              "Reset Kata Sandi Gagal",
              json.message,
              Icon.error_lock
            );
          }
        })
        .catch((error) => {})
        .finally(() => {});
    } else {
      this.setState({ validator: validate.error });
    }
    event.preventDefault();
  }
  removeValidate(name) {
    var data = this.state.validator;
    delete data[name];
    this.setState({ validator: data });
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    const { classes } = this.props;
    var content = (
      <CardContent>
        {this.renderRedirect()}
        <div style={styles.container}>
          <img
            src={Icon.logo}
            style={{
              marginBottom: 15,
              marginTop: 15,
            }}
          />
          <Typography component="h1" variant="h4">
            Reset Kata Sandi
          </Typography>
          <form style={styles.form} onSubmit={this.handleSubmit}>
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              autoComplete="off"
              fullWidth
              onFocus={() => {
                this.removeValidate("email");
              }}
              error={this.state.validator["email"]}
              helperText={this.state.validator["email"]}
              value={this.state.value["email"]}
              onChange={(event) => {
                this.handleChange(event, "email");
              }}
              placeholder="Email atau NIK"
              name="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Icon.mail} />
                  </InputAdornment>
                ),
                endAdornment: this.state.validator["email"] ? (
                  <InputAdornment position="start">
                    <img src={Icon.warning} />
                  </InputAdornment>
                ) : (
                  <div />
                ),
              }}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              fullWidth
              onFocus={() => {
                this.removeValidate("password");
              }}
              value={this.state.value["password"]}
              onChange={(event) => {
                this.handleChange(event, "password");
              }}
              error={this.state.validator["password"]}
              helperText={this.state.validator["password"]}
              name="password"
              placeholder="Kata Sandi"
              type={this.state.show}
              id="password"
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Icon.lock} />
                  </InputAdornment>
                ),
                endAdornment: this.state.validator["password"] ? (
                  <InputAdornment position="start">
                    <img src={Icon.warning} />
                  </InputAdornment>
                ) : this.state.show == "password" ? (
                  <InputAdornment position="start">
                    <img
                      onClick={() => {
                        this.setState({ show: "text" });
                      }}
                      src={Icon.eye}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="start">
                    <img
                      onClick={() => {
                        this.setState({ show: "password" });
                      }}
                      src={Icon.eye2}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              fullWidth
              onFocus={() => {
                this.removeValidate("confirm_password");
              }}
              value={this.state.value["confirm_password"]}
              onChange={(event) => {
                this.handleChange(event, "confirm_password");
              }}
              error={this.state.validator["confirm_password"]}
              helperText={this.state.validator["confirm_password"]}
              name="confirm_password"
              placeholder="Konformasi Kata Sandi"
              type={this.state.show2}
              id="confirm_password"
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Icon.lock} />
                  </InputAdornment>
                ),
                endAdornment: this.state.validator["confirm_password"] ? (
                  <InputAdornment position="start">
                    <img src={Icon.warning} />
                  </InputAdornment>
                ) : this.state.show2 == "password" ? (
                  <InputAdornment position="start">
                    <img
                      onClick={() => {
                        this.setState({ show2: "text" });
                      }}
                      src={Icon.eye}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="start">
                    <img
                      onClick={() => {
                        this.setState({ show2: "password" });
                      }}
                      src={Icon.eye2}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Button text="Reset" />
          </form>
        </div>
      </CardContent>
    );

    if (isMobile) {
      return (
        <div style={styles.mainContainer}>
          <Card className={classes.CardMobile}>{content}</Card>
        </div>
      );
    } else {
      return (
        <div style={styles.mainContainer}>
          <Card className={classes.Card}>{content}</Card>
        </div>
      );
    }
  }
}

export default withStyles(styles.CoustomsStyles, { name: "Login" })(Login);
