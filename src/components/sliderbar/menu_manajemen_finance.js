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
          href="/financial-management/home"
          button
          className={
            this.props.selected == "home"
              ? classes.itemAreaSelected
              : classes.itemArea
          }
        >
          <ListItemIcon>
            <img
              src={
                this.props.selected == "home"
                  ? Icon.circle_active
                  : Icon.circle
              }
            />
          </ListItemIcon>
          <ListItemText
            className={classes.itemTxt}
            variant="h1"
            primary={
              <Typography
                type="body2"
                style={{ color: "#FFFFFF", fontSize: "11px" }}
              >
                Home
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          component="a"
          href="/financial-management/request"
          button
          className={
            this.props.selected == "request"
              ? classes.itemAreaSelected
              : classes.itemArea
          }
        >
          <ListItemIcon>
            <img
              src={
                this.props.selected == "request"
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
                style={{ color: "#FFFFFF", fontSize: "12px" }}
              >
                Permintaan
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          component="a"
          href="/financial-management/transaction-reports"
          button
          className={
            this.props.selected == "transaction-reports"
              ? classes.itemAreaSelected
              : classes.itemArea
          }
        >
          <ListItemIcon>
            <img
              src={
                this.props.selected == "transaction-reports"
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
                style={{ color: "#FFFFFF", fontSize: "12px" }}
              >
                Laporan Transaksi
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          component="a"
          href="/financial-management/bookkeeping"
          button
          className={
            this.props.selected == "bookkeeping"
              ? classes.itemAreaSelected
              : classes.itemArea
          }
        >
          <ListItemIcon>
            <img
              src={
                this.props.selected == "bookkeeping"
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
                style={{ color: "#FFFFFF", fontSize: "12px" }}
              >
                Pembukuan
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          component="a"
          href="/financial-management/journal"
          button
          className={
            this.props.selected == "journal"
              ? classes.itemAreaSelected
              : classes.itemArea
          }
        >
          <ListItemIcon>
            <img
              src={
                this.props.selected == "journal"
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
                style={{ color: "#FFFFFF", fontSize: "12px" }}
              >
                Jurnal
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
