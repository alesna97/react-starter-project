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
import Link from "@material-ui/core/Link";
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event, name) {
    var dataSet = this.state.value;
    dataSet[name] = event.target.value;
    this.setState({ value: dataSet });
    this.setState({ verify: false });
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
    ) {
      this.setState({ verify: true });
    }
  }
  handleSubmit(event) {
    var validator = [
      {
        name: "email",
        type: "mail|required",
      },
    ];
    var validate = Func.Validator(this.state.value, validator);
    if (validate.success) {
      fetch(env.authApi + env.apiPrefixV1 + "user/forgot", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.value["email"],
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "No such email") {
            Func.Alert(
              "Alamat email Anda tidak terdaftar",
              "Mohon lakukan registrasi ulang",
              Icon.error_mail
            );
          } else if (
            json.message == "link reset password telah dikirim ke email"
          ) {
            Func.Alert(
              "Email berhasil dikirim",
              "Silahkan periksa kotak masuk email Anda",
              Icon.succes_mail
            );
          } else {
            Func.Alert(
              "Email tidak terkirim",
              "Tunngu 5 menit dan coba kembali",
              Icon.error_mail
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
      return <Redirect to="/customer/individual" />;
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
          <Typography component="h2" variant="h4">
            Lupa Kata Sandi?
          </Typography>
          <br />
          <Typography component="h9" variant="h9">
            Silahkan masukkan alamat email Anda. Kami akan
          </Typography>
          <Typography component="h9" variant="h9">
            mengirimkan tautan untuk mengatur ulang kata sandi Anda.
          </Typography>
          <br />
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
              placeholder="Email"
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
                ) : this.state.verify ? (
                  <InputAdornment position="start">
                    <img src={Icon.check} />
                  </InputAdornment>
                ) : (
                  <div />
                ),
              }}
            />
            <Button text="Kirim" />
          </form>
          <Link className={classes.links} href="/">
            Kembali
          </Link>
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
