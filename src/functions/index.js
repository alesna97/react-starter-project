import React from "react";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import env from "../config/env";

const Func = {
    Clear_Token: function () {
        localStorage.clear();
        return true;
    },
    Refresh_Token: function () {
        var flag = true;
        fetch(process.env.REACT_APP_URL_TOKEN, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token: localStorage.getItem("refresh_token")
            })
        }).then((response) => response.json()).then((json) => {
            if (json.message == "login berhasil") {
                localStorage.setItem("token", json.access_token);
                localStorage.setItem("refresh_token", json.refresh_token);
            } else {
                flag = false
            }
        }).catch((error) => {}).finally(() => {});
        return flag;
    },
    toLogin: function (flag) {
        if (flag) {
            return <Redirect to="/login"/>;
        }
    },
    getData: function (url, per_page, page, search = "") {
        return new Promise((resolve, reject) => {
            fetch(env.masterApi + env.apiPrefixV1 + '/' + url + "?per_page=" + per_page + "&page=" + page + (search == ""
                ? ""
                : search), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                resolve({json});
            }).catch((error) => {}).finally(() => {});
        });
    },
    getDataAuth: function (url, per_page, page, search = "") {
        return new Promise((resolve, reject) => {
            fetch(env.financialApi + env.apiPrefixV1 + '/' + url + "?per_page=" + per_page + "&page=" + page + (search == ""
                ? ""
                : search), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                resolve({json});
            }).catch((error) => {}).finally(() => {});
        });
    },
    getDataTransaction: function (url, per_page, page, search = "") {
        return new Promise((resolve, reject) => {
            fetch(env.managementApi + env.apiPrefixV1 + `/${url}` + "?per_page=" + per_page + "&page=" + page + (search == null || search == ""
                ? ""
                : "&search=" + search), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                resolve({json});
            }).catch((error) => {}).finally(() => {});
        });
    },
    getDataFinancial: function (url, per_page, page, search = "") {
        return new Promise((resolve, reject) => {
            fetch(env.financialApi + env.apiPrefixV1 + "/" +url + "?per_page=" + per_page + "&page=" + page + (search == ""
                ? ""
                : "&search=" + search), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                resolve({json});
            }).catch((error) => {}).finally(() => {});
        });
    },
    deleteItem: function (key, key2) {
        return new Promise((resolve, reject) => {
            fetch(env.masterApi + env.apiPrefixV1 + "/" + key + "/" + key2, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => response.json()).then((json) => {
                resolve({json});
            }).catch((error) => {}).finally(() => {});
        });
    },
    Alert: function (ttl, msg, icon) {
        Swal.fire({
            title: ttl,
            text: msg,
            imageUrl: icon,
            imageWidth: 100,
            imageHeight: 100,
            borderRadius: 20,
            confirmButtonColor: "#C4A643",
            imageAlt: "Custom image"
        });
    },
    AlertForm: function (ttl, msg, type) {
        Swal
            .fire({title: ttl, text: msg, icon: type, confirmButtonText: 'Oke'})
            .then((result) => {
                window
                    .location
                    .reload();
            })

    },
    Validator: function (value, validate) {
        var error = [];
        var flag = true;
        validate.map((val) => {
            val
                .type
                .split("|")
                .map((type) => {
                    var type2 = type.split(":")
                    if (type2[0] == "required") {
                        if (value[val.name] == null || value[val.name] == "" || value[val.name] == "-" || value[val.name] == undefined) {
                            error[val.name] = "Harap isi kotak ini";
                            flag = false;
                        }
                    }
                    if (type2[0] == "mail") {
                        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value[val.name])) {
                            error[val.name] = "Format email tidak sesuai";
                            flag = false;
                        }
                    }
                    if (type2[0] == "same") {
                        if (value[val.name] != value[type2[1]]) {
                            error[val.name] = "Konfirmasi kata sandi baru tidak sama";
                            flag = false;
                        }
                    }
                });
        });
        if (flag) {
            return {success: true, error};
        } else {
            return {success: false, error};
        }
    },
    Color: function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    FormatDate: function (dates) {
        if (dates != undefined) {
            const date = new Date(dates)
            const dateTimeFormat = new Intl.DateTimeFormat('id', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            })
            const [
                {
                    value : day
                },, {
                    value : month
                },, {
                    value : year
                }
            ] = dateTimeFormat.formatToParts(date)
            return `${day} ${month} ${year}`
        }
    },
    FormatRp: function (val) {
        return "Rp " + this.FormatNumber(val);
    },
    UnFormatRp: function (x) {

        var val = x;
        var parts = val.replace(/,/g, "");
        return parts;
    },
    FormatNumber: function (x) {
        var parts = x
            .toString()
            .split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    maskPassword: function (value, flag) {
        var val = "";
        if (flag) {
            for (let index = 0; index < value.length; index++) {
                val += "•"
            }
        } else {
            val = value;
        }
        return val
    }
};

export default Func;
