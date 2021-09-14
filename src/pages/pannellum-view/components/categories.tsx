import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import CategoryIcon from "@material-ui/icons/Category";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export const MainListItems = (props) => {
  const [state, setState] = useState({
    selectedIndex: -1,
    isAutoRotate: false,
    isCompass: false,
  });
  const classes = useStyles();

  useEffect(() => {
    setState((s) => ({ ...s, selectedIndex: props.isSelect }));
  }, [props.isSelect]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (state.selectedIndex === index) {
      index = -1;
    }
    switch (index) {
      case -1:
        props.isAddInfo(false, index);
        props.isAddScene(false, index);
        props.isDeleteInfo(false, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 0:
        props.isAddInfo(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 1:
        props.isAddScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 2:
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 3:
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 4:
        props.isDeleteInfo(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 5:
        props.isDeleteScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 6:
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      default:
        break;
    }
  };

  const handleListSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (event.target.name) {
      case "isAutoRotate":
        props.isAutoRotate(event.target.checked);
        break;
      case "isCompass":
        props.isCompass(event.target.checked);
        break;
      default:
        break;
    }
    setState((s) => ({ ...s, [event.target.name]: event.target.checked }));
  };

  return (
    <div>
      <ListItem
        button
        selected={state.selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Add Info" />
      </ListItem>
      <ListItem
        button
        selected={state.selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <ViewCarouselIcon />
        </ListItemIcon>
        <ListItemText primary="Add Scene" />
      </ListItem>
      <Divider />
      <ListItem
        button
        selected={state.selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Info" />
      </ListItem>
      <ListItem
        button
        selected={state.selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Scene" />
      </ListItem>
      <Divider />
      <ListItem
        button
        selected={state.selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete Info" />
      </ListItem>
      <ListItem
        button
        selected={state.selectedIndex === 5}
        onClick={(event) => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete Scene" />
      </ListItem>
      <Divider />
      <ListItem
        button
        selected={state.selectedIndex === 6}
        onClick={(event) => handleListItemClick(event, 6)}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="More" />
        {state.selectedIndex === 6 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={state.selectedIndex === 6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <FormControl className={classes.nested} component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.isAutoRotate}
                    onChange={handleListSwitchChange}
                    name="isAutoRotate"
                  />
                }
                label="Auto Rotate"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.isCompass}
                    onChange={handleListSwitchChange}
                    name="isCompass"
                  />
                }
                label="Show Compass"
              />
            </FormGroup>
          </FormControl>
        </List>
      </Collapse>
    </div>
  );
};
