import { createMuiTheme } from "@material-ui/core/styles";

const mainPrimary = "#4f34ff";
const mainSecondary = "#9ad4ff";
const skyBlueDarkColor = "#10dffd";
const skyBlueLightColor = "#c6feff";
const whiteColor = "#ffffff";
const greyColor = "#868686";

export default createMuiTheme({
  palette: {
    common: {
      skyBlueDarkColor,
      skyBlueLightColor,
      whiteColor,
      greyColor,
      mainBlue: mainPrimary,
      secondaryBlue: mainSecondary
    },
    primary: {
      main: mainPrimary
    },
    secondary: {
      main: mainSecondary
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem"
    },
    submitBtn: {
      fontSize: "1rem",
      textTransform: "uppercase",
      color: "white",
      background: mainPrimary
    },
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      // color: arcBlue,
      lineHeight: 1.5
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem"
      // color: arcBlue
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      // color: arcBlue,
      fontWeight: 700
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Raleway"
      // color: arcBlue
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 300,
      color: greyColor
    },
    subtitle2: {
      color: "white",
      fontWeight: 300,
      fontSize: "1.25rem"
    },
    body1: {
      fontSize: "1.25rem",
      // color: arcGrey,
      fontWeight: 300
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300
      // color: arcGrey
    },
    learnButton: {
      // borderColor: arcBlue,
      borderWidth: 2,
      textTransform: "none",
      // color: arcBlue,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInputLabel: {
      root: {
        // color: arcBlue,
        fontSize: "1rem"
      }
    }
  },
  customFont: {
    fontSize: "62%"
  },
  floatRight: "flex-end",
  textField: {
    borderColor: mainPrimary,
    borderStyle: "solid",
    borderWidth: "1px"
  },
  link: {
    textDecoration: "none",
    color: mainPrimary
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
