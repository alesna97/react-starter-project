import React from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import styles from "../css";
import Icon from "../../../../../components/icon";
import Divider from "@material-ui/core/Divider";
import Select2 from "react-select";
import Select from "@material-ui/core/Select";
import SelectAsync from 'react-select/async'
import MenuItem from "@material-ui/core/MenuItem";
import Func from "../../../../../functions/index";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import env from "../../../../../config/env";

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
            ImgBase64: "",
            section: 0,
            id_comp: null,
            redirect: false,
            date: new Date(),
            cities: []
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
        dataSet[name] = event;
        this.setState({value: dataSet});
    }
    handleChangeDate(date, name, name2) {
        var dt = new Date(date);
        var dataSet = this.state.value;
        dataSet[name2] = dt;
        dataSet[name] = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
        this.setState({value: dataSet});
    }
    componentDidMount() {
        this.getCity("", "", "");
        if (this.props.type == "Ubah") {
            fetch(env.managementApi + env.apiPrefixV1 + "/companies/" + this.props.id_comp, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                var val = [];
                val["name"] = json.data.company_detail.name;
                val["address"] = json.data.company_detail.address;
                val["tax_number"] = json.data.company_detail.tax_number;
                val["phone_number"] = json.data.company_detail.phone_number;
                val["area_code"] = json.data.company_detail.area_code;
                val["city_id"] = {
                    value: json.data.company_detail.city_id,
                    label: json.data.company_detail.city_name
                };
                this.getCity("", json.data.company_detail.city_name, json.data.company_detail.city_id);

                val["company_pics[0].id"] = json.data.company_detail.company_pics[0].id;
                val["company_pics[0].name"] = json.data.company_detail.company_pics[0].name;
                val["company_pics[0].position"] = {
                    value: json.data.company_detail.company_pics[0].position,
                    label: json.data.company_detail.company_pics[0].position
                };
                val["company_pics[0].identity_number"] = json.data.company_detail.company_pics[0].identity_number;
                val["company_pics[0].identity_type"] = json.data.company_detail.company_pics[0].identity_type;
                val["company_pics[0].phone_number"] = json.data.company_detail.company_pics[0].phone_number;
                val["company_pics[0].address"] = json.data.company_detail.company_pics[0].address;

                val["company_pics[1].id"] = json.data.company_detail.company_pics[1].id;
                val["company_pics[1].name"] = json.data.company_detail.company_pics[1].name;
                val["company_pics[1].position"] = {
                    value: json.data.company_detail.company_pics[1].position,
                    label: json.data.company_detail.company_pics[1].position
                };
                val["company_pics[1].identity_number"] = json.data.company_detail.company_pics[1].identity_number;
                val["company_pics[1].identity_type"] = json.data.company_detail.company_pics[1].identity_type;
                val["company_pics[1].phone_number"] = json.data.company_detail.company_pics[1].phone_number;
                val["company_pics[1].address"] = json.data.company_detail.company_pics[1].address;

                val["company_pics[2].id"] = json.data.company_detail.company_pics[2].id;
                val["company_pics[2].name"] = json.data.company_detail.company_pics[2].name;
                val["company_pics[2].position"] = {
                    value: json.data.company_detail.company_pics[2].position,
                    label: json.data.company_detail.company_pics[2].position
                };
                val["company_pics[2].identity_number"] = json.data.company_detail.company_pics[2].identity_number;
                val["company_pics[2].identity_type"] = json.data.company_detail.company_pics[2].identity_type;
                val["company_pics[2].phone_number"] = json.data.company_detail.company_pics[2].phone_number;
                val["company_pics[2].address"] = json.data.company_detail.company_pics[2].address;

                this.setState({
                    value: val
                });
            }).catch((error) => {}). finally(() => {});
        }
    }
    getCity(val, name, id) {
        Func
            .getData("cities", 10, 1, val)
            .then((res) => {
                if (res.json.code == "403") {
                    if (Func.Clear_Token() == true) {
                        if (!localStorage.getItem("token")) {
                            this.setState({redirect: true});
                        }
                    }
                } else {
                    var datas = []
                    datas.push({value: '-', label: res.json.data.length > 0 ? "Pilih" : "Tidak ditemukan", isDisabled: true})

                    if (name != "") {
                        var search = res
                            .json
                            .data
                            .find(o => o.name === name)
                        if (search == undefined) {
                            datas.push({value: id, label: name})
                        }
                    }
                    res
                        .json
                        .data
                        .map((value) => {
                            datas.push({value: value.id.$oid, label: value.name})
                        })
                    this.setState({cities: datas});
                }
            });
    }
    handleSubmit(type) {
        var validator = [
            {
                name: "name",
                type: "required"
            }, {
                name: "phone_number",
                type: "required"
            }, {
                name: "address",
                type: "required"
            }, {
                name: "tax_number",
                type: "required"
            }, {
                name: "city_id",
                type: "required"
            }, {
                name: "company_pics[0].name",
                type: "required"
            }, {
                name: "company_pics[0].position",
                type: "required"
            }, {
                name: "company_pics[0].identity_number",
                type: "required"
            }, {
                name: "company_pics[0].identity_number",
                type: "required"
            }, {
                name: "company_pics[0].phone_number",
                type: "required"
            }, {
                name: "company_pics[0].address",
                type: "required"
            }, {
                name: "company_pics[1].name",
                type: "required"
            }, {
                name: "company_pics[1].position",
                type: "required"
            }, {
                name: "company_pics[1].identity_number",
                type: "required"
            }, {
                name: "company_pics[1].identity_number",
                type: "required"
            }, {
                name: "company_pics[1].phone_number",
                type: "required"
            }, {
                name: "company_pics[1].address",
                type: "required"
            }, {
                name: "company_pics[2].name",
                type: "required"
            }, {
                name: "company_pics[2].position",
                type: "required"
            }, {
                name: "company_pics[2].identity_number",
                type: "required"
            }, {
                name: "company_pics[2].identity_number",
                type: "required"
            }, {
                name: "company_pics[2].phone_number",
                type: "required"
            }, {
                name: "company_pics[2].address",
                type: "required"
            }
        ];

        var validate = Func.Validator(this.state.value, validator);
        if (validate.success) {
            fetch(env.managementApi + env.apiPrefixV1 + "/companies/" + (type == "Tambah"
                ? ""
                : this.props.id_comp), {
                method: type == "Tambah"
                    ? "POST"
                    : "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    company: {
                        cif_number: this.state.value["cif_number"],
                        name: this.state.value["name"],
                        branch_office_name: this.state.value["branch_office_name"] == undefined
                            ? "Kancab Bandung"
                            : this.state.value["branch_office_name"],
                        phone_number: this.state.value["phone_number"],
                        area_code: this.state.value["area_code"] == undefined
                            ? "+62"
                            : this.state.value["area_code"],
                        tax_number: this.state.value["tax_number"],
                        telephone_number: this.state.value["telephone_number"],
                        city_id: this.state.value["city_id"].value,
                        city_name: this.state.value["city_id"].label,
                        address: this.state.value["address"],
                        company_pics_attributes: [
                            {
                                id: this.state.value["company_pics[0].id"],
                                name: this.state.value["company_pics[0].name"],
                                phone_number: this.state.value["company_pics[0].phone_number"],
                                position: this.state.value["company_pics[0].position"].value,
                                identity_number: this.state.value["company_pics[0].identity_number"],
                                identity_type: this.state.value["company_pics[0].identity_type"] == undefined
                                    ? "ktp"
                                    : this.state.value["company_pics[0].identity_type"],
                                address: this.state.value["company_pics[0].address"]
                            }, {
                                id: this.state.value["company_pics[1].id"],
                                name: this.state.value["company_pics[1].name"],
                                phone_number: this.state.value["company_pics[1].phone_number"],
                                position: this.state.value["company_pics[1].position"].value,
                                identity_number: this.state.value["company_pics[1].identity_number"],
                                identity_type: this.state.value["company_pics[1].identity_type"] == undefined
                                    ? "ktp"
                                    : this.state.value["company_pics[1].identity_type"],
                                address: this.state.value["company_pics[1].address"]
                            }, {
                                id: this.state.value["company_pics[2].id"],
                                name: this.state.value["company_pics[2].name"],
                                phone_number: this.state.value["company_pics[2].phone_number"],
                                position: this.state.value["company_pics[2].position"].value,
                                identity_number: this.state.value["company_pics[2].identity_number"],
                                identity_type: this.state.value["company_pics[2].identity_type"] == undefined
                                    ? "ktp"
                                    : this.state.value["company_pics[2].identity_type"],
                                address: this.state.value["company_pics[2].address"]
                            }
                        ]
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
                        this
                            .props
                            .OnNext(json.message);
                    } else {
                        this.setState({validator: json.status});
                    }
                } else {
                    if (json.code == 200) {
                        this
                            .props
                            .OnNext(json.message);
                    } else {
                        this.setState({validator: json.status});
                    }
                }
            }).catch((error) => {}). finally(() => {});
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
            this.setState({ImgBase64: reader.result});
        };
    }
    render() {
        const loadOptions = (inputValue, callback) => {
            setTimeout(() => {
                callback(this.state.cities);
            }, 1000);
        };
        const {classes} = this.props;
        const ExampleCustomInput = ({value, onClick}) => (<img src={Icon.icon_date} onClick={onClick}/>);
        return (
            <div>
                <DialogContent>
                    <div className={classes.scrool}>
                        {Func.toLogin(this.state.redirect)}
                        <div className={classes.root}>
                            <div className={classes.BodytitleMdl2}>
                                <text className={classes.titleMdl}>Data Perusahaan</text>
                            </div>
                            <Grid container direction="row" item lg={12} xl={12} md={12} xs={12} xs={12}>
                                <Grid container item lg={8} xl={8} md={8} sm={8} xs={12}>
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>
                                                    Nama Perusahaan
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
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                            <div>
                                                <text className={classes.label1}>Kode Area</text>
                                                <text className={classes.label2}>Nomor Telepon</text>
                                                <text className={classes.starts1}>*</text>
                                            </div>
                                            <TextField
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
                                    <Grid container item lg={12} xl={12} md={12} sm={12} xs={12}>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
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
                                        </Grid>
                                            <Grid item lg={6} xl={6} md={6} sm={6} xs={12} className={classes.formPad}>
                                                <div>
                                                    <text className={classes.label1}>Kota</text>
                                                    <text className={classes.starts1}>*</text>
                                                </div>
                                                <SelectAsync
                                                    name="form-field-name-error"
                                                    value={this.state.value["city_id"]}
                                                    placeholder="Pilih"
                                                    onFocus={() => {
                                                    this.removeValidate("city_id");
                                                }}
                                                    styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderColor: this.state.validator["city_id"]
                                                            ? "red"
                                                            : '#CACACA',
                                                        borderRadius: "0.25rem"
                                                    })
                                                }}
                                                    className={classes.input2}
                                                    onInputChange={(val) => {
                                                    this.getCity(val, "", "")
                                                }}
                                                    onChange={(val) => {
                                                    this.handleChange(val, "city_id");
                                                }}
                                                    cacheOptions
                                                    loadOptions={loadOptions}
                                                    defaultOptions/>
                                                <FormHelperText className={classes.error}>
                                                    {this.state.validator["city_id"]}
                                                </FormHelperText>
                                            </Grid>
                                    </Grid>
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
                                            name="address"
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
                            <div className={classes.BodytitleMdl2}>
                                <text className={classes.titleMdl}>Data Pengurus</text>
                            </div>
                            <div className={classes.BodytitleMdl}>
                                <text className={classes.titleMdl}>Pengurus 1</text>
                            </div>
                            <Grid container>
                                <Grid container item lg={12} xl={12} md={12} xs={12} xs={12} spacing={3}>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Nama Pengurus</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextField
                                            size="small"
                                            className={classes.input2}
                                            variant="outlined"
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[0].name");
                                        }}
                                            error={this.state.validator["company_pics[0].name"]}
                                            helperText={this.state.validator["company_pics[0].name"]}
                                            value={this.state.value["company_pics[0].name"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[0].name");
                                        }}
                                            name="company_pics[0].name"/>
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Jabatan</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <Select2
                                            name="form-field-name-error"
                                            value={this.state.value["company_pics[0].position"]}
                                            placeholder="Pilih"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[0].position");
                                        }}
                                            error={true}
                                            styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderColor: this.state.validator["company_pics[0].position"]
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
                                                value: 'Direktur',
                                                label: 'Direktur'
                                            }, {
                                                value: 'Manajer',
                                                label: 'Manajer'
                                            }, {
                                                value: 'Staf/Karyawan',
                                                label: 'Staf/Karyawan'
                                            }
                                        ]}
                                            onChange={(val) => {
                                            this.handleChange(val, "company_pics[0].position");
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["company_pics[0].position"]}
                                        </FormHelperText>
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
                                            this.removeValidate("company_pics[0].identity_number");
                                        }}
                                            error={this.state.validator["company_pics[0].identity_number"]}
                                            helperText={this.state.validator["company_pics[0].identity_number"]}
                                            value={this.state.value["company_pics[0].identity_number"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[0].identity_number");
                                        }}
                                            name="company_pics[0].identity_number"
                                            InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={classes.InputAdornment}>
                                                    <Select
                                                        className={classes.formControl}
                                                        value={this.state.value["company_pics[0].identity_type"] == undefined
                                                        ? "ktp"
                                                        : this.state.value["company_pics[0].identity_type"]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "company_pics[0].identity_type");
                                                    }}>
                                                        <MenuItem value={"ktp"}>KTP</MenuItem>
                                                        <MenuItem value={"passport"}>Passport</MenuItem>
                                                    </Select>
                                                </InputAdornment>
                                            )
                                        }}/>
                                    </Grid>
                                </Grid>
                                <Grid container item lg={12} xl={12} md={12} xs={12} xs={12} spacing={3}>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Nomor Telpon/HP</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextField
                                            size="small"
                                            className={classes.input2}
                                            variant="outlined"
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[0].phone_number");
                                        }}
                                            error={this.state.validator["company_pics[0].phone_number"]}
                                            helperText={this.state.validator["company_pics[0].phone_number"]}
                                            value={this.state.value["company_pics[0].phone_number"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[0].phone_number");
                                        }}
                                            name="company_pics[0].phone_number"/>
                                    </Grid>
                                    <Grid item lg={8} xl={8} md={8} sm={8} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Alamat</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextareaAutosize
                                            className={this.state.validator["company_pics[0].address"]
                                            ? classes.textArea4
                                            : classes.textArea3}
                                            variant="outlined"
                                            margin="normal"
                                            rows={2.2}
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[0].address");
                                        }}
                                            error={this.state.validator["company_pics[0].address"]}
                                            value={this.state.value["company_pics[0].address"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[0].address");
                                        }}
                                            name="company_pics[0].address"
                                            InputProps={{
                                            endAdornment: this.state.validator["company_pics[0].address"]
                                                ? (
                                                    <InputAdornment position="start">
                                                        <img src={Icon.warning}/>
                                                    </InputAdornment>
                                                )
                                                : (<div/>)
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["company_pics[0].address"]}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div className={classes.BodytitleMdl}>
                                <text className={classes.titleMdl}>Pengurus 2</text>
                            </div>
                            <Grid container>
                                <Grid container item lg={12} xl={12} md={12} xs={12} xs={12} spacing={3}>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Nama Pengurus</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextField
                                            size="small"
                                            className={classes.input2}
                                            variant="outlined"
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[1].name");
                                        }}
                                            error={this.state.validator["company_pics[1].name"]}
                                            helperText={this.state.validator["company_pics[1].name"]}
                                            value={this.state.value["company_pics[1].name"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[1].name");
                                        }}
                                            name="company_pics[1].name"/>
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Jabatan</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <Select2
                                            name="form-field-name-error"
                                            value={this.state.value["company_pics[1].position"]}
                                            placeholder="Pilih"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[1].position");
                                        }}
                                            error={true}
                                            styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderColor: this.state.validator["company_pics[1].position"]
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
                                                value: 'Direktur',
                                                label: 'Direktur'
                                            }, {
                                                value: 'Manajer',
                                                label: 'Manajer'
                                            }, {
                                                value: 'Staf/Karyawan',
                                                label: 'Staf/Karyawan'
                                            }
                                        ]}
                                            onChange={(val) => {
                                            this.handleChange(val, "company_pics[1].position");
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["company_pics[1].position"]}
                                        </FormHelperText>
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
                                            this.removeValidate("company_pics[1].identity_number");
                                        }}
                                            error={this.state.validator["company_pics[1].identity_number"]}
                                            helperText={this.state.validator["company_pics[1].identity_number"]}
                                            value={this.state.value["company_pics[1].identity_number"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[1].identity_number");
                                        }}
                                            name="company_pics[1].identity_number"
                                            InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={classes.InputAdornment}>
                                                    <Select
                                                        className={classes.formControl}
                                                        value={this.state.value["company_pics[1].identity_type"] == undefined
                                                        ? "ktp"
                                                        : this.state.value["company_pics[1].identity_type"]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "company_pics[1].identity_type");
                                                    }}>
                                                        <MenuItem value={"ktp"}>KTP</MenuItem>
                                                        <MenuItem value={"passport"}>Passport</MenuItem>
                                                    </Select>
                                                </InputAdornment>
                                            )
                                        }}/>
                                    </Grid>
                                </Grid>
                                <Grid container item lg={12} xl={12} md={12} xs={12} xs={12} spacing={3}>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Nomor Telpon/HP</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextField
                                            size="small"
                                            className={classes.input2}
                                            variant="outlined"
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[1].phone_number");
                                        }}
                                            error={this.state.validator["company_pics[1].phone_number"]}
                                            helperText={this.state.validator["company_pics[1].phone_number"]}
                                            value={this.state.value["company_pics[1].phone_number"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[1].phone_number");
                                        }}
                                            name="company_pics[1].phone_number"/>
                                    </Grid>
                                    <Grid item lg={8} xl={8} md={8} sm={8} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Alamat</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextareaAutosize
                                            className={this.state.validator["company_pics[1].address"]
                                            ? classes.textArea4
                                            : classes.textArea3}
                                            variant="outlined"
                                            margin="normal"
                                            rows={2.2}
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[1].address");
                                        }}
                                            error={this.state.validator["company_pics[1].address"]}
                                            value={this.state.value["company_pics[1].address"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[1].address");
                                        }}
                                            name="company_pics[1].address"
                                            InputProps={{
                                            endAdornment: this.state.validator["company_pics[1].address"]
                                                ? (
                                                    <InputAdornment position="start">
                                                        <img src={Icon.warning}/>
                                                    </InputAdornment>
                                                )
                                                : (<div/>)
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["company_pics[1].address"]}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div className={classes.BodytitleMdl}>
                                <text className={classes.titleMdl}>Pengurus 3</text>
                            </div>
                            <Grid container>
                                <Grid container item lg={12} xl={12} md={12} xs={12} xs={12} spacing={3}>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Nama Pengurus</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextField
                                            size="small"
                                            className={classes.input2}
                                            variant="outlined"
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[2].name");
                                        }}
                                            error={this.state.validator["company_pics[2].name"]}
                                            helperText={this.state.validator["company_pics[2].name"]}
                                            value={this.state.value["company_pics[2].name"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[2].name");
                                        }}
                                            name="company_pics[2].name"/>
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Jabatan</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <Select2
                                            name="form-field-name-error"
                                            value={this.state.value["company_pics[2].position"]}
                                            placeholder="Pilih"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[2].position");
                                        }}
                                            error={true}
                                            styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderColor: this.state.validator["company_pics[2].position"]
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
                                                value: 'Direktur',
                                                label: 'Direktur'
                                            }, {
                                                value: 'Manajer',
                                                label: 'Manajer'
                                            }, {
                                                value: 'Staf/Karyawan',
                                                label: 'Staf/Karyawan'
                                            }
                                        ]}
                                            onChange={(val) => {
                                            this.handleChange(val, "company_pics[2].position");
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["company_pics[2].position"]}
                                        </FormHelperText>
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
                                            this.removeValidate("company_pics[2].identity_number");
                                        }}
                                            error={this.state.validator["company_pics[2].identity_number"]}
                                            helperText={this.state.validator["company_pics[2].identity_number"]}
                                            value={this.state.value["company_pics[2].identity_number"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[2].identity_number");
                                        }}
                                            name="company_pics[2].identity_number"
                                            InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={classes.InputAdornment}>
                                                    <Select
                                                        className={classes.formControl}
                                                        value={this.state.value["company_pics[2].identity_type"] == undefined
                                                        ? "ktp"
                                                        : this.state.value["company_pics[2].identity_type"]}
                                                        onChange={(event) => {
                                                        this.handleChange(event.target.value, "company_pics[2].identity_type");
                                                    }}>
                                                        <MenuItem value={"ktp"}>KTP</MenuItem>
                                                        <MenuItem value={"passport"}>Passport</MenuItem>
                                                    </Select>
                                                </InputAdornment>
                                            )
                                        }}/>
                                    </Grid>
                                </Grid>
                                <Grid container item lg={12} xl={12} md={12} xs={12} xs={12} spacing={3}>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Nomor Telpon/HP</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextField
                                            size="small"
                                            className={classes.input2}
                                            variant="outlined"
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[2].phone_number");
                                        }}
                                            error={this.state.validator["company_pics[2].phone_number"]}
                                            helperText={this.state.validator["company_pics[2].phone_number"]}
                                            value={this.state.value["company_pics[2].phone_number"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[2].phone_number");
                                        }}
                                            name="company_pics[2].phone_number"/>
                                    </Grid>
                                    <Grid item lg={8} xl={8} md={8} sm={8} xs={12} className={classes.formPad}>
                                        <div>
                                            <text className={classes.label1}>Alamat</text>
                                            <text className={classes.starts1}>*</text>
                                        </div>
                                        <TextareaAutosize
                                            className={this.state.validator["company_pics[2].address"]
                                            ? classes.textArea4
                                            : classes.textArea3}
                                            variant="outlined"
                                            margin="normal"
                                            rows={2.2}
                                            autoComplete="off"
                                            onFocus={() => {
                                            this.removeValidate("company_pics[2].address");
                                        }}
                                            error={this.state.validator["company_pics[2].address"]}
                                            value={this.state.value["company_pics[2].address"]}
                                            onChange={(event) => {
                                            this.handleChange(event.target.value, "company_pics[2].address");
                                        }}
                                            name="company_pics[2].address"
                                            InputProps={{
                                            endAdornment: this.state.validator["company_pics[2].address"]
                                                ? (
                                                    <InputAdornment position="start">
                                                        <img src={Icon.warning}/>
                                                    </InputAdornment>
                                                )
                                                : (<div/>)
                                        }}/>
                                        <FormHelperText className={classes.error}>
                                            {this.state.validator["company_pics[2].address"]}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container></Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button
                        style={{
                        backgroundColor: "#C4A643",
                        borderRadius: 50,
                        color: "white",
                        width: 87,
                        height: 35,
                        marginRight: 25,
                        marginTop: -25,
                        marginBottom: 15,
                        fontWeight: "500",
                        fontSize: 14
                    }}
                        onClick={() => {
                        this.handleSubmit(this.props.type);
                    }}>
                        {this.props.type}
                    </button>
                </DialogActions>
            </div>
        );
    }
}

export default withStyles(styles.CoustomsStyles, {name: "Form"})(Form);
