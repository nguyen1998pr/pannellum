import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { addHotSpot } from "../../libs/react-pannellum";

interface types {
  title: string;
}

const types: types[] = [{ title: "info" }, { title: "scene" }];

interface Props {
  hotSpot: {
    id: string;
    sceneId: string;
    pitch: string;
    type: string;
    yaw: string;
    text: string;
    URL: string;
  };
  isSceneType: boolean;
  isInfoType: boolean;
}

export default function AddInfoDialog(props) {
  const [state, setState] = useState<Props>({
    hotSpot: {
      id: "",
      sceneId: "",
      pitch: "",
      type: "",
      yaw: "",
      text: "",
      URL: "",
    },
    isSceneType: false, // use to define "scene" type of hotspot when "Add"
    isInfoType: false, // use to define "info" type of hotspot when "Add"
  });

  useEffect(() => {
    setState((s) => ({
      hotSpot: {
        id: "",
        sceneId: "",
        pitch: "",
        type: "",
        yaw: "",
        text: "",
        URL: "",
      },
      isSceneType: false, // use to define "scene" type of hotspot when "Add"
      isInfoType: false, // use to define "info" type of hotspot when "Add"
    }));
  }, [props.open]);

  const onAddInfo = () => {
    addHotSpot({
      pitch: props.mouseEventToCoords["pitch"],
      yaw: props.mouseEventToCoords["yaw"],
      id: state.hotSpot["id"],
      sceneId: state.hotSpot["sceneId"],
      type: state.hotSpot["type"],
      text: state.hotSpot["text"],
      URL: state.hotSpot["URL"],
    });
    setState((s) => ({
      ...s,
      hotSpot: {
        id: "",
        sceneId: "",
        pitch: "",
        type: "",
        yaw: "",
        text: "",
        URL: "",
      },
      isSceneType: false,
      isInfoType: false,
    }));
    props.close(3);
  };

  return (
    <Dialog // this is Add Info Dialog
      open={props.open}
      onClose={() => props.close(0)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-add-info">
        <DialogTitle id="form-dialog-title">Add Place Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add information for this place, enter a place name, then enter a
            description (if available).
          </DialogContentText>
          <Autocomplete
            id="type"
            options={types}
            getOptionLabel={(option) => option.title}
            onChange={(event: any, value: any) => {
              setState((s) => ({
                ...s,
                hotSpot: {
                  ...s.hotSpot,
                  type: value && value.title.toString(),
                },
                isSceneType:
                  value && value.title.toString() === "scene" ? true : false,
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
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="title"
            label="Title( ID )"
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
          {state.isSceneType && (
            <Autocomplete
              id="scenes"
              options={props.fullScenesInformation}
              getOptionLabel={(option: object) => Object.keys(option)[0]}
              onChange={(event: any, value: any) =>
                setState((s) => ({
                  ...s,
                  hotSpot: {
                    ...s.hotSpot,
                    sceneId: Object.keys(value)[0],
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
              label="URL( Optional )"
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
          <Button onClick={() => props.close(0)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onAddInfo()} color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
