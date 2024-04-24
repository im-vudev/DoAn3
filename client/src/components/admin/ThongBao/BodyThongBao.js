import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import { createNotice } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { CREATE_NOTICE, SET_ERRORS } from "../../../redux/actionTypes";
import '../ThongBao/ThongBao.css';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

const BodyThongBao = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    date: "",
    noticeFor: "",
    topic: "",
    content: "",
    from: "",
  });
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ date: "", noticeFor: "", topic: "", content: "", from: "" });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createNotice(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.noticeCreated) {
      setLoading(false);
      if (store.admin.noticeCreated) {
        setValue({
          date: "",
          noticeFor: "",
          topic: "",
          content: "",
          from: "",
        });
        dispatch({ type: CREATE_NOTICE, payload: false });
        dispatch({ type: SET_ERRORS, payload: {} });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.noticeCreated]);

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
    navigate("/admin/thongbao");
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item"><a href="#"><b>Thông Báo</b></a></li>
            </ul>
            <div id="clock">{formatDate}</div>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="form-header">
          <EngineeringIcon className="engineering-icon" />
          <h1>Tạo thông báo</h1>
        </div>
        <div className="form-content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-field">
                <h1>Thời gian :</h1>
                <input
                  placeholder="Date"
                  required
                  className="input"
                  type="date"
                  value={value.date}
                  onChange={(e) =>
                    setValue({ ...value, date: e.target.value })
                  }
                />
              </div>

              <div className="form-field">
                <h1>Chủ đề :</h1>
                <input
                  required
                  placeholder="Topic"
                  className="input"
                  type="text"
                  value={value.topic}
                  onChange={(e) =>
                    setValue({ ...value, topic: e.target.value })
                  }
                />
              </div>

              <div className="form-field">
                <h1>Nơi nhận :</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.noticeFor}
                  onChange={(e) =>
                    setValue({ ...value, noticeFor: e.target.value })
                  }
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="all">Tất cả</MenuItem>
                  <MenuItem value="faculty">Khoa</MenuItem>
                  <MenuItem value="student">Sinh viên</MenuItem>
                </Select>
              </div>

              <div className="form-field">
                <h1>Nơi gửi :</h1>
                <input
                  required
                  placeholder="From"
                  className="input"
                  type="text"
                  value={value.from}
                  onChange={(e) =>
                    setValue({ ...value, from: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-field">
                <h1>Nội dung :</h1>
                <textarea
                  rows={10}
                  cols={40}
                  required
                  placeholder="Content...."
                  className="input"
                  value={value.content}
                  onChange={(e) =>
                    setValue({ ...value, content: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="button-container">
              <button className="submit-button" type="submit">
                Tạo
              </button>
              <button
                onClick={() => {
                  setValue({
                    date: "",
                    noticeFor: "",
                    topic: "",
                    content: "",
                    from: "",
                  });
                  setError({});
                }}
                className="clear-button"
                type="button"
              >
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

            <div className="error-container">
              {loading && (
                <Spinner
                  message="Creating Notice"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noticeError || error.backendError) && (
                <p className="error-message">
                  {error.noticeError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

    </>

  );
};

export default BodyThongBao;
