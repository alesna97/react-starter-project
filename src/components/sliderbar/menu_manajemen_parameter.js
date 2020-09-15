import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "../icon";
import styles from "./css_mini";
import Typography from "@material-ui/core/Typography";

class SliderBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={9}>
        <ListItem
          button
          component="a"
          href="/transaction/individual"
          button
          className={
            this.props.selected == "individual"
              ? classes.itemAreaSelected
              : classes.itemArea
          }
        >
          <ListItemIcon>
            <img
              src={
                this.props.selected == "individual"
                  ? Icon.circle_active
                  : Icon.circle
              }
            />
          </ListItemIcon>
          <ListItemText
            className={classes.itemTxt}
            primary={
              <Typography
                type="body2"
                style={{ color: "#FFFFFF", fontSize: "11px" }}
              >
                Perorangan
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          component="a"
          href="/transaction/companies"
          button
          className={
            this.props.selected == "companies"
              ? classes.itemAreaSelected
              : classes.itemArea
          }
        >
          <ListItemIcon>
            <img
              src={
                this.props.selected == "companies"
                  ? Icon.circle_active
                  : Icon.circle
              }
            />
          </ListItemIcon>
          <ListItemText
            className={classes.itemTxt}
            primary={
              <Typography
                type="body2"
                style={{ color: "#FFFFFF", fontSize: "11px" }}
              >
                Perusahaan
              </Typography>
            }
          />
        </ListItem>
      </Grid>
    );
  }
}

export default withStyles(styles.CoustomsStyles, { name: "SliderBar" })(
  SliderBar
);
