import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import { MdMailOutline } from "react-icons/md";
import { BiFace } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    const myForm = new FormData();

    e.preventDefault();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.show(error);
      dispatch(clearErrors());
    }
    if (message) {
      console.log(message);
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Forgot Password' />
          <div className='forgotPasswordContainer'>
            <div className='forgotPasswordInputBox'>
              <h2>Forgot Password</h2>
              <form
                className='forgotPasswordForm'
                onSubmit={forgotPasswordSubmit}>
                <div className='forgotPasswordEmail'>
                  <MdMailOutline />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type='submit'
                  value='Send'
                  className='forgotPasswordBtn'
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
