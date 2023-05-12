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
import { getResume, getResumeData, message } from "../../utils/apiCalls";
import { Helmet } from "react-helmet";
import PleaseLoginModal from "../Modals/PleaseLoginModal";
import { LOGIN_ROUTE } from "../../constants/routes";
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
  setSave = (bool) => {
    this.setState({
      saving: bool,
    });
  };
  set_CV_From_LocalStorage = () => {
    const o = {};
    let obj = JSON.parse(localStorage.getItem("store"));
    this.context.updateCV(obj);
  };
  set_LocalStorage = () => {
    let obj = {
      cv: [
        {
          uniqueId: "header",
          hide: false,
          headerName: "Header",
          componentId: "headerComponent",
          data: [
            {
              name: "",
              placeholder: "Name",
              hide: false,
            },
            {
              name: "",
              placeholder: "Designation",
              hide: false,
            },
            {
              name: "",
              placeholder: "Description",
              hide: false,
            },
            [],
          ],
        },
      ],
      rows: [[0]],
      footer: { left: "", center: " ", right: "" },
      imageConfig: {
        URL: "",
        hide: false,
      },
      headerListItemConfig: {
        style: "plain",
        showIcons: true,
      },
      skillsItemConfig: {
        style: "bubble",
      },
      styles: {
        headerName: {
          fontStyle: null,
          fontWeight: null,
          fontSize: 45,
          color: "#000000",
          paddingLeft: 0,
          paddingTop: 5,
          marginLeft: "auto",
          marginRight: "auto",
        },
        designation: {
          fontStyle: null,
          fontWeight: null,
          fontSize: 20,
          paddingLeft: 0,
          paddingTop: 5,
          marginLeft: 0,
          marginRight: "auto",
        },
        description: {
          textAlign: "justify",
          fontSize: 12,
          fontStyle: null,
          fontWeight: null,
          color: "#000000",
          paddingRight: "0",
          paddingLeft: "0",
          paddingTop: "1",
          paddingBottom: "1",
        },
        image: {
          // borderWidth: "5px",
          // borderColor: "#000000",
          // borderStyle: "solid",
          // borderRadius: "",
          marginLeft: 0,
          marginRight: "auto",
          padding: 10,
          paddingLeft: 0,
        },
        listItem: {
          fontSize: 15,
          color: "#000000",
          borderColor: "#000000",
          backgroundColor: "#e3e3e3",
          // marginHorizontal: "10",
        },
        headerContainer: {
          backgroundColor: "#ffffff",
          paddingHorizontal: 3,
          paddingVertical: 3,
        },
        subContainer: {
          flexGrow: "1",
          flexShrink: "1",
        },
        container: {
          heading: {
            marginTop: "15px",
          },
          title: {
            marginTop: "10px",
          },
          subtitle: {
            marginTop: "10px",
          },
          text: {
            marginTop: "5px",
          },
        },
        general: {
          lineHeight: "1.2",
          letterSpacing: "0",
          fontFamily: "Calibri",
          paddingRight: "20px",
          paddingLeft: "20px",
          backgroundColor: "#ffffff",
        },
        header: {
          textAlign: "justify",
          fontSize: 20,
          fontStyle: null,
          fontWeight: null,
          color: "#007BC8",
          backgroundColor: "#e3e3e3",
          borderWidth: 2,
          //! Remove Border - Color
          borderColor: "#000000",
          paddingRight: "3",
          paddingLeft: "3",
          //
          paddingTop: "0",
          paddingBottom: "0",
        },
        title: {
          textAlign: "justify",
          fontSize: 20,
          fontStyle: null,
          fontWeight: null,
          color: "#000000",
        },
        subtitle: {
          textAlign: "justify",
          fontSize: 16,
          fontStyle: null,
          fontWeight: null,
          color: "#000000",
        },
        text: {
          textAlign: "justify",
          fontSize: 12,
          fontStyle: null,
          fontWeight: null,
          color: "#000000",
        },
        skills: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      },
      headerLayout: 1,
      headerCustomFieldLayout: 2,
      headingLayout: 9,
    };
    localStorage.setItem("store", JSON.stringify(obj));
  };
  callCVData = async () => {
    const res = await getResumeData();
    if (!res) {
      alert("Server Down");
    } else if (res === message.logout) {
      this.setState({
        isAuth: false,
      });
    } else if (res === message.server_error) {
      alert("Server Down");
    } else {
      //console.log(res);
      this.context.updateCV(res);
    }
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
  componentDidMount() {
    //console.log(this.context.state.editor);
    this.setHeader();
    this.onL();
    setInterval(() => {
      // //console.log("object");
      this.onL();
    }, 800);
  }
  render() {
    const rId = localStorage.getItem("%ru!I#d");
    const userId = localStorage.getItem("%su!I#d");
    if (!this.state.isAuth) {
      return <Redirect to={LOGIN_ROUTE} />;
    }
    if (!this.context.cv && userId && rId) {
      this.callCVData();
    }
    if (!userId && !rId && !this.context.cv) {
      if (!this.context.cv && localStorage.getItem("store")) {
        this.set_CV_From_LocalStorage();
      } else if (!localStorage.getItem("store")) {
        this.set_LocalStorage();
      } else {
        return <Redirect to={LOGIN_ROUTE} />;
      }
    }
console.log('this.context.state.pleaseLoginModalShowed', this.context.state.pleaseLoginModalShowed);
    return (
      <>
        {this.context.state.fullscreen ? (
          <Fullscreen src={this.state.src} />
        ) : (
          <></>
        )}
        {
          this.context.state.pleaseLoginModalShowed ? (<></>) : (<PleaseLoginModal/>)
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
