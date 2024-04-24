import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import '../../admin/Department/CSS/BodyAddDepartment.css';
import { useNavigate } from 'react-router-dom';
import { format, set } from "date-fns";
const BodyAddDepartment = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addDepartment({ department }));
    setDepartment("");
  };

  useEffect(() => {
    if (store.errors || store.admin.departmentAdded) {
      setLoading(false);
      if (store.admin.departmentAdded) {
        setDepartment("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_DEPARTMENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.departmentAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const hannds = () => {
    navigate("/admin/getdepartment");
  }

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
              <li className="breadcrumb-item"><a href="#"><b>Bảng thêm phòng ban</b></a></li>
            </ul>
            <div id="clock">{formatDate}</div>
          </div>
        </div>
      </div>
      <div className="department">
        <div className="container-1-2">
          <div className="form">
            <div className="form-header">
              <AddIcon className="icon" style={{ fontSize: '20px' }} />
              <h1 className="form-title">Thêm phòng ban</h1>
            </div>
            <div className="">
              <form className="form-content" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="form-fiel">
                    <div className="">
                      <h1 className="field-label">Phòng ban :</h1>

                      <input
                        placeholder="Phòng ban"
                        required
                        className=""
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="submit-buttons">
                  <button className="submit-button" type="submit">
                    Thêm
                  </button>
                  <button
                    onClick={hannds}
                    className="clear-button"
                    type="button">
                    Thoát
                  </button>
                </div>
                <div className="">
                  {loading && (
                    <Spinner
                      message="Adding Department"
                      height={30}
                      width={150}
                      color="#111111"
                      messageColor="blue"
                    />
                  )}
                  {(error.departmentError || error.backendError) && (
                    <p className="">
                      {error.departmentError || error.backendError}
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

export default BodyAddDepartment;
