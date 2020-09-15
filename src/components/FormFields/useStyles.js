import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    // Styleing React Component
    mainContainer: {
        flex: 1,
        display: "flex",
        alignSelf: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#C4A643"
    },
    container: {
        display: "flex",
        alignSelf: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    textField: {
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C4A643"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C4A643"
        }
    },
    icon: {
        color: "#C4A643"
    },
    // Styleing Material Component
    CoustomsStyles: {
        form: {
            width: "80%",
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: "95%"
            }
        },
        img: {
            marginBottom: 15,
            marginTop: 15,
            width: '350px',
            heigth: '250px',
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '250px',
                heigth: '150px'
            }
        },
        Card: {
            width: 620,
            [
                theme
                    .breakpoints
                    .only("xs")
            ]: {
                width: '300px'
            }
        },
        input: {
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#C4A643"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#C4A643"
            }
        },
        links: {
            color: "#C4A643",
            marginTop: 13,
            fontSize:14
        }
    }
}));

export default useStyles;
