import React, { useEffect, useState } from "react";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../../../redux/actions/studentActions";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../../utils/Spinner";
import { SET_ERRORS } from "../../../../redux/actionTypes";
import * as classes from "../../../../utils/styles";
import { format } from "date-fns";
import '../update/update.css';
import '../../../../CSS/main.css';
import '../../../../ThongBao/ThongBao.js';
import '../../../../ThongBao/ThongBao.css';

const BodyUpdate = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: user.result.email,
    department: "",
    contactNumber: "",
    avatar: "",
    batch: "",
    year: "",
    motherName: "",
    fatherName: "",
    fatherContactNumber: "",
    section: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    if (
      value.name === "" &&
      value.dob === "" &&
      value.department === "" &&
      value.contactNumber === "" &&
      value.avatar === "" &&
      value.batch === "" &&
      value.year === "" &&
      value.motherName === "" &&
      value.fatherName === "" &&
      value.fatherContactNumber === "" &&
      value.section === ""
    ) {
      alert("Enter atleast one value");
      setLoading(false);
    } else {
      dispatch(updateStudent(value));
      alert("Kindly login again to see updates");
    }
  };

  useEffect(() => {
    if (store.errors || store.student.updatedStudent) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [store.errors, store.student.updatedStudent]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

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
      <div className="container-2">
        <div class=" row backroi">
          <div class="col-md-12 ">
            <div
              onClick={() => navigate("/student/update/password")}
              className="profileleft">
              <SecurityUpdateIcon />
              <h1 className="profile">Password</h1>
            </div>
            <div class="row align-items-center justify-content-center">
              <form className={classes.adminForm0} onSubmit={handleSubmit}>
                <div class="row custom-cols">
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Họ và Tên</h6>
                      <div>
                        <input
                          placeholder={user.result?.name}
                          className={classes.adminInput}
                          type="text"
                          value={value.name}
                          onChange={(e) =>
                            setValue({ ...value, name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Ngày sinh :</h6>
                      <div>
                        <input
                          placeholder={user.result?.dob}

                          className={classes.adminInput}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Email :</h6>
                      <div>
                        <input
                          placeholder={user.result?.email}

                          className={classes.adminInput}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Batch :</h6>
                      <div>
                        <input
                          placeholder={user.result?.batch}
                          className={classes.adminInput}
                          value={value.batch}
                          onChange={(e) =>
                            setValue({ ...value, batch: e.target.value })
                          }
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Họ tên ba :</h6>
                      <div>
                        <input
                          placeholder={user.result?.fatherName}
                          className={classes.adminInput}
                          value={value.fatherName}
                          onChange={(e) =>
                            setValue({ ...value, fatherName: e.target.value })
                          }
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Họ tên mẹ :</h6>
                      <div>
                        <input
                          placeholder={user.result?.motherName}
                          className={classes.adminInput}
                          value={value.motherName}
                          onChange={(e) =>
                            setValue({ ...value, motherName: e.target.value })
                          }
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Phòng ban :</h6>
                      <div>
                        <Select
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
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Liên hệ :</h6>
                      <div>
                        <input
                          placeholder={user.result?.contactNumber}
                          className={classes.adminInput}
                          type="text"
                          value={value.contactNumber}
                          onChange={(e) =>
                            setValue({ ...value, contactNumber: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Năm :</h6>
                      <div>
                        <input
                          placeholder={user.result?.year}
                          className={classes.adminInput}
                          type="text"
                          value={value.year}
                          onChange={(e) =>
                            setValue({ ...value, year: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">Section :</h6>
                      <div>
                        <input
                          placeholder={user.result?.section}
                          className={classes.adminInput}
                          type="text"
                          value={value.section}
                          onChange={(e) =>
                            setValue({ ...value, section: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">SDT ba :</h6>
                      <div>
                        <input
                          placeholder={user.result?.fatherContactNumber}
                          className={classes.adminInput}
                          value={value.fatherContactNumber}
                          onChange={(e) =>
                            setValue({
                              ...value,
                              fatherContactNumber: e.target.value,
                            })
                          }
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="app-title" style={{ marginLeft: "37px", marginRight: '40px' }}>
                      <h6 className="Th6">SDT mẹ :</h6>
                      <div>
                        <input
                          placeholder={user.result?.motherContactNumber}
                          className={classes.adminInput}
                          value={value.motherContactNumber}
                          onChange={(e) =>
                            setValue({
                              ...value,
                              motherContactNumber: e.target.value,
                            })
                          }
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div className="app-title" >
                      <h6 className="Th6">Avatar :</h6>
                      <div className="avata">
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setValue({ ...value, avatar: base64 })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <button className="submit-button" type="submit">
                    Cập nhật
                  </button>

                  <button
                    onClick={() => navigate("/student/profile")}
                    className="cancel-button"
                    type="button">
                    Thoát
                  </button>
                </div>

                <div className={classes.loadingAndError}>
                  {loading && (
                    <Spinner
                      message="Updating"
                      height={30}
                      width={150}
                      color="#111111"
                      messageColor="blue"
                    />
                  )}
                  {error.backendError && (
                    <p className="text-red-500">{error.backendError}</p>
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

export default BodyUpdate;
