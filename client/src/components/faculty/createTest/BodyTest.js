import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../redux/actions/facultyActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_TEST, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import '../../faculty/createTest/text.css';
import { useNavigate } from 'react-router-dom';
import { format, set } from "date-fns";
const BodyTest = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [value, setValue] = useState({
    subjectCode: "",
    section: "",
    year: "",
    test: "",
    totalMarks: "",
    date: "",
    department: user.result.department,
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({
        subjectCode: "",
        section: "",
        year: "",
        test: "",
        totalMarks: "",
        date: "",
        department: user.result.department,
      });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createTest(value));
  };

  useEffect(() => {
    if (store.errors || store.faculty.testAdded) {
      setLoading(false);
      if (store.faculty.testAdded) {
        setValue({
          subjectCode: "",
          section: "",
          year: "",
          test: "",
          totalMarks: "",
          date: "",
          department: user.result.department,
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_TEST, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.testAdded]);

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
    navigate("/faculty/createTest");
  }
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
      <div className="text">
        <div className="container-1-2">
          <div className="form">
            <div className="form-header">
              <AddIcon className="icon" style={{ fontSize: '20px' }} />
              <h1 className="form-title" >Tạo bài kiểm tra</h1>
            </div>
            <div className="">
              <form className="form-content" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="">
                    <div className="form-fiel">
                      <h1 className="field-label">Tên bài kiểm tra :</h1>

                      <input
                        placeholder="Test Name"
                        required
                        className=""
                        type="text"
                        value={value.test}
                        onChange={(e) =>
                          setValue({ ...value, test: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-fiel">
                      <h1 className="field-label">Mã môn học :</h1>

                      <input
                        required
                        placeholder="Subject Code"
                        className=""
                        type="text"
                        value={value.subjectCode}
                        onChange={(e) =>
                          setValue({ ...value, subjectCode: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-fiel">
                      <h1 className="field-label">Phòng ban :</h1>

                      <input
                        required
                        placeholder={user.result.department}
                        disabled
                        className=""
                        type="text"
                        value={user.result.department}
                      />
                    </div>
                    <div className="form-fiel">
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
                  <div className="">
                    <div className="form-fiel">
                      <h1 className="field-label">Tổng số điểm:</h1>

                      <input
                        required
                        placeholder="Total Marks"
                        className=""
                        type="number"
                        value={value.totalMarks}
                        onChange={(e) =>
                          setValue({ ...value, totalMarks: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-fiel">
                      <h1 className="field-label">Thời gian :</h1>

                      <input
                        required
                        className=""
                        type="date"
                        value={value.date}
                        onChange={(e) =>
                          setValue({ ...value, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-fiel">
                      <h1 className="field-label">Section :</h1>
                      <Select
                        required
                        displayEmpty
                        sx={{ height: 36 }}
                        inputProps={{ "aria-label": "Without label" }}
                        value={value.section}
                        onChange={(e) =>
                          setValue({ ...value, section: e.target.value })
                        }>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
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
                        subjectCode: "",
                        section: "",
                        year: "",
                        test: "",
                        totalMarks: "",
                        date: "",
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
                <div className="">
                  {loading && (
                    <Spinner
                      message="Creating Test"
                      height={30}
                      width={150}
                      color="#111111"
                      messageColor="blue"
                    />
                  )}
                  {(error.testError || error.backendError) && (
                    <p className="error-text">
                      {error.testError || error.backendError}
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

export default BodyTest;
