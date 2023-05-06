import React, { useEffect, useState } from "react";
import { Footer, NavBar } from "../Home/Home";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Feedback = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sendHandler = () => {
    if (!email || !feedback) {
      alert("Please Complete Form");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_URL}/feedback`, { email, feedback })
      .then((res) => {
        if (res && res.status && res.status === 201) {
          alert("Feedback sent successfully");
          history.replace("/");
        }
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  //console.log(email, feedback);
  return (
    <div>
      <NavBar />
      <div className='text-center'>
        <span className='mx-auto text-2xl pr-4'>Feedback</span>
      </div>
      <form className='mt-1 mx-auto px-5'>
        <div className='bg-white flex flex-col p-5 border-2 border-blue-600 shadow-black shadow-inner'>
          <div className='form-group'>
            <label htmlFor=''>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control md:w-6/12'
              type='text'
            />
          </div>
          <div className='w-100 form-group'>
            <label htmlFor=''>Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              className='form-control'
              type='text'
            />
          </div>
          <div className='text-center'>
            <span onClick={sendHandler} className='btn btn-primary btn-lg'>
              Send
            </span>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Feedback;
