import React, { useEffect, useState } from "react";
import { selectActiveContent, setActiveContent } from "../../store/features/TabsSlice";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import Search from "../../assets/Search.svg";
import Sidebar from "../../component/Sidebar";
import All from "../../assets/All.svg";
import UserTable from "./UserTable";
import BlockUserTable from "./BlockUserTable";

const UserComp = () => {
  const [users, setUsers] = useState([]);
  const [isBlocked, setBlock] = useState(false);
  const [searchQuery, setSearch] = useState("");
  const [status, setIsStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [joinDateQuery, setJoinDateQuery] = useState("");
  const activeContent = useSelector(selectActiveContent);
  const dispatch = useDispatch();

  // console.log(activeUsers, "usersss heree");
  const [dataa, setdataa] = useState(false);
  const handleclicka = () => {
    setdataa(!dataa);
  };

  const [selectedStatus, setSelectedStatus] = useState('All');

  // Handling the change event of the select element
  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value); // Update the displayed value in the input field

    // Call setIsStatus based on the selected option
    switch (value) {
      case 'All':
        setIsStatus(0);
        break;
      case 'Paying':
        setIsStatus(1);
        break;
      case 'Trial':
        setIsStatus(2);
        break;
      case 'Lapsed':
        setIsStatus(3);
        break;
      default:
        break;
    }
  };

  // console.log(activeContent, "check itt");
  const handleClick = (content) => {
    setBlock(content.toLowerCase() === "users" ? false : true);
    dispatch(setActiveContent(content));
  };

  const fetchUsers = async (isBlocked) => {
    const querySnapshot = await getDocs(collection(db, "users"));

    setUsers(querySnapshot.docs.map((e) => e.data()));

    if (!querySnapshot.empty) {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredUsers = newData.filter((user) => {
        if (user.isBlocked === undefined) {
          return !isBlocked;
        } else {
          return user.isBlocked === isBlocked;
        }
      });
      if (isBlocked) {
        setBlockedUsers(filteredUsers);
        setActiveUsers([]);
      } else {
        setActiveUsers(filteredUsers);
        setBlockedUsers([]);
      }
    } else {
      console.log(`No ${isBlocked ? "blocked" : "unblocked"} users found.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (activeContent === "Users") {
        await fetchUsers(false);
      } else if (activeContent === "Blocked") {
        await fetchUsers(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [activeContent]);



  console.log(users, 'users are hereee ')

  let filteredUsersX = users;
  console.log(filteredUsersX, 'users are hereee ')

  /** Search by Username, Email, Location, Join Date */
  if (searchQuery || locationQuery || joinDateQuery) {
    filteredUsersX = filteredUsersX.filter(({ fullName, email, username, address, createdAt }) => {
      const queryLower = searchQuery.toLowerCase();
      const locationLower = locationQuery.toLowerCase();
      const joinDateLower = joinDateQuery.toLowerCase();

      const createdAtDate = createdAt?.toDate ? createdAt.toDate() : null;
      const createdMonthYear = createdAtDate
        ? `${createdAtDate.toLocaleString("en-US", { month: "long" })} ${createdAtDate.getFullYear()}`
        : "";

      return (
        (fullName?.toLowerCase().includes(queryLower) ||
          username?.toLowerCase().includes(queryLower) ||
          email?.toLowerCase().includes(queryLower) ||
          address?.toLowerCase().includes(queryLower)) &&
        (joinDateQuery ? createdMonthYear.toLowerCase().includes(joinDateLower) : true)
      );

    });
  }



  // /** Status */
  filteredUsersX = filteredUsersX.filter(({ isPremium, freeTrial }) => {
    if (status === 0)
      return true;

    if (status === 1)
      return isPremium && freeTrial;

    if (status === 2)
      return isPremium && !freeTrial;

    if (status === 3)
      return !isPremium && !isBlocked;
  });


  filteredUsersX = filteredUsersX.filter((e) => e.isBlocked === isBlocked);

  // console.log("Filterd Users", filteredUsersX);
  return (
    <>
      <section className="">
        <div>
          <div>
            <div className="flex justify-between mt-3">
              <p className="w-[21%] text-[20px] text-end font-semibold">
                Users
              </p>

              <form
                action=""
                className="w-[73%] relative flex gap-4 text-end  justify-end mr-8"
              >
                <input
                  onChange={({ target }) => {
                    setSearch(target.value.toString());
                  }}
                  type="text"
                  value={searchQuery}
                  className="border rounded pl-6 p-1 w-[25%] placeholder:text-[12px] focus:outline-none"
                  placeholder="Search here"
                />
                <img
                  src={Search}
                  alt="Search"
                  className="absolute h-4 right-[33%] top-2.5"
                />
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="border rounded pl-4 p-1 text-[12px] focus:outline-none"
                >
                  {/* Render options conditionally based on data availability */}
                  <option value="All">All</option>
                  <option value="Paying">Paying</option>
                  <option value="Trial">Trial</option>
                  <option value="Lapsed">Lapsed</option>
                </select>
              </form>
            </div>
            <div className="flex">
              <div className="w-[15%]">
                <Sidebar />
              </div>
              <div className="w-[85%] mt-2  bg-slate-50 min-h-screen  px-8">
                <div className="  my-4 text-end  ">
                  <button
                    onClick={() => handleClick("Users")}
                    className={` w-[12%] font-semibold text-black text-[14px] p-[9px]
                     mr-3 ${activeContent === "Users"
                        ? "bg-[#3B9F9A] text-white"
                        : "bg-white text-black"
                      }`}
                  >
                    Users
                  </button>
                  <button
                    className={` w-[12%] font-semibold text-black text-[14px] p-[9px]
                       ${activeContent === "Blocked"
                        ? "bg-[#3B9F9A] text-white"
                        : "bg-white text-[black]"
                      }`}
                    onClick={() => handleClick("Blocked")}
                  >
                    Blocked
                  </button>
                </div>
                {activeContent === "Users" && (
                  <>
                    <UserTable
                      users={filteredUsersX}
                      activeUsers={filteredUsersX}
                      fetchUsers={fetchUsers}
                    />
                  </>
                )}
                {activeContent === "Blocked" && (
                  <BlockUserTable
                    blockedUsers={filteredUsersX}
                    fetchUsers={fetchUsers}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserComp;