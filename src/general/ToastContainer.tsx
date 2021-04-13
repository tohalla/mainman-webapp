import React, { MouseEventHandler } from "react";
import { FaTimes } from "react-icons/fa";
import {
  ToastContainer as ToastifyToastContainer,
  Slide,
} from "react-toastify";
import { Box } from "theme-ui";

interface CloseButtonProps {
  closeToast: MouseEventHandler;
}

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <FaTimes onClick={closeToast} />
);

const ToastContainer = () => (
  <Box
    sx={{
      ".Toastify__toast-container": {},
      ".Toastify__toast": {
        cursor: "default",
        boxShadow: 0,
        borderWidth: "0px",
        borderStyle: "solid",
        borderLeftWidth: "7px",
        backgroundColor: "greyscale.9",
        color: "greyscale.2",
        pl: 3,
        mb: 2,
        minHeight: 0,
      },
      ".Toastify__toast--error": {
        borderLeftColor: "indicator.error",
      },
      ".Toastify__toast--warning": {
        borderLeftColor: "indicator.warning",
      },
      ".Toastify__toast--success": {
        borderLeftColor: "indicator.success",
      },
      ".Toastify__toast-body": {
        padding: 0,
      },
      ".Toastify__progress-bar": {
        backgroundColor: "greyscale.5",
        height: "2px",
      },
    }}
  >
    <ToastifyToastContainer
      closeButton={CloseButton}
      draggablePercent={40}
      pauseOnFocusLoss={false}
      position="top-right"
      transition={Slide}
    />
  </Box>
);

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
