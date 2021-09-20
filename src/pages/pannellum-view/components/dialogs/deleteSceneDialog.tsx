import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { removeScene } from "../../libs/react-pannellum/dist";
import { useFormControls } from "../validiations/deleteSceneValidation";
import { helperTextStyles } from "../styles";
import Button from "@material-ui/core/Button";

interface Props {
  scene: {
    // use to save / retrieve config of scene
    sceneId: string;
    config: {
      type: string;
      text: string;
      title: string;
      author: string;
      imageSource: string;
    };
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

export default function DeleteSceneDialog(props) {
  const [state, setState] = useState<Props>({
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

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls({
      open: props.open,
      sceneID: state.hotSpot["sceneId"],
    });

  const onDeleteSene = () => {
    removeScene(state.hotSpot["sceneId"]);
    props.close(3, "Delete Scene Successful !");
  };

  return (
    <Dialog // this is Delete Info Dialog
      open={props.open}
      onClose={() => props.close(3)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-delete-scene">
        <DialogTitle id="form-dialog-title">Delete Scene</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete Scene, choice Scene Name. ( Note that you cannot delete
            the current scene )
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
            renderInput={(params) => (
              <TextField
                {...params}
                label="Scene Name"
                variant="outlined"
                margin="dense"
                style={{ marginTop: "15px", marginBottom: "10px" }}
                name="sceneName"
                FormHelperTextProps={{ classes: helperTextStyles() }}
                error={errors["sceneName"]?.length > 0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                {...(errors["sceneName"] && {
                  error: true,
                  helperText: errors["sceneName"],
                })}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close(3)} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!formIsValid()}
            onClick={() => onDeleteSene()}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
