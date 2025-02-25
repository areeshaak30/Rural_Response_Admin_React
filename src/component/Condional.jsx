import { useState } from "react";

const Condional = () => {
    const [activeContent, setActiveContent] = useState("block"); // Initialize activeContent with "block"

    const handleClick = (content) => {
      setActiveContent(content);
    };

  return (
    <div>
      <button
        onClick={() => handleClick("block")}
        className={`font-medium rounded-lg px-4 py-[6px] ${
          activeContent === "block"
            ? "bg-[#093C84] text-white"
            : "bg-slate-200 text-[#093C84]"
        }`}
      >
        hello{" "}
      </button>
      <button
        onClick={() => handleClick("add")}
        className={`font-medium rounded-lg px-4 py-[6px] ${
          activeContent === "add"
            ? "bg-[#093C84] text-white"
            : "bg-slate-200 text-[#093C84]"
        }`}
      >
        Contractors
      </button>
      <button
        onClick={() => handleClick("edit")}
        className={`font-medium rounded-lg px-8 py-[6px] 
              ${
                activeContent === "edit"
                  ? "bg-[#093C84] text-white"
                  : "bg-slate-200 text-[#093C84]"
              }`}
      >
        Designers
      </button>
      {activeContent === "block" && <div>hello </div>}{" "}
      {/* Render HomeOwner component when activeContent is "block" */}
      {activeContent === "add" && <div>hello world </div>}{" "}
      {/* Render Contractors component when activeContent is "add" */}
      {activeContent === "edit" && <div>hello world333 </div>}{" "}
    </div>
  );
}

export default Condional