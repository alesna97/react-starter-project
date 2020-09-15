import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Assessment from "@material-ui/icons/Assessment";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import styles from "./css";
import Menu_Data_Nasabah from "./menu_data_nasabah";
import Menu_Manajemen_Parameter from "./menu_manajemen_parameter";
import Menu_Manajemen_Finance from "./menu_manajemen_finance";

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
class SliderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: "customer"
        };
    }
    componentDidMount() {
        this.setState({menu: this.props.menu});
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid container item xs={12}>
                        <Grid
                            item
                            xs={3}
                            className={this.state.menu == "home"
                            ? classes.iconArea2
                            : classes.iconArea}>
                            <Box
                                borderRight={3}
                                color={this.state.menu == "home"
                                ? "#C4A643"
                                : "#85203B"}>
                                <IconButton className={classes.iconBtn}>
                                    <ListItemIcon
                                        className={this.state.menu == "home"
                                        ? classes.icon2
                                        : classes.icon}>
                                        <HomeIcon/>
                                    </ListItemIcon>
                                </IconButton>
                            </Box>
                        </Grid>
                        {this.state.menu == "customer"
                            ? (<Menu_Data_Nasabah selected={this.props.selected}/>)
                            : (this.state.menu == "transaction"
                                ? <Menu_Manajemen_Parameter selected={this.props.selected}/>
                                : <Menu_Manajemen_Finance selected={this.props.selected}/>)}
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        className={this.state.menu == "customer"
                        ? classes.grid_master
                        : this.state.menu == "transaction"
                            ? classes.grid_params
                            : classes.grid_finance}
                        component="a"
                        href="/customer/individual">
                        <Grid
                            item
                            xs={3}
                            className={this.state.menu == "customer"
                            ? classes.iconArea2
                            : classes.iconArea}>
                            <Box
                                borderRight={3}
                                color={this.state.menu == "customer"
                                ? "#C4A643"
                                : "#85203B"}>
                                <IconButton className={classes.iconBtn}>
                                    <ListItemIcon
                                        className={this.state.menu == "customer"
                                        ? classes.icon2
                                        : classes.icon}>
                                        <DashboardIcon/>
                                    </ListItemIcon>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        className={this.state.menu == "customer"
                        ? classes.grid_master
                        : this.state.menu == "transaction"
                            ? classes.grid_params
                            : classes.grid_finance}
                        component="a"
                        href="/transaction/individual">
                        <Grid
                            item
                            xs={3}
                            className={this.state.menu == "transaction"
                            ? classes.iconArea2
                            : classes.iconArea}>
                            <Box
                                borderRight={3}
                                color={this.state.menu == "transaction"
                                ? "#C4A643"
                                : "#85203B"}>
                                <IconButton className={classes.iconBtn}>
                                    <ListItemIcon
                                        className={this.state.menu == "transaction"
                                        ? classes.icon2
                                        : classes.icon}>
                                        <Assessment/>
                                    </ListItemIcon>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid 
                      container 
                      item 
                      xs={12} 
                      className={this.state.menu == "customer"
                        ? classes.grid_master
                        : this.state.menu == "transaction"
                            ? classes.grid_params
                            : classes.grid_finance}
                      component="a" 
                      href="/financial-management/home">
                        <Grid
                            item
                            xs={3}
                            className={this.state.menu == "financial"
                            ? classes.iconArea2
                            : classes.iconArea}>
                            <Box
                                borderRight={3}
                                color={this.state.menu == "financial"
                                ? "#C4A643"
                                : "#85203B"}>
                                <IconButton className={classes.iconBtn}>
                                    <ListItemIcon
                                        className={this.state.menu == "financial"
                                        ? classes.icon2
                                        : classes.icon}>
                                        <MonetizationOnIcon/>
                                    </ListItemIcon>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        className={this.state.menu == "customer"
                        ? classes.grid_master2
                        : this.state.menu == "transaction"
                            ? classes.grid_params2
                            : classes.grid_finance2}
                        xs={12}>
                        <Grid item xs={3} className={classes.iconAreas}></Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "SliderBar"})(SliderBar);
