import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = {
    mainContainer2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5E5E5"
    },
    container2: {
        display: "flex",
        alignSelf: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: 20
    },
    starts: {
        color: "#F78536"
    },
    txt: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 20,
        margin: 20,
        marginTop: 100
    },
    mainContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5E5E5"
    },
    container: {
        display: "flex",
        alignSelf: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "70%"
    },
    // Styleing Material Component

    CoustomsStyles: {
        iconContainer: {
            marginRight: "24px"
        },
        card: {
            width: "870px"
        },
        scrool: {
            minHeight:"360px",
            width: "828px",
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '300px'
            }
        },
        scrool2: {
            marginLeft: '20px',
            marginRight: '20px',
            marginTop: -20,
            marginBottom: '20px'
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        cbx: {
            marginLeft: "25px"
        },
        root: {
            margin: 0,
            // padding: theme.spacing(),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        },
        textArea: {
            padding:'10px',
            width: '247px',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '247px'
            },
            marginLeft: '13px',
            marginTop: 5,
            borderColor: '#CACACA'
        },
        textArea2: {
            padding:'10px',
            width: '247px',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '147px'
            },
            marginLeft: '13px',
            marginTop: 5,
            borderColor: 'red'
        },
        textArea3: {
            padding:'10px',
            width: '515px',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '247px'
            },
            marginLeft: '13px',
            marginTop: 5,
            borderColor: '#CACACA'
        },
        textArea4: {
            padding:'10px',
            width: '515px',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '247px'
            },
            marginLeft: '13px',
            marginTop: 5,
            borderColor: 'red'
        },
        paper2: {
            boxShadow: theme.shadows[5]
        },
        root2: {
            display: "flex",
            backgroundColor: "#E5E5E5"
        },
        extendedIcon: {
            marginRight: theme.spacing(1)
        },
        toolbar: {
            paddingRight: 24,
            backgroundColor: "#FFFFFF"
        },
        input21: {
            width: "245px",
            borderColor: '#CACACA',
            height: "40px",
            marginRight: "13px",
            marginLeft: "13px"
        },
        fab: {
            position: "fixed",
            bottom: theme.spacing(20),
            backgroundColor: "#85203B",
            "&:hover": {
                backgroundColor: "#85203B"
            },
            color: "white",
            right: theme.spacing(5)
        },
        toolbarIcon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme
                .transitions
                .create([
                    "width", "margin"
                ], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
        },
        appBarShift: {
            marginLeft: 240,
            width: `calc(100% - ${ 240}px)`,
            transition: theme
                .transitions
                .create([
                    "width", "margin"
                ], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                })
        },
        menuButton: {
            marginRight: 36
        },
        menuButtonHidden: {
            display: "none"
        },
        error: {
            color: "red",
            marginLeft: "15px",
            // marginTop: -1
        },
        error2: {
            color: "red",
            marginLeft: "10px"
        },
        imgUpload: {
            width: "140px",
            height: "145px"
        },
        imgUpload2: {
            width: "145px",
            height: "150px"
        },
        BodytitleMdl: {
            marginBottom: "15px"
        },
        BodytitleMdl2: {
            marginTop: -15,
            marginBottom: "15px"
        },
        loader:{
            marginTop:20,
            marginBottom:20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        formPad2: {
            marginBottom: '15px',
            paddingRight: 15,
            paddingLeft: 15
        },
        formPad: {
            marginBottom: '15px'
        },
        titleMdl: {
            fontSize: "16px",
            color: "#C4A643",
            marginLeft: "15px"
        },
        title: {
            flexGrow: 1,
            marginLeft: 240,
            color: "black"
        },
        titleForm: {
            fontSize: '20px',
            fontWeight: '500'
        },
        titles: {
            flexGrow: 1,
            marginLeft: 67,
            color: "black"
        },
        hi: {
            color: "black"
        },
        drawerPaper: {
            borderTopRightRadius: 25,
            position: "relative",
            whiteSpace: "nowrap",
            background: "#3F3F3F",
            width: 240,
            transition: theme
                .transitions
                .create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                }),
            // zIndex: 19999,
        },
        drawerPaperClose: {
            overflowX: "hidden",
            background: "#3F3F3F",
            transition: theme
                .transitions
                .create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
            zIndex: 19999,
            width: theme.spacing(7),
            [
                theme
                    .breakpoints
                    .up("sm")
            ]: {
                width: theme.spacing(9)
            }
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            overflow: "hidden",
            paddingBottom:90,
            backgroundColor: "#E5E5E5"
        },
        container: {
            paddingTop: theme.spacing(2.5),
            paddingBottom: theme.spacing(1),
            backgroundColor: "#E5E5E5",
            marginLeft:230,
            width:window.innerWidth,
            minHeight:window.innerHeight-70
        },
        container22:{
            paddingTop: theme.spacing(2.5),
            paddingBottom: theme.spacing(1),
            backgroundColor: "#E5E5E5",
            width:window.innerWidth-25,
            minHeight:window.innerHeight-70
        },
        container2: {
            paddingTop: theme.spacing(2.5),
            paddingBottom: theme.spacing(1),
            backgroundColor: "#E5E5E5",
            width:window.innerWidth,
            minHeight:window.innerHeight-70,
            marginLeft: 67
        },
        fixedHeight: {
            height: 240
        },
        root2: {
            display: "flex",
            backgroundColor: "#E5E5E5"
        },
        toolbar: {
            paddingRight: 24,
            backgroundColor: "#FFFFFF"
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme
                .transitions
                .create([
                    "width", "margin"
                ], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
        },
        appBarShift: {
            marginLeft: 240,
            width: `calc(100% - ${ 240}px)`,
            transition: theme
                .transitions
                .create([
                    "width", "margin"
                ], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                })
        },
        selected: {
            marginLeft: 40,
            justifyContent: "center",
            color: "black"
        },
        non_selected: {
            marginLeft: 40,
            justifyContent: "center",
            color: "#95A1A7"
        },
        menuButton: {
            marginRight: 36
        },
        menuButtonHidden: {
            display: "none"
        },
        bar: {
            width: "100%",
            backgroundColor: "#FFFFFF"
        },
        barClose: {
            width: "95.3%",
            marginLeft: "64px",
            backgroundColor: "#FFFFFF"
        },
        sel1: {
            backgroundColor: "#E5E5E5",
            width: "95%",
            marginTop: 5,
            borderRadius: 5,
            marginLeft: 35,
            algnSelf: "center",
            height: 3.5
        },
        sel2: {
            backgroundColor: "#E5E5E5",
            width: "95%",
            marginTop: 5,
            borderRadius: 5,
            marginLeft: 141,
            algnSelf: "center",
            height: 3.5
        },
        sel3: {
            backgroundColor: "#E5E5E5",
            width: "100%",
            marginTop: 5,
            borderRadius: 5,
            marginLeft: 249,
            algnSelf: "center",
            height: 3.5
        },
        sel4: {
            backgroundColor: "#E5E5E5",
            width: "95%",
            marginTop: 5,
            borderRadius: 5,
            marginLeft: 380,
            algnSelf: "center",
            height: 3.5
        },
        bar2: {
            marginTop: "65px",
            paddingTop: "15px",
            width: "7%",
            justifyContent: "center",
            alignSelf: "center",
            borderColor: "#C4A643",
            paddingBottom: "2px"
        },
        bar2_selected3: {
            marginTop: "65px",
            paddingTop: "15px",
            width: "8.5%",
            justifyContent: "center",
            alignSelf: "center",
            borderColor: "#C4A643",
            paddingBottom: "2px"
        },
        bar2_selected4: {
            marginTop: "65px",
            paddingTop: "15px",
            width: "4.4%",
            justifyContent: "center",
            alignSelf: "center",
            borderColor: "#C4A643",
            paddingBottom: "2px"
        },
        hi: {
            color: "black",
            [
                theme
                    .breakpoints
                    .only('xs')
            ]: {
                display: 'none'
            }
        },
        account: {
            [
                theme
                    .breakpoints
                    .only('xs')
            ]: {
                marginRight: -20
            }
        },
        title: {
            flexGrow: 1,
            color: "black",
            marginLeft: 190,
            [
                theme
                    .breakpoints
                    .down('md')
            ]: {
                marginLeft: 0
            }
        },
        titles: {
            flexGrow: 1,
            color: "black",
            marginLeft: 10,
            [
                theme
                    .breakpoints
                    .down('md')
            ]: {
                marginLeft: 0
            }
        },
        title2: {
            flexGrow: 1,
            marginLeft: 15,
            fontSize: "15px",
            fontWeight: 'bold',
            color: "#C4A643"
        },
        drawerPaper: {
            borderTopRightRadius: 25,
            position: "relative",
            whiteSpace: "nowrap",
            background: "#3F3F3F",
            width: 240,
            transition: theme
                .transitions
                .create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                }),
            zIndex: 19999
        },
        drawerPaperClose: {
            borderTopRightRadius: 25,
            overflowX: "hidden",
            background: "#3F3F3F",
            transition: theme
                .transitions
                .create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
            zIndex: 19999,
            width: theme.spacing(7),
            [
                theme
                    .breakpoints
                    .up("sm")
            ]: {
                width: theme.spacing(8)
            }
        },
        paginationTxt: {
            marginLeft: "15px"
        },
        action: {
            width: "50px",
            height: "20px"
        },
        popupTxt: {
            marginTop: "17px",
            marginLeft: "20px"
        },
        popupv2: {
            // width: '100%',
            position: 'fixed',
            bottom: 85,
            right: '40%',
            left: '50%',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                bottom: '9%',
                right: '30%',
                left: '30%'
            },
            [
                theme
                    .breakpoints
                    .only("md")
            ]: {
                bottom: '5%',
                right: '40%',
                left: '40%'
            }

        },
        popup: {
            width: "263px",
            height: "60px",
            background: "#F7D836",
            boxShadow: "0px 0px 34px rgba(0, 0, 0, 0.24)",
            borderRadius: "37px"
        },
        popupClose: {
            width: "50px",
            height: "50px",
            marginTop: 5
        },
        popupBtn: {},
        btnFilterTxt: {
            color: "white",
            paddingTop: "6px",
            paddingLeft: "3px",
            marginLeft: "9px"
        },
        deleteFilterTxt: {
            color: "#C4A643",
            position: "absolute",
            left: 140,
            bottom: "15px"
        },
        input22: {
            width: "165px",
            borderColor: '#CACACA',
            height: "40px",
            marginLeft: "13px"
        },
        imgScan:{
            borderWidth:1,
            marginLeft:'15px',
            width:'249px',
            height:'249px',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '235px',
                height:'150px',
                marginLeft:'5px',

            },
            borderRadius:5,
            objectFit: 'contain'
        },
        imgScan2:{
            borderWidth:1,
            width:'249px',
            height:'249px',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '235px',
                height:'150px',
                marginLeft:'5px',

            },
            borderRadius:5,
            objectFit: 'contain'
        },
        BodytitleMdl23:{
            marginLeft:20
        },
        BodytitleMdl22:{
            marginTop:'20px',
            marginLeft:25
        },
        input23: {
            width: "80px",
            borderColor: '#CACACA',
            height: "40px",
        },
        input234: {
            width: "100px",
            borderColor: '#CACACA',
            marginLeft: "13px",
            height: "40px",
        },
        divider: {
            marginTop: "30px",
            marginBottom: 30
        },
        filterTidakAktif: {
            color: "#C4A643",
            marginTop: "6px",
            marginLeft: "11px"
        },
        filterTidakAktif2: {
            color: "#95A1A7",
            marginTop: "6px",
            marginLeft: "11px"
        },
        filterAktif: {
            color: "#C4A643",
            marginTop: "6px",
            marginLeft: "20px"
        },
        filterAktif2: {
            color: "#95A1A7",
            marginTop: "6px",
            marginLeft: "20px"
        },
        NonactiveFilter: {
            position: "absolute",
            width: "100px",
            height: "35px",
            left: "119px",
            top: "49px",
            backgroundColor: "#FFE9BE",
            borderRadius: "5px"
        },
        NonactiveFilter2: {
            position: "absolute",
            width: "100px",
            height: "35px",
            left: "119px",
            top: "49px",
            backgroundColor: "#CACACA",
            borderRadius: "5px"
        },
        activeFilter: {
            position: "absolute",
            width: "78px",
            height: "35px",
            left: "19px",
            top: "49px",
            backgroundColor: "#FFE9BE",
            borderRadius: "5px"
        },
        activeFilter2: {
            position: "absolute",
            width: "78px",
            height: "35px",
            left: "19px",
            top: "49px",
            backgroundColor: "#CACACA",
            borderRadius: "5px"
        },
        btnFilter: {
            width: "90px",
            height: "35px",
            zIndex: 99999999999999999999,
            position: "absolute",
            left: 240,
            bottom: "10px",
            background: "#C4A643",
            borderRadius: "40px"
        },
        edit: {
            marginRight: "10px"
        },
        paginationPage: {
            marginTop: "12px",
            marginLeft: "20px"
        },
        paginationTxt2: {
            marginLeft: "15px",
            marginTop: "10px"
        },
        inputSearch: {},
        search2: {
            marginLeft: 20,
            width: '90%'
            // position:'absolute',  right:100
        },
        search: {
            zIndex: -999,
            marginLeft: 20,
            width: '90%'
            //  position:'absolute',  right:100
        },
        col: {
            marginLeft: "18px",
            marginTop: "10px"
        },
        row: {
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        search3: {
            marginLeft: "18px"
        },
        head: {
            backgroundColor: "#FFE9BE"
        },
        paginationBtn: {
            marginLeft: "250px",
            marginTop: "5px",
            height: "40px"
        },
        headTable: {
            backgroundColor: "#FFE9BE"
        },
        selectperdata: {
            marginLeft: "10px"
        },
        textperdata: {
            marginLeft: "15px"
        },
        cardFilter: {
            width: "350px",
            height: "200px",
            position: "absolute",
            top: 210,
            right: 70,
            zIndex: 9
        },
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "auto",
            flexDirection: "column"
        },
        icn: {
            width: "65px",
            height: "35px"
        },
        table: {
            minWidth: 650,
            // marginTop:'10px',
        },
        input: {
            root: {
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C4A643"
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C4A643"
                }
            },
            height: "40px",
            paddingLeft: '15px',
            paddingRight: '15px'
        },
        label1: {
            marginLeft: "15px"
        },
        label12: {
            marginBottom: 15
        },
        label2: {
            marginLeft: "15px"
        },
        label111: {
            marginBottom: '5px',
        },
        starts1: {
            marginLeft: "5px",
            color: "#F78536"
        },
        starts2: {
            marginRight: "125px",
            marginLeft: "5px",
            color: "#F78536"
        },
        starts3: {
            marginLeft: "5px",
            marginRight: "75px",
            color: "#F78536"
        },
        starts31: {
            marginLeft: "5px",
            color: "#F78536"
        },
        label4: {
            marginLeft: "15px"
        },
        starts4: {
            marginRight: "90px",
            marginLeft: "5px",
            color: "#F78536"
        },
        starts5: {
            marginRight: "35px",
            marginLeft: "5px",
            color: "#F78536"
        },
        starts6: {
            marginRight: "150px",
            marginLeft: "5px",
            color: "#F78536"
        },
        sad: {
            marginTop: -15
        },

        input2: {
            marginTop: "5px",
            width: "245px",
            borderColor: '#CACACA',
            height: "40px",
            marginRight: "13px",
            marginLeft: "13px",
            marginBottom: "5px"
        },
        input9: {
            marginTop: "5px",
            width: "110px",
            borderColor: '#CACACA',
            height: "40px",
            marginRight: "13px",
            marginLeft: "13px",
            marginBottom: "5px"
        },
        input8: {
            marginTop: "5px",
            width: "245px",
            borderColor: '#CACACA',
            borderWidth: 0,
            height: "40px",
            marginRight: "13px",
            marginLeft: "13px",
            marginBottom: "5px"
        },
        formControl: {
            height: "40px",
            width: "60px"
        },
        input3: {
            marginTop: "5px",
            width: "230px",
            height: "40px"
        },
        input4: {
            marginTop: "5px",
            width: "230px",
            height: "40px",
            marginLeft: "13px"
        },
        input5: {
            marginTop: "5px",
            width: "100px",
            height: "40px"
        },
        input6: {
            marginTop: "5px",
            width: "122.5px",
            borderColor: '#CACACA',
            height: "40px",
            marginRight: "13px",
            // marginLeft: "13px",
            marginBottom: "5px"
        },
        input7: {
            // borderRadius:0,
            marginTop: "5px",
            width: "122.5px",
            borderColor: '#CACACA',
            height: "40px",
            // marginRight: "13px",
            marginLeft: "13px",
            marginBottom: "5px"
        },
        auto: {
            height: "40px",
            width: "245px",
            marginTop: -25,
            padding: 0,
            marginLeft: "555px"
        },
        InputAdornment: {
            marginRight: "10px"
        }
    }
};
export default styles;
