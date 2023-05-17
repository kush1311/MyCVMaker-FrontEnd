import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../ProtectedRoutes/AuthenticationApi";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import r from "./Register.module.css";
import { createResumeApiCall } from "../../../utils/apiCalls";
import { Loader } from "../../../constants/Loader";
import { Helmet } from "react-helmet";
import { loginApiCall } from "../../../utils/apiCalls"
import { RESUME_BUILDER_ROUTE } from "../../../constants/routes";
import { HomePageNavbar } from "../homePageMiniComponents/HomePageNavbar";
import { Footer } from "../homePageMiniComponents/Footer";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const mainContext = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gotoResumeBuilderPage = () => {
    history.push(RESUME_BUILDER_ROUTE);
  };
  const setUserDataInTheContext = (userId, resumeIdArray, currentResumeId) => {
    mainContext.handleSetUserId(userId);
    mainContext.handleSetResumeIdArray([...resumeIdArray]);
    mainContext.handleSetCurrentResumeId(currentResumeId);
  };
  const loginButtonClickHandler = async () => {
    setLoading(true);
    try {
      const resultData = await loginApiCall({email, password});
      if (resultData && resultData.status === 200) {
        const userId = resultData.userId;
        let resumeIdArray = [];
        let currentResumeId = null;
        if (resultData.resumeIdArray.length === 0) {
          const newResumeIdArray = await createResumeApiCall(resultData.userId);
          resumeIdArray = [...newResumeIdArray];
          currentResumeId = resumeIdArray[0];
        } else {
          resumeIdArray = resultData.resumeIdArray;
          currentResumeId = resultData.resumeIdArray[0];
        }
        setUserDataInTheContext(userId, resumeIdArray, currentResumeId);
      };
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
    setLoading(false);
  };

  function removePleaseLoginModalShowedFromLocalStorage() {
    localStorage.removeItem('pleaseloginmodalshowed');
  }

  if (mainContext.userId && mainContext.resumeIdArray.length && mainContext.currentResumeId) {
    removePleaseLoginModalShowedFromLocalStorage();
    gotoResumeBuilderPage();
  }

  console.log('In login jsx')

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta
          name='Login'
          content='Login to MyCVMaker. Create resume with MyCVMaker.'
        />
      </Helmet>
      <HomePageNavbar />
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
