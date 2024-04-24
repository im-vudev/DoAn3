import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartment,
  getAllDepartment,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { DELETE_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
import { useNavigate } from "react-router-dom";
import { format, set } from "date-fns";
import '../../admin/Department/CSS/BodyGetDepartment.css';
const BodyGetDepartment = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError({});
    dispatch(deleteDepartment({ department }));
  };
  const faculties = useSelector((state) => state.admin.faculties.result);

  useEffect(() => {
    if (store.admin.departmentDeleted) {
      setLoading(false);
      setDepartment("");
      dispatch(getAllDepartment());
      dispatch({ type: DELETE_DEPARTMENT, payload: false });
    }
  }, [store.admin.departmentDeleted]);
  useEffect(() => {
    if (faculties?.length !== 0) {
      setLoading(false);
    }
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);


  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/admin/adddepartment");
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
      <div className="departments">
        <div className="container-4">
          <div className="">
            <div className="title-1">
              <EngineeringIcon />
              <h4>Xóa phòng ban</h4>
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
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  {departments?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.department}>
                      {dp.department}
                    </MenuItem>
                  ))}
                </Select>
                <button
                  className="delete-button"
                  type="submit">
                  Xóa
                </button>
              </form>
              <div className="faculty-list">
                <div className="">
                  {loading && (
                    <Spinner
                      message="Deleting"
                      height={50}
                      width={150}
                      color="#111111"
                      messageColor="blue"
                    />
                  )}
                  {(error.noFacultyError || error.backendError) && (
                    <p className="error-message">
                      {error.noFacultyError || error.backendError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BodyGetDepartment;
