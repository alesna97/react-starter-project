import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = {
  CoustomsStyles: {
    root: {
      flexGrow: 1,
      justifyContent: "center",
      alignSelf: "center",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    iconArea: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#85203B",
      width: 150,
      height: 60,
    },
    iconAreas: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#85203B",
      width: 150,
      height: 389,
    },
    icon: {
      marginLeft: 32,
      color: "#DADADA",
    },
    iconArea2: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#B6516C",
      width: 150,
      height: 60,
    },
    iconBtn: {
      width: 60,
      height: 60,
      color: "#C4A643",
      borderColor: "#C4A643",
      marginLeft: 43,
    },
    icon2: {
      color: "#C4A643",
      marginLeft: 32,
    },
    itemArea: {
      height: 40,
    },
    itemAreaSelected: {
      backgroundColor: "#B6516C",
      height: 40,
    },
    itemTxt: {
      marginLeft: -30,
      color: "#FFFFFF",
    },
    grid3: {
      height: 200,
    },
    box: {},
  },
};
export default styles;
