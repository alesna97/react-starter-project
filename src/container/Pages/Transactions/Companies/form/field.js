import React from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import styles from "../css";
import Icon from "../../../../../components/icon";
import Func from "../../../../../functions/index";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@material-ui/core/Box";
import MuiDialogContent from "@material-ui/core/DialogContent";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Divider from "@material-ui/core/Divider";
import MuiDialogActions from "@material-ui/core/DialogActions";
import AsyncSelect from 'react-select/async'
import Select2 from 'react-select'
import { el } from "date-fns/locale";

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            validator: [],
            value: [],
            type: "",
            activeTabs: 0,
            Proses: false,
            ImgBase124: "",
            section: 0,
            id: null,
            redirect: false,
            date: new Date(),
            provin: [],
            data3: [],
            estimated_value: [],
            ltv_value: [],
            ltv: [],
            monthly_fee: [],
            dataBJ: [],
            cont: 0
        };
    }
    removeValidate(name) {
        var data = this.state.validator;
        delete data[name];
        this.setState({validator: data});
    }
    handleChange(event, name) {
        if (name == "company_id") {
            this.getCompanyDetail(event.value)
        }
        if (name == "product_id") {
            this.getInsurance(event.value)
            this.getInsuranceProd(event.value,"","")
        }
        if (name == "loan_amount") {
            this.getAdminFee(event)
            this.getRentalCosts(event)
        }

        var dataSet = this.state.value;
        dataSet[name] = event;
        this.setState({value: dataSet});
    }
    getCompanyDetail(id) {
        fetch(process.env.REACT_APP_URL_MANAJEMENT + "companies/" + id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code == "403") {
                if (Func.Clear_Token() == true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }
            console.log("asdasda",json);
            var val = this.state.value;
            val["city_name"] = json.data.company_detail.city_name
            val["identity_type"] = json.data.company_detail.identity_type
            val["phone_number"] = json.data.company_detail.phone_number
            val["address"] = json.data.company_detail.address
            val["cif_number"] = json.data.company_detail.cif_number
            this.setState({value: val});
        }).catch((error) => {}). finally(() => {});
    }
    getInsurance(id) {
        fetch(process.env.REACT_APP_URL_MASTER + "product/" + id + "/insurance_item/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code == "403") {
                if (Func.Clear_Token() == true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }

            var datas = []
            datas.push({
                value: '-',
                label: json.data.insurance_item_product.insurance_items.length > 0
                    ? "Pilih"
                    : "Tidak ditemukan",
                isDisabled: true
            })

            json
                .data
                .insurance_item_product
                .insurance_items
                .map((value) => {
                    datas.push({value: value.id.$oid, label: value.name})
                })
            this.setState({data3: datas, data3_ori: json.data.insurance_item_product.insurance_items});
        }).catch((error) => {}). finally(() => {});
    }
    getRentalCosts(value) {
        var id = this.state.value["product_id"].value;
        var insurance_item_id = this.state.value["insurance_item_id"].value;
        fetch(process.env.REACT_APP_URL_MASTER + "rental_costs?product_id=" + id + "&insurance_item_id=" + insurance_item_id + "&loan_value=" + value, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code == "403") {
                if (Func.Clear_Token() == true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }
            var val = this.state.value;
            val['monthly_fee'] = Math.ceil(json.data.rental_cost_nominal);
            this.setState({value: val});

        }).catch((error) => {}). finally(() => {});
    }
    getAdminFee(value) {
        var id = this.state.value["product_id"].value;
        var insurance_item_id = this.state.value["insurance_item_id"].value;
        fetch(process.env.REACT_APP_URL_MASTER + "admin_fees?product_id=" + id + "&insurance_item_id=" + insurance_item_id + "&loan_nominal=" + value, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code == "403") {
                if (Func.Clear_Token() == true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }
            var val = this.state.value;
            val['admin_fee'] = Math.ceil(value * parseFloat("0." + json.data[0].cost_percentage));
            this.setState({value: val});

        }).catch((error) => {}). finally(() => {});
    }

    getDueDates(date) {
        var id = this.state.value["product_id"].value;
        fetch(process.env.REACT_APP_URL_MASTER + "due_dates?product_id=" + id + "&contract_date=" + date, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code == "403") {
                if (Func.Clear_Token() == true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }

            var val = this.state.value;
            val['due_date'] = new Date(json.data.due_date)
            val['auction_date'] = new Date(json.data.auction_date)
            this.setState({value: val});

        }).catch((error) => {}). finally(() => {});
    }

    getInsuranceProd(id,id2,idx) {
        fetch(process.env.REACT_APP_URL_MASTER + "product/" + id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code == "403") {
                if (Func.Clear_Token() == true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }

            var datas = []
            datas.push({
                value: '-',
                label: json.data.product_detail.product_insurance_items.length > 0
                    ? "Pilih"
                    : "Tidak ditemukan",
                isDisabled: true
            })
            var _id = id2
            if (id2 =! "") {
                var search = json
                .data
                .product_detail
                .product_insurance_items.find(o => o.id.$oid === _id)
                if (search != undefined) {
                    var val = this.state.value;
                    val["product_insurance_item_id"+idx] = {value:search.id.$oid,label:search.name}
                    this.setState({value: val});
                }
            }


            json
                .data
                .product_detail
                .product_insurance_items
                .map((value) => {
                    datas.push({value: value.id.$oid, label: value.name})
                })
            this.setState({data5: datas});
        }).catch((error) => {}). finally(() => {});
    }
    handleChangeDate(date, name) {
        var dt = new Date(date);
        if (name == "contract_date") {
            this.getDueDates(dt)
        }
        var dataSet = this.state.value;
        dataSet[name] = dt;
        this.setState({value: dataSet});

    }
    componentDidMount() {
        this.getProd("", "", "");
        this.getCompany("", "", "");
        this.getInsurance("", "", "");
        if (this.props.type == "Ubah") {
            fetch(process.env.REACT_APP_URL_MANAJEMENT + "transactions/" + this.props.id, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                if (json.code == "403") {
                    if (Func.Clear_Token() == true) {
                        if (!localStorage.getItem("token")) {
                            this.setState({redirect: true});
                        }
                    }
                }

                this.getCompany("", "", json.data.transaction.company.name);
                this.getProd("", json.data.transaction.product_id, "");
                var val = this.state.value;
                val["insurance_item_id"] = {value:json.data.transaction.insurance_item_id,label:json.data.transaction.insurance_item_name}
                val["contract_date"] = new Date(json.data.transaction.contract_date)
                val["due_date"] = new Date(json.data.transaction.due_date)
                val["auction_date"] = new Date(json.data.transaction.auction_date)
                val["admin_fee"] = json.data.transaction.admin_fee
                val["loan_amount"] = json.data.transaction.loan_amount
                val["monthly_fee"] = json.data.transaction.monthly_fee
                    json.data.transaction.transaction_insurance_items.map((value,index) => {
                        this.addBJ(value.id)
                        this.getEstimate(
                            index,
                            value.product_insurance_item_id,
                            value.weight,
                            value.carats,
                            value.amount
                        )
                        this.getInsuranceProd(json.data.transaction.product_id,value.product_insurance_item_id,index)
                        val["name" + index] = value.name
                        val["ownership" + index] = value.ownership
                        val["amount" + index] = value.amount
                        val["weight" + index] = value.weight
                        val["carats" + index] = value.carats
                        val["description" + index] = value.description
                        val["Insurance_item_image" + index] = value.Insurance_item_image
                    })
                    
                    this.setState({value: val});


            }).catch((error) => {}). finally(() => {});
        }else{
            this.addBJ()
        }
    }
    getProd = (val, id, name) => {
        this.setState({isLoading: true});
        Func
            .getData("product", 10, 1, val)
            .then((res) => {
                if (res.json.code == "403") {
                    if (Func.Clear_Token() == true) {
                        if (!localStorage.getItem("token")) {
                            this.setState({redirect: true});
                        }
                    }
                } else {
                    var datas = []
                    datas.push({
                        value: '-',
                        label: res.json.data.length > 0
                            ? "Pilih"
                            : "Tidak ditemukan",
                        isDisabled: true
                    })

                    res
                        .json
                        .data
                        .map((value) => {
                            datas.push({value: value.id.$oid, label: value.name})
                        })
                    if (id != "") {
                        var search = res
                            .json
                            .data
                            .find(o => o.id.$oid === id)
                        if (search == undefined) {
                            datas.push({value: id, label: name})
                        }
                        if (search != undefined) {
                            var val = this.state.value;
                            val["product_id"] = {value:search.id.$oid,label:search.name}
                        }
                    }

                    this.setState({data2: datas, data2_ori: res.json.data});
                }
            });
    };

    getCompany = (val, id, name) => {
        this.setState({isLoading: true});
        Func
            .getDataTransaction("companies", 10, 1, val)
            .then((res) => {
                if (res.json.code == "403") {
                    if (Func.Clear_Token() == true) {
                        if (!localStorage.getItem("token")) {
                            this.setState({redirect: true});
                        }
                    }
                } else {
                    var datas = []
                    datas.push({
                        value: '-',
                        label: res.json.data.length > 0
                            ? "Pilih"
                            : "Tidak ditemukan",
                        isDisabled: true
                    })
                    res
                        .json
                        .data
                        .map((value) => {
                            datas.push({value: value.id, label: value.name})
                        })
                    if (name != "") {
                        var search = res
                            .json
                            .data
                            .find(o => o.name === name)
                        if (search == undefined) {
                            datas.push({value: id, label: name})
                        }

                        if (search != undefined) {
                            var val = this.state.value;
                            val["company_id"] = {value:search.id,label:search.name}
                            this.getCompanyDetail(search.id)
                        }

                    }

                    this.setState({data4: datas, data4_ori: res.json.data});
                }
            });
    };
    handleSubmit(type) {

        var validator = [
            {
                name: "insurance_item_id",
                type: "required"
            }, {
                name: "company_id",
                type: "required"
            }, {
                name: "product_id",
                type: "required"
            }, {
                name: "contract_date",
                type: "required"
            }, {
                name: "due_date",
                type: "required"
            }, {
                name: "auction_date",
                type: "required"
            }, {
                name: "loan_amount",
                type: "required"
            }, {
                name: "admin_fee",
                type: "required"
            }, {
                name: "monthly_fee",
                type: "required"
            }
        ];

        this
            .state
            .dataBJ
            .map((value, index) => {
                if (!value._destroy) {
                    validator.push({
                        name: "name" + value.key,
                        type: "required"
                    });
                    validator.push({
                        name: "product_insurance_item_id" + value.key,
                        type: "required"
                    });
                    validator.push({
                        name: "ownership" + value.key,
                        type: "required"
                    });
                    validator.push({
                        name: "amount" + value.key,
                        type: "required"
                    });
                    validator.push({
                        name: "weight" + value.key,
                        type: "required"
                    });
                    validator.push({
                        name: "carats" + value.key,
                        type: "required"
                    });
                    validator.push({
                        name: "description" + value.key,
                        type: "required"
                    });
                    validator.push({
                        name: "Insurance_item_image" + value.key,
                        type: "required"
                    });
                }
            });

        var validate = Func.Validator(this.state.value, validator);

        if (validate.success) {

            var TIIA = []
            this.state.dataBJ.map((value, index) => {
                if(value.id == null){
                    TIIA.push({
                        "name": this.state.value["name" + value.key],
                        "product_insurance_item_id": this.state.value["product_insurance_item_id" + value.key].value,
                        "ownership": this.state.value["ownership" + value.key],
                        "amount": this.state.value["amount" + value.key],
                        "weight": this.state.value["weight" + value.key],
                        "carats": this.state.value["carats" + value.key],
                        "description": this.state.value["description" + value.key],
                        "Insurance_item_image": this.state.ImgBase124["Insurance_item_image" + value.key],
                        "_destroy": value._destroy
                    })
                }else{
                    TIIA.push({
                        "id": value.id,
                        "name": this.state.value["name" + value.key],
                        "product_insurance_item_id": this.state.value["product_insurance_item_id" + value.key].value,
                        "ownership": this.state.value["ownership" + value.key],
                        "amount": this.state.value["amount" + value.key],
                        "weight": this.state.value["weight" + value.key],
                        "carats": this.state.value["carats" + value.key],
                        "description": this.state.value["description" + value.key],
                        "Insurance_item_image": this.state.ImgBase124["Insurance_item_image" + value.key],
                        "_destroy": value._destroy
                    })
                }
            })

            fetch(process.env.REACT_APP_URL_MANAJEMENT + "/transactions/" + (type == "Tambah"
                ? ""
                : this.props.id), {
                method: type == "Tambah"
                    ? "POST"
                    : "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "transaction": {
                        "insurance_item_id":this.state.value["insurance_item_id"].value,
                        "company_id":this.state.value["company_id"].value,
                        "insurance_item_name":this.state.value["insurance_item_id"].label,
                        "transaction_type":"disbursement",
                        "product_id":this.state.value["product_id"].value,
                        "status": "need_confirmation",
                        "contract_date":this.state.value["contract_date"],
                        "due_date":this.state.value["due_date"],
                        "auction_date":this.state.value["auction_date"],
                        "loan_amount":this.state.value["loan_amount"],
                        "admin_fee":this.state.value["admin_fee"],
                        "monthly_fee":this.state.value["monthly_fee"],
                        "disbursement_status":this.state.value["disbursement_status"],
                        "transaction_insurance_items_attributes": TIIA
                    }
                })
            }).then((response) => response.json()).then((json) => {
                if (json.code == "403") {
                    Func.Refresh_Token()
                    if (Func.Refresh_Token() == true) {
                        this.handleSubmit()
                    }
                }
                if (type == "Tambah") {
                    if (json.created) {
                        this.props.OnNext("Transaksi berhasil dibuat");
                    } else {
                        this.setState({validator: json.status});
                    } 
                } else {
                    if (json.code == 200) {
                        this.props.OnNext(json.message);
                    } else {
                        this.setState({validator: json.status});
                    } 
                }
            }).catch((error) => {}). finally(() => {});
        } else {
            this.setState({validator: validate.error});
        }
    }

    handleChangeImg(event, name) {
        this.removeValidate(name);
        var dataSet = this.state.value;
        dataSet[name] = URL.createObjectURL(event.target.files[0]);
        this.setState({value: dataSet});

        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            var ImgBase124 = []
            ImgBase124[name] = reader.result
            this.setState({ImgBase124: ImgBase124});
        };
    }
    getEstimate(index,id,weight,carats,amount) {
        if (id == undefined) {
            id = this.state.value["product_insurance_item_id" + index] == undefined ? 0 : this.state.value["product_insurance_item_id" + index].value;
            weight = this.state.value["weight" + index] == undefined ? 0 : this.state.value["weight" + index];
            carats = this.state.value["carats" + index] == undefined ? 0 : this.state.value["carats" + index];
            amount = this.state.value["amount" + index] == undefined ? 1 : this.state.value["amount" + index];
        }

        fetch(process.env.REACT_APP_URL_MASTER + "estimate_values?carats=" + carats + "&weight=" + weight + "&product_insurance_item_id=" + id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code == "403") {
                if (Func.Clear_Token() == true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }


            var estimated_value = this.state.estimated_value;
            var ltv = this.state.ltv;
            var ltv_value = this.state.ltv_value;

            estimated_value[index] = Math.ceil(json.data.estimated_value*amount);
            ltv_value[index] = Math.ceil(json.data.ltv_value*amount);
            ltv[index] = Math.ceil(json.data.ltv);

            this.setState({estimated_value: estimated_value, ltv_value: ltv_value, ltv: ltv},()=>{
                this.removeValidate("loan_amount")
            });
        }).catch((error) => {}). finally(() => {});

    }
    renderBJ() {
        const {classes} = this.props;
        var data = [];
        var key = 1
        this
            .state
            .dataBJ
            .map((value, index) => {
                if (!value._destroy) {
                    data.push(
                        <div>
                            <div
                                className={classes.BodytitleMdl2}
                                style={{
                                marginTop: 50
                            }}>
                                <text className={classes.titleMdl}>BARANG JAMINAN {key}</text>

                                <text
                                    style={{
                                    color: "red",
                                    marginLeft: 20,
                                    cursor: 'default',
                                    textDecoration: "underline"
                                }}
                                    onClick={() => {
                                        if (key == 2) {
                                            alert("Minimum 1")
                                        } else {
                                            var datas = this.state.dataBJ;
                                            var datas2 = this.state.dataBJ[index];
                                            datas.splice(index, index);
                                            datas2._destroy = true;
                                            datas.push(datas2);
                                            this.setState({dataBJ: datas});
                                        }
                                }}>Hapus</text>
                            </div>
                            <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <Grid container item lg={8} xl={8} md={8} sm={8} xs={12}>
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>Nama Barang Jaminan</text>
                                                <text className={classes.starts1}>*</text>
                                                <text
                                                    style={{
                                                    marginLeft: 8
                                                }}
                                                    className={classes.label1}>Jumlah</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <div>
                                                <TextField
                                                    size="small"
                                                    style={{
                                                    marginTop: 5
                                                }}
                                                    className={classes.input22}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("name" + value.key);
                                                }}
                                                    error={this.state.validator["name" + value.key]}
                                                    value={this.state.value["name" + value.key]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "name" + value.key);
                                                }}/>
                                                <TextField
                                                    size="small"
                                                    style={{
                                                    marginTop: 5
                                                }}
                                                    className={classes.input23}
                                                    variant="outlined"
                                                    type="number"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("amount" + value.key);
                                                }}
                                                    error={this.state.validator["amount" + value.key]}
                                                    value={this.state.value["amount" + value.key]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "amount" + value.key);
                                                    this.getEstimate(index)
                                                }}/>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>Kepemilikan Barang Jaminan</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("ownership" + value.key);
                                            }}
                                                error={this.state.validator["ownership" + value.key]}
                                                helperText={this.state.validator["ownership" + value.key]}
                                                value={this.state.value["ownership" + value.key]}
                                                onChange={(event) => {
                                                this.handleChange(event.target.value, "ownership" + value.key);
                                            }}
                                                name={"ownership" + value.key}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <div className={classes.label111}>
                                                    <text className={classes.label1}>Kategori Barang Jaminan</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["product_insurance_item_id" + value.key]}
                                                    isDisabled={this.state.value["product_id"] == undefined || this.state.value["insurance_item_id"] == undefined || this.state.value["product_id"] == "" || this.state.value["insurance_item_id"] == ""}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("product_insurance_item_id" + value.key);
                                                }}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["product_insurance_item_id" + value.key]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    onInputChange={(val) => {
                                                    this.getInsurance(val, "")
                                                }}
                                                    className={classes.input21}
                                                    options={this.state.data5}
                                                    onChange={(val) => {
                                                    var setter = this.state.value;
                                                    setter["weight" + value.key] = "" 
                                                    setter["carats" + value.key] = "" 
                                                    this.setState({
                                                        same: false,
                                                        value: setter
                                                    }, () => {
                                                        this.handleChange(val, "product_insurance_item_id" + value.key);
                                                    })
                                                }}/>

                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["product_insurance_item_id" + value.key]}
                                                </FormHelperText>
                                            </div>
                                        </Grid>

                                        <Grid container lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Berat
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <div>
                                                    <TextField
                                                        size="small"
                                                        style={{
                                                        marginTop: 5
                                                    }}
                                                        disabled={this.state.value["product_insurance_item_id" + value.key] == undefined || this.state.value["product_insurance_item_id" + value.key] == ""}
                                                        className={classes.input234}
                                                        variant="outlined"
                                                        type="number"
                                                        autoComplete="off"
                                                        onFocus={() => {
                                                        this.removeValidate("weight" + value.key);
                                                    }}
                                                        error={this.state.validator["weight" + value.key]}
                                                        value={this.state.value["weight" + value.key]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "weight" + value.key);
                                                        this.getEstimate(index)
                                                    }}
                                                        name={"weight" + value.key}/>
                                                </div>
                                            </Grid>
                                            <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Karatase
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <div>
                                                    <TextField
                                                        size="small"
                                                        style={{
                                                        marginTop: 5
                                                    }}
                                                        className={classes.input234}
                                                        disabled={this.state.value["product_insurance_item_id" + value.key] === undefined || this.state.value["weight" + value.key] === undefined || this.state.value["product_insurance_item_id" + value.key] === "" || this.state.value["weight" + value.key] === ""}
                                                        variant="outlined"
                                                        type="number"
                                                        autoComplete="off"
                                                        onFocus={() => {
                                                        this.removeValidate("carats" + value.key);
                                                    }}
                                                        error={this.state.validator["carats" + value.key]}
                                                        value={this.state.value["carats" + value.key]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "carats" + value.key);
                                                        this.getEstimate(index)
                                                    }}
                                                        name={"carats" + value.key}/>
                                                </div>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid container item lg={4} xl={4} md={4} sm={4} xs={12} spacing={3}>
                                    <Grid item lg={12} xl={12} md={12} sm={12} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Deskripsi</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextareaAutosize
                                            className={this.state.validator["description" + value.key]
                                            ? classes.textArea2
                                            : classes.textArea}
                                            variant="outlined"
                                            margin="normal"
                                            rows={8}
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("description" + value.key);
                                        }}
                                            error={this.state.validator["description" + value.key]}
                                            value={this.state.value["description" + value.key]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "description" + value.key);
                                        }}
                                            name={"description" + value.key}
                                            InputProps={{
                                            endAdornment: this.state.validator["description" + value.key]
                                                ? (
                                                    <InputAdornment position="start">
                                                        <img src={Icon.warning}/>
                                                    </InputAdornment>
                                                )
                                                : (<div/>)
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["description" + value.key]}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12}>
                                <Box
                                    borderColor={this.state.validator["Insurance_item_image" + value.key]
                                    ? "error.main"
                                    : "grey.500"}
                                    border={1}
                                    onClick={() => {
                                    this.removeValidate("Insurance_item_image" + value.key);
                                }}
                                    className={classes.imgScan}>
                                    {this.state.value["Insurance_item_image" + value.key]
                                        ? (<img
                                            className={classes.imgScan2}
                                            onClick={() => {
                                            this.removeValidate("Insurance_item_image" + value.key);
                                        }}
                                            src={this.state.value["Insurance_item_image" + value.key]}/>)
                                        : null}
                                </Box>
                                <FormHelperText className={classes.error}>
                                    {this.state.validator["Insurance_item_image" + value.key]}
                                </FormHelperText>
                            </Grid>
                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12}>
                                <div className={classes.BodytitleMdl22}>
                                    <img
                                        src={Icon.deleteImg}
                                        onClick={() => {
                                        var dataSet = this.state.value;
                                        dataSet["Insurance_item_image" + value.key] = null;
                                        this.setState({value: dataSet});
                                    }}/>
                                </div>
                                <div className={classes.BodytitleMdl23}>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="file"
                                        title="Pilih Gambar"
                                        onChange={(event) => {
                                        this.handleChangeImg(event, "Insurance_item_image" + value.key)
                                    }}/>
                                </div>
                            </Grid>
                        </div>
                    )
                    key++
                }
            })
        return data
    }
    addBJ(id) {
        var data = this.state.dataBJ;
        data.push({_destroy: false, key: this.state.cont,id:id == undefined ? null : id})
        this.setState({
            dataBJ: data,
            cont: this.state.cont + 1
        })
    }
    render() {

        var estimated_value = 0
        for (let index = 0; index < this.state.estimated_value.length; index++) {
            estimated_value += this.state.estimated_value[index]
        }

        var ltv_value = 0
        for (let index = 0; index < this.state.ltv_value.length; index++) {
            ltv_value += this.state.ltv_value[index]
        }

        var ltv = 0
        for (let index = 0; index < this.state.ltv.length; index++) {
            ltv += this.state.ltv[index]
        }

        if (this.state.value["loan_amount"] > ltv_value && this.state.validator["loan_amount"] == undefined) {
            var validate = this.state.validator
            validate["loan_amount"] = "Pinjaman melebihi batas maksimum"
            this.setState({validator: validate})
        }

        const ExampleCustomInput = ({value, onClick}) => (<img src={Icon.icon_date} onClick={onClick}/>);
        const {classes} = this.props;
        const loadOptions = (inputValue, callback) => {
            setTimeout(() => {
                callback(this.state.data2);
            }, 1000);
        };
        const loadOptions3 = (inputValue, callback) => {
            setTimeout(() => {
                callback(this.state.data4);
            }, 1000);
        };
        return (
            <div>
                <DialogContent>
                    <div className={classes.scrool}>
                        {Func.toLogin(this.state.redirect)}
                        <div className={classes.root}>
                            <div className={classes.BodytitleMdl2}>
                                <text className={classes.titleMdl}>Data Nasabah</text>
                            </div>
                            <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                                    <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                        <Grid container item lg={8} xl={8} md={8} sm={8} xs={12}>
                                            <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                                <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                    <div className={classes.label111}>
                                                        <text className={classes.label1}>Nama Perusahaan</text>
                                                        <text className={classes.starts1}>*</text>
                                                    </div>
                                                    <AsyncSelect
                                                        name="form-field-name-error"
                                                        value={this.state.value["company_id"]}
                                                        placeholder="Cari Nasabah"
                                                        onFocus={() => {
                                                        this.removeValidate("company_id");
                                                    }}
                                                        styles={{
                                                        control: (provided, state) => ({
                                                            ...provided,
                                                            borderColor: this.state.validator["company_id"]
                                                                ? "red"
                                                                : '#CACACA',
                                                            borderRadius: "0.25rem"
                                                        })
                                                    }}
                                                        onInputChange={(val) => {
                                                        this.getCompany(val, "")
                                                    }}
                                                        cacheOptions
                                                        loadOptions={loadOptions3}
                                                        defaultOptions
                                                        className={classes.input21}
                                                        options={this.state.data4}
                                                        onChange={(val) => {
                                                        this.handleChange(val, "company_id");
                                                    }}/>
                                                </Grid>
                                                <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                    <div>
                                                        <text className={classes.label1}>Kota</text>
                                                        <text className={classes.starts1}>*</text>
                                                    </div>
                                                    <TextField
                                                        size="small"
                                                        disabled={true}
                                                        className={classes.input2}
                                                        variant="outlined"
                                                        autoComplete="off"
                                                        onFocus={() => {
                                                        this.removeValidate("city_name");
                                                    }}
                                                        error={this.state.validator["city_name"]}
                                                        helperText={this.state.validator["city_name"]}
                                                        value={this.state.value["city_name"]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "city_name");
                                                    }}
                                                        name={"city_name"}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                                <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                <div>
                                                        <text className={classes.label1}>No. CIF</text>
                                                        <text className={classes.starts1}>*</text>
                                                    </div>
                                                    <TextField
                                                        size="small"
                                                        disabled={true}
                                                        className={classes.input2}
                                                        variant="outlined"
                                                        autoComplete="off"
                                                        onFocus={() => {
                                                        this.removeValidate("cif_number");
                                                    }}
                                                        error={this.state.validator["cif_number"]}
                                                        helperText={this.state.validator["cif_number"]}
                                                        value={this.state.value["cif_number"]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "cif_number");
                                                    }}
                                                        name={"cif_number"}/>
                                                </Grid>
                                                <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                    <div>
                                                        <text className={classes.label1}>Kode Area</text>
                                                        <text className={classes.label1}></text>
                                                        <text className={classes.label1}></text>
                                                        <text className={classes.label1}></text>
                                                        <text className={classes.label2}>Nomor Telepon</text>
                                                        <text className={classes.starts1}>*</text>
                                                    </div>
                                                    <TextField
                                                        disabled={true}
                                                        size="small"
                                                        className={classes.input8}
                                                        variant="outlined"
                                                        autoComplete="off"
                                                        onFocus={() => {
                                                        this.removeValidate("phone_number");
                                                    }}
                                                        error={this.state.validator["phone_number"]}
                                                        helperText={this.state.validator["phone_number"]}
                                                        value={this.state.value["phone_number"]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "phone_number");
                                                    }}
                                                        name="phone_number"
                                                        InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment className={classes.InputAdornment}>
                                                                <Select
                                                                    className={classes.formControl}
                                                                    value={this.state.value["area_code"] == undefined
                                                                    ? "+62"
                                                                    : this.state.value["area_code"]}
                                                                    onChange={(event) => {
                                                                    this.handleChange(event.target.value, "area_code");
                                                                }}>
                                                                    <MenuItem value={"+62"}>+62</MenuItem>
                                                                    <MenuItem value={"+1"}>+1</MenuItem>
                                                                </Select>
                                                            </InputAdornment>
                                                        )
                                                    }}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}></Grid>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12} spacing={3}>
                                            <Grid item lg={12} xl={12} md={12} sm={12} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>Alamat</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <TextareaAutosize
                                                    className={this.state.validator["address"]
                                                    ? classes.textArea2
                                                    : classes.textArea}
                                                    variant="outlined"
                                                    disabled={true}
                                                    margin="normal"
                                                    rows={8}
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("address");
                                                }}
                                                    error={this.state.validator["address"]}
                                                    value={this.state.value["address"]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "address");
                                                }}
                                                    name={"address"}
                                                    InputProps={{
                                                    endAdornment: this.state.validator["address"]
                                                        ? (
                                                            <InputAdornment position="start">
                                                                <img src={Icon.warning}/>
                                                            </InputAdornment>
                                                        )
                                                        : (<div/>)
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["address"]}
                                                </FormHelperText>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider className={classes.divider}/>
                                    <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Produk Gadai</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <AsyncSelect
                                                name="form-field-name-error"
                                                value={this.state.value["product_id"]}
                                                placeholder="Pilih"
                                                onFocus={() => {
                                                this.removeValidate("product_id");
                                            }}
                                                styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: this.state.validator["product_id"]
                                                        ? "red"
                                                        : '#CACACA',
                                                    borderRadius: "0.25rem"
                                                })
                                            }}
                                                onInputChange={(val) => {
                                                this.getProd(val, "")
                                            }}
                                                cacheOptions
                                                loadOptions={loadOptions}
                                                defaultOptions
                                                className={classes.input21}
                                                options={this.state.data2}
                                                onChange={(val) => {
                                                var setter = this.state.value;
                                                for (let index = 0; index < this.state.dataBJ; index++) {
                                                    setter["weight" + index] = "" 
                                                    setter["carats" + index] = "" 
                                                    setter["product_insurance_item_id" + index] = ""
                                                }
                                                this.setState({
                                                    same: false,
                                                    value: setter
                                                }, () => {
                                                    this.handleChange(val, "product_id");
                                                })
                                            }}/>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Kategori Barang Jaminan</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <Select2
                                                name="form-field-name-error"
                                                value={this.state.value["insurance_item_id"]}
                                                isDisabled={this.state.value["product_id"] == undefined
                                                ? true
                                                : false}
                                                placeholder="Pilih"
                                                onFocus={() => {
                                                this.removeValidate("insurance_item_id");
                                            }}
                                                styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: this.state.validator["insurance_item_id"]
                                                        ? "red"
                                                        : '#CACACA',
                                                    borderRadius: "0.25rem"
                                                })
                                            }}
                                                onInputChange={(val) => {
                                                this.getInsurance(val, "")
                                            }}
                                                className={classes.input21}
                                                options={this.state.data3}
                                                onChange={(val) => {
                                                this.handleChange(val, "insurance_item_id");
                                            }}/>
                                        </Grid>
                                    </Grid>
                                    <div
                                        style={{
                                        marginBottom: 50
                                    }}>
                                        {this.renderBJ()}
                                        <button
                                            style={{
                                            marginTop: 30,
                                            marginLeft: 15,
                                            backgroundColor: "#C4A643",
                                            borderRadius: 50,
                                            color: "white",
                                            width: 200,
                                            height: 35,
                                            fontWeight: "500",
                                            fontSize: 14
                                        }}
                                            onClick={() => {
                                            this.addBJ()
                                        }}>
                                            Tambah Barang Jaminan
                                        </button>
                                    </div>
                                    <div className={classes.BodytitleMdl2}>
                                        <text className={classes.titleMdl}>Perhitungan Barang Jaminan</text>
                                    </div>
                                    <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Nilai Taksiran</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                disabled={true}
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("estimated_value");
                                            }}
                                                error={this.state.validator["estimated_value"]}
                                                helperText={this.state.validator["estimated_value"]}
                                                value={estimated_value != undefined
                                                ? Func.FormatNumber(estimated_value)
                                                : ""}
                                                onChange={(event) => {
                                                this.handleChange(Func.UnFormatRp(event.target.value), "estimated_value");
                                            }}
                                                InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                        Rp
                                                    </InputAdornment>
                                            }}
                                                name={"estimated_value"}/>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Pinjaman yang Diajukan</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                disabled={ltv_value == 0}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("loan_amount");
                                            }}
                                                error={this.state.validator["loan_amount"]}
                                                helperText={this.state.validator["loan_amount"]}
                                                value={this.state.value["loan_amount"] != undefined
                                                ? Func.FormatNumber(this.state.value["loan_amount"])
                                                : ""}
                                                onChange={(event) => {
                                                this.removeValidate("loan_amount");
                                                this.handleChange(Func.UnFormatRp(event.target.value), "loan_amount");
                                            }}
                                                InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                        Rp
                                                    </InputAdornment>
                                            }}
                                                name={"loan_amount"}/>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Biaya Admin</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                disabled={true}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("admin_fee");
                                            }}
                                                error={this.state.validator["admin_fee"]}
                                                helperText={this.state.validator["admin_fee"]}
                                                value={this.state.value["admin_fee"] != undefined
                                                ? Func.FormatNumber(this.state.value["admin_fee"])
                                                : ""}
                                                onChange={(event) => {
                                                this.handleChange(Func.UnFormatRp(event.target.value), "admin_fee");
                                            }}
                                                InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                        Rp
                                                    </InputAdornment>
                                            }}
                                                name={"admin_fee"}/>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        style={{
                                        marginTop: 25
                                    }}
                                        item
                                        lg={12}
                                        xl={12}
                                        md={12}
                                        xs={12}
                                        xs={12}>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Maksimum Pinjaman</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                disabled={true}
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("ltv_value");
                                            }}
                                                error={this.state.validator["ltv_value"]}
                                                helperText={this.state.validator["ltv_value"]}
                                                value={ltv_value != undefined
                                                ? Func.FormatNumber(ltv_value)
                                                : ""}
                                                onChange={(event) => {
                                                this.handleChange(Func.UnFormatRp(event.target.value), "ltv_value");
                                            }}
                                                InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                        Rp
                                                    </InputAdornment>
                                            }}
                                                name={"ltv_value"}/>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Rasio Pinjaman</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                disabled={true}
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("ltv");
                                            }}
                                                error={this.state.validator["ltv"]}
                                                helperText={this.state.validator["ltv"]}
                                                value={ltv != undefined
                                                ? Func.FormatNumber(ltv)
                                                : ""}
                                                onChange={(event) => {
                                                this.handleChange(Func.UnFormatRp(event.target.value), "ltv");
                                            }}
                                                name={"ltv"}/>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div className={classes.label111}>
                                                <text className={classes.label1}>Biaya Sewa Perbulan</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                disabled={true}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("monthly_fee");
                                            }}
                                                error={this.state.validator["monthly_fee"]}
                                                helperText={this.state.validator["monthly_fee"]}
                                                value={this.state.value["monthly_fee"] != undefined
                                                ? Func.FormatNumber(this.state.value["monthly_fee"])
                                                : ""}
                                                onChange={(event) => {
                                                this.handleChange(Func.UnFormatRp(event.target.value), "monthly_fee");
                                            }}
                                                InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                        Rp
                                                    </InputAdornment>
                                            }}
                                                name={"monthly_fee"}/>
                                        </Grid>
                                    </Grid>
                                    <Divider className={classes.divider}/>
                                    <div className={classes.BodytitleMdl2}>
                                        <text className={classes.titleMdl}>Tanggal-Tanggal Penting</text>
                                    </div>
                                    <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div>
                                                <text className={classes.label1}>
                                                    Tanggal Akad
                                                </text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                disabled={true}
                                                placeholder="yyy/mm/dd"
                                                onFocus={() => {
                                                this.removeValidate("contract_date");
                                            }}
                                                error={this.state.validator["contract_date"]}
                                                helperText={this.state.validator["contract_date"]}
                                                value={this.state.value["contract_date"] != undefined
                                                ? Func.FormatDate(this.state.value["contract_date"])
                                                : this.state.value["contract_date"]}
                                                name="contract_date"
                                                InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.InputAdornment}>
                                                        <DatePicker
                                                            selected={this.state.value["contract_date"]}
                                                            disabled={this.state.value["product_id"] == undefined
                                                            ? true
                                                            : false}
                                                            onChange={(date) => {
                                                            this.handleChangeDate(date, "contract_date", "contract_date");
                                                        }}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            customInput={< ExampleCustomInput />}/>
                                                    </InputAdornment>
                                                )
                                            }}/>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div>
                                                <text className={classes.label1}>
                                                    Tanggal Jatuh Tempo
                                                </text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                disabled={true}
                                                placeholder="yyy/mm/dd"
                                                onFocus={() => {
                                                this.removeValidate("due_date");
                                            }}
                                                error={this.state.validator["due_date"]}
                                                helperText={this.state.validator["due_date"]}
                                                value={this.state.value["due_date"] != undefined
                                                ? Func.FormatDate(this.state.value["due_date"])
                                                : this.state.value["due_date"]}
                                                name="due_date"
                                                InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.InputAdornment}>
                                                        <DatePicker
                                                            selected={this.state.value["due_date"]}
                                                            peekNextMonth
                                                            disabled={true}
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            customInput={< ExampleCustomInput />}/>
                                                    </InputAdornment>
                                                )
                                            }}/>
                                        </Grid>
                                        <Grid container item lg={4} xl={4} md={4} sm={4} xs={12}>
                                            <div>
                                                <text className={classes.label1}>
                                                    Tanggal Lelang
                                                </text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                disabled={true}
                                                placeholder="yyy/mm/dd"
                                                onFocus={() => {
                                                this.removeValidate("auction_date");
                                            }}
                                                error={this.state.validator["auction_date"]}
                                                helperText={this.state.validator["auction_date"]}
                                                value={this.state.value["auction_date"] != undefined
                                                ? Func.FormatDate(this.state.value["auction_date"])
                                                : this.state.value["auction_date"]}
                                                name="auction_date"
                                                InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.InputAdornment}>
                                                        <DatePicker
                                                            selected={this.state.value["auction_date"]}
                                                            disabled={true}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            customInput={< ExampleCustomInput />}/>
                                                    </InputAdornment>
                                                )
                                            }}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Grid container className={classes.scrool2}>
                        <Grid item xs={12}>
                            <div
                                style={{
                                marginTop: 20
                            }}>
                                <text style={styles.starts}>*</text>
                                <text className={styles.label}>
                                    {" "}
                                    Nama tidak boleh kosong
                                </text>
                            </div>
                            <div>
                                <text style={styles.starts}>**</text>
                                <text className={styles.label}>
                                    {" "}
                                    Nama tidak boleh sama
                                </text>
                            </div>
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                            <Box display="flex" flexDirection="row-reverse">
                                <Box>
                                    <button
                                        style={{
                                        backgroundColor: "#C4A643",
                                        borderRadius: 50,
                                        color: "white",
                                        width: 87,
                                        height: 35,
                                        fontWeight: "500",
                                        fontSize: 14
                                    }}
                                        onClick={() => {
                                        this.handleSubmit(this.props.type);
                                    }}>
                                        {this.props.type}
                                    </button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogActions>
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Form"})(Form);
