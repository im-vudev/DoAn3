import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import '../../admin/Subject/CSS/BodyAddSubject.css';
import { format, set } from "date-fns";
import { useNavigate } from 'react-router-dom';
const BodyAddSubject = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [value, setValue] = useState({
    subjectName: "",
    subjectCode: "",
    year: "",
    totalLectures: "",
    department: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({
        subjectName: "",
        subjectCode: "",
        year: "",
        totalLectures: "",
        department: "",
      });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addSubject(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.subjectAdded) {
      setLoading(false);
      if (store.admin.subjectAdded) {
        setValue({
          subjectName: "",
          subjectCode: "",
          year: "",
          totalLectures: "",
          department: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_SUBJECT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.subjectAdded]);

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

  const hannds = () => {
    navigate("/admin/getsubject");
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item"><a href="#"><b>Bảng thêm môn học</b></a></li>
            </ul>
            <div id="clock">{formatDate}</div>
          </div>
        </div>
      </div>
      <div className="subjects">
        <div className="container-1-2">
          <div className="form">
            <div className="form-header">
              <AddIcon className="icon" />
              <h1 className="form-title">Thêm môn học</h1>
            </div>
            <div className="">
              <form className="form-content" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="form-field">
                    <div className="">
                      <h1 className="field-label">Tên môn học :</h1>
                      <input
                        placeholder="Subject Name"
                        required
                        className="input"
                        type="text"
                        value={value.subjectName}
                        onChange={(e) =>
                          setValue({ ...value, subjectName: e.target.value })
                        }
                      />
                    </div>

                    <div className="">
                      <h1 className="field-label">Mã môn học :</h1>

                      <input
                        required
                        placeholder="Subject Code"
                        className="input"
                        type="text"
                        value={value.subjectCode}
                        onChange={(e) =>
                          setValue({ ...value, subjectCode: e.target.value })
                        }
                      />
                    </div>

                    <div className="">
                      <h1 className="field-label">Năm :</h1>
                      <Select
                        required
                        displayEmpty
                        sx={{ height: 36 }}
                        inputProps={{ "aria-label": "Without label" }}
                        value={value.year}
                        onChange={(e) =>
                          setValue({ ...value, year: e.target.value })
                        }>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-field">
                      <h1 className="field-label">Tổng tín chỉ :</h1>

                      <input
                        required
                        placeholder="Total Lectures"
                        className=""
                        type="number"
                        value={value.totalLectures}
                        onChange={(e) =>
                          setValue({ ...value, totalLectures: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-field">
                      <h1 className="field-label">Phòng ban :</h1>
                      <Select
                        required
                        displayEmpty
                        sx={{ height: 36 }}
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
                    </div>
                  </div>
                </div>
                <div className="submit-buttons">
                  <button className="submit-button" type="submit">
                    Thêm
                  </button>
                  <button
                    onClick={() => {
                      setValue({
                        subjectName: "",
                        subjectCode: "",
                        year: "",
                        totalLectures: "",
                        department: "",
                      });
                      setError({});
                    }}
                    className="clear-button"
                    type="button">
                    Xóa
                  </button>
                  <button
                    onClick={hannds}
                    className="clear-button"
                    type="button"
                  >
                    Thoát
                  </button>
                </div>
                <div className="error-message">
                  {loading && (
                    <Spinner
                      message="Adding Subject"
                      height={30}
                      width={150}
                      color="#111111"
                      messageColor="blue"
                    />
                  )}
                  {(error.subjectError || error.backendError) && (
                    <p className="error-text">
                      {error.subjectError || error.backendError}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyAddSubject;
