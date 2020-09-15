import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import styles from "./css";
import Tables from "./tables/index";
import Form from "./form/index";
import Box from '@material-ui/core/Box';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            master: false,
            validator: [],
            value: [],
            mdlShow: true,
            mobile: false,
            redirect: false,
            active: "Pencairan",
            show: "password",
            id_cust: null
        };
    }
    handleModal() {
        this.setState({
            modal: true
        }, () => {
            this.setState({modal: false});
        });
    }
    handleDrawer() {
        this.setState({
            open: !this.state.open
        });
    }
    componentDidMount() {}
    render() {
        const {classes} = this.props;
        return (
                <main >
                    <Hidden only={['lg', 'xl']}>
                        <div>
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                p={1}
                                style={{ marginBottom: 8 }}
                                bgcolor="background.paper">
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Pencairan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Pencairan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Pencairan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Pencairan
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Pelunasan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Pelunasan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Pelunasan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Pelunasan
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Perpanjangan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Perpanjangan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Perpanjangan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Perpanjangan
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Lelang"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Lelang"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Lelang"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Lelang
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Dibatalkan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Dibatalkan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Dibatalkan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Dibatalkan
                                </Box>
                            </Box>
                        </div>
                    </Hidden>
                    <Hidden only={['sm', 'md', 'xs']}>
                        <div>
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                p={1}
                                style={{ marginBottom: 8 }}
                                bgcolor="background.paper">
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Pencairan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Pencairan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Pencairan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Pencairan
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Pelunasan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Pelunasan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Pelunasan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Pelunasan
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Perpanjangan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Perpanjangan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Perpanjangan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Perpanjangan
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Lelang"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Lelang"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Lelang"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Lelang
                                </Box>
                                <Box
                                    onClick={() => {
                                    this.setState({active: "Dibatalkan"})
                                }}
                                    style={{
                                    cursor: 'default'
                                }}
                                    ml={1}
                                    p={1}
                                    borderBottom={this.state.active == "Dibatalkan"
                                    ? 3
                                    : 0}
                                    color={this.state.active == "Dibatalkan"
                                    ? '#85203B'
                                    : "#95A1A7"}>
                                    Dibatalkan
                                </Box>
                            </Box>
                        </div>
                    </Hidden>
                    <Form type="Tambah" modal={this.state.modal}/>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Tables open={this.state.open} active={this.state.active}/>
                    </div>
                    <Fab
                        color="primary"
                        className={classes.fab}
                        color="#85203B"
                        aria-label="add"
                        onClick={() => {
                        this.handleModal();
                    }}>
                        <AddIcon/>
                    </Fab>
                </main>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Login"})(Login);
