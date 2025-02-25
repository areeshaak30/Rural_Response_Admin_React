import React, { useState } from "react";
import threee from "../assets/threee.svg";
import Sidebar from "./Sidebar";
import arrow from "../assets/arrow.svg";
import Flag from "../assets/Flag.svg";
import p from "../assets/p.svg";
import Emergency from "./Emergency";
import watch from "../assets/watch.svg";
import info from "../assets/info.svg";
import All from "../assets/All.svg";
import Heading from "../assets/Heading.svg";
const Alerts = () => {
  const [activeContent, setActiveContent] = useState("Information"); // Initialize activeContent with "block"
  const [dataa, setdataa] = useState(false);
  const handleclicka = () => {
    setdataa(!dataa);
  };
  const [data, setdata] = useState(false);
  const handleclick = () => {
    setdata(!data);
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
              <p className="w-[56%] text-[20px] text-center font-semibold">
                 Alerts
              </p>
              <img
                src={arrow}
                alt="arrow"
                className="absolute  left-[16%] top-5"
              />

              <form
                action=""
                className="w-[73%] relative flex gap-4 text-end  justify-end mr-8"
              >
                <input
                  type="text"
                  className="border rounded pl-4 p-1 w-[11%] text-[12px]"
                  placeholder="Active"
                />
                <img
                  src={All}
                  alt=""
                  className="absolute top-[8px] h-[13px] pr-2"
                  onClick={() => handleclicka()}
                />
                {dataa ? (
                  <div className=" bg-white font-normal absolute text-[12px] shadow-xl border  rounded  w-[11%] left-[89%] mt-[3%] ">
                    <div className="hover:bg-[#F6F6F6] ">
                      <p className="text-start pl-3 mb-1 p-2 ">Active</p>
                    </div>
                    <p className=" text-start p-[6px] mb-1 pl-3  hover:bg-[#F6F6F6]">
                      Deactivate
                    </p>
                  </div>
                ) : null}
              </form>
            </div>
            <div className="flex">
              <div className="w-[15%]">
                <Sidebar />
              </div>
              <div className="w-[85%] mt-2  bg-slate-50 px-8">
                <div className="  my-4 text-end  ">
                  <button
                    onClick={() => handleClick("Information")}
                    className={` w-[12%] font-semibold text-black text-[14px] p-[9px]
                     mr-3 ${
                       activeContent === "Information"
                         ? "bg-[#3B9F9A] text-white"
                         : "bg-white text-[black]"
                     }`}
                  >
                    Informational
                  </button>
                  <button
                    className={` w-[12%] font-semibold text-black text-[14px] p-[9px]
                       ${
                         activeContent === "Emergency"
                           ? "bg-[#3B9F9A] text-white"
                           : "bg-white text-[black]"
                       }`}
                    onClick={() => handleClick("Emergency")}
                  >
                    Emergency
                  </button>
                </div>
                {activeContent === "Information" && (
                  <section>
                    <div className="flex mb-3 gap-4">
                      <article className="flex bg-white border rounded-xl w-[50%]">
                        <div>
                          <img src={Flag} alt="Flag" />
                        </div>
                        <div className="px-5 py-3">
                          <div className="flex gap-[130px] ">
                            <p className=" font-semibold">
                              Immediate Help Requested
                            </p>
                            <img
                              src={threee}
                              alt="three"
                              onClick={() => handleclick()}
                            />
                          </div>
                          {data ? (
                            <div className=" bg-white font-normal absolute text-[12px] shadow-xl border  rounded  w-[8%]  left-[47%] mt-[2px] ">
                              <div className="hover:bg-[#F6F6F6] ">
                                <p className="text-start pl-3 mb-1 p-2 ">
                                  Delete
                                </p>
                              </div>
                              <p className=" text-start p-[6px] mb-1 pl-3  hover:bg-[#F6F6F6]">
                                Deactivate
                              </p>
                            </div>
                          ) : null}
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="p" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="p" />
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
                            <p className=" font-semibold">
                              Immediate Help Requested
                            </p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="p" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="p" />
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
                            <p className=" font-semibold">
                              Immediate Help Requested
                            </p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="p" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="p" />
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
                            <p className=" font-semibold">
                              Immediate Help Requested
                            </p>
                            <img src={threee} alt="three" />
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={p} alt="p" />
                            <p> Submitted By John Doe </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={watch} alt="p" />
                            <p> 10:46 yyy/mm/dd </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <img src={info} alt="p" />
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
                {activeContent === "Emergency" && (
                  <Emergency/>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Alerts;
