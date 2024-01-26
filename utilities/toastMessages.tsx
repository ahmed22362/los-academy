import { Toast } from "primereact/toast";
import { RefObject } from "react";
import { BiMessageAltAdd } from "react-icons/bi";

export const showSuccess = (message: string, localToast: RefObject<Toast>) => {
  localToast.current?.show({
    severity: "success",
    summary: "Success",
    detail: message,
    life: 3000,
  });
};

export const showError = (message: string, localToast: RefObject<Toast>) => {
  localToast.current?.show({
    severity: "error",
    summary: "Error",
    detail: message,
    life: 4000,
  });
};
