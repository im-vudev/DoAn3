import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const attendance = useSelector((state) => state.student.attendance.result);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const subjects = useSelector((state) => state.admin.subjects.result);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" ">
          <div className="">
            <div className="">
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.noSubjectError && (
                <p className="">
                  {error.noSubjectError}
                </p>
              )}
            </div>
            {!loading &&
              Object.keys(error).length === 0 &&
              subjects?.length !== 0 && (
                <div className={classes.adminData}>
                  <div className="grid grid-cols-8">
                    <h1 className="">
                      Sr no.
                    </h1>
                    <h1 className="">
                      Subject Code
                    </h1>
                    <h1 className="">
                      Subject Name
                    </h1>
                    <h1 className="">
                      Attended
                    </h1>
                    <h1 className="">
                      Total
                    </h1>
                    <h1 className="">
                      Percentage
                    </h1>
                  </div>
                  {attendance?.map((res, idx) => (
                    <div
                      key={idx}
                      className="">
                      <h1
                        className="">
                        {idx + 1}
                      </h1>
                      <h1
                        className="">
                        {res.subjectCode}
                      </h1>
                      <h1
                        className="">
                        {res.subjectName}
                      </h1>
                      <h1
                        className="">
                        {res.attended}
                      </h1>
                      <h1
                        className="">
                        {res.total}
                      </h1>
                      <h1
                        className="">
                        {res.percentage}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
