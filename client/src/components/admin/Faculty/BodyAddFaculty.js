import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addFaculty } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_FACULTY, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { format, set } from "date-fns";
import '../../../components/admin/Faculty/CSS/AddFaculty.css';
import { useNavigate } from "react-router-dom";
import { FaPlusSquare } from 'react-icons/fa';
const BodyAddFaculty = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const departments = useSelector((state) => state.admin.allDepartment);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [value, setValue] = useState({
        name: "",
        dob: "",
        email: "",
        department: "",
        contactNumber: "",
        avatar: "",
        joiningYear: Date().split(" ")[3],
        gender: "",
        designation: "",
    });

    const hannd = () => {
        navigate("/admin/getfaculty");
    }

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
        dispatch(addFaculty(value));
    };

    useEffect(() => {
        if (store.errors || store.admin.facultyAdded) {
            setLoading(false);
            if (store.admin.facultyAdded) {
                setValue({
                    name: "",
                    dob: "",
                    email: "",
                    department: "",
                    contactNumber: "",
                    avatar: "",
                    joiningYear: Date().split(" ")[3],
                    gender: "",
                    designation: "",
                });
                dispatch({ type: SET_ERRORS, payload: {} });
                dispatch({ type: ADD_FACULTY, payload: false });
            }
        } else {
            setLoading(true);
        }
    }, [store.errors, store.admin.facultyAdded]);

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

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="app-title">
                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item"><a href="#"><b>Bảng thêm giảng viên</b></a></li>
                        </ul>
                        <div id="clock">{formatDate}</div>
                    </div>
                </div>
            </div>
            <div className="add">
                <div className="container-1-2">
                    <div className="form">
                        <div className="form-header">
                            <FaPlusSquare className="icon" style={{ fontSize: '20px' }} />
                            <h1 className="form-title">Thêm giảng viên</h1>
                        </div>
                        <form className="form-content" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="form-field">
                                    <h1 className="field-label">Họ và tên :</h1>
                                    <input
                                        className="input"
                                        placeholder="Full Name"
                                        required
                                        type="text"
                                        value={value.name}
                                        onChange={(e) =>
                                            setValue({ ...value, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="field-label">Ngày sinh :</h1>
                                    <input
                                        className="input"
                                        placeholder="DD/MM/YYYY"
                                        required
                                        type="date"
                                        value={value.dob}
                                        onChange={(e) =>
                                            setValue({ ...value, dob: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            {/* Add other form fields similarly */}
                            <div className="form-group">
                                <div className="form-field">
                                    <h1 className="field-label">Email :</h1>
                                    <input
                                        className="input"
                                        placeholder="Email"
                                        required
                                        type="email"
                                        value={value.email}
                                        onChange={(e) =>
                                            setValue({ ...value, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="field-label">Designation :</h1>
                                    <input
                                        className="input"
                                        placeholder="Designation"
                                        required
                                        type="text"
                                        value={value.designation}
                                        onChange={(e) =>
                                            setValue({ ...value, designation: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group">
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
                                        }
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {departments?.map((dp, idx) => (
                                            <MenuItem key={idx} value={dp.department}>
                                                {dp.department}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="form-field">
                                    <h1 className="field-label">Giới tính :</h1>
                                    <Select
                                        required
                                        displayEmpty
                                        sx={{ height: 36 }}
                                        inputProps={{ "aria-label": "Without label" }}
                                        value={value.gender}
                                        onChange={(e) =>
                                            setValue({ ...value, gender: e.target.value })
                                        }
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="Male">Nam</MenuItem>
                                        <MenuItem value="Female">Nữ</MenuItem>
                                        <MenuItem value="Other">Khác</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-field">
                                    <h1 className="field-label">Liên hệ :</h1>
                                    <input
                                        required
                                        placeholder="Contact Number"
                                        className="input"
                                        type="number"
                                        value={value.contactNumber}
                                        onChange={(e) =>
                                            setValue({ ...value, contactNumber: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-field">
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
                            <div className="button-container">
                                <button className="submit-button" type="submit">
                                    Thêm
                                </button>
                                {/* <button
                                className="clear-button"
                                type="button"
                                onClick={() => {
                                    setValue({
                                        name: "",
                                        dob: "",
                                        email: "",
                                        designation: "",
                                        department: "",
                                        gender: "",
                                        contactNumber: "",
                                        avatar: "",
                                    });
                                    setError({});
                                }}
                            >
                                Clear
                            </button> */}
                                <button
                                    className="clear-button"
                                    type="button"
                                    onClick={hannd}
                                >
                                    Thoát
                                </button>
                            </div>
                            <div className="error-container">
                                {loading && (
                                    <Spinner
                                        message="Adding Faculty"
                                        height={30}
                                        width={150}
                                        color="#111111"
                                        messageColor="blue"
                                    />
                                )}
                                {(error.emailError || error.backendError) && (
                                    <p className="error-message">
                                        {error.emailError || error.backendError}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BodyAddFaculty;
