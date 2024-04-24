import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getStudent } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { SET_ERRORS } from "../../../redux/actionTypes";
import '../../admin/Student/CSS/GetStudent.css';
import { format, set } from "date-fns";
import { useNavigate } from "react-router-dom";
const BodyGetStudent = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkedValue, setCheckedValue] = useState([]);
  const [value, setValue] = useState({
    department: "",
    year: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };
  const students = useSelector((state) => state.admin.students.result);

  const handleInputChange = (e) => {
    const tempCheck = checkedValue;
    let index;
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };


  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = format(currentTime, "EEEE, dd/MM/yyyy - HH 'giờ' mm 'phút' ss 'giây'");


  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/admin/addstudent");
  };



  const dltStudent = async (e) => {
    setError({});
    setLoading(true);

    try {
      await dispatch(deleteStudent(checkedValue));
      dispatch(getStudent({ value })); // Truyền giá trị vào payload của action
    } catch (error) {
      console.error("Error deleting Student:", error);
      // Xử lý lỗi tại đây (hiển thị thông báo lỗi, vv...)
    }
  };


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
      <div className="student">
        <div className="container-4">
          <div className="title-1">
            <BoyIcon />
            <h5>Tổng số sinh viên</h5>
          </div>
          <div className="add-button-container">
            <button onClick={handleAddButtonClick} className="add-button">Thêm</button> {/* Nút "Thêm" */}
          </div>
          <div className="form">
            <form className="select" onSubmit={handleSubmit}>
              <label htmlFor="department">Phòng ban</label>
              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 224 }}
                inputProps={{ "aria-label": "Without label" }}
                value={value.department}
                onChange={(e) =>
                  setValue({ ...value, department: e.target.value })
                }>
                <MenuItem value="">None</MenuItem>
                {departments?.map((dp, idx) => (
                  <MenuItem key={idx} value={dp.department}>
                    {dp.department}
                  </MenuItem>
                ))}
              </Select>
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
              <button className="search-button" type="submit">
                Tìm kiếm
              </button>
            </form>
            <div className="faculty-list">
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
                <p className="error-message ">
                  {error.noStudentError || error.backendError}
                </p>
              )}
              {search &&
                !loading &&
                Object.keys(error).length === 0 &&
                students?.length !== 0 && (
                  <div className="container-5">
                    <table>
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Sr no.</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>section</th>
                          <th>batch</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students?.map((stu, idx) => (
                          <tr key={idx}>
                            <td>
                              <input
                                onChange={handleInputChange}
                                value={stu._id}
                                className=""
                                type="checkbox"
                              />
                            </td>
                            <td>{idx + 1}</td>
                            <td>{stu.name}</td>
                            <td>{stu.username}</td>
                            <td>{stu.email}</td>
                            <td>{stu.section}</td>
                            <td>{stu.batch}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              {search && Object.keys(error).length === 0 && (
                <div className="delete-button-container">
                  <button
                    onClick={dltStudent}
                    className="delete-button">
                    Xóa
                  </button>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BodyGetStudent;
