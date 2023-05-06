import React from "react";
import {
  Text,
  Font,
  Page,
  View,
  Document,
  StyleSheet,
  PDFViewer as Pv,
  Svg,
  Path,
} from "@react-pdf/renderer";
import "./HiddenPdf.css";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import RS from "../../../Fonts/Riska Script.otf";
import Os from "../../../Fonts/OpenSans1.ttf";
import SkillsHiddenPdf from "./SkillsHiddenPdf/SkillsHiddenPdf";
import HeaderHiddenPdf from "./HeaderHiddenPdf/HeaderHiddenPdf";
import ExperienceHiddenPdf from "./ExperienceHiddenPdf/ExperienceHiddenPdf";
import CustomHiddenPdf from "./CustomHiddenPdf/CustomHiddenPdf";
import FooterHiddenPdf from "./FooterHiddenPdf/FooterHiddenPdf";
import Calibri_Regular from "../../../Fonts/calibri-font-family/calibri-regular.ttf";

import Calibri_Bold from "../../../Fonts/calibri-font-family/calibri-bold.ttf";

import Calibri_Italic from "../../../Fonts/calibri-font-family/calibri-italic.ttf";

import Calibri_Bold_Italic from "../../../Fonts/calibri-font-family/calibri-bold-italic.ttf";

import Times_New_Roman from "../../../Fonts/Times-New-Roman/times new roman.ttf";

import Times_New_Roman_Bold from "../../../Fonts/Times-New-Roman/times new roman bold.ttf";

import Times_New_Roman_Italic from "../../../Fonts/Times-New-Roman/times new roman italic.ttf";

import Times_New_Roman_Bold_Italic from "../../../Fonts/Times-New-Roman/times new roman bold italic.ttf";
class HiddenPdf extends React.Component {
  state = {
    label: this.context,
  };
  render() {
    return (
      <>
        <div>
          <Pv className='thisisclass m-0 p-0' id='Thisisid' showToolbar={false}>
            <MyDocument api={this.context} />
          </Pv>
        </div>
      </>
    );
  }
}
HiddenPdf.contextType = Context;
export { HiddenPdf };

Font.register({
  family: "Rubik Beastly",
  fonts: [
    {
      src: "https://fonts.googleapis.com/css2?family=Sedgwick+Ave&display=swap",
    },
  ],
});
Font.register({
  family: "Calibri",
  fonts: [
    {
      src: Calibri_Regular,
    },
    {
      src: Calibri_Bold,
      fontWeight: "bold",
    },
    {
      src: Calibri_Italic,
      fontStyle: "italic",
    },
    {
      src: Calibri_Bold_Italic,
      fontStyle: "italic",
      fontWeight: "bold",
    },
  ],
});
Font.register({
  family: "Times_New_Roman",
  fonts: [
    {
      src: Times_New_Roman,
    },
    {
      src: Times_New_Roman_Bold,
      fontWeight: "bold",
    },
    {
      src: Times_New_Roman_Italic,
      fontStyle: "italic",
    },
    {
      src: Times_New_Roman_Bold_Italic,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  src: RS,
  family: "Riska Script",
});
Font.register({
  src: Os,
  family: "Open Sans",
});
// const styles = StyleSheet.create({
//   bold: {
//     fontFamily: "Riska Script",
//   },
// });

// Set The Layout And Content In MyDocument **************************************************************************************
// *
// *
// *
// *
// ! Font options for every text [header, title, ......]
// todo: check for rights of using different fonts, otherwise it can act as copyright violation
const MyDocument = ({ api }) => {
  const page = api.styles.page;
  const general = api.styles.general;
  const title = api.styles.title;
  const subtitle = api.styles.subtitle;
  const fontFamily = general && general.fontFamily ? general.fontFamily : null;
  if (!api.state.cv) return null;
  if (!api.state.rows) return null;
  if (!api.state.cv.length) return null;
  if (!api.state.rows.length) return null;
  // console.log(api.state.rows);
  return (
    <Document
      author='www.MyCVMaker.com'
      producer='www.MyCVMaker.com'
      creator='MyCVMaker'
      subject='Resume'
      language='English'
      pdfVersion='1.0.0'>
      <Page size='A4'>
        <View
          style={{
            fontFamily: fontFamily,
          }}>
          {/* {!api.state.cv?return null:<></>} */}
          {api.state &&
            api.state.rows &&
            api.state.rows.map((indexArray, i) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}>
                  {indexArray &&
                    indexArray.map((index, subIndex) => {
                      const rootObj = api.cv[index];
                      // //console.log(index);
                      // //console.log(rootObj);
                      // if (!rootObj) return null;
                      // //console.log(rootObj.headerName);
                      if (!rootObj) return null;
                      if (!rootObj.headerName) return null;
                      return (
                        <View
                          style={{
                            ...api.styles.subContainer,
                            flex: "1",
                            lineHeight: general.lineHeight,
                            letterSpacing: general.letterSpacing,
                            fontFamily: general.fontFamily,
                            paddingRight:
                              rootObj.headerName === "Header"
                                ? 0
                                : general.paddingRight,
                            paddingLeft:
                              rootObj.headerName === "Header"
                                ? 0
                                : general.paddingLeft,
                          }}
                          key={i}>
                          <WhichComponent api={api} rootObj={rootObj} />
                        </View>
                      );
                    })}
                </View>
              );
            })}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "auto",
            opacity: "0.6",
            // marginTop: "3px",
          }}
          fixed>
          <FooterHiddenPdf api={api} />
        </View>
      </Page>
    </Document>
  );
};
export { MyDocument };

const WhichComponent = ({ rootObj, api }) => {
  if (!rootObj) return null;
  const componentId = rootObj.componentId;
  if (componentId === "skillsComponent")
    return <SkillsHiddenPdf api={api} rootObj={rootObj} />;
  else if (componentId === "headerComponent") {
    return <HeaderHiddenPdf api={api} rootObj={rootObj} />;
  } else if (componentId === "experienceComponent") {
    return <ExperienceHiddenPdf api={api} rootObj={rootObj} />;
  } else if (componentId === "customComponent") {
    return <CustomHiddenPdf api={api} rootObj={rootObj} />;
  } else {
    return null;
  }
};
