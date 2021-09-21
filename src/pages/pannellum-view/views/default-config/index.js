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

export const pinCusor =
  "data:image/x-icon;base64,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";
