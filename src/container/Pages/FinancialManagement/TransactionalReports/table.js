import React from "react";
import {withStyles} from "@material-ui/core/styles";
import styles from "./css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormCountry from "./form/index";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Icon from "../../../../components/icon";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Func from "../../../../functions/index";
import Swal from "sweetalert2";
import Pagination from "@material-ui/lab/Pagination";
import {Hidden} from "@material-ui/core";
import BeatLoader from "react-spinners/BeatLoader";
import env from "../../../../config/env";

function createData(id, date, nomor, description, nominal) {
  return { id, date, nomor, description, nominal };
}

const headCells = [
  { id: "date", numeric: false, disablePadding: false, label: "Tanggal" },
  { id: "nomor", numeric: false, disablePadding: false, label: "Nomor Bukti" },
  { id: "description", numeric: false, disablePadding: false, label: "Uraian" },
  { id: "nominal", numeric: false, disablePadding: false, label: "Nominal" },
];

const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3)
        }
    },
    input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme
            .transitions
            .create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    }
}))(InputBase);

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total_data: 0,
            total_page: 1,
            current_page: 1,
            prev_page: null,
            data: [],
            next_page: 1,
            rowsPerPage: 10,
            openSearch: false,
            rowFocus: "",
            page: 1,
            count: 1,
            data: [],
            loading: true,
            modal: false,
            selectAll: false,
            order: "asc",
            rowSelected: "",
            bulk: false,
            redirect: false,
            failure: false
        };
        this.ChangePage = this
            .ChangePage
            .bind(this);
    }
    handleClick(id) {
        alert(id);
    }
    ChangePage(event, page) {
        this.setState({
            page: page
        }, () => {
            this.getData();
        });
    }
    setFocus(row) {
        this.setState({rowFocus: row.id});
    }
    setUnfocus() {
        setTimeout(() => {
            this.setState({rowFocus: ""});
        }, 5500);
    }
    handleModal(row) {
        this.setState({
            modal: true,
            row: row
        }, () => {
            this.setState({modal: false, bulk: false});
        });
    }
    componentDidMount() {
        this.getData("first");
    }
    handleClickDelete = (row) => {
        Swal
            .fire({
            title: "Apakah Anda yakin?",
            text: "Akan menghapus data yang dipilih",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
        })
            .then((result) => {
                if (result.value) {
                    fetch(env.masterApi + env.apiPrefixV1 + '/' + this.props.path + "/" + row, {
                        method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }).then((response) => response.json()).then((json) => {
                        if (json.success) {
                            this.setState({bulk: false});
                            Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
                        } else {
                            Swal.fire("Gagal!", json.message, "warning");
                        }
                        this.getData("first");
                    }).catch((error) => {}). finally(() => {});
                }
            });
    };

    getData = () => {
        this.setState({loading: true});
        Func
            .getDataFinancial(this.props.path, this.state.rowsPerPage, this.state.page, this.state.search)
            .then((res) => {
                if (res.json.code == "403") {
                    if (Func.Clear_Token() == true) {
                        if (!localStorage.getItem("token")) {
                            this.setState({redirect: true});
                        }
                    }
                } else if (res.json.status == 500) {
                    this.setState({failure: true});
                } else {
                    var datas = [];
                    res.json.data.map((data) => {
                        if (data.amount != undefined) { 
                            datas.push(createData(data.id,Func.FormatDate(data.created_at),"-",data.description,Func.FormatRp(data.amount)));
                        } else {
                            datas.push(createData(data.id,Func.FormatDate(data.request_date),data.number,data.description,Func.FormatRp(data.nominal)));   
                        }
                    });
                    this.setState({
                        data: datas,
                        loading: false,
                        total_data: res.json.total_data,
                        page: res.json.page,
                        next_page: res.json.next_page,
                        prev_page: res.json.prev_page,
                        current_page: res.json.current_page,
                        total_page: res.json.total_page
                    });
                }
            });
    };
    Short(orderKey) {
        if (orderKey == this.state.order) {
            this.setState({order: ""});
            var library = this.state.data;
            library.sort(function (a, b) {
                return a[orderKey] < b[orderKey]
                    ? 1
                    : b[orderKey] < a[orderKey]
                        ? -1
                        : 0;
            });
        } else {
            this.setState({order: orderKey});
            var library = this.state.data;
            library.sort(function (a, b) {
                return a[orderKey] > b[orderKey]
                    ? 1
                    : b[orderKey] > a[orderKey]
                        ? -1
                        : 0;
            });
        }
    }
    handleClickDeleteAll = () => {
        Swal
            .fire({
            title: "Apakah Anda yakin?",
            text: "Akan menghapus data yang dipilih",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
        })
            .then((result) => {
                if (result.value) {
                    this
                        .state
                        .data
                        .map((row) => {
                            fetch(env.masterApi + env.apiPrefixV1 + '/' + this.props.path + "/" + row.id, {
                                method: "DELETE",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            }).then((response) => response.json()).then((json) => {
                                if (json.success) {
                                    this.setState({bulk: false});
                                    Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
                                } else {
                                    Swal.fire("Gagal!", json.message, "warning");
                                }
                                this.getData();
                            }).catch((error) => {}). finally(() => {});
                        });
                }
            });
    };
    DeleteBulk() {
        if (this.state.selectAll) {
            this.handleClickDeleteAll();
        } else {
            this.handleClickDelete(this.state.rowSelected);
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                {Func.toLogin(this.state.redirect)}
                <TableContainer style={{width:this.props.open ? window.innerWidth-this.props.width : window.innerWidth-115}} component={Paper}>
                    <div style={{
                        width: "100%"
                    }}>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Typography variant="h6" className={classes.paginationTxt2}>
                                    {this.props.title}
                                </Typography>
                            </Box>
                        </Box>
                    </div>
                    <div style={{
                        width: "100%"
                    }}>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Typography className={classes.paginationTxt}>
                                    {this.props.subtitle}
                                </Typography>
                            </Box>
                        </Box>
                    </div>
                    <Hidden smUp>
                        <div
                            style={{
                            width: "100%"
                        }}>
                            <Box display="flex">
                                <Box flexGrow={1}>
                                    <Typography variant="h9" className={classes.textperdata}>
                                        Tampilkan
                                    </Typography>
                                    <Select
                                        size="small"
                                        className={classes.selectperdata}
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={this.state.rowsPerPage}
                                        onChange={(val) => {
                                        this.setState({
                                            rowsPerPage: val.target.value
                                        }, () => {
                                            this.getData();
                                        });
                                    }}
                                        input={< BootstrapInput />}>
                                        <MenuItem value={10}>10 data</MenuItem>
                                        <MenuItem value={50}>50 data</MenuItem>
                                        <MenuItem value={100}>100 data</MenuItem>
                                    </Select>
                                    <Typography variant="h9" className={classes.textperdata}>
                                        Total: {this.state.total_data} transaksi
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                        <div
                            style={{
                            width: "100%"
                        }}>
                            <Box display="flex">
                                <Box>
                                    <BootstrapInput
                                        value={this.state.search}
                                        onChange={(event) => {
                                        this.setState({
                                            search: event.target.value
                                        }, () => {
                                            this.getData();
                                        });
                                    }}
                                        on
                                        className={!this.state.openSearch
                                        ? classes.search
                                        : classes.search2}
                                        id="demo-customized-textbox"/>
                                </Box>
                                <Box>
                                    <IconButton
                                        onClick={() => {
                                        this.setState({
                                            openSearch: !this.state.openSearch
                                        });
                                    }}
                                        className={classes.search3}
                                        aria-label="Cari">
                                        <img src={Icon.search}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </div>
                    </Hidden>
                    <Hidden xsDown>
                        <div
                            style={{
                            width: "100%"
                        }}>
                            <Box display="flex">
                                <Box flexGrow={1}>
                                    <Typography variant="h9" className={classes.textperdata}>
                                        Tampilkan
                                    </Typography>
                                    <Select
                                        size="small"
                                        className={classes.selectperdata}
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={this.state.rowsPerPage}
                                        onChange={(val) => {
                                        this.setState({
                                            rowsPerPage: val.target.value
                                        }, () => {
                                            this.getData();
                                        });
                                    }}
                                        input={< BootstrapInput />}>
                                        <MenuItem value={10}>10 data</MenuItem>
                                        <MenuItem value={50}>50 data</MenuItem>
                                        <MenuItem value={100}>100 data</MenuItem>
                                    </Select>
                                    <Typography variant="h9" className={classes.textperdata}>
                                        Total: {this.state.total_data} transaksi
                                    </Typography>
                                </Box>
                                <Box>
                                    <BootstrapInput
                                        value={this.state.search}
                                        onChange={(event) => {
                                        this.setState({
                                            search: event.target.value
                                        }, () => {
                                            this.getData();
                                        });
                                    }}
                                        on
                                        className={!this.state.openSearch
                                        ? classes.search
                                        : classes.search2}
                                        id="demo-customized-textbox"/>
                                </Box>
                                <Box>
                                    <IconButton
                                        onClick={() => {
                                        this.setState({
                                            openSearch: !this.state.openSearch
                                        });
                                    }}
                                        className={classes.search3}
                                        aria-label="Cari">
                                        <img src={Icon.search}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </div>
                    </Hidden>
                    <FormCountry type="Ubah" modal={this.state.modal} row={this.state.row}/>
                </TableContainer>
                <TableContainer style={{width:this.props.open ? window.innerWidth-this.props.width : window.innerWidth-115}} component={Paper}>
                    <Table
                        size="small"
                        onMouseOut={() => {
                        this.setUnfocus();
                    }}
                        className={classes.table}
                        aria-label="simple table">
                        <TableHead className={classes.headTable}>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric
                                        ? "right"
                                        : "left"}
                                        sortDirection={this.state.order === headCell.id
                                        ? this.state.order
                                        : false}>
                                        <TableSortLabel
                                            active={this.state.order === headCell.id}
                                            direction={this.state.order === headCell.id
                                            ? this.state.order
                                            : "asc"}
                                            onClick={() => {
                                            this.Short(headCell.id);
                                        }}>
                                            {headCell.label}
                                            {this.state.order === headCell.id
                                                ? (
                                                    <span className={classes.visuallyHidden}></span>
                                                )
                                                : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {this.state.data.length == 0  && !this.state.loading
                        ? <TableBody>
                            <TableRow>
                                <TableCell colSpan={4} align="center" > 
                                    <Typography> 
                                        Tidak Ada Data
                                    </Typography> 
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        : null}
                        <TableBody>
                            {!this.state.loading
                                ? this
                                    .state
                                    .data
                                    .map((row) => (
                                        <TableRow
                                            hover
                                            onMouseOver={() => {
                                            this.setFocus(row);
                                        }}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}>
                                            <TableCell align="left">{row.date}</TableCell>
                                            <TableCell align="left">{row.nomor}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="left">{row.nominal}</TableCell>
                                        </TableRow>
                                    ))

                                : null
}
                        </TableBody>
                    </Table>
                    {this.state.loading
                        ? <div className={classes.loader}>
                                <BeatLoader size={15} color={"#3F3F3F"} loading={true}/>
                            </div>
                        : null
}
                </TableContainer>
                <TableContainer style={{width:this.props.open ? window.innerWidth-this.props.width : window.innerWidth-115, marginBottom:40}} component={Paper}>
                    <div className={classes.col}>
                        <text>
                            Halaman {" " + this.state.current_page + " "}
                            dari {" " + this.state.total_page + " "}
                            halaman
                        </text>
                    </div>
                    <Pagination
                        className={classes.row}
                        count={this.state.total_page}
                        defaultPage={this.state.page}
                        onChange={this.ChangePage}
                        siblingCount={0}/>
                </TableContainer>
                {this.state.bulk
                    ? (
                        <div className={classes.popupv2}>
                            <Box display="flex" justifyContent="center" flexWrap="wrap">
                                <Box flexWrap="wrap">
                                    <div className={classes.popup}>
                                        <Box display="flex" justifyContent="center" flexWrap="wrap">
                                            <Box>
                                                <Typography className={classes.popupTxt}>
                                                    Pilih aksi:
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    onClick={() => {
                                                    this.DeleteBulk();
                                                }}
                                                    aria-label="Cari">
                                                    <img src={Icon.popupDelete}/>
                                                </IconButton>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    className={classes.popupClose}
                                                    onClick={() => {
                                                    this.setState({rowSelected: "", bulk: false, selectAll: false});
                                                }}
                                                    aria-label="Cari">
                                                    <img src={Icon.close}/>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </div>
                                </Box>
                            </Box>
                        </div>
                    )
                    : null}
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Tables"})(Tables);
