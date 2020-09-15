import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = {
    mainContainer2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C4A643"
    },
    // Styleing Material Component

    CoustomsStyles: {
        footer:{
            width:'100%',
            position:'fixed',
            bottom:0,
            height:50,
            [
                theme
                    .breakpoints
                    .down("md")
            ]: {
                marginLeft: 0,
            },
            backgroundColor:'#565656'
        },
        footer2:{
            width:'100%',
            position:'fixed',
            bottom:0,
            height:50,
            marginLeft: 0,
            [
                theme
                    .breakpoints
                    .down("md")
            ]: {
                marginLeft: 0,
            },
            backgroundColor:'#565656'
        },
        footerZ:{
            width:'100%',
            position:'fixed',
            bottom:0,
            height:50,
            [
                theme
                    .breakpoints
                    .down("md")
            ]: {
                marginLeft: 0,
            },
            backgroundColor:'#565656'
        },
        footerZ2:{
            width:'100%',
            position:'fixed',
            bottom:0,
            height:50,
            marginLeft: 0,
            [
                theme
                    .breakpoints
                    .down("md")
            ]: {
                marginLeft: 0,
            },
            backgroundColor:'#565656'
        },
        txtFooter:{
            color: 'white', 
            marginLeft: 270,
            [
                theme
                    .breakpoints
                    .down("md")
            ]: {
                marginLeft: 1,
            } 
        },
        txtFooter2:{
            color: 'white', 
            marginLeft: 70,
            [
                theme
                    .breakpoints
                    .down("md")
            ]: {
                marginLeft: 1,
            } 
        }
    }
};
export default styles;
