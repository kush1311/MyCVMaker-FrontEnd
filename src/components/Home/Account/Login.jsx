import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../ProtectedRoutes/AuthenticationApi";
import { Footer, NavBar } from "../Home";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import r from "./Register.module.css";
import { createResumeApiCall, getResumeData } from "../../../utils/apiCalls";
import { Loader } from "../../../constants/Loader";
import { Helmet } from "react-helmet";
import { loginApiCall } from "../../../utils/apiCalls"
import { RESUME_BUILDER_ROUTE } from "../../../constants/routes";
// axios.defaults.withCredentials = true;
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loginButtonClickHandler = async () => {
    setLoading(true);
    try {
      const res = await loginApiCall({email, password});
      if (res && res.status === 200) {
        alert(res.userId);
        if (res.resumeIdArray.length === 0) {
          const createResumeApiCallResult = await createResumeApiCall(res.userId);
          if (createResumeApiCallResult && createResumeApiCallResult.status && createResumeApiCallResult.status === 201) {
            console.log('createResumeApiCallResult')
            console.log(createResumeApiCallResult);
          }
        }
        history.push(RESUME_BUILDER_ROUTE);
      };
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        alert(err.response.data.message);
      } else alert('Something went wrong')
    }
    
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta
          name='Login'
          content='Login to MyCVMaker. Create resume with MyCVMaker.'
        />
      </Helmet>
      <NavBar />
      <div className='h-full'>
        <section
          className={
            "fluid-container w-10/12 sm:w-8/12 md:w-6/12 mx-auto py-1 bg-white rounded my-5 shadow-inner shadow-black outline outline-blue-500"
          }>
          <h3 className='my-2 text-center text-xl'>
            <strong className='text-slate-700'>Login</strong>
          </h3>

          <form className='w-100 mt-1 p-4 p-md-5'>
            <div className='form-group mb-5'>
              <label className='font-semibold' htmlFor='email'>
                Email
              </label>
              <input
                value={email}
                className='my-3 form-control'
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                name='register'
                id='email'
              />
            </div>
            <div className='form-group mb-5'>
              <label className='font-semibold' htmlFor='password'>
                Password
              </label>
              <input
                value={password}
                className='my-3 form-control'
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                name='password'
                id='password'
              />
            </div>
            <div>
              <input
                onChange={(e) => {
                  // console.log(e.target.checked);
                  setShowPassword(e.target.checked);
                }}
                type='checkbox'
                name=''
                id='checkbox'
              />{" "}
              <span className='ml-2'>Show Password</span>
            </div>
            <div className='mx-auto text-center mt-5'>
              <span
                style={{ textDecorationLine: "none" }}
                className='hover:cursor-pointer mx-auto py-2 text-white bg-blue-600 hover:bg-blue-700 px-8 sm:px-20 font-bold hover:px-28 duration-300 ease-in-out delay-150 rounded'
                onClick={loginButtonClickHandler}>
                {loading ? <Loader /> : "Login"}
              </span>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
