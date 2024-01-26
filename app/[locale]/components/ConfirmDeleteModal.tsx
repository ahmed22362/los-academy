// ConfirmModal.tsx
import { Toast } from "primereact/toast";
import React, { useRef } from "react";

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const toast = useRef<Toast>(null);

  const clear = () => {
    toast.current?.clear();
  };

  const confirm = () => {
    onConfirm();
    clear();
  };

  const cancel = () => {
    onCancel();
    clear();
  };

  return (
    <div className="flex flex-column align-items-center" style={{ flex: "1" }}>
      <div className="flex flex-col">
        <div className="text-center">
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "3rem" }}
          ></i>
          <div className="font-bold text-xl my-3">
            Are you sure you want to delete?
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            className="bg-danger-color hover:bg-red-400 transition-colors text-white px-5 py-2 rounded-xl"
            onClick={() => {
              onConfirm();
              clear();
            }}
          >
            Yes
          </button>
          <button
            className="bg-primary-color hover:bg-blue-900 transition-colors text-white px-5 py-2 rounded-xl"
            onClick={() => clear()}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
