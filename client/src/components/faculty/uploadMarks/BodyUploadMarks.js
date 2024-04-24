import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, uploadMark } from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { MARKS_UPLOADED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";
import '../../faculty/uploadMarks/CSS/BodyUpdateMarks.css';
import { format, set } from "date-fns";
const BodyUploadMarks = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const tests = store.faculty.tests.result;
  const [marks, setMarks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [value, setValue] = useState({
    department: "",
    year: "",
    section: "",
    test: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
      setValue({ department: "", year: "", section: "", test: "" });
    }
  }, [store.errors]);

  const handleInputChange = (value, _id) => {
    const newMarks = [...marks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setMarks(newMarks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };
  const students = useSelector((state) => state.admin.students.result);

  const uploadMarks = (e) => {
    setError({});
    dispatch(
      uploadMark(marks, value.department, value.section, value.year, value.test)
    );
  };

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    setValue({ ...value, department: user.result.department });
  }, []);

  useEffect(() => {
    if (store.errors || store.faculty.marksUploaded) {
      setLoading(false);
      if (store.faculty.marksUploaded) {
        setValue({ department: "", year: "", test: "", section: "" });
        setSearch(false);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: MARKS_UPLOADED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.marksUploaded]);

  useEffect(() => {
    if (value.year !== "" && value.section !== "") {
      dispatch(getTest(value));
    }
  }, [value.year, value.section]);

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
      <div className="updateMarks">
        <div className="container-4">
          <div className="">
            <div className="title-1">
              <BoyIcon />
              <h5>Tổng số sinh viên</h5>
            </div>
            <div className="form">
              <form
                className="select"
                onSubmit={handleSubmit}>
                <label htmlFor="year">Năm</label>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: 224 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.year}
                  onChange={(e) => setValue({ ...value, year: e.target.value })}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                </Select>
                <label htmlFor="section">Section</label>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: 224 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.section}
                  onChange={(e) => setValue({ ...value, section: e.target.value })}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Select>
                <label htmlFor="year">Bài kiểm tra</label>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: 224 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.test}
                  onChange={(e) => setValue({ ...value, test: e.target.value })}>
                  <MenuItem value="">None</MenuItem>
                  {tests?.map((test, idx) => (
                    <MenuItem value={test.test} key={idx}>
                      {test.test}
                    </MenuItem>
                  ))}
                </Select>
                <button
                  className="search-button"
                  type="submit">
                  Tìm kiếm
                </button>
              </form>
              <div className="faculty-list">
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
                  {(error.noStudentError || error.backendError) && (
                    <p className="error-message">
                      {error.noStudentError || error.backendError}
                    </p>
                  )}
                </div>
                {search &&
                  !loading &&
                  Object.keys(error).length === 0 &&
                  students?.length !== 0 && (
                    <div className="container-5">
                      <table>
                        <thead>
                          <tr>
                            <th>Sr no.</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Section</th>
                            <th>Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students?.map((stu, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{stu.name}</td>
                              <td>{stu.username}</td>
                              <td>{stu.section}</td>
                              <td>
                                <input
                                  onChange={(e) =>
                                    handleInputChange(e.target.value, stu._id)
                                  }
                                  value={stu.marks}
                                  className="iput"
                                  type="text"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                {search && Object.keys(error).length === 0 && (
                  <div className="delete-button-container">
                    <button
                      onClick={uploadMarks}
                      className="upload-button">
                      Upload
                    </button>
                  </div>
                )}
                {(error.examError || error.backendError) && (
                  <p className="">
                    {error.examError || error.backendError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BodyUploadMarks;
