import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import home from "./Home.module.css";
import Typewriter from "typewriter-effect";
import {
  ChevronDoubleRightIcon,
  UserAddIcon,
  UserCircleIcon as UserIcon,
} from "@heroicons/react/solid";
import {
  AnnotationIcon,
  HomeIcon,
  PencilAltIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
// import { AnnotationIcon, ChevronDoubleRightIcon, HomeIcon } from "@heroicons/react/outline";
import image from "../../Resume Image/R1.png";
import { Helmet } from "react-helmet";

export const NavBar = () => {
  const NavButtonClass =
    "mx-2 px-3 py-2 text-yellow-400 text-lg transition-all duration-300 rounded-lg cursor-pointer hover:bg-slate-100 hover:text-yellow-800 ease-in";
  return (
    <nav className='flex px-2 py-1 font-bold mb-5 bg-slate-700 border-b-2 border-stone-400'>
      <span className='px-3 text-center flex'>
        <Link to='/' style={{ textDecorationLine: "none" }} className='my-auto'>
          <span className='flex w-8 text-yellow-400'>
            <HomeIcon />
          </span>
          {/* <strong className='text-center hover:text-blue-400 text-blue-200 my-auto hidden sm:inline-block'>
            MyCVMaker
          </strong> */}
        </Link>
      </span>
      <div className='flex ml-auto'>
        <Link
          to='/login'
          style={{ textDecorationLine: "none" }}
          className={`${NavButtonClass} flex`}>
          Login
          <UserIcon className='ml-1 w-7 text-lg' />
        </Link>
        <Link
          to='./register'
          style={{ textDecorationLine: "none" }}
          className={`${NavButtonClass} flex`}>
          Register <UserAddIcon className='ml-1 w-6 text-lg' />
        </Link>
        {/* <span className={`${NavButtonClass}`}>About</span> */}
      </div>
    </nav>
  );
};

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
      <NavBar />

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
        to='/register'>
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

const FAQ = () => {
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);

  const containerClass = "mt-2 bg-white px-8 py-2 rounded";
  const qClass = "flex text-lg";

  const giveTransitionStyle = (flag) => {
    const height = flag ? "2rem" : "0rem";
    const opacity = flag ? "1" : "0";
    const marginTop = flag ? "1rem" : "0";
    return {
      transitionProperty: "all",
      transitionDuration: "300ms",
      transitionTimingFunction: "linear",
      height: height,
      opacity: opacity,
      marginTop: marginTop,
    };
  };
  return (
    <article className='text-left p-8 pt-0'>
      <h3 className='mb-4'>
        <strong className='mr-auto'>FAQ's</strong>
      </h3>

      <div s className={containerClass}>
        <h5 className={qClass} onClick={() => setQ1(!q1)}>
          <span>Is there any charges ?</span> <DropdownArrow flag={q1} />
        </h5>
        <p style={giveTransitionStyle(q1)}>
          <strong> Answer:</strong> No, It's a completely{" "}
          <strong>free resume builder</strong>.
        </p>
      </div>

      <div className={containerClass}>
        <h5 className={`${qClass}`} onClick={() => setQ2(!q2)}>
          <span>What will be file type of resume ?</span>{" "}
          <DropdownArrow flag={q2} />
        </h5>
        <p style={giveTransitionStyle(q2)}>
          <strong>Answer:</strong> It will create only pdf files.
        </p>
      </div>

      {/* <div className={containerClass}>
        <h5 className={qClass} onClick={() => setQ3(!q3)}>
          <span>Is there any charges ?</span> <DropdownArrow flag={q3} />
        </h5>
        <p style={giveTransitionStyle(q3)}>
          Answer: No, It's a completely <strong>free resume builder</strong>.
        </p>
      </div> */}
      <KeywordsForSEO />
    </article>
  );
};

const DropdownArrow = ({ flag }) => {
  return (
    <span className='flex w-6 ml-auto'>
      {" "}
      {flag ? <ChevronUpIcon /> : <ChevronDownIcon />}{" "}
    </span>
  );
};

