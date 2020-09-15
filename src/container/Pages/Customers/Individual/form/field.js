/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable array-callback-return */
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import styles from "../../../../container/Pages/Customer/Individual/css";
import Icon from "../../../../components/icon";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Func from "../../../../functions/index";
import FormHelperText from "@material-ui/core/FormHelperText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Select2 from 'react-select'
import AsyncSelect from 'react-select/async'
import env from "../../../../config/env";

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
            ImgBase44: "",
            section: 0,
            id_cust: null,
            redirect: false,
            date: new Date(),
            cities: [],
            same:false,
            cities2: [],
            province: [],
            rekeningActive: 0,
            rekeningN0: 1,
            contactN0: 1,
            form: 1,
            contact: [
                {
                    emergency_id: 0,
                    emergency_name: "",
                    emergency_relation: "",
                    emergency_job_name: "",
                    emergency_nationality: "",
                    emergency_address: "",
                    _destroy: false
                }
            ],
            rekening: [
                {
                    id_Rek: 0,
                    norek: "",
                    rek_name: "",
                    bank_name: "",
                    bank_branch: "",
                    _destroy: false
                }
            ]
        };
        this.handleChangeImg = this
            .handleChangeImg
            .bind(this);
    }
    removeValidate(name) {
        var data = this.state.validator;
        delete data[name];
        this.setState({validator: data});
    }
    handleChange(event, name) {
        var dataSet = this.state.value;
        if (name === "identity_province") {
            this.getIdentityCity("",event.value)
            dataSet["identity_city"] = "-";
        }
        if (name === "residence_province") {
            this.getResidenceCity("",event.value)
            dataSet["residence_city"] = "-";
        }
        dataSet[name] = event;
        this.setState({value: dataSet});
    }
    handleChangeDate(date, name, name2) {
        var dt = new Date(date);
        var dataSet = this.state.value;
        dataSet[name2] = dt;
        dataSet[name] = dt.getFullYear() + "-" + parseInt(dt.getMonth() + 1) + "-" + dt.getDate();
        this.setState({value: dataSet});
    }
    addRekening() {
        var data = this.state.rekening;
        data.push({
            id_Rek: this.state.rekeningN0,
            norek: "",
            rek_name: "",
            bank_name: "",
            bank_branch: "",
            _destroy: false
        });
        this.setState({
            rekening: data,
            rekeningN0: this.state.rekeningN0 + 1
        });
    }
    addContact() {
        var data = this.state.contact;
        data.push({
            emergency_id: this.state.contactN0,
            emergency_name: "",
            emergency_relation: "",
            emergency_job_name: "",
            emergency_nationality: "",
            emergency_address: "",
            _destroy: false
        });
        this.setState({
            contact: data,
            contactN0: this.state.contactN0 + 1
        });
    }
    componentDidMount() {
        this.getProvince("","");
        if (this.props.type === "Ubah") {
            fetch(env.managementApi + env.apiPrefixV1 + "customer/" + this.props.id_cust, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                if (json.code === "403") {
                    if (Func.Clear_Token() === true) {
                        if (!localStorage.getItem("token")) {
                            this.setState({redirect: true});
                        }
                    }
                }
                var val = [];
                var arrSalary = ['Kurang dari Rp 3.000.000', 'Diatas dari Rp 3.000.000', 'Diatas dari Rp 6.000.000']
                val["name"] = json.data.customer_detail.name;
                val["birth_place"] = json.data.customer_detail.birth_place;
                val["birth_date2"] = new Date(json.data.customer_detail.birth_date);
                val["birth_date"] = json.data.customer_detail.birth_date;
                val["identity_type"] = json.data.customer_detail.identity_type;
                val["identity_number"] = json.data.customer_detail.identity_number;
                val["degree"] = {
                    value: json.data.customer_detail.degree,
                    label: json.data.customer_detail.degree
                };
                val["gender"] = {
                    value: json.data.customer_detail.gender,
                    label: json.data.customer_detail.gender === 'l'
                        ? "Laki Laki"
                        : "Perempuan"
                };
                val["expired_date"] = json.data.customer_detail.expired_date;
                val["expired_date2"] = new Date(json.data.customer_detail.expired_date);
                val["email"] = json.data.customer_detail.email;

                val["img"] = env.managementApi + json.data.customer_detail.id_scan_image.url;

                val["residence_province"] = {
                    value: json.data.customer_detail.customer_contact.residence_province,
                    label: json.data.customer_detail.customer_contact.residence_province
                };

                val["residence_city"] = {
                    value: json.data.customer_detail.customer_contact.residence_city,
                    label: json.data.customer_detail.customer_contact.residence_city
                };
                val["residence_region"] = json.data.customer_detail.customer_contact.residence_region;
                val["residence_postal_code"] = json.data.customer_detail.customer_contact.residence_postal_code;
                val["residence_address"] = json.data.customer_detail.customer_contact.residence_address;
                val["identity_province"] = {
                    value: json.data.customer_detail.customer_contact.identity_province,
                    label: json.data.customer_detail.customer_contact.identity_province
                };
                this.getProvince("",json.data.customer_detail.customer_contact.identity_province);
                val["identity_city"] = {
                    value: json.data.customer_detail.customer_contact.identity_city,
                    label: json.data.customer_detail.customer_contact.identity_city
                };

                val["identity_region"] = json.data.customer_detail.customer_contact.identity_region;
                val["identity_postal_code"] = json.data.customer_detail.customer_contact.identity_postal_code;
                val["identity_address"] = json.data.customer_detail.customer_contact.identity_address;
                val["phone_number"] = json.data.customer_detail.customer_contact.phone_number;
                val["telephone_number"] = json.data.customer_detail.customer_contact.telephone_number;
                val["job_type"] = {
                    value: json.data.customer_detail.customer_job.job_type,
                    label: json.data.customer_detail.customer_job.job_type
                };
                val["income_source"] = {
                    value: json.data.customer_detail.customer_job.income_source,
                    label: json.data.customer_detail.customer_job.income_source
                };
                val["company_name"] = json.data.customer_detail.customer_job.company_name;
                val["disbursement_type"] = {
                    value: json.data.customer_detail.customer_job.disbursement_type,
                    label: json.data.customer_detail.customer_job.disbursement_type
                };
                val["financing_purpose"] = {
                    value: json.data.customer_detail.customer_job.financing_purpose,
                    label: json.data.customer_detail.customer_job.financing_purpose
                };
                val["tax_number"] = json.data.customer_detail.customer_job.tax_number;
                val["mother_name"] = json.data.customer_detail.mother_name;
                val["salary_amount"] = {
                    value: json.data.customer_detail.customer_job.salary_amount,
                    label: arrSalary[json.data.customer_detail.customer_job.salary_amount - 1]
                };

                json
                    .data
                    .customer_detail
                    .customer_bank_accounts
                    .map((value, index) => {
                        if (index !== 0) {
                            this.addRekening();
                        }
                        val["id_Rek" + index] = value.id;
                        val["account_number" + index] = value.account_number;
                        val["account_name" + index] = value.account_name;
                        val["bank_name" + index] = value.bank_name;
                        val["branch_name" + index] = value.branch_name;

                        if (value.main_account) {
                            this.setState({rekeningActive: index});
                        }
                    });

                json
                    .data
                    .customer_detail
                    .customer_emergency_contacts
                    .map((value, index) => {
                        if (index !== 0) {
                            this.addContact();
                        }
                        val["emergency_id" + index] = value.id;
                        val["emergency_name" + index] = value.name;
                        val["emergency_relation" + index] = {
                          value: value.relation,
                          label: value.relation
                        };
                        val["emergency_job_name" + index] = value.job_name;
                        val["emergency_nationality" + index] = {
                          value: value.nationality,
                          label: value.nationality
                        };
                        val["emergency_address" + index] = value.address;
                    });

                this.setState({
                    value: val
                });
            }).catch((error) => {}).finally(() => {});
        }
    }
    getIdentityCity(val,id) {
        var data = this.state.province_ori.find(o => o.name === id);
        fetch(env.masterApi + env.apiPrefixV1 + "/cities/index_by_provinces?province_id=" + data.id.$oid+"&search="+val, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code === "403") {
                if (Func.Clear_Token() === true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }
            var datas = []
            datas.push({value: '-', label: json.data.length > 0 ? "Pilih" : "Tidak ditemukan", isDisabled: true})
            json.data.map((value) => {
                datas.push({value: value.name, label: value.name})
            })
            this.setState({cities: datas});

        }).catch((error) => {}).finally(() => {});
    }
    getResidenceCity(val,id) {
        var data = this.state.province_ori.find(o => o.name === id);
        fetch(env.masterApi + env.apiPrefixV1 + "/cities/index_by_provinces?province_id=" + data.id.$oid+"&search="+val, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((json) => {
            if (json.code === "403") {
                if (Func.Clear_Token() === true) {
                    if (!localStorage.getItem("token")) {
                        this.setState({redirect: true});
                    }
                }
            }
            var datas = []
            datas.push({value: '-', label: 'Pilih', isDisabled: true})
            json
                .data
                .map((value) => {
                    datas.push({value: value.name, label: value.name})
                })
            this.setState({cities2: datas});
        }).catch((error) => {}).finally(() => {});
    }
    getProvince(val,name) {
        Func
            .getData("provinces", 10, 1, val)
            .then((res) => {
                if (res.json.code === "403") {
                    if (Func.Clear_Token() === true) {
                        if (!localStorage.getItem("token")) {
                            this.setState({redirect: true});
                        }
                    }
                } else {

                    var datas = []
                    datas.push({value: '-', label: res.json.data.length > 0 ? "Pilih" : "Tidak ditemukan", isDisabled: true})

                    if (name !== "") {
                        var search = res
                            .json
                            .data
                            .find(o => o.name === name)
                        if (search === undefined) {
                            datas.push({value: name, label: name})
                        }
                    }
                    res
                        .json
                        .data
                        .map((value) => {
                            datas.push({value: value.name, label: value.name})
                        })
                        
                    this.setState({
                        province: datas,
                        province_ori: res.json.data
                    }, () => {
                        if (name !== "") {
                            this.getIdentityCity("",name)
                            this.getResidenceCity("",name)
                        }

                    });
                }
            });
    }
    handleSubmit(type) {
        if (this.state.form === 1) {
            var validator = [
                {
                    name: "name",
                    type: "required"
                }, {
                    name: "identity_number",
                    type: "required"
                }, {
                    name: "birth_place",
                    type: "requiredV2"
                }, {
                    name: "birth_date",
                    type: "requiredV2"
                }, {
                    name: "degree",
                    type: "required"
                }, {
                    name: "gender",
                    type: "required"
                }, {
                    name: "identity_province",
                    type: "required"
                }, {
                    name: "identity_city",
                    type: "required"
                }, {
                    name: "identity_region",
                    type: "required"
                }, {
                    name: "identity_postal_code",
                    type: "required"
                }, {
                    name: "identity_address",
                    type: "required"
                }, {
                    name: "residence_province",
                    type: "required",
                }, {
                    name: "residence_city",
                    type: "required",
                }, {
                    name: "residence_region",
                    type: "required",
                }, {
                    name: "residence_postal_code",
                    type: "required",
                }, {
                    name: "residence_address",
                    type: "required",
                }, {
                    name: "phone_number",
                    type: "required"
                }, {
                    name: "telephone_number",
                    type: "required"
                }, {
                    name: "email",
                    type: "required"
                }, {
                    name: "job_type",
                    type: "required"
                }, {
                    name: "income_source",
                    type: "required"
                }, {
                    name: "company_name",
                    type: "required"
                }, {
                    name: "disbursement_type",
                    type: "required"
                }, {
                    name: "financing_purpose",
                    type: "required"
                }, {
                    name: "tax_number",
                    type: "required"
                }, {
                    name: "mother_name",
                    type: "required"
                }, {
                    name: "salary_amount",
                    type: "required"
                }
            ];
            this
                .state
                .rekening
                .map((value, index) => {
                    validator.push({
                        name: "account_number" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "account_name" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "account_name" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "bank_name" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "branch_name" + index,
                        type: "required"
                    });
                });
        } else {
            // eslint-disable-next-line no-redeclare
            var validator = [
                {
                    name: "img",
                    type: "required"
                }
            ];
            this
                .state
                .contact
                .map((value, index) => {
                    validator.push({
                        name: "emergency_name" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "emergency_job_name" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "emergency_relation" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "emergency_nationality" + index,
                        type: "required"
                    });
                    validator.push({
                        name: "emergency_address" + index,
                        type: "required"
                    });
                });
        }
        var validate = Func.Validator(this.state.value, validator);
        if (validate.success && this.state.form === 2) {
            var Bank = [];
            this
                .state
                .rekening
                .map((value, index) => {
                    var itemBank = {
                        id: this.state.value["id_Rek" + index],
                        account_number: this.state.value["account_number" + index],
                        account_name: this.state.value["account_name" + index],
                        bank_name: this.state.value["bank_name" + index],
                        branch_name: this.state.value["branch_name" + index],
                        main_account: this.state.rekeningActive === value.id_Rek
                            ? true
                            : false,
                        _destroy: value._destroy
                    };
                    Bank.push(itemBank);
                });

            var Emergency = [];

            this
                .state
                .contact
                .map((value, index) => {
                    var itemEmergency = {
                        id: this.state.value["emergency_id" + index],
                        name: this.state.value["emergency_name" + index],
                        relation: this.state.value["emergency_relation" + index].value,
                        job_name: this.state.value["emergency_job_name" + index],
                        nationality: this.state.value["emergency_nationality" + index].value,
                        address: this.state.value["emergency_address" + index],
                        _destroy: value._destroy
                    };
                    Emergency.push(itemEmergency);
                });
            fetch(env.managementApi + env.apiPrefixV1 + "/customer/" + (type === "Tambah"
                ? ""
                : this.props.id_cust), {
                method: type === "Tambah"
                    ? "POST"
                    : "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    customer: {
                        email: this.state.value["email"],
                        branch_office_id: "1231294",
                        branch_office_name: "Bandung",
                        name: this.state.value["name"],
                        gender: this.state.value["gender"].value,
                        identity_number: this.state.value["identity_number"],
                        identity_type: this.state.value["identity_type"] === undefined
                            ? "ktp"
                            : this.state.value["identity_type"],
                        expired_date: this.state.value["expired_date"],
                        birth_date: this.state.value["birth_date"],
                        birth_place: this.state.value["birth_place"],
                        marital_status: true,
                        degree: this.state.value["degree"].value,
                        mother_name: this.state.value["mother_name"],
                        customer_contact_attributes: {
                            residence_address: this.state.value["residence_address"],
                            residence_province: this.state.value["residence_province"].value,
                            residence_city: this.state.value["residence_city"].value,
                            residence_region: this.state.value["residence_region"],
                            residence_postal_code: this.state.value["residence_postal_code"],
                            identity_address: this.state.value["identity_address"],
                            identity_province: this.state.value["identity_province"].value,
                            identity_city: this.state.value["identity_city"].value,
                            identity_region: this.state.value["identity_region"],
                            identity_postal_code: this.state.value["identity_postal_code"],
                            phone_number: this.state.value["phone_number"],
                            telephone_number: this.state.value["telephone_number"]
                        },
                        customer_job_attributes: {
                            job_type: this.state.value["job_type"].value,
                            company_name: this.state.value["company_name"],
                            tax_number: this.state.value["tax_number"],
                            customer_type: "Perorangan", 
                            income_source: this.state.value["income_source"].value,
                            disbursement_type: this.state.value["disbursement_type"].value,
                            financing_purpose: this.state.value["financing_purpose"].value,
                            salary_amount: this.state.value["salary_amount"].value
                        },
                        customer_bank_accounts_attributes: Bank,
                        customer_emergency_contacts_attributes: Emergency,
                        customer_notes_attributes: [
                            {
                                subject: "-",
                                note_description: "-"
                            }
                        ],
                        id_scan_image: this.state.ImgBase44
                    }
                })
            }).then((response) => response.json()).then((json) => {
                if (json.code === "403") {
                    Func.Refresh_Token()
                    if (Func.Refresh_Token() === true) { 
                        this.handleSubmit()
                    }
                }
                if (type === "Tambah") {
                    if (json.created) {
                        this
                            .props
                            .OnNext(json.message);
                    } else {
                        this.setState({validator: json.status});
                    }
                } else {
                    if (json.code === 200) {
                        this
                            .props
                            .OnNext(json.message);
                    } else {
                        this.setState({validator: json.status});
                    }
                }
            }).catch((error) => {}).finally(() => {});
        } else if (validate.success && this.state.form === 1) {
            this.setState({form: 2});
            this
                .props
                .OnNext("2");
        } else {
            this.setState({validator: validate.error});
        }
    }

    handleChangeImg(event) {
        this.removeValidate("img");
        var dataSet = this.state.value;
        dataSet["img"] = URL.createObjectURL(event.target.files[0]);
        this.setState({value: dataSet});

        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({ImgBase44: reader.result});
        };
    }

    renderListRekening() {
        const {classes} = this.props;
        var dataLIst = [];
        var i = 0;
        this
            .state
            .rekening
            .map((value, index) => {
                if (value._destroy === false) {
                    i++
                    dataLIst.push(
                        <Grid
                            className={index === this.state.rekeningActive
                            ? classes.rekBook
                            : classes.rekBook2}
                            item
                            lg={4}
                            xl={4}
                            md={4}
                            xs={4}>
                            <div className={classes.label111}>
                                <text className={classes.titleMdl}>REKENING {i}</text>

                                <Link
                                    className={classes.deleteRec}
                                    onClick={() => {
                                    if (value.id_Rek === this.state.rekeningActive) {} else if (index === 0) {
                                        var datas = this.state.rekening;
                                        var datas2 = this.state.rekening[index];
                                        datas.shift();
                                        datas2._destroy = true;
                                        datas.push(datas2);
                                        this.setState({rekening: datas});
                                    } else {
                                        // eslint-disable-next-line no-redeclare
                                        var datas = this.state.rekening;
                                        // eslint-disable-next-line no-redeclare
                                        var datas2 = this.state.rekening[index];
                                        datas.splice(index, index);
                                        datas2._destroy = true;
                                        datas.push(datas2);
                                        this.setState({rekening: datas});
                                    }
                                }}
                                    color="inherit">
                                    Hapus
                                </Link>
                                {value.id_Rek === this.state.rekeningActive
                                    ? (<Checkbox checked={true} value="remember" color="primary"/>)
                                    : null}
                                {value.id_Rek === this.state.rekeningActive
                                    ? (
                                        <text className={classes.makePrio1}>Utama</text>
                                    )
                                    : (
                                        <Link
                                            className={classes.makePrio}
                                            onClick={() => {
                                            this.setState({rekeningActive: value.id_Rek});
                                        }}
                                            color="inherit">
                                            Jadikan Utama
                                        </Link>
                                    )}
                            </div>
                            {this.state.rekeningActive !== value.id_Rek
                                ? (
                                    <div className={classes.label1111}></div>
                                )
                                : null}
                            <div className={classes.label111}>
                                <text className={classes.titleMdl}></text>
                            </div>
                            <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <div>
                                    <text className={classes.label1}>Nomor Rekening</text>
                                    <text className={classes.starts1}>*</text>
                                </div>
                                <TextField
                                    size="small"
                                    className={classes.input24}
                                    variant="outlined"
                                    autoComplete="off"
                                    onFocus={() => {
                                    this.removeValidate("account_number" + index);
                                }}
                                    error={this.state.validator["account_number" + index]}
                                    helperText={this.state.validator["account_number" + index]}
                                    value={this.state.value["account_number" + index]}
                                    onChange={(event) => {
                                    this.handleChange(event.target.value, "account_number" + index);
                                }}
                                    name={"account_number" + index}/>
                            </Grid>
                            <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <div>
                                    <text className={classes.label1}>Nama Pemilik</text>
                                    <text className={classes.starts1}>*</text>
                                </div>
                                <TextField
                                    size="small"
                                    className={classes.input24}
                                    variant="outlined"
                                    autoComplete="off"
                                    onFocus={() => {
                                    this.removeValidate("account_name" + index);
                                }}
                                    error={this.state.validator["account_name" + index]}
                                    helperText={this.state.validator["account_name" + index]}
                                    value={this.state.value["account_name" + index]}
                                    onChange={(event) => {
                                    this.handleChange(event.target.value, "account_name" + index);
                                }}
                                    name={"account_name" + index}/>
                            </Grid>
                            <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <div>
                                    <text className={classes.label1}>Nama Bank</text>
                                    <text className={classes.starts1}>*</text>
                                </div>
                                <TextField
                                    size="small"
                                    className={classes.input24}
                                    variant="outlined"
                                    autoComplete="off"
                                    onFocus={() => {
                                    this.removeValidate("bank_name" + index);
                                }}
                                    error={this.state.validator["bank_name" + index]}
                                    helperText={this.state.validator["bank_name" + index]}
                                    value={this.state.value["bank_name" + index]}
                                    onChange={(event) => {
                                    this.handleChange(event.target.value, "bank_name" + index);
                                }}
                                    name={"bank_name" + index}/>
                            </Grid>
                            <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <div>
                                    <text className={classes.label1}>Cabang</text>
                                    <text className={classes.starts1}>*</text>
                                </div>
                                <TextField
                                    size="small"
                                    className={classes.input24}
                                    variant="outlined"
                                    autoComplete="off"
                                    onFocus={() => {
                                    this.removeValidate("branch_name" + index);
                                }}
                                    error={this.state.validator["branch_name" + index]}
                                    helperText={this.state.validator["branch_name" + index]}
                                    value={this.state.value["branch_name" + index]}
                                    onChange={(event) => {
                                    this.handleChange(event.target.value, "branch_name" + index);
                                }}
                                    name={"branch_name" + index}/>
                            </Grid>
                        </Grid>
                    );
                }
            });
        return dataLIst;
    }

    renderListContact() {
        const {classes} = this.props;
        var dataLIst = [];
        this
            .state
            .contact
            .map((value, index) => {
                if (value._destroy === false) {
                    dataLIst.push(
                        <div>
                            <div className={classes.BodytitleMdl2}>
                                <text className={classes.titleMdl}></text>
                            </div>
                            <div className={classes.BodytitleMdl2}>
                                <text className={classes.titleMdl}>KONTAK {index + 1}</text>
                            </div>
                            <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <Grid container item lg={8} xl={8} md={8} sm={8} xs={12}>
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>Nama Lengkap</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("emergency_name" + index);
                                            }}
                                                error={this.state.validator["emergency_name" + index]}
                                                helperText={this.state.validator["emergency_name" + index]}
                                                value={this.state.value["emergency_name" + index]}
                                                onChange={(event) => {
                                                this.handleChange(event.target.value, "emergency_name" + index);
                                            }}
                                                name={"emergency_name" + index}/>
                                        </Grid>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>Pekerjaan</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input2}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("emergency_job_name" + index);
                                            }}
                                                error={this.state.validator["emergency_job_name" + index]}
                                                helperText={this.state.validator["emergency_job_name" + index]}
                                                value={this.state.value["emergency_job_name" + index]}
                                                onChange={(event) => {
                                                this.handleChange(event.target.value, "emergency_job_name" + index);
                                            }}
                                                name={"emergency_job_name" + index}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>Hubungan</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["emergency_relation" + index]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("emergency_relation" + index);
                                                }}
                                                    error={true}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["emergency_relation" + index]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    options={[
                                                    {
                                                        value: '-',
                                                        label: 'Pilih',
                                                        isDisabled: true
                                                    }, {
                                                        value: 'Saudara',
                                                        label: 'Saudara'
                                                    }, {
                                                        value: 'Orang tua',
                                                        label: 'Orang tua'
                                                    }, {
                                                        value: 'Kerabat',
                                                        label: 'Kerabat'
                                                    }
                                                ]}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "emergency_relation" + index);
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["emergency_relation" + index]}
                                                </FormHelperText>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>Kewarganegaraan</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["emergency_nationality" + index]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("emergency_nationality" + index);
                                                }}
                                                    error={true}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["emergency_nationality" + index]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    options={[
                                                    {
                                                        value: '-',
                                                        label: 'Pilih',
                                                        isDisabled: true
                                                    }, {
                                                        value: 'WNI',
                                                        label: 'WNI'
                                                    }, {
                                                        value: 'WNA',
                                                        label: 'WNA'
                                                    }
                                                ]}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "emergency_nationality" + index);
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["emergency_nationality" + index]}
                                                </FormHelperText>
                                            </div>
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
                                            className={this.state.validator["emergency_address" + index]
                                            ? classes.textArea2
                                            : classes.textArea}
                                            variant="outlined"
                                            margin="normal"
                                            rows={8}
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("emergency_address" + index);
                                        }}
                                            error={this.state.validator["emergency_address" + index]}
                                            value={this.state.value["emergency_address" + index]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "emergency_address" + index);
                                        }}
                                            name={"emergency_address" + index}
                                            InputProps={{
                                            endAdornment: this.state.validator["emergency_address" + index]
                                                ? (
                                                    <InputAdornment position="start">
                                                        <img src={Icon.warning}/>
                                                    </InputAdornment>
                                                )
                                                : (<div/>)
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["emergency_address" + index]}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    );
                }
            });
        return dataLIst;
    }

    render() {
        const loadOptionsProvince1 = (inputValue, callback) => {
            setTimeout(() => {
                callback(this.state.province);
            }, 1000);
        };
        const loadOptionsCity1 = (inputValue, callback) => {
            setTimeout(() => {
                callback(this.state.cities);
            }, 1000);
        };
        const {classes} = this.props;
        const ExampleCustomInput = ({value, onClick}) => (<img src={Icon.icon_date} onClick={onClick}/>);
        if (this.state.form === 1) {
            return (
                <div>
                    <DialogContent>
                        <div className={classes.scrool}>
                            {Func.toLogin(this.state.redirect)}
                            <div className={classes.root}>
                                <div className={classes.BodytitleMdl2}>
                                    <text className={classes.titleMdl}>Data Perorangan</text>
                                </div>
                                <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Nama Lengkap Sesuai ID
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input2}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("name");
                                                }}
                                                    error={this.state.validator["name"]}
                                                    helperText={this.state.validator["name"]}
                                                    value={this.state.value["name"]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "name");
                                                }}
                                                    name="name"/>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Tempat Lahir
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input2}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("birth_place");
                                                }}
                                                    error={this.state.validator["birth_place"]}
                                                    helperText={this.state.validator["birth_place"]}
                                                    value={this.state.value["birth_place"]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "birth_place");
                                                }}
                                                    name="birth_place"/>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>ID</text>
                                                    <text className={classes.label1}></text>
                                                    <text className={classes.label1}></text>
                                                    <text className={classes.label1}></text>
                                                    <text className={classes.label2}>Nomor ID</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input8}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("identity_number");
                                                }}
                                                    error={this.state.validator["identity_number"]}
                                                    helperText={this.state.validator["identity_number"]}
                                                    value={this.state.value["identity_number"]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "identity_number");
                                                }}
                                                    name="identity_number"
                                                    InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment className={classes.InputAdornment}>
                                                            <Select
                                                                className={classes.formControl}
                                                                value={this.state.value["identity_type"] === undefined
                                                                ? "ktp"
                                                                : this.state.value["identity_type"]}
                                                                onChange={(event) => {
                                                                this.handleChange(event.target.value, "identity_type");
                                                            }}>
                                                                <MenuItem value={"ktp"}>KTP</MenuItem>
                                                                <MenuItem value={"passport"}>
                                                                    Passport
                                                                </MenuItem>
                                                            </Select>
                                                        </InputAdornment>
                                                    )
                                                }}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                            <Grid
                                                container
                                                item
                                                lg={4}
                                                xl={4}
                                                md={4}
                                                sm={4}
                                                xs={12}
                                                className={classes.formPad}>
                                                <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                    <div>
                                                        <text className={classes.label1}>Gelar</text>
                                                        <text className={classes.starts1}>*</text>
                                                    </div>
                                                    <div>
                                                        <Select2
                                                            name="form-field-name-error"
                                                            value={this.state.value["degree"]}
                                                            placeholder="Pilih"
                                                            onFocus={() => {
                                                            this.removeValidate("degree");
                                                        }}
                                                            error={true}
                                                            styles={{
                                                            control: (provided, state) => ({
                                                                ...provided,
                                                                borderColor: this.state.validator["degree"]
                                                                    ? "red"
                                                                    : '#CACACA',
                                                                borderRadius: "0.25rem"
                                                            })
                                                        }}
                                                            className={classes.input9}
                                                            options={[
                                                            {
                                                                value: '-',
                                                                label: 'Pilih',
                                                                isDisabled: true
                                                            }, {
                                                                value: 'S3',
                                                                label: 'S3'
                                                            }, {
                                                                value: 'S2',
                                                                label: 'S2'
                                                            }, {
                                                                value: 'S1',
                                                                label: 'S1'
                                                            }, {
                                                                value: 'D1',
                                                                label: 'D1'
                                                            }, {
                                                                value: 'D2',
                                                                label: 'D2'
                                                            }, {
                                                                value: 'D3',
                                                                label: 'D3'
                                                            }, {
                                                                value: 'SMA/SMK',
                                                                label: 'SMA/SMK'
                                                            }, {
                                                                value: 'SMP',
                                                                label: 'SMP'
                                                            }, {
                                                                value: 'SD',
                                                                label: 'SD'
                                                            }
                                                        ]}
                                                            onChange={(val) => {
                                                            this.handleChange(val, "degree");
                                                        }}/>
                                                        <FormHelperText className={classes.error}>
                                                            {this.state.validator["degree"]}
                                                        </FormHelperText>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                    <div>
                                                        <text className={classes.label1}>
                                                            Jenis Kelamin
                                                        </text>
                                                        <text className={classes.starts1}>*</text>
                                                    </div>
                                                    <div>
                                                        <Select2
                                                            name="form-field-name-error"
                                                            value={this.state.value["gender"]}
                                                            placeholder="Pilih"
                                                            onFocus={() => {
                                                            this.removeValidate("gender");
                                                        }}
                                                            error={true}
                                                            styles={{
                                                            control: (provided, state) => ({
                                                                ...provided,
                                                                borderColor: this.state.validator["gender"]
                                                                    ? "red"
                                                                    : '#CACACA',
                                                                borderRadius: "0.25rem"
                                                            })
                                                        }}
                                                            className={classes.input9}
                                                            options={[
                                                            {
                                                                value: '-',
                                                                label: 'Pilih',
                                                                isDisabled: true
                                                            }, {
                                                                value: 'l',
                                                                label: 'Laki Laki'
                                                            }, {
                                                                value: 'p',
                                                                label: 'Perempuan'
                                                            }
                                                        ]}
                                                            onChange={(val) => {
                                                            this.handleChange(val, "gender");
                                                        }}/>
                                                        <FormHelperText className={classes.error}>
                                                            {this.state.validator["gender"]}
                                                        </FormHelperText>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Tanggal Berlaku ID
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
                                                    this.removeValidate("expired_date");
                                                }}
                                                    error={this.state.validator["expired_date"]}
                                                    helperText={this.state.validator["expired_date"]}
                                                    value={this.state.value["expired_date"] !== undefined
                                                    ? Func.FormatDate(this.state.value["expired_date"])
                                                    : "Seumur Hidup"}
                                                    name="expired_date"
                                                    InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment className={classes.InputAdornment}>
                                                            <DatePicker
                                                                selected={this.state.value["expired_date2"]}
                                                                onChange={(date) => {
                                                                this.handleChangeDate(date, "expired_date", "expired_date2");
                                                            }}
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                customInput={< ExampleCustomInput />}/>
                                                        </InputAdornment>
                                                    )
                                                }}/>
                                                <FormHelperText className={classes.txtHelper}>
                                                    Kosongkan jika masa berlaku seumur hidup
                                                </FormHelperText>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Tanggal Lahir
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
                                                    this.removeValidate("birth_date");
                                                }}
                                                    error={this.state.validator["birth_date"]}
                                                    helperText={this.state.validator["birth_date"]}
                                                    value={this.state.value["birth_date"] !== undefined
                                                    ? Func.FormatDate(this.state.value["birth_date"])
                                                    : this.state.value["birth_date2"]}
                                                    name="birth_date"
                                                    InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment className={classes.InputAdornment}>
                                                            <DatePicker
                                                                selected={this.state.value["birth_date2"]}
                                                                onChange={(date) => {
                                                                this.handleChangeDate(date, "birth_date", "birth_date2");
                                                            }}
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
                                <Divider className={classes.divider}/>
                                <div className={classes.BodytitleMdl2}>
                                    <text className={classes.titleMdl}>Kontak</text>
                                </div>
                                <Grid container lg={12} xl={12} md={12} xs={12} xs={12}>
                                    <Grid item lg={4} xl={4} md={4} xs={4} xs={12}>
                                        <div className={classes.label111}>
                                            <text className={classes.label1}>Alamat Sesuai ID</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <AsyncSelect
                                                name="form-field-name-error"
                                                value={this.state.value["identity_province"]}
                                                placeholder="Pilih"
                                                onFocus={() => {
                                                this.removeValidate("identity_province");
                                            }}
                                                styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: this.state.validator["identity_province"]
                                                        ? "red"
                                                        : '#CACACA',
                                                    borderRadius: "0.25rem"
                                                })
                                            }}
                                                onInputChange={(val) => {
                                                    this.getProvince(val, "")
                                                }}
                                                cacheOptions
                                                loadOptions={loadOptionsProvince1}
                                                defaultOptions
                                                className={classes.input21}
                                                options={this.state.province}
                                                onChange={(val) => {
                                                this.handleChange(val, "identity_province");
                                                this.setState({same:false})
                                            }}/>
                                        </Grid>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <Select2
                                                name="form-field-name-error"
                                                isDisabled={this.state.value["identity_province"] === undefined || this.state.value["identity_province"] === "-"}
                                                value={this.state.value["identity_city"]}
                                                placeholder="Pilih"
                                                onFocus={() => {
                                                this.removeValidate("identity_city");
                                            }}
                                                error={true}
                                                styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: this.state.validator["identity_city"]
                                                        ? "red"
                                                        : '#CACACA',
                                                    borderRadius: "0.25rem"
                                                })
                                            }}
                                                className={classes.input21}
                                                onInputChange={(val) => {
                                                    this.getIdentityCity(val,this.state.value["identity_province"].value)
                                                }}
                                                cacheOptions
                                                loadOptions={loadOptionsCity1}
                                                defaultOptions
                                                className={classes.input21}
                                                options={this.state.cities}
                                                onChange={(val) => {
                                                this.setState({same:false})
                                                this.handleChange(val, "identity_city");
                                            }}/>
                                        </Grid>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input22}
                                                    variant="outlined"
                                                    placeholder="Kecamatan"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("identity_region");
                                                }}
                                                    error={this.state.validator["identity_region"]}
                                                    value={this.state.value["identity_region"]}
                                                    onChange={(event) => {
                                                    this.setState({same:false})
                                                    this.handleChange(event.target.value, "identity_region");
                                                }}/>
                                                <TextField
                                                    size="small"
                                                    className={classes.input23}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    placeholder="Kode Post"
                                                    onFocus={() => {
                                                    this.removeValidate("identity_postal_code");
                                                }}
                                                    error={this.state.validator["identity_postal_code"]}
                                                    value={this.state.value["identity_postal_code"]}
                                                    onChange={(event) => {
                                                    this.setState({same:false})
                                                    this.handleChange(event.target.value, "identity_postal_code");
                                                }}
                                                    name="identity_postal_code"/>
                                            </div>
                                        </Grid>
                                        <div>
                                            <text className={classes.label1}>
                                                Jalan dan Nomor Rumah
                                            </text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <TextareaAutosize
                                                className={this.state.validator["identity_address"]
                                                ? classes.textArea2
                                                : classes.textArea}
                                                variant="outlined"
                                                margin="normal"
                                                rows={4}
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("identity_address");
                                            }}
                                                error={this.state.validator["identity_address"]}
                                                value={this.state.value["identity_address"]}
                                                onChange={(event) => {
                                                this.setState({same:false})
                                                this.handleChange(event.target.value, "identity_address");
                                            }}
                                                name="identity_address"
                                                InputProps={{
                                                endAdornment: this.state.validator["identity_address"]
                                                    ? (
                                                        <InputAdornment position="start">
                                                            <img src={Icon.warning}/>
                                                        </InputAdornment>
                                                    )
                                                    : (<div/>)
                                            }}/>
                                        </Grid>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["identity_province"] || this.state.validator["identity_city"] || this.state.validator["identity_region"] || this.state.validator["identity_postal_code"] || this.state.validator["identity_address"]
                                                ? "Harap isi kotak berwarna merah"
                                                : ""}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} xs={4} xs={12}>
                                        <div className={classes.label111}>
                                            <text className={classes.label1}>Alamat Saat Ini</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <AsyncSelect
                                                name="form-field-name-error"
                                                value={this.state.value["residence_province"]}
                                                placeholder="Pilih"
                                                onFocus={() => {
                                                this.removeValidate("residence_province");
                                            }}
                                                styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: this.state.validator["residence_province"]
                                                        ? "red"
                                                        : '#CACACA',
                                                    borderRadius: "0.25rem"
                                                })
                                            }}
                                                onInputChange={(val) => {
                                                    this.getProvince(val, "")
                                                }}
                                                cacheOptions
                                                loadOptions={loadOptionsProvince1}
                                                defaultOptions
                                                className={classes.input21}
                                                options={this.state.province}
                                                onChange={(val) => {
                                                this.setState({same:false})
                                                this.handleChange(val, "residence_province");
                                            }}/>
                                        </Grid>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <Select2
                                                name="form-field-name-error"
                                                isDisabled={this.state.value["residence_province"] === undefined || this.state.value["residence_province"] === "-"}
                                                value={this.state.value["residence_city"]}
                                                placeholder="Pilih"
                                                onFocus={() => {
                                                this.removeValidate("residence_city");
                                            }}
                                                error={true}
                                                styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: this.state.validator["residence_city"]
                                                        ? "red"
                                                        : '#CACACA',
                                                    borderRadius: "0.25rem"
                                                })
                                            }}
                                                className={classes.input21}
                                                isLoading={this.state.cities2.length === 0 && this.state.value["residence_province"] !== undefined}
                                                options={this.state.cities2}
                                                onChange={(val) => {
                                                this.setState({same:false})
                                                this.handleChange(val, "residence_city");
                                            }}/>
                                        </Grid>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input22}
                                                    variant="outlined"
                                                    placeholder="Kecamatan"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("residence_region");
                                                }}
                                                    error={this.state.validator["residence_region"]}
                                                    value={this.state.value["residence_region"]}
                                                    onChange={(event) => {
                                                    this.setState({same:false})
                                                    this.handleChange(event.target.value, "residence_region");
                                                }}/>
                                                <TextField
                                                    size="small"
                                                    className={classes.input23}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    placeholder="Kode Post"
                                                    onFocus={() => {
                                                    this.removeValidate("residence_postal_code");
                                                }}
                                                    error={this.state.validator["residence_postal_code"]}
                                                    value={this.state.value["residence_postal_code"]}
                                                    onChange={(event) => {
                                                    this.setState({same:false})
                                                    this.handleChange(event.target.value, "residence_postal_code");
                                                }}
                                                    name="residence_postal_code"/>
                                            </div>
                                        </Grid>
                                        <div>
                                            <text className={classes.label1}>
                                                Jalan dan Nomor Rumah
                                            </text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <TextareaAutosize
                                                className={this.state.validator["residence_address"]
                                                ? classes.textArea2
                                                : classes.textArea}
                                                variant="outlined"
                                                margin="normal"
                                                rows={4}
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("residence_address");
                                            }}
                                                error={this.state.validator["residence_address"]}
                                                value={this.state.value["residence_address"]}
                                                onChange={(event) => {
                                                this.setState({same:false})
                                                this.handleChange(event.target.value, "residence_address");
                                            }}
                                                name="residence_address"
                                                InputProps={{
                                                endAdornment: this.state.validator["residence_address"]
                                                    ? (
                                                        <InputAdornment position="start">
                                                            <img src={Icon.warning}/>
                                                        </InputAdornment>
                                                    )
                                                    : (<div/>)
                                            }}/>
                                        </Grid>
                                        <FormControlLabel
                                            className={classes.cbx}
                                            control={< Checkbox onChange = {
                                            () => {
                                                var val = this.state.value;
                                                
                                                val["residence_province"] = this.state.value["identity_province"];
                                                val["residence_city"] = this.state.value["identity_city"];
                                                val["residence_region"] = this.state.value["identity_region"];
                                                val["residence_postal_code"] = this.state.value["identity_postal_code"];
                                                val["residence_address"] = this.state.value["identity_address"];
                                                if (this.state.value["identity_province"] !== undefined) {
                                                    this.getResidenceCity("",this.state.value["identity_province"].value)
                                                }

                                                this.setState({
                                                   value:val,
                                                   same:true
                                                });
                                                this.removeValidate("residence_province");
                                                this.removeValidate("residence_city");
                                                this.removeValidate("residence_region");
                                                this.removeValidate("residence_postal_code");
                                                this.removeValidate("residence_address");
                                            }
                                        }
                                        checked = {this.state.same}
                                        value = "remember" color = "primary" />}
                                            label="Sama dengan alamat ID"/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["residence_province"] || this.state.validator["residence_city"] || this.state.validator["residence_region"] || this.state.validator["residence_postal_code"] || this.state.validator["residence_address"]
                                                ? "Harap isi kotak berwarna merah"
                                                : ""}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} xs={4} xs={12}>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <div>
                                                <text className={classes.label1}>Nomor HP</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input24}
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
                                                name="phone_number"/>
                                        </Grid>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <div>
                                                <text className={classes.label1}>Nomor Telepon</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input24}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("telephone_number");
                                            }}
                                                error={this.state.validator["telephone_number"]}
                                                helperText={this.state.validator["telephone_number"]}
                                                value={this.state.value["telephone_number"]}
                                                onChange={(event) => {
                                                this.handleChange(event.target.value, "telephone_number");
                                            }}
                                                name="telephone_number"/>
                                        </Grid>
                                        <Grid item lg={12} xl={12} md={12} xs={12} xs={12}>
                                            <div>
                                                <text className={classes.label1}>Email</text>
                                            </div>
                                            <TextField
                                                size="small"
                                                className={classes.input24}
                                                variant="outlined"
                                                autoComplete="off"
                                                onFocus={() => {
                                                this.removeValidate("email");
                                            }}
                                                error={this.state.validator["email"]}
                                                helperText={this.state.validator["email"]}
                                                value={this.state.value["email"]}
                                                onChange={(event) => {
                                                this.handleChange(event.target.value, "email");
                                            }}
                                                name="email"/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider}/>
                                <div className={classes.BodytitleMdl2}>
                                    <text className={classes.titleMdl}>
                                        Pekerjaan Dan Penghasilan
                                    </text>
                                </div>
                                <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Jenis Pekerjaan
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["job_type"]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("job_type");
                                                }}
                                                    error={true}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["job_type"]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    options={[
                                                    {
                                                        value: '-',
                                                        label: 'Pilih',
                                                        isDisabled: true
                                                    }, {
                                                        value: 'Karyawan Swasta',
                                                        label: 'Karyawan Swasta'
                                                    }, {
                                                        value: 'Dokter',
                                                        label: 'Dokter'
                                                    }, {
                                                        value: 'Pegawai Negri Sipil',
                                                        label: 'Pegawai Negri Sipil'
                                                    }, {
                                                        value: 'Fresh Graduated',
                                                        label: 'Fresh Graduated'
                                                    }, {
                                                        value: 'Wirausaha',
                                                        label: 'Wirausaha'
                                                    }, {
                                                        value: 'Ibu Rumah Tangga',
                                                        label: 'Ibu Rumah Tangga'
                                                    }, {
                                                        value: 'Pensiunan',
                                                        label: 'Pensiunan'
                                                    }, {
                                                        value: 'Pelajar/Mahasiswa',
                                                        label: 'Pelajar/Mahasiswa'
                                                    }
                                                ]}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "job_type");
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["job_type"]}
                                                </FormHelperText>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Sumber Penghasilan
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["income_source"]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("income_source");
                                                }}
                                                    error={true}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["income_source"]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    options={[
                                                    {
                                                        value: '-',
                                                        label: 'Pilih',
                                                        isDisabled: true
                                                    }, {
                                                        value: 'Menjadi karyawan',
                                                        label: 'Menjadi karyawan'
                                                    }, {
                                                        value: 'Menjual barang dan jasa',
                                                        label: 'Menjual barang dan jasa'
                                                    }, {
                                                        value: 'Menjual keahlian',
                                                        label: 'Menjual keahlian'
                                                    }, {
                                                        value: 'Ikut network marketing',
                                                        label: 'Ikut network marketing'
                                                    }, {
                                                        value: 'Investasi bagi hasil',
                                                        label: 'Investasi bagi hasil'
                                                    }, {
                                                        value: 'Investasi pendapatan tetap',
                                                        label: 'Investasi pendapatan tetap'
                                                    }, {
                                                        value: 'Jual beli investasi',
                                                        label: 'Jual beli investasi'
                                                    }
                                                ]}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "income_source");
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["income_source"]}
                                                </FormHelperText>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Penghasilan per Bulan
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["salary_amount"]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("salary_amount");
                                                }}
                                                    error={true}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["salary_amount"]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    options={[
                                                    {
                                                        value: '-',
                                                        label: 'Pilih',
                                                        isDisabled: true
                                                    }, {
                                                        value: 1,
                                                        label: 'Kurang dari Rp 3.000.000'
                                                    }, {
                                                        value: 2,
                                                        label: 'Diatas dari Rp 3.000.000'
                                                    }, {
                                                        value: 3,
                                                        label: 'Diatas dari Rp 6.000.000'
                                                    }
                                                ]}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "salary_amount");
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["salary_amount"]}
                                                </FormHelperText>
                                            </Grid>
                                        </Grid>
                                        <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>Perusahaan</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input2}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("company_name");
                                                }}
                                                    error={this.state.validator["company_name"]}
                                                    helperText={this.state.validator["company_name"]}
                                                    value={this.state.value["company_name"]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "company_name");
                                                }}
                                                    name="company_name"/>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>Pencairan</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["disbursement_type"]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("disbursement_type");
                                                }}
                                                    error={true}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["disbursement_type"]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    options={[
                                                    {
                                                        value: '-',
                                                        label: 'Pilih',
                                                        isDisabled: true
                                                    }, {
                                                        value: 'Tunai',
                                                        label: 'Tunai'
                                                    }, {
                                                        value: 'Non Tunai',
                                                        label: 'Non Tunai'
                                                    }
                                                ]}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "disbursement_type");
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["disbursement_type"]}
                                                </FormHelperText>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>Tujuan Gadai</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <Select2
                                                    name="form-field-name-error"
                                                    value={this.state.value["financing_purpose"]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("financing_purpose");
                                                }}
                                                    error={true}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["financing_purpose"]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    options={[
                                                    {
                                                        value: '-',
                                                        label: 'Pilih',
                                                        isDisabled: true
                                                    }, {
                                                        value: 'Biaya Konsumtif',
                                                        label: 'Biaya Konsumtif'
                                                    }, {
                                                        value: 'Biaya Pendidikan',
                                                        label: 'Biaya Pendidikan'
                                                    }, {
                                                        value: 'Biaya Rumah Tangga',
                                                        label: 'Biaya Rumah Tangga'
                                                    }, {
                                                        value: 'Lainnya',
                                                        label: 'Lainnya'
                                                    }
                                                ]}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "financing_purpose");
                                                }}/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["financing_purpose"]}
                                                </FormHelperText>
                                            </Grid>
                                        </Grid>

                                        <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>NPWP</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input2}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("tax_number");
                                                }}
                                                    error={this.state.validator["tax_number"]}
                                                    helperText={this.state.validator["tax_number"]}
                                                    value={this.state.value["tax_number"]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "tax_number");
                                                }}
                                                    name="tax_number"/>
                                                <FormHelperText className={classes.txtHelper2}>
                                                    Tulis tanpa tanda pemisah
                                                </FormHelperText>
                                            </Grid>
                                            <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>
                                                        Nama Gadis Ibu Kandung
                                                    </text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <TextField
                                                    size="small"
                                                    className={classes.input2}
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    onFocus={() => {
                                                    this.removeValidate("mother_name");
                                                }}
                                                    error={this.state.validator["mother_name"]}
                                                    helperText={this.state.validator["mother_name"]}
                                                    value={this.state.value["mother_name"]}
                                                    onChange={(event) => {
                                                    this.handleChange(event.target.value, "mother_name");
                                                }}
                                                    name="mother_name"/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider}/>
                                <div className={classes.BodytitleMdl2}>
                                    <text className={classes.titleMdl}>
                                        Nomor Rekening Nasabah
                                    </text>
                                </div>
                                <button
                                    style={{
                                    backgroundColor: "#C4A443",
                                    borderRadius: 50,
                                    color: "white",
                                    width: 87,
                                    height: 35,
                                    marginLeft: 10,
                                    marginTop: -25,
                                    marginBottom: 15,
                                    fontWeight: "500",
                                    fontSize: 14
                                }}
                                    onClick={() => {
                                    this.addRekening();
                                }}>
                                    Tambah
                                </button>
                                <Grid spacing={2} container lg={12} xl={12} md={12} xs={12} xs={12}>
                                    {this.renderListRekening()}
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button
                            style={{
                            backgroundColor: "#C4A443",
                            borderRadius: 50,
                            color: "white",
                            width: 150,
                            height: 35,
                            marginRight: 25,
                            marginBottom: 15,
                            fontWeight: "500",
                            fontSize: 14
                        }}
                            onClick={() => {
                            this.handleSubmit(this.props.type);
                        }}>
                            {this.state.form === 1
                                ? "Simpan Dan Lanjut"
                                : "Simpan"}
                        </button>
                    </DialogActions>
                </div>
            );
        } else if (this.state.form === 2) {
            return (
                <div>
                    <DialogContent>
                        <div className={classes.scrool}>
                            {Func.toLogin(this.state.redirect)}
                            <div className={classes.root}>
                                <div className={classes.BodytitleMdl2}>
                                    <text className={classes.titleMdl}>Kontak Darurat</text>
                                </div>
                                {this.renderListContact()}
                                <button
                                    style={{
                                    backgroundColor: "#C4A443",
                                    borderRadius: 50,
                                    color: "white",
                                    width: 150,
                                    height: 35,
                                    marginLeft: 10,
                                    marginTop: -25,
                                    marginBottom: 15,
                                    fontWeight: "500",
                                    fontSize: 14
                                }}
                                    onClick={() => {
                                    this.addContact();
                                }}>
                                    Tambah Kontak
                                </button>
                                <Divider className={classes.divider}/>
                                <div className={classes.BodytitleMdl2}>
                                    <text className={classes.titleMdl}>Scan ID</text>
                                </div>
                                <div className={classes.BodytitleMdl}>
                                    <Box
                                        borderColor={this.state.validator["img"]
                                        ? "error.main"
                                        : "grey.500"}
                                        border={1}
                                        onClick={() => {
                                        this.removeValidate("img");
                                    }}
                                        className={classes.imgScan}>
                                        {this.state.value["img"]
                                            ? (<img
                                                className={classes.imgScan2}
                                                onClick={() => {
                                                this.removeValidate("img");
                                            }}
                                                src={this.state.value["img"]}/>)
                                            : null}
                                    </Box>
                                    <FormHelperText className={classes.error22}>
                                        {this.state.validator["img"]}
                                    </FormHelperText>
                                </div>
                                <div className={classes.BodytitleMdl22}>
                                    <img
                                        src={Icon.deleteImg}
                                        onClick={() => {
                                        var dataSet = this.state.value;
                                        dataSet["img"] = null;
                                        this.setState({value: dataSet, ImgBase44: ""});
                                    }}/>
                                    <div/>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="file"
                                        title="Pilih Gambar"
                                        onChange={this.handleChangeImg}/>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button
                            style={{
                            backgroundColor: "#D8D8D8",
                            borderRadius: 50,
                            color: "black",
                            width: 87,
                            height: 35,
                            marginRight: 25,
                            marginBottom: 15,
                            fontWeight: "500",
                            fontSize: 14
                        }}
                            onClick={() => {
                            this.setState({form: 1})
                            this.props.OnNext("1");
                        }}>
                            Kembali
                        </button>
                        <button
                            style={{
                            backgroundColor: "#C4A443",
                            borderRadius: 50,
                            color: "white",
                            width: 87,
                            height: 35,
                            marginRight: 25,
                            marginBottom: 15,
                            fontWeight: "500",
                            fontSize: 14
                        }}
                            onClick={() => {
                            this.handleSubmit(this.props.type);
                        }}>
                            {this.state.form === 1
                                ? "Simpan Dan Lanjut"
                                : "Simpan"}
                        </button>
                    </DialogActions>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Form"})(Form);
