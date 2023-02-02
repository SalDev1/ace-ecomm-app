import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { clearErrors, updatePassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { MdVpnKey } from "react-icons/md";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    const myForm = new FormData();

    e.preventDefault();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      history.push("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Change Password' />
          <div className='updatePasswordContainer'>
            <div className='updatePasswordInputBox'>
              <h2>Change your Password</h2>
              <form
                className='updatePasswordForm'
                encType='multipart/form-data'
                onSubmit={updatePasswordSubmit}>
                <div className='loginPassword'>
                  <MdVpnKey />
                  <input
                    type='password'
                    placeholder='Old Password'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className='loginPassword'>
                  <BiLockOpen />
                  <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className='loginPassword'>
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
                  value='Change password'
                  className='updatePasswordBtn'
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
