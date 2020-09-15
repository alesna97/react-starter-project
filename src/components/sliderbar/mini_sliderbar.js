import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Assessment from "@material-ui/icons/Assessment";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import styles from "./css_mini";

class SliderBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid container item xs={12} className={classes.grid}>
            <Grid item xs={12} className={this.props.menu == "dashboard" ? classes.iconArea2 : classes.iconArea}>
              <Box borderRight={43} color={this.props.menu == "dashboard" ? "#C4A643" : "black"}>
                <IconButton className={classes.iconBtn}>
                  <ListItemIcon className={this.props.menu == "dashboard" ? classes.icon2 : classes.icon}>
                    <HomeIcon />
                  </ListItemIcon>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.grid} component="a" href="/customer/individual">
            <Grid item xs={12} className={this.props.menu == "master" ? classes.iconArea2 : classes.iconArea}>
              <Box borderRight={43} color={this.props.menu == "master" ? "#C4A643" : "black"}>
                <IconButton className={classes.iconBtn}>
                  <ListItemIcon className={this.props.menu == "master" ? classes.icon2 : classes.icon}>
                    <DashboardIcon />
                  </ListItemIcon>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.grid2} component="a" href="/manajemen-parameter/transaction">
            <Grid item xs={12} className={this.props.menu == "parameter" ? classes.iconArea2 : classes.iconArea}>
              <Box borderRight={43} color={this.props.menu == "parameter" ? "#C4A643" : "black"}>
                <IconButton className={classes.iconBtn}>
                  <ListItemIcon className={this.props.menu == "parameter" ? classes.icon2 : classes.icon}>
                    <Assessment />
                  </ListItemIcon>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.grid3}>
            <Grid item xs={12} className={classes.iconAreas}></Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles.CoustomsStyles, { name: "SliderBar" })(
  SliderBar
);
