import React, { useState } from "react";
import threee from "../../assets/threee.svg";
import { Link } from "react-router-dom";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";

const BlockUserTable = ({ blockedUsers, fetchUsers }) => {
  // console.log(blockedUsers, "here it is come on");

  const [showOptions, setShowOptions] = useState(
    Array(blockedUsers.length).fill(false)
  );

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
    if (!timestamp || !timestamp.toDate) return "";
    const date = timestamp.toDate();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().substr(-2);
    return `${month}/${year}`;
  };

  const handleUnbBlockUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        isBlocked: false,
      });
      setShowOptions(Array(blockedUsers.length).fill(false));
      fetchUsers(true);
      // console.log("Successss");
    } catch (error) {
      console.log(error, "error");
    }
  };
  
  return (
    <>
      <section className="border-2 rounded-lg">
        <div className="flex bg-white">
          <p className="head-style">Name</p>
          <p className="head-style">Email</p>
          <p className="head-style">Location</p>
          <p className="head-style">Join Date</p>
          <p className="head-style">Status</p>
        </div>

        {blockedUsers.map((user, index) => (
          <div key={index} className={`flex rounded-lg ${index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'}`}>
            <div className="w-[20%] p-2 border-r-2 ">
              <div className="flex gap-3">
                <img
                  src={user.profile}
                  alt="Man"
                  className="rounded-full mt-2 ml-4 w-[30px] h-[30px] "
                />
                <p className="p-2">
                    {user.username}
                </p>
              </div>
            </div>
            <div className="w-[20%] border-r-2 break-words pt-0 p-2">
              <p className="p-4">{user.email}</p>
            </div>
            <div className="w-[20%] border-r-2">
              <p className="p-4">{user.address}</p>
            </div>
            <div className="w-[20%] border-r-2">
              <p className="p-4">
                {" "}
                {extractMonthAndYear(user.premiumDate)}
              </p>
            </div>
            <div className="w-[20%] mb-3">
              <div className="ml-3 flex gap-16 pt-4 text-center">
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
                    className="cursor-pointer p-2"
                    onClick={() => handleOptionsClick(index)}
                  />

                  {showOptions[index] && (
                    <div className="bg-white absolute cursor-pointer shadow-xl border text-center rounded-lg w-[130px] right-[6.5%] ">
                      <div className=" flex flex-col gap-0">
                        <Link to={"/Alerts"}>
                          <p className="text-start  py-2  hover:bg-[#F6F6F6] ">
                            <span className=" px-4">Alerts</span>
                          </p>
                        </Link>
                        <p
                          className="text-start  py-2  hover:bg-[#F6F6F6] "
                          onClick={() => handleUnbBlockUser(user.userId)}
                        >
                          <span className=" px-4">Unblock</span>
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
    </>
  );
};

export default BlockUserTable;
const getStatus = ({ isPremium, freeTrial }) => {
  if (isPremium && freeTrial)
    return "bg-opacity-[20%] bg-[#00B69B] text-[#00B69B]";

  if (isPremium && !freeTrial)
    return "bg-opacity-[20%] bg-[#6226EF] text-[#6226EF]";

  if (!isPremium && !freeTrial)
    return "bg-opacity-[20%] bg-[#EF3826] text-[#EF3826]";
};

const getText = ({ isPremium, freeTrial }) => {
  if (isPremium && freeTrial) return "Paying";

  if (isPremium && !freeTrial) return "Trial";

  if (!isPremium && !freeTrial) return "Lapsed";
};
