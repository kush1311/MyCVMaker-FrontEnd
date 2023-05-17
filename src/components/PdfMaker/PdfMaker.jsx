import React, { Component, lazy, Suspense } from "react";
import GlobalContextApi, {
  Context,
} from "../GlobalContextApi/GlobalContextApi";
import { HiddenPdf } from "./HiddenPdf/HiddenPdf";
import PDFViewer from "./PDFViewer/PDFViewer";
import Sidebar from "./Sidebar/Sidebar";
import Editor from "./Editor/Editor";
import pmaker from "./PdfMaker.module.css";
import Navbar from "./Navbar/Navbar";
import Fullscreen from "./Fullscreen/Fullscreen";
import { useState } from "react";
import { useEffect } from "react";
import clone from "just-clone";
import { AuthContext } from "./../ProtectedRoutes/AuthenticationApi";
import { getAllResumes } from "../ProtectedRoutes/ProtectedRoute";
import { Redirect } from "react-router-dom";
import { getResume, getResumeData, getResumeTemplateData, message, verifyTokenApiCall } from "../../utils/apiCalls";
import { Helmet } from "react-helmet";
import PleaseLoginModal from "../Modals/PleaseLoginModal";
import { LOGIN_ROUTE } from "../../constants/routes";
import { Loader } from "../AllLoaders/Loaders";
// const PDFViewer = lazy(() => import("./PDFViewer/PDFViewer"));

// TODO: Lazy loading of HiddenPdf could be solution for slow rendring
export default class PdfMaker extends Component {
  state = {
    text: "",
    src: "",
    count: 0,
    email: "hetdesai360@gmail.com",
    password: "pass",
    resumeId: "",
    cv: "",
    styles: "",
    rows: "",
    imageConfig: "",
    footer: "",
    skillsItemConfig: "",
    headerListItemConfig: "",
    version: "",
    isAuth: true,
    userId: null,
  };
  componentDidUpdate() {
    if (
      document.getElementById("Thisisid") &&
      document.getElementById("Thisisid").src &&
      document.getElementById("Thisisid").src !== this.state.src
    ) {
      this.setState({
        src: document.getElementById("Thisisid").src,
      });
    }
    if (this.state.userId === null && this.context.userId !== null && this.context.currentResumeId !== null) {
      this.handleCheckStoreAvailibilityInLocalStorage();
    }
  }

  getPdfUrl = () => {
    if (document.getElementById("Thisisid") != null) {
      var src = document.getElementById("Thisisid").src;
      if (src !== this.state.src) {
        this.setState({
          src: src,
        });
      }
    }
  };
  // ! Need to find solution => It occurs 5 times in a second
  trigger = () => {
    setTimeout(() => {
      this.onL();
    }, 200);
  };
  onL = () => {
    // //console.log("1 Rendering..........");
    try {
      var ifr = document.getElementById("Thisisid");
      if (this.state.src === ifr.src) {
        // this.trigger();
      } else {
        this.setState({
          src: ifr.src,
        });
      }
    } catch (e) {}
  };

  setHeader = () => {
    if (this.context.state.cv && this.context.state.cv[0]) {
      this.context.setEditor(
        true,
        "headerComponent",
        this.context.state.cv[0].data,
        "header"
      );
    } else {
      setTimeout(() => {
        this.setHeader();
      }, 800);
    }
  };

  setResumeDataInContextAndLocalStorage (data) {
    this.setStoreInLocalStorage(data, this.context.currentResumeId);
    this.setStoreInContext(data);
  };

  handleSettingResumeDataTemplateForNotLoggedInUser = async () => {
    if (!this.getStoreFromLocalStorage()) {
      const templateData = await getResumeTemplateData();
      this.setResumeDataInContextAndLocalStorage(templateData.data);
    } else {
      this.setResumeDataInContextAndLocalStorage(this.getStoreFromLocalStorage());
    }
  };

