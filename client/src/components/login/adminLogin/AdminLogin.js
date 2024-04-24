import React, { useEffect, useState } from "react";
import '../../../components/login/CSS/main.css';
import '../../../components/login/CSS/util.css';
import '../../../vendor/bootstrap/css/bootstrap.min.css';
import '../../../vendor/animate/animate.css';
import '../../../vendor/css-hamburgers/hamburgers.min.css';
import '../../../vendor/select2/select2.min.css';

import '../../../vendor/jquery/jquery-3.2.1.min.js';
import '../../../vendor/bootstrap/js/popper.js';
import '../../../vendor/bootstrap/js/bootstrap.min.js';
import '../../../vendor/select2/select2.min.js';
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { adminSignIn } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { FaSpinner } from 'react-icons/fa';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const defaultValues = {
  username: "",
  password: "",
};

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);

  const onSubmit = ({ username, password }) => {
    setLoading(true);

    dispatch(adminSignIn({ username, password }, navigate));
  };

  return (
    <div className="Login">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="/team.jpg" alt="IMG" />
            </div>

            <form className="login100-form validate-form" onSubmit={handleSubmit(onSubmit)}>
              <span className="login100-form-title">
                <b>ĐĂNG NHẬP HỆ THỐNG</b>
              </span>
              <div className="wrap-input100 validate-input">
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="input100"
                      type="text"
                      placeholder="Tài khoản quản trị"
                      id="username"
                    />
                  )}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className='bx bx-user'></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      autoComplete="off"
                      className="input100"
                      type="password"
                      placeholder="Mật khẩu"
                      id="password-field"
                    />
                  )}
                />
                <span toggle="#password-field" className="bx fa-fw bx-hide field-icon click-eye"></span>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className='bx bx-key'></i>
                </span>
              </div>
              <div className="container-login100-form-btn">
                <input type="submit" value="Đăng nhập" id="submit" />
              </div>
              <div className="text-right p-t-12">
                <a className="txt2" href="/forgot.html">
                  Bạn quên mật khẩu?
                </a>
              </div>
              {loading && (
                <FaSpinner className="spin" />
              )}

              <ul className="mt-2">
                {errors.username ? (
                  <li>
                    <small className="text-red-500">
                      {errors.username.message}
                    </small>
                  </li>
                ) : null}
                {errors.password ? (
                  <li>
                    <small className="text-red-500">
                      {errors.password.message}
                    </small>
                  </li>
                ) : null}
              </ul>
            </form>
            <div className="text-center p-t-70 txt2">
              Phần mềm quản lý điểm sinh viên<i className="far fa-copyright" aria-hidden="true"></i>
              <script type="text/javascript">document.write(new Date().getFullYear());</script> <a
                className="txt2" href=" ">nhóm 4</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;