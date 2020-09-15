import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Func from "../../../../functions/index";
import styles from "../../../../container/Pages/Customers/Individual/css";
import Icon from "../../../../components/icon";
import Field from "./field";
import Typography from '@material-ui/core/Typography';

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {value === index && children}
        </div>
    );
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            validator: [],
            value: [],
            type: "",
            activeTabs: 0,
            Proses: 0,
            count: 0,
            id_cust: null,
            state: 1
        };
    }

    onPage(type) {
        var val = "";
        if (type == "-") {
            val = this.state.activeTabs - 1;
        } else {
            val = this.state.activeTabs + 1;
        }
        this.setState({activeTabs: val, Proses: val});
    }
    componentWillReceiveProps() {
        if (this.props.row != "undefined" && this.props.modal) {
            this.setState({modal: this.props.modal, type: this.props.type});
        }
        if (this.props.type == "Ubah" && this.props.row != undefined) {
            this.setState({id_cust: this.props.row.id});
        }
    }
    removeValidate(name) {
        var data = this.state.validator;
        delete data[name];
        this.setState({validator: data});
    }
    handleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChange(event, name) {
        var dataSet = this.state.value;
        dataSet[name] = event.target.value;
        this.setState({value: dataSet});
    }
    handleSubmit() {
        if (this.state.activeTabs == 6) {
            this.setState({
                modal: !this.state.modal,
                activeTabs: 0
            });
        } else {
            this.setState({Proses: this.state.activeTabs});
        }
    }
    render() {
        const {classes} = this.props;
        if (this.state.modal) {
            return (
                <div className={classes.root2}>
                    <Dialog
                        disablePortal
                        disableEnforceFocus
                        disableAutoFocus
                        open
                        maxWidth="md"
                        aria-labelledby="server-modal-title"
                        aria-describedby="server-modal-description"
                        container={() => {}}>
                        <MuiDialogTitle disableTypography>
                            <Typography variant="h7" className={classes.tittleModal}>{this.props.type + " Nasabah Perorangan"}</Typography>
                            {this.state.state == 2
                                ? <img src={Icon.check2} className={classes.space}></img>
                                : null}
                            <Typography
                                variant="h7"
                                className={this.state.state == 1
                                ? classes.space
                                : classes.space3}>{" Langkah 1"}</Typography>
                            <img src={Icon.line} className={classes.space2}></img>
                            <Typography variant="h7" className={classes.space}>{" Langkah 2"}</Typography>
                            <IconButton
                                aria-label="close"
                                className={classes.closeButton}
                                onClick={() => {
                                this.handleModal()
                            }}>
                                <CloseIcon/>
                            </IconButton>
                        </MuiDialogTitle>
                        <Field
                            Proses={this.state.Proses}
                            value={this.state.value}
                            type={this.state.type}
                            id_cust={this.state.id_cust}
                            count={this.state.count}
                            OnNext={(res) => {
                            if (res == "2") {
                                this.setState({state: 2})
                            } else if (res == "1") {
                                this.setState({state: 1})
                            } else {
                                this.setState({modal: false})
                                Func.AlertForm("Berhasil", res, "success");
                            }
                        }}/>
                    </Dialog>
                </div>
            );
        } else {
            return <div/>;
        }
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Form"})(Form);
