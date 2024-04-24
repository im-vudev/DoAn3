import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import '../../CSS/main.css';
import '../../CSS/style.css';
import { useDispatch } from "react-redux";
import {
  getAllStudent,
  getAllFaculty,
  getAllAdmin,
  getAllDepartment,
  getNotice,
} from "../../redux/actions/adminActions.js";

import '../../js-boostraps/jquery-3.2.1.min.js';
import '../../js-boostraps/popper.min.js';
import '../../js-boostraps/bootstrap.min.js';
import '../../js-boostraps/main.js';
import '../../js-boostraps/plugins/chart.js';
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/")
  };
  useEffect(() => {
    dispatch(getAllStudent());
    dispatch(getAllFaculty());
    dispatch(getAllAdmin());
    dispatch(getAllDepartment());
    dispatch(getNotice());
  }, [dispatch]);



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
            <li><a className="app-menu__item haha" href="/admin/home"><i className='app-menu__icon bx bx-id-card'></i>
              <span className="app-menu__label">Bảng Điều Khiển</span></a></li>
            <li><a className="app-menu__item " href="/admin/profile"><i className='app-menu__icon bx bx-id-card'></i> <span
              className="app-menu__label">Thông tin cá nhân</span></a></li>
            <li><a className="app-menu__item" href="/admin/getadmin"><i className='app-menu__icon bx bx-task'></i><span
              className="app-menu__label">Quản Trị Viên</span></a></li>
            <li><a className="app-menu__item" href="/admin/getdepartment"><i className='app-menu__icon bx bx-task'></i><span
              className="app-menu__label">Phòng Ban</span></a></li>
            <li><a className="app-menu__item" href="/admin/getfaculty"><i className='app-menu__icon bx bx-user-voice'></i><span
              className="app-menu__label">Giảng Viên</span></a></li>
            <li><a className="app-menu__item" href="/admin/getstudent"><i className='app-menu__icon bx bx-task'></i><span
              className="app-menu__label">Sinh Viên</span></a></li>
            <li><a className="app-menu__item" href="/admin/getsubject"><i className='app-menu__icon bx bx-task'></i><span
              className="app-menu__label">Môn Học</span></a></li>
            <li><a className="app-menu__item" href="/admin/nocite"><i className='app-menu__icon bx bx-calendar-check'></i><span
              className="app-menu__label">Thông Báo</span></a></li>
            <li><a className="app-menu__item" href=" "><i className='app-menu__icon bx bx-cog'></i><span className="app-menu__label">Cài
              đặt hệ thống</span></a></li>
          </ul>
        </aside>
        <main className="app-content">
          <Outlet />
        </main>
        <div className="text-center" style={{ fontsize: '13px' }}>
          <p><b>Copyright
            <script type="text/javascript">
              document.write(new Date().getFullYear());
            </script> Hệ thống quản lý điểm | nhóm 4
          </b></p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;