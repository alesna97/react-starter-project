const styles = {
  // Styleing React Component

  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#85203B",
    position: 'fixed',
    width: '100%',
    height: '100%'
  },
  container: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "70%",
  },
  // Styleing Material Component

  CoustomsStyles: {
    CardMobile: {
      marginBottom: 10,
      marginTop: 10,
      width: 340,
    },
    Card: {
      marginBottom: 10,
      marginTop: 10,
      width: 620,
    },
    input: {
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#C4A643",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#C4A643",
      },
    },
    links: {
      color: "#C4A643",
      marginTop: 5,
      marginRight: -15,
    },
  },
};
export default styles;
