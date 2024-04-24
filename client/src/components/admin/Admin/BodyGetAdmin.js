import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, deleteAdmin } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";
import { useNavigate } from "react-router-dom";
import '../../admin/Admin/CSS/BodyGetAdmin.css';
import { format, set } from "date-fns";

const BodyGetAdmin = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [checkedValue, setCheckedValue] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [value, setValue] = useState({
    department: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getAdmin(value));
  };
  const students = useSelector((state) => state.admin.students.result);

  const dltAdmin = (e) => {
    setError({});
    setLoading(true);
    dispatch(deleteAdmin(checkedValue));
  };

  useEffect(() => {
    if (store.admin.adminDeleted) {
      setValue({ department: "", year: "" });
      setLoading(false);
      setSearch(false);
      dispatch({ type: DELETE_ADMIN, payload: false });
    }
  }, [store.admin.adminDeleted]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/admin/addadmin");
  };


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
      <div className="admins">
        <div className="container-4">
          <div className="">
            <div className="title-1">
              <DeleteIcon />
              <h5>Tất cả quản trị viên</h5>
            </div>
            <div className="add-button-container">
              <button onClick={handleAddButtonClick} className="add-button">Thêm</button> {/* Nút "Thêm" */}
            </div>
            <div className="form">
              <form
                className="select"
                onSubmit={handleSubmit}>
                <label htmlFor="department">Phòng Ban</label>
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

                <button
                  className="search-button"
                  type="submit">
                  Tìm Kiếm...
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
                  {(error.noAdminError || error.backendError) && (
                    <p className="error-message ">
                      {error.noAdminError || error.backendError}
                    </p>
                  )}
                </div>
                {search &&
                  !loading &&
                  Object.keys(error).length === 0 &&
                  students?.length !== 0 && (
                    <div className="container-5">
                      <table>
                        <thead className="">
                          <tr>
                            <th>Select</th>
                            <th>Sr no.</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students?.map((adm, idx) => (
                            <tr key={idx}>
                              <td>
                                <input
                                  onChange={handleInputChange}
                                  value={adm._id}
                                  className=""
                                  type="checkbox"
                                />
                              </td>
                              <td>{idx + 1}</td>
                              <td>{adm.name}</td>
                              <td>{adm.username}</td>
                              <td>{adm.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                {search && Object.keys(error).length === 0 && (
                  <div className="delete-button-container">
                    <button
                      onClick={dltAdmin}
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

export default BodyGetAdmin;
