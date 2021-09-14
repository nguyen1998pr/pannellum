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
    isOpenDrawer: true,
    openDialog: "",
    isSelect: -1,
    hotSpot: {
      id: "",
      sceneId: "",
      pitch: "",
      type: "",
      yaw: "",
      text: "",
      URL: "",
    },
    scene: {
      sceneId: "",
      config: {
        type: "equirectangular",
        imageSource: "",
      },
    },
    scenes: [],
    isAddInfo: false,
    isSceneType: false,
    isInfoType: false,
    isAddScene: false,
    isDeleteInfo: false,
    isDeleteScene: false,
    config: {
      // autoLoad: true,
      // // title: "George Peabody Library",
    },
    fullScenesInformation: [],
  });

  useEffect(() => {
    changeMouseCursor(state);
    setState((s) => ({ ...s, fullScenesInformation: getAllScenes() }));
    console.log(getAllScenes());
  }, [
    state.isAddInfo,
    state.isDeleteInfo,
    state.isAddScene,
    state.isDeleteScene,
  ]);

  const handleDrawerOpen = () => {
    setState((s) => ({ ...s, isOpenDrawer: true }));
  };

  const handleDrawerClose = () => {
    setState((s) => ({ ...s, isOpenDrawer: false }));
  };

  const handleDialogOpen = () => {
    state.isAddInfo && setState((s) => ({ ...s, openDialog: "isAddInfo" }));
  };

  const handleDialogClose = (index) => {
    switch (index) {
      case 0:
        // this case use to close "Add Info" dialog when click "CANCEL".
        setState((s) => ({
          ...s,
          openDialog: "",
          isSceneType: false,
          isInfoType: false,
        }));
        break;
      case 1:
        // this case use to close "Add Info" dialog when click "ADD".
        addHotSpot({
          pitch: state.hotSpot["pitch"],
          yaw: state.hotSpot["yaw"],
          id: state.hotSpot["id"],
          sceneId: state.hotSpot["sceneId"],
          type: state.hotSpot["type"],
          text: state.hotSpot["text"],
          URL: state.hotSpot["URL"],
        });
        setState((s) => ({
          ...s,
          hotSpot: {},
          openDialog: "",
          isAddInfo: false,
          isSceneType: false,
          isInfoType: false,
          isSelect: -1,
        }));
        break;
      case 2:
        // this case use to close "Add Scene" dialog when click "ADD".
        addScene(state.scene.sceneId, state.scene["config"]);
        state.scenes.push(state.scene);
        setState((s) => ({ ...s, isAddScene: false, isSelect: -1 }));
        break;
      case 3:
        // this case use to close all dialog ( except "Add Info" ) when click "CANCEL".
        setState((s) => ({
          ...s,
          isAddScene: false,
          isDeleteInfo: false,
          isDeleteScene: false,
          isSelect: -1,
        }));
        break;
      case 4:
        // this case use to close "Delete Info" when click "DELETE".
        removeHotSpot(state.hotSpot["id"], state.hotSpot["sceneId"]);
        setState((s) => ({ ...s, isDeleteInfo: false, isSelect: -1 }));
      case 5:
        // this case use to close "Delete Scene" when click "DELETE".
        removeScene(state.hotSpot["sceneId"]);
        setState((s) => ({ ...s, isDeleteScene: false, isSelect: -1 }));
      default:
        break;
    }
  };

  const isAddInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isAddInfo: data,
      isAddScene: false,
      isDeleteInfo: false,
      isSelect: index,
    }));
  };

  const isAddScene = (data, index) => {
    setState((s) => ({
      ...s,
      isAddInfo: false,
      isDeleteInfo: false,
      isAddScene: data,
      isSelect: index,
    }));
  };

  const isDeleteInfo = (data, index) => {
    setState((s) => ({
      ...s,
      isAddInfo: false,
      isDeleteInfo: data,
      isAddScene: false,
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
        hotSpot: {
          ...s.hotSpot,
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
            isAddInfo={isAddInfo}
            isAddScene={isAddScene}
            isSelect={state.isSelect}
            isAutoRotate={autoRotate}
            isDeleteInfo={isDeleteInfo}
            isDeleteScene={isDeleteScene}
            isCompass={enableCompass}
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
            config={state.config}
          />
        </Container>
        <Dialog
          open={state.openDialog === "isAddInfo"}
          onClose={() => handleDialogClose(0)}
          aria-labelledby="form-dialog-title"
        >
          <form id="my-add-info">
            <DialogTitle id="form-dialog-title">Add Place Info</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add information for this place, enter a place name, then
                enter a description (if available).
              </DialogContentText>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="title"
                label="Title"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    hotSpot: { ...s.hotSpot, id: e.target.value },
                  }))
                }
                fullWidth
              />
              <Autocomplete
                id="type"
                options={types}
                getOptionLabel={(option) => option.title}
                onChange={(event, value) => {
                  setState((s) => ({
                    ...s,
                    hotSpot: {
                      ...s.hotSpot,
                      type: value && value.title.toString(),
                    },
                    isSceneType:
                      value && value.title.toString() === "scene"
                        ? true
                        : false,
                    isInfoType:
                      value && value.title.toString() === "info" ? true : false,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type"
                    variant="outlined"
                    margin="dense"
                  />
                )}
              />
              {state.isSceneType === true && (
                <Autocomplete
                  id="scenes"
                  options={state.scenes}
                  getOptionLabel={(option) => option.sceneId}
                  onChange={(event, value) =>
                    setState((s) => ({
                      ...s,
                      hotSpot: {
                        ...s.hotSpot,
                        sceneId: value.sceneId.toString(),
                      },
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Scene Name"
                      variant="outlined"
                      margin="dense"
                    />
                  )}
                />
              )}
              <TextField
                variant="outlined"
                margin="dense"
                id="description"
                label="Description"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    hotSpot: { ...s.hotSpot, text: e.target.value },
                  }))
                }
                multiline
                rows={3}
                fullWidth
              />
              {state.isInfoType && (
                <TextField
                  variant="outlined"
                  margin="dense"
                  id="url"
                  label="URL"
                  type="text"
                  autoComplete="off"
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      hotSpot: { ...s.hotSpot, URL: e.target.value },
                    }))
                  }
                  fullWidth
                />
              )}
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
        <Dialog
          open={state.isAddScene}
          onClose={() => handleDialogClose(0)}
          aria-labelledby="form-dialog-title"
        >
          <form id="my-add-scene">
            <DialogTitle id="form-dialog-title">Add Scene</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add scene, enter a scene name, then enter the source of scene
                ( link ).
              </DialogContentText>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="scene-name"
                label="Scene Name"
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
                        ...s.scene["config"],
                        imageSource: e.target.value,
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
        </Dialog>
        <Dialog
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
        <Dialog
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
      </main>
    </div>
  );
}
