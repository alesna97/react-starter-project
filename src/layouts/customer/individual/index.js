import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import styles from "../../../container/Pages/Customers/Individual/css";
import Tables from "../../../container/Pages/Customers/Individual/table";
import Hidden from "@material-ui/core/Hidden";
import Form from "./form/index";
import AppBar from "../../../components/appBar/index";
import Footer from "../../../components/footer/index";
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
            <div className={classes.root2}>
                <CssBaseline/>
                <AppBar
                    onClicked={(open, open2) => {
                    this.setState({open: open, open2: open2})
                }}
                    menu={"customer"}
                    title="Data Nasabah"
                    selected={"customer"}
                    open={this.state.open}
                    open2={this.state.open2}/>
                <main className={classes.content}>
                    <Form type="Tambah" modal={this.state.modal}/>
                    <div className={classes.appBarSpacer}/>
                    <Hidden only={['lg', 'xl']}>
                        <Container
                            maxWidth="lg"
                            className={this.state.open
                            ? classes.container22
                            : classes.container22}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Tables
                                        width={60}
                                        open={this.state.open}
                                        filter={false}
                                        title={"Nasabah Perorangan"}
                                        subtitle={"Atur data nasabah perorangan."}
                                        path="customer"/>
                                </Grid>
                            </Grid>
                        </Container>
                    </Hidden>
                    <Hidden only={['sm', 'md', 'xs']}>
                        <Container
                            maxWidth="lg"
                            className={this.state.open
                            ? classes.container
                            : classes.container2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Tables
                                        width={270}
                                        open={this.state.open}
                                        filter={false}
                                        title={"Nasabah Perorangan"}
                                        subtitle={"Atur data nasabah perorangan."}
                                        path="customer"/>
                                </Grid>
                            </Grid>
                        </Container>
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
                    <Footer open={this.state.open}/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Login"})(Login);
