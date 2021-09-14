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
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomizedSnackbars from "../components/snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import { defaultConfig } from "./default-config";
import AddInfoDialog from "../components/dialogs/addInfoDialog";
import AddSceneDialog from "../components/dialogs/addSceneDialog";
import ReactPannellum, {
  mouseEventToCoords,
  changeMouseCursor,
  addHotSpot,
  addScene,
  getAllScenes,
  startAutoRotate,
  stopAutoRotate,
  showCompass,
  removeHotSpot,
  removeScene,
  loadScene,
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

const types = [{ title: "info" }, { title: "scene" }];

export default function Mainpage() {
  const classes = useStyles();

  const [state, setState] = useState({
    isOpenDrawer: true, // use to open / close the sidebar content
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
          title: state.scene["config"].title,
          author: state.scene["config"].author,
        },
      }));
    } else {
      setState((s) => ({ ...s, fullScenesInformation: getAllScenes() }));
      console.log(getAllScenes());
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
        console.log(value);
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
        }));
        break;
      case 2: // this case use to close "Add Scene" dialog when click "ADD".
        if (!state.fullScenesInformation?.length) {
          setState((s) => ({
            ...s,
            fullScenesInformation: [
              {
                [s.scene["sceneId"]]: {
                  imageSource: s.scene["config"].imageSource,
                },
              },
            ],
          }));
        } else {
          addScene(state.scene.sceneId, state.scene["config"], addSceneSuccess);
          state.scenes.push(state.scene);
        }
        setState((s) => ({ ...s, isAddScene: false, isSelect: -1 }));
        break;
      case 3: // this case use to close all dialog ( except "Add Info" ) when click "CANCEL".
        setState((s) => ({
          ...s,
          openDialog: "",
          isAddInfo: false,
          isAddScene: false,
          isDeleteInfo: false,
          isDeleteScene: false,
          isLoadScene: false,
          isSelect: -1,
        }));
        break;
      case 4: // this case use to close "Delete Info" dialog when click "DELETE".
        removeHotSpot(state.hotSpot["id"], state.hotSpot["sceneId"]);
        setState((s) => ({ ...s, isDeleteInfo: false, isSelect: -1 }));
      case 5: // this case use to close "Delete Scene" dialog when click "DELETE".
        removeScene(state.hotSpot["sceneId"]);
        setState((s) => ({ ...s, isDeleteScene: false, isSelect: -1 }));
      case 6: // this case use to close "Load Scene" dialog when click "LOAD"
        loadScene(state.hotSpot["sceneId"]);
        setState((s) => ({ ...s, isLoadScene: false, isSelect: -1 }));
      default:
        break;
    }
  };

  const addSceneSuccess = () => {
    setState((s) => ({
      ...s,
      snackbarAction: {
        isOpen: true,
        message: "Add Scene Successful !",
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
            isSelect={state.isSelect}
            isAddInfo={isAddInfo}
            isAddScene={isAddScene}
            isLoadScene={isLoadScene}
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
        {/* <Dialog // this is Add Scene Dialog
          open={state.isAddScene}
          onClose={() => handleDialogClose(0)}
          aria-labelledby="form-dialog-title"
        >
          <form id="my-add-scene">
            <DialogTitle id="form-dialog-title">Add Scene</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add scene, enter a scene id, scene name, then enter the
                source of scene ( link ).
              </DialogContentText>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="scene-id"
                label="Scene ID"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    scene: {
                      ...s.scene,
                      sceneId: e.target.value,
                    },
                  }))
                }
                fullWidth
              />
              <TextField
                variant="outlined"
                margin="dense"
                id="image-source"
                label="Image Source"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    scene: {
                      ...s.scene,
                      config: {
                        ...defaultConfig,
                        ...s.scene["config"],
                        imageSource: e.target.value,
                      },
                    },
                  }))
                }
                fullWidth
              />
              <TextField
                variant="outlined"
                margin="dense"
                id="image-name"
                label="Scene Name"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    scene: {
                      ...s.scene,
                      config: {
                        ...defaultConfig,
                        ...s.scene["config"],
                        title: e.target.value,
                      },
                    },
                  }))
                }
                fullWidth
              />
              <TextField
                variant="outlined"
                margin="dense"
                id="author-name"
                label="Author"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    scene: {
                      ...s.scene,
                      config: {
                        ...defaultConfig,
                        ...s.scene["config"],
                        author: e.target.value,
                      },
                    },
                  }))
                }
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDialogClose(3)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleDialogClose(2)} color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog> */}
        <Dialog // This is Load Scene Dialog
          open={state.isLoadScene}
          onClose={() => handleDialogClose(3)}
          aria-labelledby="form-dialog-title"
        >
          <form id="my-load-scene">
            <DialogTitle id="form-dialog-title">Load Scene</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To Load Scene, choice Scene Name.
              </DialogContentText>
              <Autocomplete
                id="scenes"
                options={state.fullScenesInformation}
                getOptionLabel={(option) => Object.keys(option)[0]}
                onChange={(event, value) => {
                  setState((s) => ({
                    ...s,
                    scene: value ? Object.values(value)[0] : {},
                    hotSpot: {
                      ...s.hotSpot,
                      sceneId: Object.keys(value)[0],
                    },
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Scene Name"
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDialogClose(3)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleDialogClose(5)} color="primary">
                Load
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog // this is Delete Info Dialog
          open={state.isDeleteInfo}
          onClose={() => handleDialogClose(3)}
          aria-labelledby="form-dialog-title"
        >
          <form id="my-delete-scene">
            <DialogTitle id="form-dialog-title">Delete Info</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To delete info, first choice scene name, then choice hotspot.
              </DialogContentText>
              <Autocomplete
                id="scenes"
                options={state.fullScenesInformation}
                getOptionLabel={(option) => Object.keys(option)[0]}
                onChange={(event, value) => {
                  setState((s) => ({
                    ...s,
                    scene: value ? Object.values(value)[0] : {},
                    hotSpot: {
                      ...s.hotSpot,
                      sceneId: Object.keys(value)[0],
                    },
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Scene Name"
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
              <Autocomplete
                disabled={state.scene["hotSpots"] ? false : true}
                id="hotspot"
                options={state.scene["hotSpots"]}
                getOptionLabel={(option) => option.id}
                onChange={(event, value) =>
                  setState((s) => ({
                    ...s,
                    hotSpot: {
                      ...s.hotSpot,
                      id: value ? value.id.toString() : "",
                    },
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hotspot Name"
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDialogClose(3)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleDialogClose(4)} color="primary">
                Delete
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog // this is Delete Scene Dialog
          open={state.isDeleteScene}
          onClose={() => handleDialogClose(3)}
          aria-labelledby="form-dialog-title"
        >
          <form id="my-delete-scene">
            <DialogTitle id="form-dialog-title">Delete Scene</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To delete Scene, choice Scene Name. ( Note that you cannot
                delete the current scene )
              </DialogContentText>
              <Autocomplete
                id="scenes"
                options={state.fullScenesInformation}
                getOptionLabel={(option) => Object.keys(option)[0]}
                onChange={(event, value) => {
                  setState((s) => ({
                    ...s,
                    scene: value ? Object.values(value)[0] : {},
                    hotSpot: {
                      ...s.hotSpot,
                      sceneId: Object.keys(value)[0],
                    },
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Scene Name"
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDialogClose(3)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleDialogClose(5)} color="primary">
                Delete
              </Button>
            </DialogActions>
          </form>
        </Dialog>
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
