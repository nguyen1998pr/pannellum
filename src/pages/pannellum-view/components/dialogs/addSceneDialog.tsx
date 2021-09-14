import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addScene } from "../../libs/react-pannellum";
import { defaultConfig } from "../../views/default-config";

interface types {
  title: string;
}

const types: types[] = [{ title: "info" }, { title: "scene" }];

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
  fullScenesInformation: Array<any>;
}

export default function AddSceneDialog(props) {
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
    fullScenesInformation: [],
  });

  useEffect(() => {
    setState((s) => ({
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
      fullScenesInformation: [],
    }));
  }, [props.open]);

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

  const onAddScene = () => {
    if (!props.fullScenesInformation?.length) {
      setState((s) => ({
        ...s,
        fullScenesInformation: [
          {
            [s.scene["sceneId"]]: {
              ...s.scene["config"],
            },
          },
        ],
      }));
    } else {
      addScene(state.scene.sceneId, state.scene["config"], addSceneSuccess);
    }
    setState((s) => ({
      ...s,
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
    }));
    props.close(1, {
      ...state,
      fullScenesInformation: [
        {
          [state.scene["sceneId"]]: {
            ...state.scene["config"],
          },
        },
      ],
    });
  };

  return (
    <Dialog // this is Add Scene Dialog
      open={props.open}
      onClose={() => props.close(0)}
      aria-labelledby="form-dialog-title"
    >
      <form id="my-add-scene">
        <DialogTitle id="form-dialog-title">Add Scene</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add scene, enter a scene id, scene name, then enter the source of
            scene ( link ).
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
          <Button onClick={() => props.close(3)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onAddScene()} color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
