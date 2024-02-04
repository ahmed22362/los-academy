import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";

interface DeleteToastProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteToast: React.FC<DeleteToastProps> = ({ onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const clear = () => {
    toast.current!.clear();
    setVisible(false);
  };

  const confirm = () => {
    if (!visible) {
      setVisible(true);
      toast.current!.clear();
      toast.current!.show({
        severity: "warn",
        sticky: true,
        content: (
          <span
            className="flex flex-column align-items-center"
            style={{ flex: "1" }}
          >
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
                  onClick={() => {
                    onCancel();
                    clear();
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </span>
        ),
      });
    }
  };

  return (
    <>
      <Toast ref={toast} position="bottom-center" onClick={confirm} />
    </>
  );
};

export default DeleteToast;
