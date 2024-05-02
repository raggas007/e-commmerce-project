import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../stores/slices/snackbarSlices";

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);

  const values = useSelector((state) => state.Snackbar);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar
        open={values?.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={values?.color}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {values?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
