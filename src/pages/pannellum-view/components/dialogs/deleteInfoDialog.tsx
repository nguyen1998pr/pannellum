import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { removeHotSpot } from "../../libs/react-pannellum";
import Button from "@material-ui/core/Button";
import { useFormControls } from "../validiations/deleteInfoValidation";
import { helperTextStyles } from "../styles";

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

export default function DeleteInfoDialog(props) {
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

  const onDeleteInfo = () => {
    removeHotSpot(state.hotSpot["id"], state.hotSpot["sceneId"]);
    props.close(3);
  };

  return (
    <Dialog // this is Delete Info Dialog
      open={props.open}
      onClose={() => props.close(3)}
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
            options={props.fullScenesInformation}
            onSelect={handleInputValue}
            getOptionLabel={(option: object) => Object.keys(option)[0]}
            onChange={(event: any, value: any) => {
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
                error={errors["sceneName"]}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                {...(errors["sceneName"] && {
                  error: true,
                  helperText: errors["sceneName"],
                })}
              />
            )}
          />
          <Autocomplete
            disabled={state.scene["hotSpots"] ? false : true}
            id="hotspot"
            onSelect={handleInputValue}
            options={state.scene["hotSpots"]}
            getOptionLabel={(option) => option.id}
            onChange={(event: any, value: any) =>
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
                style={{ marginTop: "15px", marginBottom: "10px" }}
                label="Hotspot Name"
                variant="outlined"
                name="hotSpotName"
                error={errors["hotSpotName"]}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                FormHelperTextProps={{ classes: helperTextStyles() }}
                {...(errors["hotSpotName"] && {
                  error: true,
                  helperText: errors["hotSpotName"],
                })}
                margin="dense"
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
            onClick={() => onDeleteInfo()}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
