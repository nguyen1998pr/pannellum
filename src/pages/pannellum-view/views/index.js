import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
import CustomizedSnackbars from "../components/snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import AddInfoDialog from "../components/dialogs/addInfoDialog";
import AddSceneDialog from "../components/dialogs/addSceneDialog";
import DeleteInfoDialog from "../components/dialogs/deleteInfoDialog";
import DeleteSceneDialog from "../components/dialogs/deleteSceneDialog";
import LoadSceneDialog from "../components/dialogs/loadSceneDialog";
import EditInfoDialog from "../components/dialogs/editInfoDialog";
import EditSceneDialog from "../components/dialogs/editSceneDialog";
import { Box, Button } from "@material-ui/core";
import { saveAs } from "file-saver";
import { initialState, pinCusor } from "./default-config";
import ReactPannellum, {
  mouseEventToCoords,
  changeMouseCursor,
  getAllScenes,
  startAutoRotate,
  stopAutoRotate,
  showCompass,
  addScene,
  destroy,
} from "../libs/react-pannellum/dist";

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
    backgroundImage: `url(${"https://solutions.viettel.vn/wp-content/uploads/2021/01/logo.png"})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#1976d2",
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

const types = [{ title: "info" }, { title: "scene" }];

export default function Mainpage() {
  const classes = useStyles();
  let fileReader;

  const [state, setState] = useState({
    isOpenDrawer: false, // use to open / close the sidebar content
    openDialog: "", // use to open special dialog
    isSelect: -1, // use to remove highlight of item of sidebar
    hotSpot: {
      // use to save config of hotSpot
      id: "",
      sceneId: "",
      pitch: "",
      type: "",
      yaw: "",
      text: "",
      URL: "",
    },
    scene: {
      // use to save / retrieve config of scene
      sceneId: "",
      config: {
        type: "equirectangular",
        text: "",
        title: "",
        author: "",
        imageSource: "",
      },
    },
    scenes: [], // use to save / retrieve array of scenes
    isSceneType: false, // use to define "scene" type of hotspot when "Add"
    isInfoType: false, // use to define "info" type of hotspot when "Add"
    isAddInfo: false, // use to open / close "Add Hotspot" Dialog
    isAddScene: false, // use to open / close "Add Scene" Dialog
    isLoadScene: false, // use to open / close "Load Scene" Dialog
    isEditInfo: false, // use to open / close "Edit Hotspot" Dialog
    isEditScene: false,
    isDeleteInfo: false, // use to open / close "Delete Hotspot" Dialog
    isDeleteScene: false, // use to open / close "Delete Scene" Dialog
    isLoadConfig: false,
    loadState: false,
    config: {
      sceneFadeDuration: 1000,
    }, // config for viewer
    fullScenesInformation: [], // use save / retrieve all scenes information / configs of this view
    snackbarAction: {
      // use to show / hide notification
      isOpen: false,
      message: "",
      type: "",
    },
    coordinates: {},
  });

  useEffect(() => {
    changeMouseCursor(state);
  }, [state.isAddInfo]);

  useEffect(() => {
    if (getAllScenes() === null) {
      setState((s) => ({
        ...s,
        config: {
          ...s.config,
        },
      }));
    } else {
      setState((s) => ({
        ...s,
        fullScenesInformation: getAllScenes(),
      }));
    }
  }, [
    state.isAddInfo,
    state.isAddScene,
    state.isLoadScene,
    state.isEditInfo,
    state.isEditScene,
    state.isDeleteInfo,
    state.isDeleteScene,
  ]);

  useEffect(() => {
    if (state.fullScenesInformation.length)
      setState((s) => ({ ...s, loadState: false }));
  }, [state.fullScenesInformation.length]);

  useEffect(() => {
    if (state.fullScenesInformation.length) {
      const array = [...state.fullScenesInformation.slice(1)];
      array.map((value, index) => {
        return addScene(Object.keys(value)[0], Object.values(value)[0]);
      });
      setState((s) => ({ ...s, isLoadConfig: false }));
    }
  }, [state.loadState]);

  const handleDrawerOpen = () => {
    setState((s) => ({ ...s, isOpenDrawer: true }));
  };

  const handleDrawerClose = () => {
    setState((s) => ({ ...s, isOpenDrawer: false }));
  };

  const handleDialogClose = (index, value) => {
    switch (index) {
      case 0: // this case use to close "Add Info" dialog when click "CANCEL".
        setState((s) => ({
          ...s,
          openDialog: "",
          isSceneType: false,
          isInfoType: false,
        }));
        break;
      case 1:
        setState((s) => ({
          ...s,
          openDialog: "",
          isAddInfo: false,
          isAddScene: false,
          isDeleteInfo: false,
          isDeleteScene: false,
          isLoadScene: false,
          isSelect: -1,
          fullScenesInformation: value.fullScenesInformation,
          config: {
            ...s.config,
            title: Object.values(value.fullScenesInformation[0])[0].title,
            author: Object.values(value.fullScenesInformation[0])[0].author,
          },
        }));
        break;
      case 3: // this case use to close all dialog ( except "Add Info" ) when click "CANCEL".
        value && actionSuccess(value);
        setState((s) => ({
          ...s,
          openDialog: "",
          isAddInfo: false,
          isAddScene: false,
          isEditInfo: false,
          isEditScene: false,
          isDeleteInfo: false,
          isDeleteScene: false,
          isLoadScene: false,
          isSelect: -1,
        }));
        break;
      default:
        break;
    }
  };

  const actionSuccess = (message) => {
    setState((s) => ({
      ...s,
      snackbarAction: {
        isOpen: true,
        message: message,
        type: "success",
      },
    }));
  };

  const onCloseSnackBar = (value) => {
    setState((s) => ({
      ...s,
      snackbarAction: {
        ...s.snackbarAction,
        isOpen: false,
      },
    }));
  };

  const isAddInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isAddInfo: data,
      isSelect: index,
    }));
  };

  const isAddScene = (data, index) => {
    setState((s) => ({
      ...s,
      isAddScene: data,
      isSelect: index,
    }));
  };

  const isLoadScene = (data, index) => {
    setState((s) => ({
      ...s,
      isLoadScene: data,
      isSelect: index,
    }));
  };

  const isEditInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isEditInfo: data,
      isSelect: index,
    }));
  };

  const isEditScene = (data, index) => {
    setState((s) => ({
      ...s,
      isEditScene: data,
      isSelect: index,
    }));
  };

  const isDeleteInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isDeleteInfo: data,
      isSelect: index,
    }));
  };

  const isDeleteScene = (data, index) => {
    setState((s) => ({
      ...s,
      isDeleteScene: data,
      isSelect: index,
    }));
  };

  const autoRotate = (value) => {
    value ? startAutoRotate() : stopAutoRotate();
  };

  const enableCompass = (value) => {
    showCompass(value);
  };

  const getMouseEventToCoords = (e) => {
    if (state.isAddInfo === true) {
      setState((s) => ({
        ...s,
        openDialog: "isAddInfo",
        hotSpot: {
          ...s.hotSpot,
          pitch: mouseEventToCoords(e)[0],
          yaw: mouseEventToCoords(e)[1],
        },
        coordinates: {
          pitch: mouseEventToCoords(e)[0],
          yaw: mouseEventToCoords(e)[1],
        },
      }));
    }
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    destroy();
    setState((s) => ({
      ...s,
      fullScenesInformation: JSON.parse(content),
    }));
  };

  const handleFileChosen = (file) => {
    if (file) {
      setState((s) => ({
        ...initialState,
        fullScenesInformation: [],
        isLoadConfig: true,
        loadState: true,
      }));
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    }
  };

  const exportConfig = () => {
    const config = JSON.stringify(getAllScenes());
    const blob = new Blob([config], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "Panorama Tour Data.txt");
  };

  return (
    <div
      className={classes.root}
      style={{
        cursor: state.isAddInfo ? `url(${pinCusor}), pointer` : "default",
      }}
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
            DEMO
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => exportConfig()}
            >
              Save
            </Button>
            <> </>
            <input
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              accept=".txt"
              onChange={(e) => handleFileChosen(e.target.files[0])}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Load
              </Button>
            </label>
          </Box>
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
            isOpenDrawer={state.isOpenDrawer}
            isSelect={state.isSelect}
            isAddInfo={isAddInfo}
            isAddScene={isAddScene}
            isLoadScene={isLoadScene}
            isEditInfo={isEditInfo}
            isEditScene={isEditScene}
            isDeleteInfo={isDeleteInfo}
            isDeleteScene={isDeleteScene}
            isAutoRotate={autoRotate}
            isCompass={enableCompass}
            disable={state.fullScenesInformation?.length ? false : true}
          />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {state.fullScenesInformation?.length ? (
            <ReactPannellum
              onMouseDown={getMouseEventToCoords}
              id={Object.keys(state.fullScenesInformation[0])[0]}
              sceneId={Object.keys(state.fullScenesInformation[0])[0]}
              imageSource={
                Object.values(state.fullScenesInformation[0])[0].imageSource
              }
              config={
                state.isLoadConfig
                  ? Object.values(state.fullScenesInformation[0])[0]
                  : state.config
              }
            />
          ) : null}
          {!state.fullScenesInformation.length && (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              No scene found, select <strong>"Add Scene"</strong> to add the
              first scene — <strong>check it out!</strong>
            </Alert>
          )}
        </Container>
        <AddInfoDialog
          open={state.openDialog === "isAddInfo"}
          close={handleDialogClose}
          mouseEventToCoords={state.coordinates}
          fullScenesInformation={state.fullScenesInformation}
        />
        <AddSceneDialog
          open={state.isAddScene}
          close={handleDialogClose}
          fullScenesInformation={state.fullScenesInformation}
        />
        <LoadSceneDialog
          open={state.isLoadScene}
          close={handleDialogClose}
          fullScenesInformation={state.fullScenesInformation}
        />
        <EditInfoDialog
          open={state.isEditInfo}
          close={handleDialogClose}
          fullScenesInformation={state.fullScenesInformation}
        />
        <EditSceneDialog
          open={state.isEditScene}
          close={handleDialogClose}
          fullScenesInformation={state.fullScenesInformation}
        />
        <DeleteInfoDialog
          open={state.isDeleteInfo}
          close={handleDialogClose}
          fullScenesInformation={state.fullScenesInformation}
        />
        <DeleteSceneDialog
          open={state.isDeleteScene}
          close={handleDialogClose}
          fullScenesInformation={state.fullScenesInformation}
        />
        <CustomizedSnackbars
          open={state.snackbarAction["isOpen"]}
          type={state.snackbarAction["type"]}
          message={state.snackbarAction["message"]}
          onClose={onCloseSnackBar}
        />
      </main>
    </div>
  );
}
