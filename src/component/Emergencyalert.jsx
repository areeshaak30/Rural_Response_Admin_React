import React, { useState } from "react";
import threee from "../assets/threee.svg";
import Sidebar from "./Sidebar";
import arrow from "../assets/arrow.svg";
import Flag from "../assets/Flag.svg";
import p from "../assets/p.svg";
import watch from "../assets/watch.svg";
import info from "../assets/info.svg";

import Heading from "../assets/Heading.svg";
const Emergencyalert = () => {
  const [activeContent, setActiveContent] = useState("Information");
  const [showInformation, setShowInformation] = useState(true);
  const [showEmergency, setShowEmergency] = useState(true);

  const toggleInformation = () => {
    setShowInformation(!showInformation);
    setActiveContent("Information");
  };

  const toggleEmergency = () => {
    setShowEmergency(!showEmergency);
    setActiveContent("Emergency");
  };

  const handleClick = (content) => {
    setActiveContent(content);
  };

  return (
    <>
      <section className="">
        <div>
          <div>
            <div className="flex justify-between mt-3">
              <p className="w-[39%] text-[20px] text-end font-semibold">
                Informational Alerts
              </p>
              <img
                src={arrow}
                alt="arrow"
                className="absolute left-[16%] top-5"
              />

              <form
                action=""
                className="w-[73%] relative flex gap-4 text-end  justify-end mr-8"
              >
                <input
                  type="text"
                  className="border pl-4 p-2 w-[13%] text-[12px]"
                  placeholder="Active"
                />
              </form>
            </div>
            <div className="flex">
              <div className="w-[15%]">
                <Sidebar />
              </div>
              <div className="w-[85%] mt-2  bg-slate-50 px-8">
                <div className="  my-4 text-end  ">
                  <button
                    onClick={toggleInformation}
                    className={`w-[12%] font-semibold text-[14px] p-[9px] mr-3 ${showInformation ? "bg-[#3B9F9A] text-white" : "bg-white text-black"}`}
                  >
                    Informational
                  </button>
                  <button
                    onClick={toggleEmergency}
                    className={`w-[12%] font-semibold text-[14px] p-[9px] ${showEmergency ? "bg-[#3B9F9A] text-white" : "bg-white text-black"}`}
                  >
                    Emergency
                  </button>
                </div>
                {showInformation && activeContent === "Information" && (
                  <section>
                    <div className="flex mb-3 gap-4">
                      <article className="flex bg-white border rounded-xl w-[50%]">
                        <div>
                          <img src={Flag} alt="Flag" />
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex gap-[130px] ">
                            <p className="font-semibold">Immediate Help Requested</p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="watch" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="info" />
                            <p> 3.1 Miles from your location </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={Heading} alt="Heading" />
                            <p> Heading Nw </p>
                          </div>
                        </div>
                      </article>
                      <article className="flex bg-white border rounded-xl w-[50%]">
                        <div>
                          <img src={Flag} alt="Flag" />
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex gap-[130px] ">
                            <p className="font-semibold">Immediate Help Requested</p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="watch" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="info" />
                            <p> 3.1 Miles from your location </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={Heading} alt="Heading" />
                            <p> Heading Nw </p>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="flex gap-4">
                      <article className="flex bg-white border rounded-xl w-[50%]">
                        <div>
                          <img src={Flag} alt="Flag" />
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex gap-[130px] ">
                            <p className="font-semibold">Immediate Help Requested</p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="watch" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="info" />
                            <p> 3.1 Miles from your location </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={Heading} alt="Heading" />
                            <p> Heading Nw </p>
                          </div>
                        </div>
                      </article>
                      <article className="flex bg-white border rounded-xl w-[50%]">
                        <div>
                          <img src={Flag} alt="Flag" />
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex gap-[130px] ">
                            <p className="font-semibold">Immediate Help Requested</p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="watch" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="info" />
                            <p> 3.1 Miles from your location </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={Heading} alt="Heading" />
                            <p> Heading Nw </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </section>
                )}

                {showEmergency && activeContent === "Emergency" && (
                  <section>
                    <div className="flex mb-3 gap-4">
                      <article className="flex bg-white border rounded-xl w-[50%]">
                        <div>
                          <img src={Flag} alt="Flag" />
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex gap-[130px] ">
                            <p className="font-semibold">Immediate Help Requested</p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="watch" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="info" />
                            <p> 3.1 Miles from your location </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={Heading} alt="Heading" />
                            <p> Heading Nw </p>
                          </div>
                        </div>
                      </article>
                      <article className="flex bg-white border rounded-xl w-[50%]">
                        <div>
                          <img src={Flag} alt="Flag" />
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex gap-[130px] ">
                            <p className="font-semibold">Immediate Help Requested</p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="watch" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="info" />
                            <p> 3.1 Miles from your location </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={Heading} alt="Heading" />
                            <p> Heading Nw </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default Emergencyalert;
