import React from "react";
import Header from "../../../Header";
import Sidebar from "../../../Sidebar";
import Body from "./BodyPassword";

const Password = () => {
  return (
    <div className="bg-[#d6d9e0] min-h-screen flex flex-col">
      <div className="flex flex-col  bg-[#f4f6fa] flex-grow rounded-2xl shadow-2xl space-y-6 ">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Password;
