import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addAdmin } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { ADD_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";
import { useNavigate } from 'react-router-dom';
import '../../admin/Admin/CSS/BodyAddAdmin.css';

import { format, set } from "date-fns";

const BodyAddAdmin = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const departments = useSelector((state) => state.admin.allDepartment);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();
    const [value, setValue] = useState({
        name: "",
        dob: "",
        email: "",
        department: "",
        contactNumber: "",
        avatar: "",
        joiningYear: Date().split(" ")[3],
    });
    useEffect(() => {
        if (Object.keys(store.errors).length !== 0) {
            setError(store.errors);
            setValue({ ...value, email: "" });
        }
    }, [store.errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({});
        setLoading(true);
        dispatch(addAdmin(value));
    };

    useEffect(() => {
        if (store.errors || store.admin.adminAdded) {
            setLoading(false);
            if (store.admin.adminAdded) {
                setValue({
                    name: "",
                    dob: "",
                    email: "",
                    department: "",
                    contactNumber: "",
                    avatar: "",
                    joiningYear: Date().split(" ")[3],
                    password: "",
                    username: "",
                });
                dispatch({ type: SET_ERRORS, payload: {} });
                dispatch({ type: ADD_ADMIN, payload: false });
            }
        } else {
            setLoading(true);
        }
    }, [store.errors, store.admin.adminAdded]);

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
        navigate("/admin/getadmin");
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="app-title">
                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item"><a href="#"><b>Bảng thêm quản trị viên</b></a></li>
                        </ul>
                        <div id="clock">{formatDate}</div>
                    </div>
                </div>
            </div>
            <div className="adminss">
                <div className="container-1-2">
                    <div className="form">
                        <div className="form-header">
                            <EngineeringIcon className="icon" style={{ fontSize: '20px' }} />
                            <h1 className="form-title">Thêm quản trị viên</h1>
                        </div>
                        <div className="">
                            <form className="form-content" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="form-fiel">
                                        <div className="">
                                            <h1 className="field-label">Họ và tên :</h1>

                                            <input
                                                placeholder="Full Name"
                                                required
                                                className=""
                                                type="text"
                                                value={value.name}
                                                onChange={(e) =>
                                                    setValue({ ...value, name: e.target.value })
                                                }
                                            />
                                        </div>

                                        <div className="">
                                            <h1 className="field-label">Ngày Sinh :</h1>

                                            <input
                                                placeholder="DD/MM/YYYY"
                                                className=""
                                                required
                                                type="date"
                                                value={value.dob}
                                                onChange={(e) =>
                                                    setValue({ ...value, dob: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <h1 className="field-label">Email :</h1>

                                            <input
                                                placeholder="Email"
                                                required
                                                className=""
                                                type="email"
                                                value={value.email}
                                                onChange={(e) =>
                                                    setValue({ ...value, email: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-fiel">
                                        <div className="">
                                            <h1 className="field-label">Phòng Ban :</h1>
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
                                        <div className="">
                                            <h1 className="field-label">Liên Hệ :</h1>

                                            <input
                                                required
                                                placeholder="Contact Number"
                                                className=""
                                                type="number"
                                                value={value.contactNumber}
                                                onChange={(e) =>
                                                    setValue({ ...value, contactNumber: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <h1 className="field-label">Avatar :</h1>

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
                                <div className="submit-buttons">
                                    <button className="submit-button" type="submit">
                                        Thêm
                                    </button>
                                    {/* <button
                                onClick={() => {
                                setValue({
                                    name: "",
                                    dob: "",
                                    email: "",
                                    department: "",
                                    contactNumber: "",
                                    avatar: "",
                                    joiningYear: Date().split(" ")[3],
                                    password: "",
                                    username: "",
                                });
                                setError({});
                                }}
                                className="clear-button"
                                type="button">
                                Clear
                            </button> */}
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
                                            message="Adding Admin"
                                            height={30}
                                            width={150}
                                            color="#111111"
                                            messageColor="blue"
                                        />
                                    )}
                                    {(error.emailError || error.backendError) && (
                                        <p className="error-text">
                                            {error.emailError || error.backendError}
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

export default BodyAddAdmin;
