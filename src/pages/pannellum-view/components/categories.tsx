import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const MainListItems = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(props.isSelect);
  }, [props.isSelect]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (selectedIndex === index) {
      index = -1;
    }
    switch (index) {
      case -1:
        props.isAddInfo(false, index);
        props.isAddScene(false, index);
        setSelectedIndex(index);
        break;
      case 0:
        props.isAddInfo(true, index);
        setSelectedIndex(index);
        break;
      case 1:
        props.isAddScene(true, index);
        setSelectedIndex(index);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <ListItem
        button
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Add Info" />
      </ListItem>
      <ListItem
        button
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <ViewCarouselIcon />
        </ListItemIcon>
        <ListItemText primary="Add Scene" />
      </ListItem>
    </div>
  );
};
