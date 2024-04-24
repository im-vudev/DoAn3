import React from "react";
import { Routes, Route } from "react-router-dom";

import TrangChu from './components/TrangChu/trangchu';

import AdminLogin from "./components/login/adminLogin/AdminLogin";
import FacultyLogin from "./components/login/facultyLogin/FacultyLogin";
import StudentLogin from "./components/login/studentLogin/StudentLogin";

import AdminHome from "./components/admin/AdminHome";
import Body from "./components/admin/Body";
import BodyProfile from "./components/admin/profile/BodyProfile";
import BodyUpdate from "./components/admin/profile/Update/BodyUpdate";
import BodyPassword from "./components/admin/profile/Update/Password/BodyPassword";
import BodyThongBao from "./components/admin/ThongBao/BodyThongBao";
import Bodys from "./components/faculty/Body";
import FacultyHome from './components/faculty/FacultyHome';
import BodyGetFaculty from './components/admin/Faculty/BodyGetFaculty';
import BodyAddFaculty from './components/admin/Faculty/BodyAddFaculty';
import BodyGetStudent from './components/admin/Student/BodyGetStudent';
import BodyAddStudent from './components/admin/Student/BodyAddStudent';
import BodyGetSubject from './components/admin/Subject/BodyGetSubject';
import BodyAddSubject from './components/admin/Subject/BodyAddSubject';
import BodyAddDepartment from './components/admin/Department/BodyAddDepartment';
import BodyGetDepartment from './components/admin/Department/BodyGetDepartment';
import BodyGetAdmin from './components/admin/Admin/BodyGetAdmin';
import BodyAddAdmin from './components/admin/Admin/BodyAddAdmin';


import BodyProfiles from './components/faculty/profile/BodyProfile';
import BodyUpdates from './components/faculty/profile/update/BodyUpdate';
import BodyPasswords from './components/faculty/profile/update/password/BodyPassword';
import BodyTest from './components/faculty/createTest/BodyTest';
import BodyUploadMarks from './components/faculty/uploadMarks/BodyUploadMarks';


import StudentHome from './components/student/StudentHome';
import Bodyss from './components/student/Body';
import BodyProfilez from './components/student/profile/BodyProfile';
import BodyUpdatez from './components/student/profile/update/BodyUpdate';
import BodyPasswordz from './components/student/profile/update/password/BodyPassword';
import BodySubjectList from './components/student/subjectList/BodySubjectList';
import BodyTestResult from './components/student/testResult/BodyTestResult';


const App = () => {
  return (
    <Routes>

      <Route exact path="/" element={<TrangChu />} />

      <Route exact path="/login/admin" element={<AdminLogin />} />
      <Route exact path="/login/faculty" element={<FacultyLogin />} />
      <Route exact path="/login/student" element={<StudentLogin />} />


      <Route path="/admin" element={<AdminHome />}>
        <Route path="home" element={<Body />} />
        <Route path="profile" element={<BodyProfile/>} />
        <Route path="update" element={<BodyUpdate/>} />
        <Route path="update/password" element={<BodyPassword/>} />
        <Route path="nocite" element={<BodyThongBao/>} />
        <Route path="getfaculty" element={<BodyGetFaculty/>} />
        <Route path="getstudent" element={<BodyGetStudent/>} />
        <Route path="getsubject" element={<BodyGetSubject/>} />
        <Route path="getdepartment" element={<BodyGetDepartment/>} />
        <Route path="getadmin" element={<BodyGetAdmin/>} />
        <Route path="addfaculty" element={<BodyAddFaculty/>} />
        <Route path="addstudent" element={<BodyAddStudent/>} />
        <Route path="addsubject" element={<BodyAddSubject/>} />
        <Route path="adddepartment" element={<BodyAddDepartment/>} />
        <Route path="addadmin" element={<BodyAddAdmin/>} />
      </Route>

      <Route path="/faculty" element={<FacultyHome />}>
        <Route path="home" element={<Bodys />} />
        <Route path="profile" element={<BodyProfiles />} />
        <Route path="update" element={<BodyUpdates />} />
        <Route path="update/password" element={<BodyPasswords />} />
        <Route path="createTest" element={<BodyTest />} />
        <Route path="uploadMarks" element={<BodyUploadMarks />} />
      </Route>

      <Route path="/student" element={<StudentHome />}>
        <Route path="home" element={<Bodyss />} />
        <Route path="profile" element={<BodyProfilez />} />
        <Route path="update" element={<BodyUpdatez />} />
        <Route path="update/password" element={<BodyPasswordz />} />
        <Route path="subjectList" element={<BodySubjectList />} />
        <Route path="testResult" element={<BodyTestResult />} />


      </Route>
    </Routes>
  );
};

export default App;
