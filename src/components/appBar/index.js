import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import styles from "./css";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../icon";
import Slidebar_mini from "../sliderbar/mini_sliderbar";
import Slidebar from "../sliderbar/index";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import {Grid, Divider} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Func from '../../functions/index';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ListIcon from '@material-ui/icons/List';

class appBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    handleDrawer() {
        this.setState({
            open: !this.state.open
        }, () => {
            this
                .props
                .onClicked(this.state.open, this.state.open2)
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                {Func.toLogin(this.state.redirect)}
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            onClick={() => {
                            this.setState({
                                open2: !this.state.open2
                            }, () => {
                                this
                                    .props
                                    .onClicked(this.state.open, this.state.open2)
                            })
                        }}>
                            <img src={Icon.open_menu}/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={this.state.open
                            ? classes.title
                            : classes.titles}>
                            {this.state.title}
                        </Typography>
                        <IconButton color="inherit">
                            <img src={Icon.notifications}/>
                        </IconButton>
                        <Typography component="h1" color="inherit" noWrap className={classes.hi}>
                            Hi, Admin.
                        </Typography>
                        <img className={classes.hi} src={Icon.hands}/>
                        <IconButton
                            className={classes.account}
                            onClick={() => {
                            this.setState({
                                logout: !this.state.logout
                            })
                        }}
                            color="inherit">
                            <img src={Icon.person}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {this.state.logout
                    ? <div>
                            <div className={classes.popUpLogout}>
                                <Grid container xl={12} lg={12} md={12} xs={12} sm={12}>
                                    <Grid item xl={2} lg={2} md={2} xs={2} sm={2}>
                                        <div
                                            style={{
                                            marginLeft: 3
                                        }}>
                                            <IconButton className={classes.account} color="inherit">
                                                <img src={Icon.person}/>
                                            </IconButton>
                                        </div>
                                    </Grid>
                                    <Grid item xl={10} lg={10} md={10} xs={10} sm={10}>
                                        <div
                                            style={{
                                            marginLeft: 10,
                                            marginTop: 15
                                        }}>
                                            <text
                                                style={{
                                                color: 'white',
                                                fontSize: '18px'
                                            }}>Super Admin</text>
                                        </div>
                                        <div
                                            style={{
                                            marginLeft: 10,
                                            marginTop: -5
                                        }}>
                                            <text
                                                style={{
                                                color: 'white',
                                                fontSize: '10px'
                                            }}>Administrasi</text>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.popUpLogout2}>
                                <List>
                                    <div
                                        style={{
                                        width: "367px",
                                        marginTop: -10
                                    }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AssignmentIndIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Profil" secondary={'Lihat dan ubah profil Admin'}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                    <div
                                        style={{
                                        width: "367px"
                                    }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ListIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Menu 1" secondary={'Secondary text'}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                    <div
                                        style={{
                                        width: "367px"
                                    }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ListIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Menu 2" secondary={'Secondary text'}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                    <div
                                        style={{
                                        width: "367px"
                                    }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ListIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Menu 3" secondary={'Secondary text'}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                </List>
                                <button
                                    style={{
                                    backgroundColor: "#C4A643",
                                    borderRadius: 50,
                                    color: "white",
                                    width: 87,
                                    height: 35,
                                    marginTop: '5px',
                                    marginRight: 25,
                                    marginBottom: 15,
                                    fontWeight: "500",
                                    fontSize: 14
                                }}
                                    onClick={() => {
                                    localStorage.removeItem("token");
                                    this.setState({redirect: true})
                                }}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    : null
}
                <Hidden only={['lg', 'xl']}>
                    <Drawer
                        anchor="left"
                        position="fixed"
                        open={this.state.open2}
                        classes={{
                        paper: this.state.open2
                            ? classes.drawerPaper
                            : classes.drawerPaperClose
                    }}
                        onClose={() => {
                        this.setState({open2: false})
                    }}>
                        <div className={classes.toolbarIcon}>
                            <IconButton
                                onClick={() => {
                                this.setState({
                                    open2: !this.state.open2
                                })
                            }}>
                                <img
                                    style={{
                                    marginRight: this.state.open
                                        ? 0
                                        : -10
                                }}
                                    src={this.state.open2
                                    ? Icon.close_menu
                                    : Icon.open_menu}/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title2}>
                                {this.state.open2
                                    ? this.props.title
                                    : ""}
                            </Typography>
                        </div>
                        {this.state.open2
                            ? (<Slidebar selected={this.props.selected} menu={this.props.menu}/>)
                            : (<Slidebar_mini selected={this.props.selected} menu={this.props.menu}/>)}
                    </Drawer>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Drawer
                        position="fixed"
                        variant="permanent"
                        classes={{
                        paper: this.state.open
                            ? classes.drawerPaper
                            : classes.drawerPaperClose
                    }}
                        open={this.state.open}>
                        <div className={classes.toolbarIcon}>
                            <IconButton
                                onClick={() => {
                                this.handleDrawer();
                            }}>
                                <img
                                    style={{
                                    marginRight: this.state.open
                                        ? 0
                                        : -10
                                }}
                                    src={this.state.open
                                    ? Icon.close_menu
                                    : Icon.open_menu}/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title2}>
                                {this.state.open
                                    ? this.props.title
                                    : ""}
                            </Typography>
                        </div>
                        {this.state.open
                            ? (<Slidebar selected={this.props.selected} menu={this.props.menu}/>)
                            : (<Slidebar_mini selected={this.props.selected} menu={this.props.menu}/>)}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "appBar"})(appBar);
