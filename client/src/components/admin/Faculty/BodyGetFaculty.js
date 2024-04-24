import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaculty, getFaculty } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { DELETE_FACULTY, SET_ERRORS } from "../../../redux/actionTypes";
import '../../../components/admin/Faculty/CSS/GetFaculty.css';
import { format, set } from "date-fns";
import { useNavigate } from "react-router-dom";


const BodyGetFaculty = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkedValue, setCheckedValue] = useState([]);

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
    dispatch(getFaculty({ department }));
  };
  const faculties = useSelector((state) => state.admin.faculties.result);

  const dltFaculty = async (e) => {
    setError({});
    setLoading(true);
    try {
      await dispatch(deleteFaculty(checkedValue));

      dispatch(getFaculty({ department }));
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  useEffect(() => {
    if (faculties?.length !== 0) {
      setLoading(false);
    }
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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


  const formatDate = format(currentTime, "EEEE, dd/MM/yyyy - HH 'giờ' mm 'phút' ss 'giây'");

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/admin/addfaculty");
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
      <div class="container-4">
        <div class="title-1">
          <EngineeringIcon class="icon" />
          <h5>Tổng số khoa</h5>
        </div>
        <div className="add-button-container">
          <button onClick={handleAddButtonClick} className="add-button">Thêm</button> {/* Nút "Thêm" */}
        </div>
        <div class="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="department">Phòng ban</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="select"
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <button className="search-button" type="submit">Tìm Kiếm</button>
          </form>
        </div>
        <div class="faculty-list">
          {loading && (
            <Spinner
              message="Loading"
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
          {search &&
            !loading &&
            Object.keys(error).length === 0 &&
            faculties?.length !== 0 && (
              <div className="container-5">
                <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Sr no.</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculties?.map((fac, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            onChange={handleInputChange}
                            value={fac._id}
                            className=""
                            type="checkbox"
                          />
                        </td>
                        <td>{idx + 1}</td>
                        <td>{fac.name}</td>
                        <td>{fac.username}</td>
                        <td>{fac.email}</td>
                        <td>{fac.designation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          {search && Object.keys(error).length === 0 && (
            <div className="delete-button-container">
              <button
                onClick={dltFaculty}
                className="delete-button">
                Xóa
              </button>
            </div>
          )}{" "}
        </div>
      </div>

    </>

  );
};

export default BodyGetFaculty;
