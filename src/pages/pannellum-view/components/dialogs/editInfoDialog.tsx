import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  addHotSpot,
  removeHotSpot,
  getAllScenes,
} from "../../libs/react-pannellum/dist";
import Button from "@material-ui/core/Button";
import { useFormControls } from "../validiations/deleteInfoValidation";
import { helperTextStyles } from "../styles";

interface types {
  title: string;
}

const types: types[] = [{ title: "info" }, { title: "scene" }];

export default function EditInfoDialog(props) {
  const [state, setState] = useState({
    scene: {
      // use to save / retrieve config of scene
      sceneId: "",
      hotSpot: [],
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
    isSceneType: false, // use to define "scene" type of hotspot when "Add"
    isInfoType: false, // use to define "info" type of hotspot when "Add"
  });

  useEffect(() => {
    console.log(getAllScenes());
  }, [state.hotSpot["id"]]);

  useEffect(() => {
    setState({
      scene: {
        // use to save / retrieve config of scene
        sceneId: "",
        hotSpot: [],
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
      isSceneType: false, // use to define "scene" type of hotspot when "Add"
      isInfoType: false, // use to define "info" type of hotspot when "Add"
    });
  }, [props.open]);

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls({
      open: props.open,
      sceneID: state.hotSpot["sceneId"],
    });

  const onEditInfo = () => {
    removeHotSpot(state.hotSpot["id"], state.hotSpot["sceneId"]);
    addHotSpot({
      pitch: state.scene["hotSpots"]?.find(
        (value) => value?.id === state.hotSpot["id"]
      )["pitch"],
      yaw: state.scene["hotSpots"]?.find(
        (value) => value?.id === state.hotSpot["id"]
      )["yaw"],
      id: state.hotSpot["id"],
      sceneId: state.hotSpot["sceneId"],
      type:
        state.hotSpot["type"] ||
        state.scene["hotSpots"]?.find(
          (value) => value?.id === state.hotSpot["id"]
        )["type"],
      text:
        state.hotSpot["text"] ||
        state.scene["hotSpots"]?.find(
          (value) => value?.id === state.hotSpot["id"]
        )["text"],
      URL: state.hotSpot["URL"],
    });
    props.close(3, "Edit Hotspot Successful !");
  };

  return (
    <Dialog // this is Delete Info Dialog
      open={props.open}
      onClose={() => props.close(3)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-delete-info">
        <DialogTitle id="form-dialog-title">Edit Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Edit Info, first choice Scene ID, then choice hotspot ID.
          </DialogContentText>
          <Autocomplete
            id="scenes"
            options={props.fullScenesInformation}
            getOptionLabel={(option: object) => Object.keys(option)[0]}
            onChange={(event: any, value: any) => {
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
          <Autocomplete
            disabled={state.scene["hotSpots"] ? false : true}
            id="hotspot"
            options={state.scene["hotSpots"] ? state.scene["hotSpots"] : []}
            getOptionLabel={(option) => option.id}
            onChange={(event: any, value: any) => {
              if (
                state.hotSpot["id"] &&
                state.scene["hotSpots"]?.find(
                  (value) => value?.id === state.hotSpot["id"]
                )["type"] === "info"
              ) {
                setState((s) => ({ ...s, isInfoType: true }));
              } else {
                setState((s) => ({ ...s, isSceneType: true }));
              }
              handleInputValue({
                target: {
                  name: "hotSpotName",
                  value: value ? Object.keys(value as object)[0] : "",
                },
              });
              setState((s) => ({
                ...s,
                hotSpot: {
                  ...s.hotSpot,
                  id: value ? value.id.toString() : "",
                },
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ marginTop: "15px", marginBottom: "10px" }}
                label="Hotspot Name"
                variant="outlined"
                name="hotSpotName"
                error={errors["hotSpotName"]?.length > 0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
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
          <Autocomplete
            disabled={state.hotSpot["id"] ? false : true}
            id="type"
            key={`type${
              state.hotSpot["id"] &&
              state.scene["hotSpots"]?.find(
                (value) => value?.id === state.hotSpot["id"]
              )["type"]
            }`}
            defaultValue={{
              title:
                state.hotSpot["id"] &&
                state.scene["hotSpots"]?.find(
                  (value) => value?.id === state.hotSpot["id"]
                )["type"],
            }}
            options={types}
            onSelect={handleInputValue}
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
                style={{ marginTop: "15px", marginBottom: "10px" }}
                margin="dense"
                FormHelperTextProps={{ classes: helperTextStyles() }}
                label="Type"
                variant="outlined"
                name="type"
                error={errors["type"]?.length > 0}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                {...(errors["type"] && {
                  error: true,
                  helperText: errors["type"],
                })}
              />
            )}
          />
          {state.isSceneType && (
            <Autocomplete
              disabled={state.hotSpot["id"] ? false : true}
              id="scenes"
              key={`scn${
                state.hotSpot["id"] &&
                state.scene["hotSpots"]?.find(
                  (value) => value?.id === state.hotSpot["id"]
                )["sceneId"]
              }`}
              defaultValue={{
                [state.hotSpot["id"] &&
                state.scene["hotSpots"]?.find(
                  (value) => value?.id === state.hotSpot["id"]
                )["sceneId"]]: "",
              }}
              options={props.fullScenesInformation}
              onSelect={handleInputValue}
              getOptionLabel={(option: object) => Object.keys(option)[0]}
              onChange={(event: any, value: any) =>
                setState((s) => ({
                  ...s,
                  hotSpot: {
                    ...s.hotSpot,
                    sceneId: value && Object.keys(value)[0],
                  },
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="sname"
                  style={{ marginTop: "15px", marginBottom: "10px" }}
                  FormHelperTextProps={{ classes: helperTextStyles() }}
                  label="Scene Name"
                  variant="outlined"
                  margin="dense"
                  error={errors["sname"]?.length > 0}
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  {...(errors["sname"] && {
                    error: true,
                    helperText: errors["sname"],
                  })}
                />
              )}
            />
          )}
          <TextField
            disabled={state.hotSpot["id"] ? false : true}
            key={`des${
              state.hotSpot["id"] &&
              state.scene["hotSpots"]?.find(
                (value) => value?.id === state.hotSpot["id"]!
              )["text"]
            }`}
            defaultValue={
              state.hotSpot["id"] &&
              state.scene["hotSpots"]?.find(
                (value) => value?.id === state.hotSpot["id"]!
              )["text"]
            }
            style={{ marginTop: "15px", marginBottom: "10px" }}
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
              style={{ marginTop: "15px", marginBottom: "10px" }}
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
          <Button onClick={() => props.close(3)} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!formIsValid()}
            onClick={() => onEditInfo()}
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