  verifyTokenHandler = async () => {
    try {
      const result = await verifyTokenApiCall();
      if (result && result.status && result.status === 200) {
        this.context.handleIsUserLoggedIn(true);
        this.context.handleSetUserId(result.userId);
        this.context.handleSetResumeIdArray([...result.resumeIdArray]);
        this.context.handleSetCurrentResumeId(result.resumeIdArray[0]);
      } else {
        console.log('Unexpected result came from handleIsUserLoggedIn()')
        console.log(result);
        alert("Something went wrong")
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 401 && error.response.data && error.response.data.message) {
        const { message } =error.response.data;
        if (message === 'TOKEN_NOT_PRESENT' || message === 'UNAUTHORIZED') {
          this.context.handleIsUserLoggedIn(false);
          await this.handleSettingResumeDataTemplateForNotLoggedInUser();
        }
      } else if (message === 'TOKEN_NOT_PRESENT') {
          this.context.handleIsUserLoggedIn(true);
      } else if (error.message === 'Network Error') {
        this.context.handleNetworkError(true);
      } else {
        console.log(error.message);
        alert(`Something went wrong ${error.message}`);
      }

    }
  }
  getStoreFromLocalStorage () {
    return JSON.parse(localStorage.getItem('store'));
  }
  setStoreInLocalStorage(data, currentResumeId) {
    const newData = { ...data };
    newData.currentResumeId = currentResumeId || "NOT_LOGGED_IN";
    localStorage.setItem('store', JSON.stringify(newData));
  }
  setStoreInContext(data) {
    this.context.updateCV(data);
  }
  handleSetResumeData = async () => {
    if (!this.context.userId || !this.context.currentResumeId) {
      alert("Cannot get your resume");
      return;
    }
    try {
      const result = await getResumeData(this.context.userId, this.context.currentResumeId);
      if (result && result.data && result.status && result.status === 200) {
        console.log('***************************************');
        console.log(result.data[0]);
        console.log('***************************************');
        this.setResumeDataInContextAndLocalStorage(result.data[0])
        // TODO: SHOW loader until this processes completes
      } else {
        console.log("Can't find resume")
      }
    } catch (error) {
      console.log(error);
      alert(`Something went wrong ${error.message}`);
    }
  }
  deleteStoreFromLocalStorage () {
    localStorage.removeItem('store');
  }
  handleAvailableStoreData () {
    const data = this.getStoreFromLocalStorage();
    if (data.currentResumeId) {
      if (!this.context.resumeIdArray.includes(data.currentResumeId) && data.currentResumeId !== "NOT_LOGGED_IN") {
        this.deleteStoreFromLocalStorage();
        this.handleSetResumeData();
      } else if (data.currentResumeId === "NOT_LOGGED_IN" || this.context.resumeIdArray.includes(data.currentResumeId)) {
        if ("userWantThisLocalChanges") {
          /* TODO:
          Retrieve resume data and check is there any difference. 
          If yes then Ask user, changes is wanted or not
          */
          this.deleteStoreFromLocalStorage();
          this.handleSetResumeData();
        } else {
          this.deleteStoreFromLocalStorage();
          this.handleSetResumeData();
        }
      }
    } else {
      this.deleteStoreFromLocalStorage();
      this.handleSetResumeData();
    }
  }
  handleCheckStoreAvailibilityInLocalStorage = async () => {
    if (this.getStoreFromLocalStorage()) {
      this.handleAvailableStoreData();
    } else {
      this.handleSetResumeData();
    }
    this.setState({
      userId: this.context.userId,
    })
  }
  componentDidMount() {
    //console.log(this.context.state.editor);
    this.setHeader();
    this.onL();
    setInterval(() => {
      // //console.log("object");
      this.onL();
    }, 800);
    this.verifyTokenHandler();
  }
  getPleaseLoginModalShowedValueFromLocalStorage () {
    return localStorage.getItem('pleaseloginmodalshowed');
  }
  shallGivePleaseLoginModal () {
    return !this.context.networkError && this.context.isUserLoggedIn !== null && !this.context.pleaseLoginModalShowed && !this.context.isUserLoggedIn && (this.getPleaseLoginModalShowedValueFromLocalStorage() !== 'yes');
  }
  updateStoreInLocalStorage () {
    if (this.context.cv && this.context.currentResumeId) {      
    const bodyData = {
      cv: this.context.cv,
      styles: this.context.styles,
      rows: this.context.state.rows,
      footer: this.context.state.footer,
      imageConfig: this.context.state.imageConfig,
      headerListItemConfig: this.context.state.headerListItemConfig,
      skillsItemConfig: this.context.state.skillsItemConfig,
      headerLayout: this.context.state.headerLayout,
      headerCustomFieldLayout: this.context.state.headerCustomFieldLayout,
      headingLayout: this.context.state.headingLayout,
      version: this.context.state.version,
  }
  this.setStoreInLocalStorage(bodyData, this.context.currentResumeId);
  }
}
  render() {
    console.log('this.context.isUserLoggedIn ---> ', this.context.isUserLoggedIn);

    if (!this.context.cv && this.context.networkError !== true && (this.context.isUserLoggedIn === null || this.context.isUserLoggedIn === undefined)) {
      return <Loader color='text-black' size='spinner-border-lg' />;
    }

    console.log('this.state.userId --> before checking CV is in context', this.state.userId);
    if (!this.context.cv) {
      return <Loader color='text-black' size='spinner-border-lg' />;
    }
    // this.updateStoreInLocalStorage()
    console.log('--------------------- this.context.state.pleaseLoginModalShowed ---------------------', this.context.state.pleaseLoginModalShowed);
    console.log(this.context.state.pleaseLoginModalShowed && !this.context.isUserLoggedIn);
    console.log('this.context.networkError', this.context.networkError);
    console.log('To show modal condition', this.context.networkError,this.context.networkError && this.context.isUserLoggedIn !== null && !this.context.state.pleaseLoginModalShowed && this.context.isUserLoggedIn);
    console.log('-------------- CV -----------');
    console.log('this.context.cv BOOLEAN--> ', Boolean(this.context.cv));
    console.log(this.context.cv);
    return (
      <>
        {this.context.state.fullscreen ? (
          <Fullscreen src={this.state.src} />
        ) : (
          <></>
        )}
        {
          this.shallGivePleaseLoginModal() ? (<PleaseLoginModal/>) : (<></>)
        }
        
        <div className={`${pmaker.layout} fluid-container`}>
          <Helmet>
            <title> Editor </title>
            <meta
              name='description'
              content='Editor to create resume from scratch.'
            />
          </Helmet>
          <Navbar />

          <HiddenPdf />

          <div
            style={{ maxWidth: "2560px" }}
            className={"fluid-container mx-auto"}>
            <div className='row p-0 m-0'>
              <div
                style={{ maxHeight: "90vh" }}
                className={`${pmaker.sidebar} col-md-2 p-0 m-0 pt-2 overflow-y-auto overflow-x-hidden`}>
                {/* Make Editor and Sidebar scrollable */}
                <Sidebar />
              </div>
              <div className={`col-md-5 flex flex-col mt-1`}>
                <Editor />
              </div>
              <div id='id' className='col-md-4'>
                <PDFViewer src={this.state.src} />
              </div>
              <div className='col-md-1 p-auto text-center'></div>
            </div>
          </div>
          {this.getPdfUrl()}
          <Test />
        </div>
      </>
    );
  }
}

PdfMaker.contextType = Context;

// todo: To solve the issue of rerendering of pdfviewer try combination of useeffect and useState
const Test = () => {
  const [src, setSrc] = useState(null);
  useEffect(() => {}, []);
  // //console.log(src);
  return <></>;
};
