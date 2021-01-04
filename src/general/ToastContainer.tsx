import React from "react";
import { FaTimes } from "react-icons/fa";
import {
  ToastContainer as ToastifyToastContainer,
  Slide,
} from "react-toastify";

import { getSpace } from "src/theme";
import { getColor } from "src/theme/colors";
import styled from "src/theme/styled";

const ToastContainer = () => (
  <Container
    closeButton={({ closeToast }) => <FaTimes onClick={closeToast} />}
    draggablePercent={40}
    pauseOnFocusLoss={false}
    position="top-right"
    transition={Slide}
  />
);

const Container = styled(ToastifyToastContainer)`
  .Toastify__toast-container {
  }
  .Toastify__toast {
    cursor: default;
    border: 1px solid ${getColor(["greyscale", 4])};
    border-left-width: 7px;
    background: ${getColor(["greyscale", 9])};
    color: ${getColor(["greyscale", 2])};
    padding-left: ${getSpace(3)};
    margin: 0 0 ${getSpace(2)} 0;
    min-height: 0;
  }
  .Toastify__toast--error {
    border-left-color: ${getColor(["indicator", "error"])};
  }
  .Toastify__toast--warning {
    border-left-color: ${getColor(["indicator", "warning"])};
  }
  .Toastify__toast--success {
    border-left-color: ${getColor(["indicator", "success"])};
  }
  .Toastify__toast-body {
    padding: 0;
  }
  .Toastify__progress-bar {
    background: ${getColor(["greyscale", 5])};
    height: 2px;
  }
`;

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
