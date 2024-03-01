import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import { useMutation } from "react-query";
import { deleteProduct } from "../lib/apis";
import Loader from "./Loader";

const DeleteProductDialog = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const params = useParams();
  const productId = params?.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await deleteProduct(productId);
    },
    onSuccess: (response) => {
      navigate("/product");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        <Typography> delete product</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure, You want to delete this Product?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography>Cancel</Typography>
          </Button>
          <Button
            onClick={() => {
              mutate();
              handleClose();
            }}
            variant="contained"
            color="error"
          >
            <Typography>Yes</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteProductDialog;
