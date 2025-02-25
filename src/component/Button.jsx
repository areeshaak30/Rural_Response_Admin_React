import React from "react";

const Button = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <section className="border rounded-2xl w-[19%]">
        <p className="text-center ml-5 mt-4 font-bold text-[17px] w-[80%]">
          Are you sure you want to logout?
        </p>
        <div className="w-fll">
          <div className="mt-10 mb-4">
            <button className="w-[47%] font-semibold rounded p-[6px] border bg-white text-black mx-[6px]">
              No
            </button>
            <button className="bg-[#3B9F9A] font-semibold rounded text-white p-[6px] w-[47%] ">
              Yes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Button;
