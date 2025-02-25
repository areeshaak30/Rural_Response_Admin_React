import React, { useState } from "react";
import { deleteDoc, doc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import { useDispatch } from "react-redux";
import threee from "../../assets/threee.svg";
import Flag from "../../assets/Flag.svg";
import p from "../../assets/p.svg";
import watch from "../../assets/watch.svg";
import Heading from "../../assets/Heading.svg";
import useFetchData from "../../hooks/useFetchData";
import { setAlertType } from "../../store/features/ActiveInActiveAlerts";

const EmergencyAlerts = ({ activeAlertTab }) => {
  const [openAlertIndex, setOpenAlertIndex] = useState(null);

  const handleOptionsClick = (index) => {
    setOpenAlertIndex(index === openAlertIndex ? null : index);
  };

  const { loading, data, error } = useFetchData({
    collectionName: "alerts",
    dependency: [activeAlertTab],
    queryArray: [
      where("isActive", "==", activeAlertTab == 0 ? true : false),
      where("alertTitle", "==", "Emergency"),
    ],
  });

  const formatExpiryDate = (expireTime) => {
    if (!expireTime || typeof expireTime !== "object" || !expireTime.seconds) {
      return "Invalid Date";
    }

    const unixTimestampMs = expireTime.seconds * 1000;
    const date = new Date(unixTimestampMs);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const handleDelete = async (alertId) => {
    const alertRef = doc(db, "alerts", alertId);
    try {
      await deleteDoc(alertRef);
      setAlertType(activeAlertTab == 0 ? 1 : 0) //trying to toggle so that useFetchData can be called again so that the dependency will fetch the data again
      setOpenAlertIndex(null);
    } catch (error) {
      console.log("Error deleting alert:", error);
    }
  };

  const handleActive = async (alertId) => {
    const alertRef = doc(db, "alerts", alertId);
    try {
      await updateDoc(alertRef, { isActive: false });
      setAlertType(activeAlertTab == 0 ? 1 : 0)
      setOpenAlertIndex(null);
    } catch (error) {
      console.log("Error updating alert status:", error);
    }
  };

  if (loading) return "";

  if (error) return `Got Error ${error.toString()}`;

  /** Setting Data */
  const alerts = data.docs.map((e) => e.data());
  console.log(alerts, "emergency alerts")

  return (
    <section>
      <div className="grid grid-cols-2 mb-3 gap-4">

        {alerts.map((e, index) => (
          <article
            key={index}
            className="flex bg-white border rounded-xl w-[100%]"
          >
            <div className="w-[20%] h-full">
              <img
                src={e.images}
                alt="Alert Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-5 py-3 w-[90%]">
              <div className="flex justify-between relative">
                <p className="font-semibold">{e.alertDescription}</p>
                <img
                  className="p-2 cursor-pointer"
                  src={threee}
                  alt="three"
                  onClick={() => handleOptionsClick(index)}
                />
                {openAlertIndex === index && (
                  <div className="bg-white absolute cursor-pointer shadow-xl border text-center rounded-lg w-[140px] left-[67%] mt-8 ">
                    <div className="flex flex-col gap-0">
                      <p
                        className="text-start  py-2  hover:bg-[#F6F6F6] "
                        onClick={() => handleDelete(e.alertId)}
                      >
                        <span className=" px-4">Delete</span>
                      </p>
                      {/* You may want to pass appropriate data and handlers */}
                      {activeAlertTab == 0 && <p
                        className="text-start  py-2  hover:bg-[#F6F6F6] "
                        onClick={() => handleActive(e.alertId)}
                      >
                        <span className=" px-4">Deactivate</span>
                      </p>}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-2">
                {/* <p>{e.alertDescription}</p> */}
                <img src={p} alt="p" />
                <p>Submitted By {e.userName} </p>
              </div>
              <div className="flex gap-3 mt-2">
                <img src={watch} alt="p" />
                <p>
                  {e.alertDtime} {e.alertDate}
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <img src={Heading} alt="Heading" />
                <p>{formatExpiryDate(e.expireTime)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EmergencyAlerts;
