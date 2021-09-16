import { makeStyles } from "@material-ui/core/styles";

export const helperTextStyles = makeStyles((theme) => ({
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      position: "absolute",
      marginTop: "40px",
    },
  },
}));
