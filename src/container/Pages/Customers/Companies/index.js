import React, { Fragment } from "react";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import styles from "./css";
import Tables from "./table";
import Hidden from "@material-ui/core/Hidden";
import Form from "./form/index";

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
            show: "password"
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
            <Fragment>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8}}>
                    <Form type="Tambah" modal={this.state.modal}/>
                    <Hidden only={['lg', 'xl']}>
                    <Tables
                        width={60}
                        open={this.state.open}
                        filter={false}
                        title={"Nasabah Perusahaan"}
                        subtitle={"Atur data nasabah perusahaan."}
                        path="companies"/>
                    </Hidden>
                    <Hidden only={['sm', 'md', 'xs']}>
                    <Tables
                        width={270}
                        open={this.state.open}
                        filter={false}
                        title={"Nasabah Perusahaan"}
                        subtitle={"Atur data nasabah perusahaan."}
                        path="companies"/>
                    </Hidden>
                    <Fab
                        color="primary"
                        className={classes.fab}
                        color="#C4A643"
                        aria-label="add"
                        onClick={() => {
                        this.handleModal();
                    }}>
                        <AddIcon/>
                    </Fab>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Login"})(Login);
