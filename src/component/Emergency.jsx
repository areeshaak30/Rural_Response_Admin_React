import React from 'react'
import threee from "../assets/threee.svg";
import Flag from "../assets/Flag.svg";
import p from "../assets/p.svg";
import watch from "../assets/watch.svg";
import info from "../assets/info.svg";
import Heading from "../assets/Heading.svg";
const Emergency = () => {
  return (
    <>
      <section>
        <div className="flex mb-3 gap-4">
          <article className="flex bg-white border rounded-xl w-[50%]">
            <div>
              <img src={Flag} alt="Flag" />
            </div>
            <div className="px-5 py-3">
              <div className="flex gap-[130px] ">
                <p className=" font-semibold">This is emmmergency</p>
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
                <p className=" font-semibold">Immediate Help Requested</p>
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
                <p className=" font-semibold">Immediate Help Requested</p>
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
                <p className=" font-semibold">Immediate Help Requested</p>
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
    </>
  );
}

export default Emergency