import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import { getText } from "./UserTable";
import { RxCross1 } from "react-icons/rx";

const UserDetails = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          console.log("No such user found!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (!user) return <p className="text-center text-lg text-red-500">User not found</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        {/* Close Button */}
        <button
          className="absolute top-4 right-6 text-gray-600 text-2xl font-bold hover:text-gray-900"
          onClick={onClose}
        >
          <RxCross1 />
        </button>

        {/* User Profile Image */}
        <img
          src={user.profile}
          alt="User"
          className="rounded-full w-24 h-24 mx-auto border-4 border-indigo-500"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">{user.username}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>

        <div className="mt-4 border-t pt-4">
          <p className="text-black">
            <strong>Location:</strong> {user.address}
          </p>
          <p>
            <strong>Join Date:</strong>{" "}
            {user.createdAt && user.createdAt.toDate
              ? user.createdAt.toDate().toLocaleDateString("en-US", {
                month: "2-digit",
                year: "2-digit",
              })
              : "N/A"}
          </p>


          <p className="mt-2">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getText(user) === "Paying"
                ? "bg-green-100 text-green-600"
                : getText(user) === "Trial"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-red-100 text-red-600"
                }`}
            >
              {getText(user)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