export const Footer = () => {
  const linkStyle =
    "p-2 hover:border-2 hover:border-yellow-400 hover:cursor-pointer hover:text-yellow-400 hover:no-underline flex mx-auto text-yellow-400 transition-all duration-200";
  const listItem = "flex";
  const iconClass = "w-4 mx-2";
  return (
    <footer className='mt-20 p-6 py-2 text-white bg-stone-800'>
      <div className='my-3 pl-5 mx-auto'>
        <ul className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
          <li className={listItem}>
            <Link className={linkStyle} to='/'>
              Home
              <HomeIcon className={iconClass} />
            </Link>
          </li>
          <li className={listItem}>
            <Link className={linkStyle} to='/login'>
              Login
              <UserIcon className={iconClass} />
            </Link>
          </li>
          <li className={listItem}>
            <Link className={linkStyle} to='/feedback'>
              Feedback
              <PencilAltIcon className={iconClass} />
            </Link>
          </li>
          <li className={listItem}>
            <Link className={linkStyle} to='/register'>
              Editor
              <ChevronDoubleRightIcon className={iconClass} />
            </Link>
          </li>
          <li className={listItem}>
            <Link className={linkStyle} to='/register'>
              Register
              <UserAddIcon className={iconClass} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Home;

const KeywordsForSEO = () => {
  return (
    <div>
      <div>
        {" "}
        <div>
          {" "}
          <div>
            {" "}
            <div>
              {" "}
              <div>
                {" "}
                <div>
                  {" "}
                  <div>
                    {" "}
                    <div>
                      {" "}
                      <div>
                        {" "}
                        <div>
                          {" "}
                          <div>
                            {" "}
                            <div>
                              {" "}
                              <div>
                                {" "}
                                <div>
                                  {" "}
                                  <div>
                                    {" "}
                                    <div>
                                      {" "}
                                      <div>
                                        {" "}
                                        <div>
                                          {" "}
                                          <div>
                                            <p className='hidden'>
                                              free resume maker free resume
                                              builder free resume maker online
                                              free resume builder free resume
                                              builder online free resume builder
                                              for freshers free resume builder
                                              websites free resume builder quora
                                              free resume builder with photo
                                              free resume builder canva free
                                              resume builder reddit free resume
                                              builder for experienced free
                                              resume builder and download free
                                              resume builder and download
                                              without paying free resume builder
                                              apps free resume builder app for
                                              pc free resume builder and
                                              download quora free resume builder
                                              ats friendly free resume builder
                                              and download reddit free resume
                                              builder and free download online
                                              free resume builder best free
                                              resume builder for beginners free
                                              resume builder for business
                                              analyst free resume builder with
                                              bullet points best free resume
                                              builder sites best free resume
                                              builder 2021 best free resume
                                              builder app best free resume
                                              builder 2020 free resume builder
                                              cv free resume builder cv maker
                                              templates formats app free resume
                                              builder canada free resume builder
                                              copy paste free resume builder cv
                                              maker apk free resume builder.com
                                              free resume builder computer free
                                              resume builder download free
                                              resume builder docx free resume
                                              builder download full version
                                              online resume builder free
                                              download free resume builder
                                              google docs free resume builder
                                              template download free resume
                                              builder easy free resume builder
                                              enhancv free resume builder email
                                              free resume builder for
                                              engineering free resume builder
                                              for experienced software engineer
                                              free resume builder for software
                                              engineer free resume builder for
                                              freshers engineers free resume
                                              builder for software developer
                                              free resume builder for students
                                              free resume builder for freshers
                                              with no work experience free
                                              resume builder for college
                                              students free resume builder for
                                              teachers free resume builder
                                              google free resume builder github
                                              free resume builder for government
                                              jobs good free resume builder got
                                              free resume builder good free
                                              resume builder reddit free graphic
                                              resume builder free resume builder
                                              high school students free resume
                                              builder help free resume builder
                                              hiration free resume builder no
                                              hidden fees free resume builder
                                              for healthcare free resume builder
                                              for stay at home moms free high
                                              school resume builder how free
                                              resume builder free resume builder
                                              india free resume builder indeed
                                              free resume builder in word free
                                              resume builder in word format free
                                              resume builder io free resume
                                              builder iphone free resume builder
                                              import free resume builder in pdf
                                              free resume builder job seeker
                                              tools free resume builder for
                                              first job free job resume builder
                                              jobtabs free resume builder free
                                              online job resume builder my
                                              resume builder cv free jobs is
                                              there any free resume builder free
                                              resume builder kinobi best free
                                              resume builders free resume
                                              builder linkedin free resume
                                              builder list free resume builder
                                              login free resume builder
                                              livecareer free resume builder
                                              without login free resume builder
                                              no login free resume builder for
                                              lvn free resume cover letter
                                              builder free resume builder mod
                                              apk free resume builder microsoft
                                              word free resume builder microsoft
                                              word online free resume builder
                                              monster free resume builder
                                              military free resume builder
                                              microsoft word download free
                                              resume builder mac free resume
                                              builder malaysia free resume
                                              builder no payment free resume
                                              builder naukri free resume builder
                                              novoresume free resume builder no
                                              sign up free resume builder no
                                              credit card free resume builder no
                                              account free resume builder no
                                              work experience free resume
                                              builder no cost to download free
                                              resume builder online for freshers
                                              free resume builder online quora
                                              free resume builder online without
                                              login free resume builder online
                                              with photo free resume builder
                                              online no sign up free resume
                                              builder online in india free
                                              resume builder online pdf free
                                              resume builder pdf download free
                                              resume builder professional free
                                              resume builder pdf format free
                                              resume builder printable free
                                              resume builder without paying free
                                              resume builder template printable
                                              free resume creator quora free
                                              quick resume builder quick easy
                                              free resume builder is there
                                              really a free resume builder free
                                              resume builder review free resume
                                              builder reviews free resume
                                              builder reddit 2022 free resume
                                              builder rocket free resume builder
                                              resources free resume builder with
                                              references free resume builder no
                                              registration free resume builder
                                              resume now free resume builder
                                              sites free resume builder sites
                                              quora free resume builder software
                                              free resume builder software for
                                              windows 10 free resume builder
                                              student free resume builder simple
                                              free resume builder software
                                              download free resume builder
                                              singapore free resume builder
                                              template free resume builder tools
                                              free resume builder to download
                                              free resume builder template pdf
                                              free resume builder that is
                                              actually free free resume builder
                                              uk free resume builder upload free
                                              resume builder usa free resume
                                              builder using linkedin free online
                                              resume builder upload free resume
                                              builder without signing up free
                                              resume builder veterans free
                                              visual resume builder free resume
                                              builder without watermark free
                                              resume builder word document free
                                              resume builder without payment
                                              free resume builder with free
                                              download free resume builder with
                                              templates free resume builder apk
                                              free resume maker free resume
                                              maker online free resume maker and
                                              download free resume maker for
                                              students free resume maker for
                                              freshers free resume maker app
                                              free resume maker website free
                                              resume maker quora free resume
                                              maker sites free resume maker app
                                              download free resume maker app for
                                              iphone free resume maker apk free
                                              resume maker app for pc free
                                              resume maker and free download
                                              online free resume maker australia
                                              free resume builder best online
                                              resume maker free for bank jobs
                                              free resume builder for beginners
                                              free resume builder for business
                                              analyst free resume builder with
                                              bullet points free resume builder
                                              maker best free resume maker free
                                              cv maker resume builder app free
                                              resume maker canva free resume
                                              maker cv maker templates formats
                                              app free resume maker canada free
                                              resume maker.com free resume
                                              builder.com free resume builder
                                              canada download free resume
                                              builder copy paste free resume
                                              builder computer free resume maker
                                              download free resume maker
                                              download software free resume
                                              builder download and print free
                                              resume builder docx free resume
                                              maker professional download free
                                              resume builder and download
                                              without paying free resume builder
                                              google docs free resume builder
                                              easy free resume builder enhancv
                                              free resume builder email online
                                              resume maker free for experienced
                                              online resume maker free for
                                              experience free resume maker for
                                              civil engineer online resume maker
                                              free for experienced with photo
                                              free resume builder for
                                              engineering free resume maker free
                                              free resume maker for teachers
                                              free resume maker for nurses where
                                              can i make a resume for free best
                                              resume maker for free free resume
                                              builder google free resume builder
                                              for government jobs good free
                                              resume maker free resume builder
                                              high school students free resume
                                              builder hiration free resume
                                              builder help free resume maker for
                                              high school students free resume
                                              maker no hidden fees free resume
                                              builder for healthcare free online
                                              resume maker for hr free high
                                              school resume maker free resume
                                              maker india free resume maker
                                              indian free resume maker indeed
                                              free resume maker in pdf free
                                              resume maker iphone free resume
                                              maker in online online resume
                                              maker free for internship free
                                              resume builder job seeker tools
                                              free resume maker for job online
                                              resume maker free for job how to
                                              make a resume for a job for free
                                              free resume builder linkedin free
                                              resume builder login free resume
                                              builder list free resume builder
                                              livecareer free resume builder
                                              without login free resume cover
                                              letter maker free resume builder
                                              no login free resume builder for
                                              lvn free resume maker microsoft
                                              word free resume maker malaysia
                                              free resume builder microsoft word
                                              free resume builder microsoft word
                                              download free resume builder mac
                                              free resume builder mod apk free
                                              resume builder modern free resume
                                              builder military free resume maker
                                              no sign up free resume maker no
                                              charge free resume maker no credit
                                              card free resume builder no
                                              payment free resume builder no
                                              credit card free resume builder no
                                              subscription free resume builder
                                              no work experience free resume
                                              maker online and download free
                                              resume maker online for freshers
                                              free resume maker online quora
                                              free resume maker online no cost
                                              with photo free resume maker
                                              online reddit free resume maker
                                              online with photo free resume
                                              maker online in india free resume
                                              maker pdf free resume maker
                                              professional free resume builder
                                              professional free resume builder
                                              printable online resume maker free
                                              pdf free resume maker with photo
                                              free resume maker and print free
                                              resume creator quora best free
                                              resume maker quora quick free
                                              resume maker free resume maker
                                              reddit free resume maker reviews
                                              free resume builder reddit 2020
                                              free resume builder rocket free
                                              resume builder resources free
                                              resume builder with references
                                              free resume builder no
                                              registration free online resume
                                              maker without registration free
                                              resume maker simple free resume
                                              maker software for windows 10 free
                                              resume maker software free resume
                                              maker software for windows 7 free
                                              resume builder sites quora free
                                              resume builder student free resume
                                              builder singapore free resume
                                              maker template free resume builder
                                              template free resume builder
                                              template download free resume
                                              builder tool free resume builder
                                              template printable free resume
                                              builder teenager free resume
                                              builder to download free resume
                                              builder template pdf free resume
                                              builder uk free resume builder
                                              upload free resume builder using
                                              linkedin free resume builder usa
                                              free online resume builder upload
                                              is there any free resume builder
                                              free resume builder veterans free
                                              resume video maker online visual
                                              resume maker free free download
                                              resume maker software+full version
                                              free resume maker without login
                                              free resume maker without
                                              watermark free resume maker with
                                              templates free resume maker word
                                              free resume builder with photo
                                              free resume builder websites free
                                              resume builder youtube free resume
                                              builder zety how to get free
                                              resume from zety best site to make
                                              free resume free resume builder
                                              online application free resume
                                              builder online with photo resume
                                              maker online free app free online
                                              resume maker australia online
                                              resume maker free for accountant
                                              best free resume making website
                                              best free resume maker online free
                                              cv creator maker / resume online
                                              builder pdf basic resume maker
                                              online free best creative resume
                                              maker online free what is the best
                                              free online resume builder free
                                              resume maker online no cost free
                                              resume builder online no cost
                                              download free online resume maker
                                              canva resume maker online free for
                                              college students creative resume
                                              maker online free for freshers
                                              creative resume maker online free
                                              download creative resume maker
                                              online free for freshers india
                                              free resume maker online download
                                              online resume maker professional
                                              free download online resume maker
                                              software free download online
                                              resume maker free for doctors
                                              resume builder online cv maker
                                              download pdf free online resume
                                              maker for freshers free download
                                              online resume maker free for
                                              software developer free resume
                                              maker online free resume maker
                                              online free for freshers india
                                              free resume builder online free
                                              download resume maker online free
                                              for freshers with photo free
                                              online resume maker for students
                                              resume maker online free for
                                              teachers online free resume maker
                                              for experienced free resume maker
                                              online india http /www.resume
                                              maker.online/ free=pdf resume
                                              maker online free indian creative
                                              resume maker online free india
                                              free online infographic resume
                                              maker job resume maker online free
                                              free resume builder online without
                                              login creative resume maker online
                                              free without login modern resume
                                              maker online free online resume
                                              maker free for marriage resume
                                              builder online cv maker download
                                              pdf free mod apk best site for
                                              resume maker free resume builder
                                              online no sign up normal resume
                                              maker online free online resume
                                              maker online free one page resume
                                              maker online free free resume
                                              builder online pdf online free
                                              resume maker pdf free professional
                                              resume maker online free online
                                              resume maker printable free online
                                              resume maker with photo creative
                                              resume maker online free pdf
                                              creative resume maker online free
                                              quora free resume builder online
                                              sites resume maker online free
                                              simple simple resume maker online
                                              free for freshers creative resume
                                              maker online free for students
                                              free resume builder template
                                              online online resume maker free
                                              for freshers template top 10 free
                                              online resume maker video resume
                                              maker online free what is the best
                                              free online video maker free
                                              resume builder microsoft word
                                              online creative resume maker
                                              online free word format creative
                                              resume maker online free with
                                              photo www.resume maker.online free
                                              online resume maker zety online
                                              resume builder free zety free
                                              resume builder and download reddit
                                              free resume builder and download
                                              no payment free resume builder and
                                              download quora free resume builder
                                              and download indeed totally free
                                              resume builder and download free
                                              resume builder and free download
                                              india free resume builder app
                                              download free resume builder and
                                              free download for freshers where
                                              can i make a resume and download
                                              it for free how to download a free
                                              resume how to create and download
                                              a free resume how to download
                                              resume from resume builder for
                                              free how can i download resume now
                                              for free best free resume builder
                                              and download how to download
                                              resume free from zety completely
                                              free resume builder and download
                                              free resume maker and download
                                              free free resume maker and
                                              download online free resume
                                              builder download full version free
                                              resume maker and download india
                                              how to download zety cv for free
                                              free modern resume builder and
                                              download
                                            </p>
                                          </div>
                                        </div>{" "}
                                      </div>{" "}
                                    </div>{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
