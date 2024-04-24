import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../../../utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { facultyUpdatePassword } from "../../../../../redux/actions/facultyActions";
import * as classes from "../../../../../utils/styles";
import '../../../../../components/admin/profile/Update/Password/password.css';

import '../../../../../ThongBao/ThongBao.css';
const BodyPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const update = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(
      facultyUpdatePassword(
        {
          newPassword: newPassword,
          confirmPassword: confirmPassword,
          email: user.result.email,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [store.errors]);

  return (
    <div className="password">
      <div className="container"> {/* Thêm className cho container */}
        <div>
          <div className="header">
            <h1>Cập nhật mật khẩu</h1>
          </div>

          <div className="container-3"> {/* Thêm className cho form-container */}
            <form onSubmit={update} className="form"> {/* Thêm className cho form */}
              <h1 className="form-title">Cập nhật mật khẩu</h1> {/* Thêm className cho form-title */}
              <div className="form-group"> {/* Thêm className cho form-group */}
                <p className="form-label">Mật khẩu mới</p> {/* Thêm className cho form-label */}
                <div className="input-group"> {/* Thêm className cho input-group */}
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    placeholder="Mật khẩu mới"
                  />
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="icon"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="icon"
                    />
                  )}
                </div>
              </div>
              <div className="form-group"> {/* Thêm className cho form-group */}
                <p className="form-label">Xác nhận lại mật khẩu</p> {/* Thêm className cho form-label */}
                <div className="input-group"> {/* Thêm className cho input-group */}
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    placeholder="Xác nhận lại mật khẩu"
                  />
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="icon"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="icon"
                    />
                  )}
                </div>
              </div>
              <div className="button-group"> {/* Thêm className cho button-group */}
                <button className="submit-button" type="submit">Cập nhật</button> {/* Thêm className cho submit-button */}
                <button
                  onClick={() => navigate("/faculty/profile")}
                  className="cancel-button"
                  type="button"
                >
                  Thoát
                </button>
              </div>
              {loading && (
                <Spinner
                  message="Updating"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="#blue"
                />
              )}
              {(error.mismatchError || error.backendError) && (
                <p className="error-message"> {/* Thêm className cho error-message */}
                  {error.mismatchError || error.backendError}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyPassword;
