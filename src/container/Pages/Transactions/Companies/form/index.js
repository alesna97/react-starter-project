import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Func from "../../../../../functions/index";
import styles from "../css";
import Icon from "../../../../../components/icon";
import Field from "./field";
import Typography from '@material-ui/core/Typography';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
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
      imgPath: Icon.blank,
      count: 0,
      id: null,
    };
    this.handleChangeImg = this.handleChangeImg.bind(this);
  }

  onPage(type) {
    var val = "";
    if (type == "-") {
      val = this.state.activeTabs - 1;
    } else {
      val = this.state.activeTabs + 1;
    }
    this.setState({
      activeTabs: val,
      Proses:val
    });
  }
  componentWillReceiveProps() {
    if (this.props.row != "undefined" && this.props.modal) {
      this.setState({ modal: this.props.modal, type: this.props.type});
    }
    if (this.props.type == "Ubah" && this.props.row != undefined ) {
      this.setState({ id:this.props.row.id});
    }
  }
  removeValidate(name) {
    var data = this.state.validator;
    delete data[name];
    this.setState({ validator: data });
  }
  handleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleChange(event, name) {
    var dataSet = this.state.value;
    dataSet[name] = event.target.value;
    this.setState({ value: dataSet });
  }
  handleSubmit() {
    if (this.state.activeTabs == 6) {
      this.setState({
        modal: !this.state.modal,
        activeTabs: 0,
      });
    } else {
      this.setState({
        Proses: this.state.activeTabs,
      });
    }
  }
  handleChangeImg(event) {
    this.setState({
      imgPath: URL.createObjectURL(event.target.files[0]),
    });
  }
  render() {
    const { classes } = this.props;
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
            container={() => {}}
          >
          <MuiDialogTitle disableTypography>
            <Typography className={classes.titleForm} variant="h7">{this.props.type+ " Transaksi Perusahaan"}</Typography>
              <IconButton aria-label="close" className={classes.closeButton} onClick={()=>{this.handleModal()}}>
                <CloseIcon />
              </IconButton>
          </MuiDialogTitle>

            <Field
              Proses={this.state.Proses}
              value={this.state.value}
              type={this.state.type}
              id={this.state.id}
              count={this.state.count}
              OnNext={(res) => {
                console.log("resssssss",res);
                this.setState({modal:false})
                Func.AlertForm("Berhasil", res, "success");
              }}
            />
          </Dialog>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default withStyles(styles.CoustomsStyles, {
  name: "Form",
})(Form);
