import React, { useState, useEffect, useRef } from "react";
import '../../CSS/main.css';
import Chart from "chart.js/auto";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import Notice from "../notices/Notice";
import ShowNotice from "../notices/ShowNotice";
import ReplyIcon from "@mui/icons-material/Reply";
import { FaChalkboardTeacher, FaUserGraduate, FaUserShield, FaBuilding, FaReply } from 'react-icons/fa';
import { format, set } from "date-fns";

const Body = () => {
    const [open, setOpen] = useState(false);
    const [openNotice, setOpenNotice] = useState({});
    const notices = useSelector((state) => state.admin.notices.result);
    const testResult = useSelector((state) => state.student.testResult.result);
    const attendance = useSelector((state) => state.student.attendance.result);
    const user = JSON.parse(localStorage.getItem("user"));
    const subjects = useSelector((state) => state.admin.subjects.result);
    var totalAttendance = 0;
    console.log(attendance);

    attendance?.map((att) => (totalAttendance += att.attended));

    const [value, onChange] = useState(new Date());
    const [currentTime, setcurrentTime] = useState(new Date());



    const handleGoBack = () => {
        setOpen(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setcurrentTime(new Date());
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
            <div className="row">
                <div className="col-md-12 ">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="widget-small primary coloured-icon"><i className='icon bx bxs-user-account fa-3x'></i>
                                <div className="info">
                                    <h4>Môn Học</h4>
                                    <p><b>{subjects?.length}</b></p>
                                    <p className="info-tong">Tổng các môn học.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="widget-small info coloured-icon"><i className='icon bx bxs-data fa-3x'></i>
                                <div className="info">
                                    <h4>Bài Kiểm Tra</h4>
                                    <p><b>{testResult?.length}</b></p>
                                    <p className="info-tong">Tổng số bài kiểm tra hiện có.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="widget-small warning coloured-icon"><i className='icon bx bxs-shopping-bags fa-3x'></i>
                                <div className="info">
                                    <h4>Điểm Danh</h4>
                                    <p><b>{totalAttendance}</b></p>
                                    <p className="info-tong">Tổng số buổi.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="widget-small danger coloured-icon"><i className='icon bx bxs-error-alt fa-3x'></i>
                                <div className="info">
                                    <h4>Năm</h4>
                                    <p><b>{user.result.year}</b></p>
                                    <p className="info-tong">Năm Học.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="tile">
                                <h3 className="tile-title">Thông Báo</h3>
                                <div className="">
                                    <div className="notice-header">
                                        {open && (
                                            <FaReply onClick={handleGoBack} className="reply-icon" style={{ marginBottom: '20px' }} />
                                        )}
                                    </div>
                                    <div className="notice-content">
                                        {!open ? (
                                            notices?.map((notice, idx) => (
                                                <div
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setOpenNotice(notice);
                                                    }}
                                                    className="notice-item"
                                                    key={idx}
                                                >
                                                    <Notice idx={idx} notice={notice} notFor="" />
                                                </div>
                                            ))
                                        ) : (
                                            <ShowNotice notice={openNotice} />
                                        )}
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

export default Body;