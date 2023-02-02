import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { clearErrors, resetPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    const myForm = new FormData();

    e.preventDefault();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Updated Successfully");
      history.push("/login");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, success, alert, history, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Change Password' />
          <div className='resetPasswordContainer'>
            <div className='resetPasswordInputBox'>
              <h2>Change your Password</h2>
              <form
                className='resetPasswordForm'
                encType='multipart/form-data'
                onSubmit={resetPasswordSubmit}>
                <div>
                  <BiLockOpen />
                  <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <BiLock />
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input
                  type='submit'
                  value='Update'
                  className='resetPasswordBtn'
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
