import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  addScene,
  getCurrentScene,
  loadScene,
  getAllScenes,
} from "../../libs/react-pannellum/dist";
import { useFormControls } from "../validiations/editSceneValidation";
import { helperTextStyles } from "../styles";
import { defaultConfig } from "../../views/default-config";
import Button from "@material-ui/core/Button";

interface Props {
  scene: {
    // use to save / retrieve config of scene
    type: string;
    text: string;
    title: string;
    author: string;
    imageSource: string;
    config: object;
  };
  hotSpot: {
    // use to save config of hotSpot
    id: string;
    sceneId: string;
    pitch: string;
    type: string;
    yaw: string;
    text: string;
    URL: string;
  };
}

export default function EditSceneDialog(props) {
  const [state, setState] = useState<Props>({
    scene: {
      // use to save / retrieve config of scene
      type: "equirectangular",
      text: "",
      title: "",
      author: "",
      imageSource: "",
      config: {},
    },
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
  });

  useEffect(() => {
    setState({
      scene: {
        // use to save / retrieve config of scene
        type: "equirectangular",
        text: "",
        title: "",
        author: "",
        imageSource: "",
        config: {},
      },
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
    });
    console.log(getAllScenes());
  }, [props.open]);

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls({
      open: props.open,
      sceneID: state.hotSpot["sceneId"],
    });

  const onEditScene = () => {
    addScene(state.hotSpot["sceneId"], state.scene["config"]);
    if (state.hotSpot["sceneId"] === getCurrentScene()) {
      loadScene(state.hotSpot["sceneId"]);
    }
    props.close(3, "Edit Scene Successful !");
  };

  return (
    <Dialog // this is Delete Info Dialog
      open={props.open}
      onClose={() => props.close(3)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-delete-scene">
        <DialogTitle id="form-dialog-title">Edit Scene</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Edit Scene, choice Scene Name.
          </DialogContentText>
          <Autocomplete
            id="scene"
            options={props.fullScenesInformation}
            getOptionLabel={(option: object) => Object.keys(option)[0]}
            onChange={(event, value: any) => {
              handleInputValue({
                target: {
                  name: "sceneName",
                  value: value ? Object.keys(value as object)[0] : "",
                },
              });
              setState((s) => ({
                ...s,
                scene: value ? Object.values(value as object)[0] : {},
                hotSpot: {
                  ...s.hotSpot,
                  sceneId: value ? Object.keys(value as object)[0] : "",
                },
              }));
            }}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Scene ID"
                variant="outlined"
                margin="dense"
                style={{ marginTop: "15px", marginBottom: "10px" }}
                name="sceneID"
                FormHelperTextProps={{ classes: helperTextStyles() }}
                error={errors["sceneID"]?.length > 0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                {...(errors["sceneID"] && {
                  error: true,
                  helperText: errors["sceneID"],
                })}
                fullWidth
              />
            )}
          />
          <TextField
            disabled={state.hotSpot["sceneId"] ? false : true}
            style={{ marginTop: "15px", marginBottom: "10px" }}
            FormHelperTextProps={{ classes: helperTextStyles() }}
            key={`img${state.scene["imageSource"]}`}
            defaultValue={state.scene["imageSource"]}
            variant="outlined"
            margin="dense"
            id="image-source"
            label="Image Source"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              handleInputValue(e);
              setState((s) => ({
                ...s,
                scene: {
                  ...s.scene,
                  config: {
                    ...defaultConfig,
                    ...s.scene["config"],
                    imageSource: e.target.value || state.scene["imageSource"],
                  },
                },
              }));
            }}
            name="imageSource"
            error={errors["imageSource"]?.length > 0}
            onBlur={handleInputValue}
            {...(errors["imageSource"] && {
              error: true,
              helperText: errors["imageSource"],
            })}
            fullWidth
          />
          <TextField
            disabled={state.hotSpot["sceneId"] ? false : true}
            style={{ marginTop: "15px", marginBottom: "10px" }}
            key={`title${state.scene["title"]}`}
            defaultValue={state.scene["title"]}
            FormHelperTextProps={{ classes: helperTextStyles() }}
            variant="outlined"
            margin="dense"
            id="image-name"
            label="Scene Name"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              handleInputValue(e);
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
              }));
            }}
            name="sceneName"
            error={errors["sceneName"]?.length > 0}
            onBlur={handleInputValue}
            {...(errors["sceneName"] && {
              error: true,
              helperText: errors["sceneName"],
            })}
            fullWidth
          />
          <TextField
            disabled={state.hotSpot["sceneId"] ? false : true}
            style={{ marginTop: "15px", marginBottom: "10px" }}
            FormHelperTextProps={{ classes: helperTextStyles() }}
            key={`author${state.scene["author"]}`}
            defaultValue={state.scene["author"]}
            variant="outlined"
            margin="dense"
            id="author-name"
            label="Author"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              handleInputValue(e);
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
              }));
            }}
            name="author"
            error={errors["author"]?.length > 0}
            onBlur={handleInputValue}
            {...(errors["author"] && {
              error: true,
              helperText: errors["author"],
            })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close(3)} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!formIsValid()}
            onClick={() => onEditScene()}
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
