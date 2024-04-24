import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getNotice } from "../../redux/actions/adminActions";
import {
  getAttendance,
  getSubject,
  getTestResult,
} from "../../redux/actions/studentActions";
import { Navigate, Outlet } from "react-router-dom";
import '../../CSS/main.css';
import '../../CSS/style.css';

import '../../js-boostraps/jquery-3.2.1.min.js';
import '../../js-boostraps/popper.min.js';
import '../../js-boostraps/bootstrap.min.js';
import '../../js-boostraps/main.js';
import '../../js-boostraps/plugins/chart.js';
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubject(user.result.department, user.result.year));
    dispatch(
      getTestResult(
        user.result.department,
        user.result.year,
        user.result.section
      )
    );
    dispatch(
      getAttendance(
        user.result.department,
        user.result.year,
        user.result.section
      )
    );
    dispatch(getNotice());
  }, [dispatch]);

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/")
  };
  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  const handleBodyClick = () => {
    if (sidebarOpen) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [sidebarOpen]);


  return (
    <div id="bodycon">
      <div className={`app sidebar-mini rtl ${sidebarOpen ? 'pace-done sidenav-toggled' : 'pace-done'}`} ref={sidebarRef}>
        <header className="app-header">
          <a className="app-sidebar__toggle" href="#" onClick={toggleSidebar} aria-label={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}></a>
          <ul className="app-nav" onClick={Logout}>
            <li><a className="app-nav__item"><i className='bx bx-log-out bx-rotate-180'></i> </a>
            </li>
          </ul>
        </header>
        <div className={`app-sidebar__overlay ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
        <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
        <aside className="app-sidebar">
          <div className="app-sidebar__user"><img className="app-sidebar__user-avatar" src={user.result.avatar} width="50px" alt={user.result.name} />
            <div>
              <p className="app-sidebar__user-name"><b>{user.result.name}</b></p>
              <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
            </div>
          </div>
          <hr />
          <ul className="app-menu">
            <li><a className="app-menu__item haha" href="/student/home"><i className='app-menu__icon bx bx-id-card'></i>
              <span className="app-menu__label">Bảng điều khiển</span></a></li>
            <li><a className="app-menu__item " href="/student/profile"><i className='app-menu__icon bx bx-id-card'></i> <span
              className="app-menu__label">Thông tin cá nhân</span></a></li>
            <li><a className="app-menu__item" href="/student/testResult"><i className='app-menu__icon bx bx-calendar-check'></i><span
              className="app-menu__label">Kết quả điểm kiểm tra</span></a></li>
            <li><a className="app-menu__item" href="/student/subjectList"><i className='app-menu__icon bx bx-user-voice'></i><span
              className="app-menu__label">Môn học</span></a></li>
            <li><a className="app-menu__item" href=" "><i className='app-menu__icon bx bx-cog'></i><span className="app-menu__label">Cài
              đặt hệ thống</span></a></li>
          </ul>
        </aside>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentHome;
