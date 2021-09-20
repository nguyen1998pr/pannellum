export const defaultConfig = {
  title: "",
  author: "",
  description: "",
  autoLoad: false,
  sceneFadeDuration: 1000,
  autoRotate: 0,
  autoRotateInactivityDelay: 0,
  autoRotateStopDelay: 0,
  preview: "",
  showZoomCtrl: true,
  keyboardZoom: true,
  mouseZoom: true,
  doubleClickZoom: false,
  draggable: true,
  friction: 0.15,
  disableKeyboardCtrl: false,
  showFullscreenCtrl: true,
  showControls: true,
  touchPanSpeedCoeffFactor: 1,
  yaw: 0,
  pitch: 0,
  maxPitch: 90,
  minPitch: -90,
  maxYaw: 180,
  minYaw: -180,
  hfov: 100,
  minHfov: 50,
  maxHfov: 120,
  multiResMinHfov: false,
  backgroundColor: [0, 0, 0],
  avoidShowingBackground: false,
  compass: false,
  northOffset: 0,
  hotSpots: [],
  hotSpotDebug: false,
  haov: 360,
  vaov: 180,
  vOffset: 0,
  ignoreGPanoXMP: false,
  loadButtonLabel: "Click to<br>Load<br>Panorama",
  loadingLabel: "Loading...",
  bylineLabel: "by %s",
  noPanoramaError: "No panorama image was specified.",
  fileAccessError: "The file %s could not be accessed.",
  malformedURLError: "There is something wrong with the panorama URL.",
  iOS8WebGLError:
    "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
  genericWebGLError:
    "Your browser does not have the necessary WebGL support to display this panorama.",
  textureSizeError:
    "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
  unknownError: "Unknown error. Check developer console.",
  type: "equirectangular",
  imageSource: "",
  cubeMap: [],
  multiRes: {},
};

export const initialState = {
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
};
