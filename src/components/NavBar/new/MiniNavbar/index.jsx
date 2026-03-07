import {
  Button,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  Paper
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Headroom from "react-headroom";
import BrandName from "../../../../helpers/brandName";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../../../../ThemeContext";
import SideBar from "../../../SideBar";
import useWindowSize from "../../../../helpers/customHooks/useWindowSize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchFromTutorialsIndex } from "../../../../store/actions";

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: theme.palette.text.primary,
    letterSpacing: "0.5px"
  },
  root: {
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[50],
    padding: "2px",
    border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ced4da"}`,
    borderRadius: "0.8rem",
    width: "100%"
  },
  icon: {
    padding: "2px",
    color: theme.palette.primary.main
  },
  grid: {
    "& > *": {
      margin: theme.spacing(1)
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  gridButton: {
    "& > *": {
      margin: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  button: {
    borderRadius: "10px"
  },
  hamburger: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function MiniNavbar() {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const notifications = useSelector(
    state => state.notifications.data.notifications
  );
  const notificationCount = notifications?.filter(
    notification => !notification.isRead
  ).length;
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openMenu, setOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const colorMode = React.useContext(ThemeContext);

  const windowSize = useWindowSize();

  const location = useLocation();
  const routeName = location.pathname;

  const excludedRoutes = ["/login", "/signup"];

  const toggleDrawer = useCallback(state => {
    setOpenDrawer(state);
  }, []);

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = () => {
    if (searchQuery.length > 0) {
      dispatch(searchFromTutorialsIndex(searchQuery));
      history.push(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const theme = useTheme();

  return (
    <Headroom disableInlineStyles>
      <nav
        style={{
          padding: "10px",
          background: theme.palette.background.paper
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={3} container alignItems="center">
            <Grid
              item
              style={{
                flexGrow: 1
              }}
              onClick={() => {
                history.push("/");
              }}
              data-testid="navbarBrand"
            >
              <BrandName />
            </Grid>
            <Grid item className={classes.hamburger}>
              <IconButton>
                {window.innerWidth > 960 && (
                  <MenuIcon onClick={() => toggleDrawer(true)} />
                )}
                {window.innerWidth <= 960 && (
                  <MenuIcon onClick={() => toggleSlider()} />
                )}
              </IconButton>
            </Grid>
          </Grid>
          {!excludedRoutes.includes(routeName) && (
            <Grid style={{ display: "inline-block" }} item xs={12} md={4}>
              <Paper component={"form"} className={classes.root} elevation={0}>
                <IconButton
                  type="button"
                  aria-label="search"
                  disableRipple
                  className={classes.icon}
                  data-testid="navbarSearch"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  style={{
                    display: "inline-block",
                    width:
                      screenSize.dynamicWidth < "959" &&
                      screenSize.dynamicWidth > "575"
                        ? "93.5%"
                        : "88.5%"
                  }}
                  className={classes.input}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Paper>
            </Grid>
          )}
          <Grid item className={classes.gridButton} style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" style={{ marginRight: '10px' }}>
              {colorMode.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              style={{
                boxShadow: "none",
                color: "white"
              }}
              data-test-id="login"
              className={classes.button}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{
                boxShadow: "none"
              }}
              className={classes.button}
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </nav>
      {windowSize.width > 960 && (
        <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer()}>
          <Grid
            container
            style={{
              width: 200
            }}
            direction="column"
          >
            <Grid item>
              <IconButton>
                <CloseIcon onClick={() => toggleDrawer(false)} />
              </IconButton>
            </Grid>

            <Grid
              item
              style={{
                padding: 10
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  boxShadow: "none",
                  color: "white"
                }}
                className={classes.button}
                onClick={() => {
                  toggleDrawer(false);
                  history.push("/login");
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid
              item
              style={{
                padding: 10
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{
                  boxShadow: "none"
                }}
                className={classes.button}
                onClick={() => {
                  toggleDrawer(false);
                  history.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Drawer>
      )}
      {windowSize.width <= 960 && (
        <SideBar
          open={openMenu}
          toggleSlider={toggleSlider}
          notificationCount={notificationCount}
        >
          {window.innerWidth <= 960 && (
            <>
              <Grid
                item
                style={{
                  padding: 10
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    boxShadow: "none",
                    color: "white"
                  }}
                  className={classes.button}
                  onClick={() => {
                    toggleSlider();
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Grid
                item
                style={{
                  padding: 10
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    boxShadow: "none"
                  }}
                  className={classes.button}
                  onClick={() => {
                    toggleSlider();
                    history.push("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </>
          )}
        </SideBar>
      )}
    </Headroom>
  );
}

export default MiniNavbar;
