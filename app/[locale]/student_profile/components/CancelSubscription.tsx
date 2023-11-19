import React, { useRef } from "react";
import { Checkbox, Label } from "flowbite-react";
import PrimaryButton from "../../components/PrimaryButton";
import Cookies from "universal-cookie";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
interface CancelSubscription {
  onCancel: () => void;
}
function CancelSubscription({ onCancel }: CancelSubscription) {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const router = useRouter();

  const toast = useRef<Toast>(null);
  const showSuccess = (msg: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 3000,
    });
  };
  const showError = (msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 4000,
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/user/updateMyPlan`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("GET request successful:", data);
        showSuccess(`${data.message}`);
        setTimeout(() => {
          router.push(data.data.url);
        }, 3000);
      } else {
        console.error("GET request failed:", response.statusText);
        showError("Failed To Cancel plan");
      }
    } catch (error) {
      console.error("Error during GET request:", error);
    }
  };

  return (
    <div>
      {" "}
      <Toast ref={toast} />
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-3 ">Cancel Paln</h3>
        <p className="font-medium text-md">
          We are sorry to see you cancel your plan. to help us to improve , we
          have a few short questions for you before you leave us.
        </p>
        <div className="check mt-5">
          <h3 className="font-medium text-lg my-4">
            Why are you cancelling your plan ?
          </h3>
          <div className="flex max-w-md flex-col gap-4" id="checkbox">
            <div className="flex items-center gap-2">
              <Checkbox
                className="checked:bg-[--secondary-color] focus:ring-[--secondary-color]"
                id="promotion"
              />
              <Label htmlFor="promotion">The website is difficult to use</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                className="checked:bg-[--secondary-color] focus:ring-[--secondary-color]"
                id="feature"
              />
              <Label htmlFor="feature">Featurs i need is missing</Label>
            </div>
            <div className="flex gap-2">
              <div className="flex h-5 items-center">
                <Checkbox
                  className="checked:bg-[--secondary-color] focus:ring-[--secondary-color]"
                  id="finished_lesson"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="finished_lesson">I Finished my lessons </Label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-5">
          <PrimaryButton
            ourStyle="bg-[#EB5757] rounded-2xl text-white px-5 py-2 w-fit "
            text="Cancel Subscription"
            onClick={fetchData}
          />
          <PrimaryButton
            ourStyle="text-[#828282] hover:text-[#6a6666] duration-200"
            onClick={onCancel}
            text="I will stay"
          />
        </div>
      </div>
    </div>
  );
}

export default CancelSubscription;
