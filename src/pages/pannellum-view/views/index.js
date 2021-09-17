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
import ReactPannellum, {
  mouseEventToCoords,
  changeMouseCursor,
  getAllScenes,
  startAutoRotate,
  stopAutoRotate,
  showCompass,
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
    backgroundImage: `url(${"https://solutions.viettel.vn/wp-content/uploads/2021/01/logo.png"})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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

const types = [{ title: "info" }, { title: "scene" }];

export default function Mainpage() {
  const classes = useStyles();

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
    isAddInfo: false, // use to open / close "Add Info" Dialog
    isAddScene: false, // use to open / close "Add Scene" Dialog
    isLoadScene: false, // use to open / close "Load Scene" Dialog
    isEditInfo: false,
    isEditScene: false,
    isDeleteInfo: false, // use to open / close "Delete Info" Dialog
    isDeleteScene: false, // use to open / close "Delete Scene" Dialog
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
      setState((s) => ({ ...s, fullScenesInformation: getAllScenes() }));
    }
  }, [
    state.isAddInfo,
    state.isAddScene,
    state.isLoadScene,
    state.isDeleteInfo,
    state.isDeleteScene,
  ]);

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

  return (
    <div
      className={classes.root}
      style={{
        cursor: state.isAddInfo
          ? `url(${"data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAUAAAAFAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQFBgYGBzc1ND4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAADwAAABEAAAAKAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAACAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAcAAAAJAAAABkAAAAMAAAABQAAAAMAAAABAAAAAwAAAAUAAAAHAAAACgAAAAsAAAANAAAACwAAAAkAAAAGAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAAB8AAAAvAAAAKQAAAB8AAAASAAAADAAAAAcAAAALAAAAEwAAABoAAAAeAAAAIQAAACIAAAAgAAAAHQAAABYAAAAOAAAABgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNQTs9TUE7QAAAAFgAAACsAAAAzAAAAMwAAACcAAAAeAAAAGAAAAB8AAAArAAAANQAAADoAAAA8AAAAPQAAADsAAAA4AAAALwAAACMAAAATAAAACAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkI6Mz5COjM9TUE7RAAAAHgAAADEAAAA+AAAAOwAAADUAAAAzAAAAOQAAAEMCCA11BBAcewIFCmsAAABOAAAATQAAAEsAAABGAAAAOwAAACgAAAAVAAAABwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkI6Mz5COjNBTUE7SU1BO1wAAAD4AAABHAAAARxJHeLsjhuX/I4Lg/ySA3v8kgN//JIDf/yWD4/8dZ7TmAQQGcAAAAFEAAABLAAAAPgAAACcAAAARAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkI6Mz5COjNFTUE7VU1BO2g5Ebbkgj+T/IZHn/yGQ5/8gj+b/IYvk/yKI4v8jg+H/JYDf/yWB4P8kf93/DS9SsAAAAFMAAABNAAAAOgAAACAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQjozPkI6M0JCOjNUcmOr/HJ3u/xye7v8cn+//HJ7u/x2b7P8dmOr/H5Tp/yGO5f8iieP/I4Lg/ySA4P8jgN7/CyZDqgAAAFMAAABJAAAALgAAABQAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQjozRHqf2/xmm8f8YqfP/F6z0/xet9f8XrPX/GKnz/xql8f8boO//HJrr/x+U6f8hjOX/IoTh/yWA3v8jfdv/AAECYQAAAFEAAAA6AAAAHgAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARaZ1uQUsPb/EbT4/xC4+v8Pu/v/D7v7/w+6+/8Rt/r/ErL4/xWs9f8apfH/HJ7v/x6W6v8gjeX/IoXh/ySA3/8fc8jwAAAAVAAAAEMAAAAnAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBgktEbP2/w68+/8Mvfz/Db79/w6+/f8Ovv3/Dr7+/w2+/v8Nvvz/D7r6/xOy9/8YqfT/G6Hv/x6W6v8hjeX/I4Th/ySA3/8AAABVAAAASQAAAC0AAAARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+27fMNvv3/Dr79/w3B/f8Owfz/D8H8/w/B/f8Pwfz/DsD8/w2//f8Ovf3/DLz8/xG0+f8XqvT/G6Dv/x6V6f8hi+T/I4Hf/wcbLpoAAABNAAAAMQAAABUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADbz6/w2//f8Pwfv/D8P9/w/F/f8Pxf3/Ecb9/xHG/f8Pw/z/D8L8/w7B/P8Nvfz/Db38/xK0+P8ZqPL/G53u/yCR6P8ihuL/F1KQ0gAAAE4AAAA1AAAAGgAAAAUAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMmMk0Nv/7/DsH8/xDF/P8Qx/v/Esn7/xLL+/8SzP3/Ecv9/xDI+/8Rxvz/D8P9/w/B/f8Ovf3/Dbz7/xSw9v8bpPD/Hpfq/yGM5P8cabXfAAAAUAAAAD0AAAAmAAAAEgAAAAoAAAAEAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAC5G30g/B/P8PxPz/EMj7/xLL+/8Tz/v/FNH6/xTR+v8U0Pr/Es77/xLK/P8Rx/z/FK7x/yB71v8ZkOP/ELn7/xip8/8dne7/IJDn/xpjqdwAAABSAAAASAAAADoAAAAqAAAAHQAAABEAAAAIAAAAAgAAAAAAAAAAAAAAAAAAAAAJkLTSEMP9/xDH+/8RzPv/FND5/xXV+v8Z2fv/Gdr6/xfX+v8U0/r/E9H8/yCN4P8ihtv/I3vW/yVwz/8nYMj/FLD2/xyg7/8elOf/EURxxAAAAFQAAABRAAAASwAAAEIAAAA2AAAAJwAAABUAAAAIAAAAAQAAAAAAAAAAAAAAAAuRstIQxfv/Ecr7/xPP+/8V1fr/G9v6/x7h+P8j4vn/Hd/5/xjY+f8XrPH/HJ7r/x6T5P8hid3/In/Y/yVz0f8jf9v/I4vj/yKL4/8kkef/J5j0/gsvTaoAAABUAAAAUAAAAEoAAAA+AAAAKQAAABMAAAAEAAAAAAAAAAAAAAAAARUbLhDF/P8Sy/v/FNH6/xjY+v8d3/n/e+v5/6Hv+v9M5fn/HN75/w+5+v8VrvP/G6Ht/x2W5/8hjOL/Iozk/yyf7P9Cwfz/Qr37/0G8+/9Cuvv/Q7v7/0a69/4NJTScAAAAUgAAAE0AAAA8AAAAIgAAAAsAAAAAAAAAAAAAAAAAAAAAEMP6/xLL+/8U0fr/GNj6/yHh+f+W7vr/zfb7/2bo+v8c3vr/EMv7/w2+/P8Tsvb/Iovk/yGL4/9Bxfv/QMH7/0DB+/9BwPv/Qb78/0K+/P9CvPv/Q737/0O7+v8iXni/AAAAUwAAAEoAAAAuAAAAEwAAAAAAAAAAAAAAAAAAAAAIZHuOEsv7/xTP+f8W1vr/HN36/zbk+v9a5/n/IOL4/xnZ+v8Y3vn/EdD6/xyb6v8hiuP/Psf7/z/F+v8/w/v/QML7/0HB+/9Awfv/QcD8/0G+/f9Bvvz/Qrz7/0O7+f8DCQx0AAAAUgAAADYAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAARxO7zE877/xTS+v8X1/r/Gtv6/xzc+v8a2vv/Ftb6/xPP+v8a4vn/IYrk/zzM/P88x/z/Psb6/z7F+v8/xPv/QML6/0DC+v9BwPv/QcD7/0G//P9Bvv3/Qr38/z2t3fAAAABUAAAAOAAAABwAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAQt9nfE8/7/xTR+/8V1fv/FdX6/xXU+v8U0Pr/Esv7/xyi7P8vr/D/Osv7/zzK/P88yPz/Pcj7/z7G+/8+xPr/PsT6/0DC+v9Bwvv/QMH7/0HA+/9Bv/z/RMP8/wAAAFMAAAA3AAAAGwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADJCpIEtD8/xPM+v8Tzvv/Es38/xHK+/8Rx/v/IYvk/zjO+/85zfv/Osv7/zrL+/87yfv/PMf7/z7H/P89xfr/QMX6/0DD+v9Bwvr/QcH7/0HB/P9Bv/n/AAEBVwAAADEAAAAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhQXOAt+lLQOpczSEMPv8w2w3OEjjuX/NtD6/zbO/P85zfv/Ocz6/znL+v87yvv/Osn8/zzH/P8+xvv/PsX6/z/F+v9Aw/v/QMP6/0LH/P8AAABKAAAAJwAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAASSX2+000fr/NdH8/zbQ+/84zfv/Oc36/znL+v86y/v/O8n7/zvI+/89x/z/Psb7/z7E+v8/xPv/Pbbi8AAAADQAAAAaAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYnH3DPT+/8z0vv/NdH8/zbP+/82z/v/OM36/znM+v86y/r/Osr7/zvJ+/88yPz/Pcf7/z7F+v8RN0SUAAAAIQAAAA0AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHjJeMNX5/zPT+/8z0/z/NNH8/zTR/P82z/z/N877/znN+v85y/r/Osv6/zvK+/87yfv/Pcf3/AAAACMAAAARAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv2vn/L9b7/zLV/P8z1Pz/NNL8/zXR/P820fz/Ns/8/zjO+/86zfv/Ocv6/znJ+f8DDA9OAAAADwAAAAYAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIICyQt1vj/Ltf8/zHW/P8z1Pv/M9T8/zPS/P810fv/NtD8/zbO+/84yvj/CSAnXgAAAA0AAAAEAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgsMV0r1fX/Ltj7/y/X+/8x1fz/M9T8/zTT+/800vr/NdX3+QABARUAAAAHAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcipm3LNn6/y/Y+/8w1fv/L8Pl7wMMDisAAAAGAAAABAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////z////8f////hwD//8AAP//AAB//4AAf/+AAD//gAA//wAAH/8AAB//AAAf/gAAH/4AAB/+AAAH/wAAAf8AAAD/AAAA/4AAAH/AAAB/8AAAf/wAAH//wAB//8AAf//gAP//4AH///AD///4B////B/8="})`
          : "default",
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
              config={state.config}
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
