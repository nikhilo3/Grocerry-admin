import x from "../../assets/icons/x.svg";
import Button from "../../components/reusable/Button";
import ban from "../../assets/icons/ban.svg";
import { IGetAllUsersResponse } from "../../api/users";

type Props = {
  user: IGetAllUsersResponse | null;
  clearUser: () => void;
};
const UserDetailsModal = ({ user, clearUser }: Props) => {
  const address = user?.addressDetailsList?.[0] || null;
  return (
    <>
      <dialog id="user_details_modal" className="modal">
        <div className="modal-box min-w-[752px] w-[752px] p-8 rounded-[20px] flex flex-col gap-6">
          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <span className="text-[28px] font-medium">User Details</span>
              <p className="text-accent-500 text-base">
                Lorem ipsum dolor sit amet consectetur. Tortor elit
              </p>
            </div>
            <button
              className="h-8 w-8"
              onClick={() => {
                clearUser();
                //@ts-ignore
                document.getElementById("user_details_modal")?.close();
              }}
            >
              <img src={x} className="h-8 w-8" alt="close modal" />
            </button>
          </div>

          <div className="w-full grid grid-cols-2">
            <div className="flex flex-col">
              <span className="text-accent-500 text-base">Full Name</span>
              <span className="text-[20px] font-semibold text-accent-700">
                {user?.userDetails.name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-accent-500 text-base">Email ID</span>
              <span className="text-[20px] font-semibold text-accent-700">
                {user?.userDetails.email}
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2">
            <div className="flex flex-col">
              <span className="text-accent-500 text-base">Mobile No.</span>
              <span className="text-[20px] font-semibold text-accent-700">
                {user?.userDetails.primaryPhoneNo}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-accent-500 text-base">
                Secondary Mobile No.
              </span>
              <span className="text-[20px] font-semibold text-accent-700">
                {user?.userDetails.secondaryPhoneNo || "Not Available!"}
              </span>
            </div>
          </div>

          <hr />

          {address && (
            <>
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-accent-500 text-base">
                    Address Line 1
                  </span>
                  <span className="text-[18px] font-medium text-accent-700 truncate">
                    {address?.addressLine1}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent-500 text-base">
                    Address Line 1
                  </span>
                  <span className="text-[18px] font-medium text-accent-700 truncate">
                    {address?.addressLine2 || "Not Available!"}
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-accent-500 text-base">State</span>
                  <span className="text-[18px] font-medium text-accent-700 truncate">
                    {address?.state}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent-500 text-base">City</span>
                  <span className="text-[18px] font-medium text-accent-700 truncate">
                    {address?.city}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent-500 text-base">Pin code</span>
                  <span className="text-[18px] font-medium text-accent-700 truncate">
                    {address?.pincode || "Not Available!"}
                  </span>
                </div>
              </div>
            </>
          )}
          <Button
            variant="error-outline"
            className="w-fit flex items-center justify-center gap-2"
          >
            <span>Ban User</span>
            <img src={ban} alt="" className="h-4 w-4" />
          </Button>
        </div>
      </dialog>
    </>
  );
};
export default UserDetailsModal;
