import React, { useState, useEffect } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import { Avatar } from "@mui/material";
import { FaChalkboardTeacher, FaUserGraduate, FaUserShield, FaBuilding, FaReply } from 'react-icons/fa';
import '../profile/profile.css';
import '../../../CSS/main.css';
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
const BodyProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

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
                            <li className="breadcrumb-item"><a href="#"><b>Bảng thông tin</b></a></li>
                        </ul>
                        <div id="clock">{formatDate}</div>
                    </div>
                </div>
            </div>
            <div className="container-1">
                <div className="row backroi">
                    <div className="col-md-12">
                        <div
                            onClick={() => navigate("/student/update")}
                            className="profileleft">
                            <SecurityUpdateIcon />
                            <h1 className="profile">Update</h1>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-6">
                                <div className="avatar">
                                    <img src={user.result.avatar} alt="Avatar" className="avatar-img" />
                                </div>
                            </div>
                            <div className="row custom-cols">
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Họ Và Tên :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.name}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Email :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.email}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Tài khoản :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.username}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Phòng ban :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.department}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Họ tên ba :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.fatherName}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">SDT ba :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.fatherContactNumber}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Học tên mẹ :</h6>
                                        <div className="">
                                            <h6 className="Th6 ">{user.result.motherName}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">SDT mẹ :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.motherContactNumber}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Ngày sinh :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.dob}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Năm :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.year}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">Liên hệ :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.contactNumber}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">section:</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.section}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="app-title">
                                        <h6 className="Th6">batch :</h6>
                                        <div>
                                            <h6 className="Th6">{user.result.batch}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BodyProfile;
