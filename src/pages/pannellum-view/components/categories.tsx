import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import CategoryIcon from "@material-ui/icons/Category";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import ComposedIcon from "material-ui-mix-icon";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import Tooltip from "@material-ui/core/Tooltip";

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

const StyledTooltip = withStyles({
  tooltipPlacementRight: {
    margin: "0 6px",
  },
  tooltip: {
    fontSize: "0.8em",
  },
})(Tooltip);

const StyledTooltips = withStyles({
  tooltipPlacementRight: {
    margin: "0 20px",
  },
  tooltip: {
    fontSize: "0.8em",
  },
})(Tooltip);

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
        props.isEditInfo(false, index);
        props.isLoadScene(false, index);
        props.isEditScene(false, index);
        props.isDeleteInfo(false, index);
        props.isDeleteScene(false, index);
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
        props.isLoadScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 3:
        props.isEditInfo(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 4:
        props.isEditScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 5:
        props.isDeleteInfo(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 6:
        props.isDeleteScene(true, index);
        setState((s) => ({ ...s, selectedIndex: index }));
        break;
      case 7:
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
        disabled={props.disable}
        button
        selected={state.selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <InfoIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Add Hotspot" placement="right" arrow>
            <ListItemIcon>
              <InfoIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Add Hotspot" />
      </ListItem>
      <ListItem
        button
        selected={state.selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ViewCarouselIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Add Scene" placement="right" arrow>
            <ListItemIcon>
              <ViewCarouselIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Add Scene" />
      </ListItem>
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ImageSearchIcon fontSize="large" />{" "}
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Load Scene" placement="right" arrow>
            <ListItemIcon>
              <ImageSearchIcon fontSize="large" />{" "}
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Load Scene" />
      </ListItem>
      <Divider />
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ComposedIcon
              position="bottom-end"
              color="inherit"
              size="medium"
              icon="info-circle"
              extraIcon="user-edit"
            />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Edit Hotspot" placement="right" arrow>
            <ListItemIcon>
              <ComposedIcon
                position="bottom-end"
                color="inherit"
                size="medium"
                icon="info-circle"
                extraIcon="user-edit"
              />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Edit Hotspot" />
      </ListItem>
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ComposedIcon
              position="bottom-end"
              color="inherit"
              size="medium"
              icon="photo-video"
              extraIcon="user-edit"
            />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Edit Scene" placement="right" arrow>
            <ListItemIcon>
              <ComposedIcon
                position="bottom-end"
                color="inherit"
                size="medium"
                icon="photo-video"
                extraIcon="user-edit"
              />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Edit Scene" />
      </ListItem>
      <Divider />
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 5}
        onClick={(event) => handleListItemClick(event, 5)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ComposedIcon
              position="bottom-end"
              color="inherit"
              size="medium"
              icon="info-circle"
              extraIcon="times"
            />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Delete Hotspot" placement="right" arrow>
            <ListItemIcon>
              <ComposedIcon
                position="bottom-end"
                color="inherit"
                size="medium"
                icon="info-circle"
                extraIcon="times"
              />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Delete Info" />
      </ListItem>
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 6}
        onClick={(event) => handleListItemClick(event, 6)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <ComposedIcon
              position="bottom-end"
              color="inherit"
              size="medium"
              icon="photo-video"
              extraIcon="times"
            />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="Delete Scene" placement="right" arrow>
            <ListItemIcon>
              <ComposedIcon
                position="bottom-end"
                color="inherit"
                size="medium"
                icon="photo-video"
                extraIcon="times"
              />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="Delete Scene" />
      </ListItem>
      <Divider />
      <ListItem
        disabled={props.disable}
        button
        selected={state.selectedIndex === 7}
        onClick={(event) => handleListItemClick(event, 7)}
      >
        {props.isOpenDrawer ? (
          <ListItemIcon>
            <CategoryIcon fontSize="large" />
          </ListItemIcon>
        ) : (
          <StyledTooltip title="More" placement="right" arrow>
            <ListItemIcon>
              <CategoryIcon fontSize="large" />
            </ListItemIcon>
          </StyledTooltip>
        )}
        <ListItemText primary="More" />
        {state.selectedIndex === 7 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={state.selectedIndex === 7} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <FormControl className={classes.nested} component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  props.isOpenDrawer ? (
                    <Switch
                      checked={state.isAutoRotate}
                      onChange={handleListSwitchChange}
                      name="isAutoRotate"
                    />
                  ) : (
                    <StyledTooltips title="Auto Rotate" placement="right" arrow>
                      <Switch
                        checked={state.isAutoRotate}
                        onChange={handleListSwitchChange}
                        name="isAutoRotate"
                      />
                    </StyledTooltips>
                  )
                }
                label="Auto Rotate"
              />
              <FormControlLabel
                control={
                  props.isOpenDrawer ? (
                    <Switch
                      checked={state.isCompass}
                      onChange={handleListSwitchChange}
                      name="isCompass"
                    />
                  ) : (
                    <StyledTooltips
                      title="Show Compass"
                      placement="right"
                      arrow
                    >
                      <Switch
                        checked={state.isCompass}
                        onChange={handleListSwitchChange}
                        name="isCompass"
                      />
                    </StyledTooltips>
                  )
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
