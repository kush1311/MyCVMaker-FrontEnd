import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "../../../constants/Loader";
import r from "./Register.module.css";
import { Helmet } from "react-helmet";
import { registerApiCall } from "../../../utils/apiCalls";
import { LOGIN_ROUTE } from "../../../constants/routes";
import { HomePageNavbar } from "../homePageMiniComponents/HomePageNavbar";
import { Footer } from "../homePageMiniComponents/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const registerButtonClickHandler = async () => {
    setLoading(true);
    //console.log(email + "  " + password);
    if (password.length < 8) {
      alert("Password must be atleast 8 characters strong");
      setLoading(false);
      return;
    }
    try {
      const res = await registerApiCall({
        email, password, firstName, lastName
      });
      setLoading(false);
      if (res && res.status === 201) {
        history.replace(LOGIN_ROUTE);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        alert(err.response.data.message);
      } else if (err && err.message) {
        alert(err.message);
      }
      else alert('Something went wrong');
    }
  };
  return (
    <div>
      <Helmet>
        <title>Register</title>
        <meta
          name='Register'
          content='Create account to build resumes for free.'
        />
      </Helmet>
      <HomePageNavbar />
      <div
        className={
          "fluid-container w-10/12 sm:w-8/12 md:w-6/12 py-3 px-3 mx-auto my-3 bg-white shadow-inner shadow-black outline outline-blue-500"
        }>
        <h3 className='mt-2 text-center text-xl'>
          <strong className='text-slate-700'>Create Free Account</strong>
        </h3>
        <form className='w-100 p-2 pt-5 sm:p-3 '>
          <div className='form-group'>
            <label htmlFor='first_name'>First Name</label>
            <input
              value={firstName}
              className='my-3 form-control'
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              name='register'
              id='first_name'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='last_name'>Last Name</label>
            <input
              value={lastName}
              className='my-3 form-control'
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              name='register'
              id='last_name'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'> Email </label>
            <input
              value={email}
              className='my-3 form-control'
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='register'
              id='email'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'> Password </label>
            <input
              value={password}
              className='my-3 form-control'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              name='password'
              placeholder='Atleast 8 characters.....'
              id=''
            />
          </div>
          <div className='mx-auto text-center mt-5'>
            <span
              style={{ textDecorationLine: "none" }}
              className='hover:cursor-pointer mx-auto text-white font-bold bg-blue-600 py-2 px-8 sm:px-20 rounded delay-150 duration-300 hover:px-20 hover:sm:px-28 hover:bg-blue-700'
              onClick={registerButtonClickHandler}>
              {loading ? <Loader /> : "Register"}
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
