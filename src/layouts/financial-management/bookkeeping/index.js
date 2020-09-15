import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styles from "./css";
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
            <div className={classes.root2}>
                <CssBaseline/>
                <AppBar
                    onClicked={(open, open2) => {
                    this.setState({open: open, open2: open2})
                }}
                    menu={"financial"}
                    title="Manajemen Keuangan"
                    selected={"bookkeeping"}
                    open={this.state.open}
                    open2={this.state.open2}/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <div
                        style={{
                        display: 'flex',
                        marginLeft: '5%',
                        alignItems: 'center',
                        width: window.innerWidth,
                        minHeight: window.innerHeight - 70,
                        justifyContent: 'center'
                    }}>
                        <text
                            style={{
                            fontSize: 30
                        }}>Coming Soon</text>
                    </div>
                    <Footer open={this.state.open} down={true}/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Login"})(Login);
