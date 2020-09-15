import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  CoustomsStyles: {
    root: {
      flexGrow: 1,
      overflow:'hidden',
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
      height: 2287,
    },
    icon: {
      marginLeft: 30,
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
    },
    icon2: {
      color: "#C4A643",
      marginLeft: 30,
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
    grid_finance: {
      marginTop: -140,
      marginBottom:140
    },
    grid_params: {
      marginTop: -20,
      marginBottom:20
    },
    grid_master: {
      marginTop: -20,
      marginBottom:20
    },
    grid_finance2: {
      marginTop: -140,
    },
    grid_params2: {
      marginTop: -20,
    },
    grid_master2: {
      marginTop: -20,
    },
  },
}));

export default styles;
