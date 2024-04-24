import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { getTestResult } from "../../../redux/actions/studentActions";
import '../../student/testResult/CSS/BodyTestResult.css';
import { format, set } from "date-fns";

const BodyTestResult = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const testResult = useSelector((state) => state.student.testResult.result);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  const [search, setSearch] = useState(false);

  console.log(error);
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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = format(currentTime, "EEEE, dd/MM/yyyy - HH 'giờ' mm 'phút' ss 'giây'");

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item"><a href="#"><b>Bảng điều khiển</b></a></li>
            </ul>
            <div id="clock">{formatDate}</div>
          </div>
        </div>
      </div>
      <div className="testResult">
        <div className="container-4">
          <div className="">
            <MenuBookIcon />
            <h4>Tổng môn học</h4>
          </div>
          <div className="faculty-list">
            <div className="faculty-row">
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
                <div className="container-5">
                  <table>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã môn học</th>
                        <th>Tên môn học</th>
                        <th>Bài kiểm tra</th>
                        <th>Điểm</th>
                        <th>Tổng điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testResult?.map((res, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{res.subjectCode}</td>
                          <td>{res.subjectName}</td>
                          <td>{res.test}</td>
                          <td>{res.marks}</td>
                          <td>{res.totalMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyTestResult;
