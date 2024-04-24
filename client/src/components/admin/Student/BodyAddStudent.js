import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addStudent } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import '../../admin/Student/CSS/AddStudent.css';
import { useNavigate } from 'react-router-dom';

import { format, set } from "date-fns";

const BodyAddStudent = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const departments = useSelector((state) => state.admin.allDepartment);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());
    const errorRef = useRef();
    const navigate = useNavigate();

    const [value, setValue] = useState({
        name: "",
        dob: "",
        email: "",
        department: "",
        contactNumber: "",
        avatar: "",
        batch: "",
        gender: "",
        year: "",
        fatherName: "",
        motherName: "",
        section: "",
        fatherContactNumber: "",
        motherContactNumber: "",
    });

    useEffect(() => {
        if (Object.keys(store.errors).length !== 0) {
            setError(store.errors);
            errorRef.current.scrollIntoView({ behavior: "smooth" });
            setValue({ ...value, email: "" });
        }
    }, [store.errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addStudent(value));
        setError({});
        setLoading(true);
    };

    useEffect(() => {
        if (store.errors || store.admin.studentAdded) {
            setLoading(false);
            if (store.admin.studentAdded) {
                setValue({
                    name: "",
                    dob: "",
                    email: "",
                    department: "",
                    contactNumber: "",
                    avatar: "",
                    batch: "",
                    gender: "",
                    year: "",
                    fatherName: "",
                    motherName: "",
                    section: "",
                    fatherContactNumber: "",
                    motherContactNumber: "",
                });

                dispatch({ type: SET_ERRORS, payload: {} });
                dispatch({ type: ADD_STUDENT, payload: false });
            }
        } else {
            setLoading(true);
        }
    }, [store.errors, store.admin.studentAdded]);

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
        navigate("/admin/getstudent");
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="app-title">
                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item"><a href="#"><b>Bảng thêm sinh viên</b></a></li>
                        </ul>
                        <div id="clock">{formatDate}</div>
                    </div>
                </div>
            </div>
            <div className="addd">
                <div className="container-1-2">
                    <div className="form">
                        <div className="form-header">
                            <AddIcon className="icon" style={{ fontSize: '20px' }} />
                            <h1 className="form-title">Thêm sinh viên</h1>
                        </div>
                        <form className="form-content" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="form-field">
                                    <h1 className="field-label">Họ và tên :</h1>
                                    <input
                                        placeholder="Full Name"
                                        required
                                        className="input"
                                        type="text"
                                        value={value.name}
                                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="">Ngày sinh :</h1>
                                    <input
                                        required
                                        placeholder="DD/MM/YYYY"
                                        className="input"
                                        type="date"
                                        value={value.dob}
                                        onChange={(e) => setValue({ ...value, dob: e.target.value })}
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="">Email :</h1>
                                    <input
                                        required
                                        placeholder="Email"
                                        className="input"
                                        type="email"
                                        value={value.email}
                                        onChange={(e) => setValue({ ...value, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="">Batch :</h1>
                                    <input
                                        required
                                        placeholder="yyyy-yyyy"
                                        className="input"
                                        type="text"
                                        value={value.batch}
                                        onChange={(e) => setValue({ ...value, batch: e.target.value })}
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="">Họ tên ba :</h1>
                                    <input
                                        required
                                        placeholder="Father's Name"
                                        className="input"
                                        type="text"
                                        value={value.fatherName}
                                        onChange={(e) => setValue({ ...value, fatherName: e.target.value })}
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="">Họ tên mẹ :</h1>
                                    <input
                                        required
                                        placeholder="Mother's Name"
                                        className="input"
                                        type="text"
                                        value={value.motherName}
                                        onChange={(e) => setValue({ ...value, motherName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <h1 className="">Năm :</h1>
                                    <Select
                                        required
                                        displayEmpty
                                        sx={{ height: 36 }}
                                        inputProps={{ "aria-label": "Without label" }}
                                        value={value.year}
                                        onChange={(e) => setValue({ ...value, year: e.target.value })}
                                    >
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
                                    <h1 className="">Phòng ban :</h1>
                                    <Select
                                        required
                                        displayEmpty
                                        sx={{ height: 36 }}
                                        inputProps={{ "aria-label": "Without label" }}
                                        value={value.department}
                                        onChange={(e) => setValue({ ...value, department: e.target.value })}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {departments?.map((dp, idx) => (
                                            <MenuItem key={idx} value={dp.department}>
                                                {dp.department}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <h1 className="">Giới tính :</h1>
                                    <Select
                                        required
                                        displayEmpty
                                        sx={{ height: 36 }}
                                        inputProps={{ "aria-label": "Without label" }}
                                        value={value.gender}
                                        onChange={(e) => setValue({ ...value, gender: e.target.value })}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="Male">Nam</MenuItem>
                                        <MenuItem value="Female">Nữ</MenuItem>
                                        <MenuItem value="Other">Khác</MenuItem>
                                    </Select>
                                </div>
                                <div className="form-field">
                                    <h1 className="">Liên hệ :</h1>
                                    <input
                                        required
                                        placeholder="Contact Number"
                                        className="input"
                                        type="number"
                                        value={value.contactNumber}
                                        onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="">SDT ba :</h1>
                                    <input
                                        required
                                        placeholder="Father's Contact Number"
                                        className="input"
                                        type="number"
                                        value={value.fatherContactNumber}
                                        onChange={(e) =>
                                            setValue({ ...value, fatherContactNumber: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-field">
                                    <h1 className="">SDT mẹ :</h1>
                                    <input
                                        required
                                        placeholder="Mother's Contact Number"
                                        className="input"
                                        type="number"
                                        value={value.motherContactNumber}
                                        onChange={(e) =>
                                            setValue({ ...value, motherContactNumber: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <h1 className="">Section :</h1>
                                    <Select
                                        required
                                        displayEmpty
                                        sx={{ height: 36 }}
                                        inputProps={{ "aria-label": "Without label" }}
                                        value={value.section}
                                        onChange={(e) => setValue({ ...value, section: e.target.value })}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                    </Select>
                                </div>
                                <div className="form-field">
                                    <h1 className="">Avatar :</h1>
                                    <FileBase
                                        type="file"
                                        multiple={false}
                                        onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
                                    />
                                </div>
                            </div>
                            <div className="submit-buttons">
                                <button className="submit-button" type="submit">
                                    Thêm
                                </button>
                                <button
                                    onClick={() => {
                                        setValue({
                                            name: "",
                                            dob: "",
                                            email: "",
                                            department: "",
                                            contactNumber: "",
                                            avatar: "",
                                            batch: "",
                                            gender: "",
                                            year: "",
                                            fatherName: "",
                                            motherName: "",
                                            section: "",
                                            fatherContactNumber: "",
                                            motherContactNumber: "",
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
                            <div ref={errorRef} className="error-message">
                                {loading && (
                                    <Spinner
                                        message="Adding Student"
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
        </>
    );
};

export default BodyAddStudent;
