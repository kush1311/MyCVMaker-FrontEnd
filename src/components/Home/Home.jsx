import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import home from "./Home.module.css";
import Typewriter from "typewriter-effect";
import {
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
// import { AnnotationIcon, ChevronDoubleRightIcon, HomeIcon } from "@heroicons/react/outline";
import image from "../../Resume Image/R1.png";
import { Helmet } from "react-helmet";
import { RESUME_BUILDER_ROUTE } from "../../constants/routes"
import { HomePageNavbar } from "./homePageMiniComponents/HomePageNavbar";
import { FAQ } from "./homePageMiniComponents/FAQ";
import { Footer } from "./homePageMiniComponents/Footer";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>MyCVMaker</title>
        <meta
          name='MyCVMaker'
          content='Create resumes with MyCVMaker for free.'
        />
      </Helmet>

      <HomePageNavbar />

      <div className={home.home + "w-50 mx-auto text-center"}>
        <section className='container'>
          <div className='row'>
            <div className='col-12 col-md-6 mx-auto'>
              <div id='thisisit' className={home.typewriter}>
                <Typewriter
                  className={`${home.typewriter}`}
                  skipAddStyles='false'
                  wrapperClassName='bg-success'
                  options={{ loop: false }}
                  onInit={(typewriter) => {
                    typewriter.typeString("Welcome to MyCVMaker").start();
                  }}
                />
              </div>
              <p className='italic mt-3 text-2xl font-bold text-fuchsia-800'>
                "Create Your Resume With Easy To Use Editor For Free"
              </p>
              <div className='my-5'>
                <HaveALookButton />
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <img
                src={image}
                alt=''
                style={{ width: "320px" }}
                className='mx-auto outline outline-1 outline-slate-600 shadow-md shadow-black hover:shadow-xl hover:shadow-black '
              />
            </div>
          </div>
        </section>
        <ParagraphSection />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

const HaveALookButton = () => {
  return (
    <div className='flex justify-around'>
      <Link
        style={{ textDecoration: "none" }}
        className='flex px-4 py-2 font-bold text-2xl rounded bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-black active:shadow-white'
        to={`${RESUME_BUILDER_ROUTE}`}>
        {/* <AnnotationIcon className='w-10 mr-2' /> */}
        Make My Resume
        <ChevronDoubleRightIcon className='w-10 ml-2' />
        {/* <ChevronDoubleRightIcon className='w-10 mr-2' /> */}
      </Link>
    </div>
  );
};

const ParagraphSection = () => {
  const paraClass = "my-3 text-xl";
  return (
    <section className='mt-24 mb-8 mx-auto py-5 px-5 bg-white w-11/12 border-2 shadow-black shadow-inner border-blue-600'>
      <ul className='mx-auto italic font-semibold text-center rounded text-md '>
        <li className={`${paraClass}`}>Absolutely Free, No Hidden Charges</li>
        <li className={`${paraClass}`}>Download High-Definition PDF</li>
        {/* <li className={`${paraClass}`}>Unlimited Features</li> */}
        {/* <li className={`${paraClass}`}>Unlimited Feature Usage</li> */}
      </ul>
      <div className='my-3'>
        <HaveALookButton />
      </div>
    </section>
  );
};


export default Home;
