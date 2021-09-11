import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems } from "../components/categories";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ReactPannellum, {
  getConfig,
  mouseEventToCoords,
  changeMouseCursor,
  addHotSpot,
} from "../libs/react-pannellum";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: "100%",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Mainpage() {
  const classes = useStyles();

  const [state, setState] = useState({
    isOpenDrawer: true,
    isOpenDialog: false,
    isSelect: -2,
    hotSpot: {
      id: "",
      pitch: "",
      type: "",
      yaw: "",
      text: "",
    },
    isAddInfo: false,
    isAddScene: false,
  });

  useEffect(() => {
    changeMouseCursor(state);
  }, [state.isAddInfo]);

  const handleDrawerOpen = () => {
    setState((s) => ({ ...s, isOpenDrawer: true }));
  };

  const handleDrawerClose = () => {
    setState((s) => ({ ...s, isOpenDrawer: false }));
  };

  const handleDialogOpen = () => {
    if (state.isAddInfo === true || state.isAddScene === true) {
      setState((s) => ({ ...s, isOpenDialog: true }));
    }
  };

  const handleDialogClose = (index) => {
    switch (index) {
      case 0:
        setState((s) => ({ ...s, isOpenDialog: false }));
        break;
      case 1:
        addHotSpot({
          pitch: state.hotSpot["pitch"],
          yaw: state.hotSpot["yaw"],
          id: state.hotSpot["id"],
          type: "info",
          text: state.hotSpot["description"],
        });
        setState((s) => ({
          ...s,
          isOpenDialog: false,
          isAddInfo: false,
          isSelect: -1,
        }));
        break;
      default:
        break;
    }
  };

  const isAddInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isAddInfo: data,
      isAddScene: false,
      isSelect: index,
    }));
  };

  const isAddScene = (data, index) => {
    setState((s) => ({
      ...s,
      isAddInfo: false,
      isAddScene: data,
      isSelect: index,
    }));
  };

  const getMouseEventToCoords = (e) => {
    console.log(mouseEventToCoords(e));
    if (state.isAddInfo === true) {
      setState((s) => ({
        ...s,
        hotSpot: {
          ...s.hotSpot,
          pitch: mouseEventToCoords(e)[0],
          yaw: mouseEventToCoords(e)[1],
        },
      }));
    }
  };

  const config = {
    author: "Nguyên",
    autoLoad: true,
    hotSpots: [],
  };

  return (
    <div
      className={classes.root}
      style={{ cursor: state.isAddInfo ? "crosshair" : "default" }}
    >
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(
          classes.appBar,
          state.isOpenDrawer && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              state.isOpenDrawer && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Pannellum
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !state.isOpenDrawer && classes.drawerPaperClose
          ),
        }}
        open={state.isOpenDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems
            isAddInfo={isAddInfo}
            isAddScene={isAddScene}
            isSelect={state.isSelect}
          />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container
          maxWidth="lg"
          className={classes.container}
          onClick={handleDialogOpen}
        >
          <ReactPannellum
            onMouseDown={getMouseEventToCoords}
            id="1"
            sceneId="firstScene"
            imageSource="https://pannellum.org/images/alma.jpg"
            config={config}
          />
        </Container>
        <Dialog
          open={state.isOpenDialog}
          onClose={() => handleDialogClose(0)}
          aria-labelledby="form-dialog-title"
        >
          <form id="my-form-id">
            <DialogTitle id="form-dialog-title">Add Place Info</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add information for this place, enter a place name, then
                enter a description (if available).
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    hotSpot: { ...s.hotSpot, id: e.target.value },
                  }))
                }
                fullWidth
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    hotSpot: { ...s.hotSpot, description: e.target.value },
                  }))
                }
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDialogClose(0)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleDialogClose(1)} color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </main>
    </div>
  );
}
