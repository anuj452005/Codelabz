import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  card: {
    margin: ".5rem",
    width: "100%",
    maxWidth: "500px",
    position: "relative",
    textAlign: "left",
    minHeight: "20vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      margin: ".25rem"
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "18vh"
    }
  },
  heading: {
    fontWeight: 700,
    marginTop: "-.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.1rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem"
    }
  },
  body: {
    padding: "0rem 2rem 0rem 3.5rem",
    paddingBottom: "0rem",
    [theme.breakpoints.down("md")]: {
      padding: "0rem 1.5rem 0rem 2rem"
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0rem 1rem",
      textAlign: "left"
    }
  },
  tags: {
    fontWeight: "500",
    color: theme.palette.text.secondary
  },
  avatar: {
    height: "2rem",
    width: "2rem",
    position: "relative",
    left: "1rem",
    border: `1.5px solid ${theme.palette.divider}`,
    borderRadius: "50%"
  },
  cardContent: {
    paddingTop: "1rem"
  },
  cardAction: {
    padding: "0rem 0rem 0rem 3.8rem",
    [theme.breakpoints.down("md")]: {
      padding: "0rem 0rem 0rem 2rem"
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0rem 1rem"
    }
  },
  button: {
    background: theme.palette.action.disabled,
    width: "1rem",
    height: "2rem",
    marginBottom: ".5rem",
    [theme.breakpoints.down("sm")]: {
      height: "1.4rem"
    }
  },
  logo: {
    width: "2.5rem",
    height: "2rem",
    marginTop: "0rem",
    zIndex: "1"
  },
  organizationLogo: {
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-start",
    flexDirecton: "column",
    paddingRight: "10px",
    width: "auto"
  },
  cardHeader: {
    padding: "1rem 1rem 0rem 1rem"
  },
  readTime: {
    [theme.breakpoints.down("sm")]: {
      fontSize: ".75rem",
      display: "none"
    }
  },
  headerGrid: {
    width: "2rem",
    height: ".5rem",
    marginTop: "-1.5rem",
    border: `0.1px solid ${theme.palette.divider}`
  },
  personImg: {
    zIndex: 2,
    position: "relative",
    left: "1.5rem",
    top: "-.6rem",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "50%"
  },
  logoImg: {
    height: "1rem"
  }
}));

export default useStyles;
