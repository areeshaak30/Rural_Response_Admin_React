import React, { useState } from "react";
import threee from "../../assets/threee.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import UserDetails from "./UserDetails";

const UserTable = ({ users, activeUsers, fetchUsers }) => {
  // console.log(activeUsers, "activeUSers");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showOptions, setShowOptions] = useState(
    Array(users.length).fill(false)
  );

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleOptionsClick = (index) => {
    // Create a copy of showOptions array
    const updatedShowOptions = [...showOptions];
    // Toggle visibility for the clicked user index
    updatedShowOptions[index] = !updatedShowOptions[index];

    // Close all other options divs
    for (let i = 0; i < updatedShowOptions.length; i++) {
      if (i !== index) {
        updatedShowOptions[i] = false;
      }
    }
    // Update state with the new array
    setShowOptions(updatedShowOptions);
  };

  const extractMonthAndYear = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return ""; // Check if timestamp is valid
    const date = timestamp.toDate(); // Convert Firebase timestamp to JavaScript Date object
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const year = date.getFullYear().toString().substr(-2); // Extract last 2 digits of the year
    return `${month}/${year}`;
  };

  const handleBlockUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        isBlocked: true,
      });
      setShowOptions(Array(activeUsers.length).fill(false));
      fetchUsers(false);
      // console.log("Successss");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <section className="border-2 rounded-lg mb-5 max-h-[500px] overflow-y-auto hide-scrollbar">
        <div className="flex bg-white">
          <p className="head-style">Name</p>
          <p className="head-style">Email</p>
          <p className="head-style">Location</p>
          <p className="head-style">Join Date</p>
          <p className="head-style">Status</p>
        </div>

        {activeUsers.map((user, index) => (
          <div
            key={user.userId}
            className={`flex rounded-lg ${index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'} `}

          >
            <div className="w-[20%] border-r-2">
              <div className="flex gap-2">
                <img
                  src={user.profile}
                  alt="Man"
                  className="rounded-full mt-4 ml-4 w-[30px] h-[30px]"
                />
                <p className="p-4 cursor-pointer" onClick={() => handleUserClick(user.userId)}>
                  {user.username}
                </p>
              </div>
            </div>
            <div className="w-[20%] border-r-2 break-words p-4">
              <p className="break-words">{user.email}</p>
            </div>

            <div className="w-[20%] border-r-2">
              <p className="p-4">{user.address}</p>
            </div>
            <div className="w-[20%] border-r-2">
              <p className="p-4">
                {" "}
                {extractMonthAndYear(user.createdAt)}
              </p>
            </div>
            <div className="w-[20%]">
              <div className="ml-3 flex gap-16 pt-4 mb-2 text-center">
                <p
                  className={`text-[14px] w-[46%] font-semibold rounded py-1 ${getStatus(
                    user
                  )}`}
                >
                  {getText(user)}
                </p>
                <section className="">
                  <img
                    src={threee}
                    alt=""
                    className="p-2 cursor-pointer"
                    onClick={() => handleOptionsClick(index)}
                  />

                  {showOptions[index] && ( // Render the options div only if showOptions is true for the clicked user
                    <div className="bg-white cursor-pointer absolute shadow-xl border text-center rounded-lg w-[130px] right-[5%] ">
                      <div className=" flex flex-col gap-0">
                        <Link to={"/Alerts"}>
                          <p className="text-start  py-2 hover:bg-[#F6F6F6]">
                            <span className=" px-4">Alerts</span>
                          </p>
                        </Link>
                        <p
                          className="text-start  py-2 hover:bg-[#F6F6F6]"
                          onClick={() => handleBlockUser(user.userId)}
                        >
                          <span className=" px-4">Block</span>
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* Modal */}
      {selectedUserId && (
        <UserDetails userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}
    </>
  );
};

const getStatus = ({ isPremium, freeTrial }) => {

  if (isPremium && freeTrial)
    return "bg-opacity-[20%] bg-[#00B69B] text-[#00B69B]";

  if (isPremium && !freeTrial)
    return "bg-opacity-[20%] bg-[#6226EF] text-[#6226EF]";

  if (!isPremium && !freeTrial)
    return "bg-opacity-[20%] bg-[#EF3826] text-[#EF3826]";
};

export const getText = ({ isPremium, freeTrial }) => {
  if (isPremium && freeTrial) return "Paying";

  if (isPremium && !freeTrial) return "Trial";

  if (!isPremium && !freeTrial) return "Lapsed";
};

export default UserTable;
