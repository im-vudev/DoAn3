import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { format, set } from "date-fns";
import { useNavigate } from "react-router-dom";
import '../../../components/admin/Subject/CSS/BodyGetSubject.css';

const BodyGetSubject = () => {
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
    dispatch(getSubject(value));
  };
  const subjects = useSelector((state) => state.admin.subjects.result);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

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


  const dltStudent = async (e) => {
    setError({});
    setLoading(true);

    try {
      await dispatch(deleteSubject(checkedValue));
      dispatch(getSubject({ value })); // Truyền giá trị vào payload của action
    } catch (error) {
      console.error("Error deleting Subject:", error);
      // Xử lý lỗi tại đây (hiển thị thông báo lỗi, vv...)
    }
  };

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/admin/addsubject");
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
      <div className="subject">
        <div className="container-4">
          <div className="">
            <div className="title-1">
              <MenuBookIcon />
              <h5>Tổng số môn học</h5>
            </div>
            <div className="add-button-container">
              <button onClick={handleAddButtonClick} className="add-button">Thêm</button> {/* Nút "Thêm" */}
            </div>
            <div className="form">
              <form
                className="select"
                onSubmit={handleSubmit}>
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
                  {(error.noSubjectError || error.backendError) && (
                    <p className="error-message">
                      {error.noSubjectError || error.backendError}
                    </p>
                  )}
                </div>
                {search &&
                  !loading &&
                  Object.keys(error).length === 0 &&
                  subjects?.length !== 0 && (
                    <div className="container-5">
                      <table>
                        <thead>
                          <tr>
                            <th>Select</th>
                            <th>Sr no.</th>
                            <th>Subject Code</th>
                            <th>Subject Name</th>
                            <th>Total Lectures</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects?.map((sub, idx) => (
                            <tr key={idx}>
                              <td>
                                <input
                                  onChange={handleInputChange}
                                  value={sub._id}
                                  className=""
                                  type="checkbox"
                                />
                              </td>
                              <td>{idx + 1}</td>
                              <td>{sub.subjectCode}</td>
                              <td>{sub.subjectName}</td>
                              <td>{sub.totalLectures}</td>
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
      </div>

    </>
  );
};

export default BodyGetSubject;
