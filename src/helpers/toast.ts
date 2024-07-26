import { toast as RT } from "react-hot-toast";

type ToastType = "success" | "error";
type ToastPosition = "top-center" | "top-left" | "bottom-right" | "bottom-left";

type ToastProps = {
  type: ToastType;
  message: string;
  position?: ToastPosition;
  duration?: number;
  theme?: "light" | "dark";
};

export const toast = ({
  type,
  message,
  position = "top-center",
  duration = 2500,
}: ToastProps) => {
  let toastComponent;

  switch (type) {
    case "success":
      toastComponent = RT.success(message, {
        position: position,
        duration: duration,
      });
      break;

    case "error":
      toastComponent = RT.error(message, {
        position: position,
        duration: duration,
      });
      break;
  }

  return toastComponent;
};
