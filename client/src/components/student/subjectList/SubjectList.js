import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubject } from "../../../redux/actions/studentActions";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const SubjectList = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubject(user.result.department, user.result.year));
  }, [dispatch]);
  return (
    <div className="bg-[#d6d9e0] min-h-screen flex flex-col">
      <div className="flex flex-col  bg-[#f4f6fa] flex-grow rounded-2xl shadow-2xl space-y-6 overflow-y-hidden">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
