import React from "react";
import PDFViewer from "../PDFViewer/PDFViewer";

const Fullscreen = (props) => {
  return (
    <div style={style} id='fullscreen'>
      <PDFViewer {...props} />
    </div>
  );
};

export default Fullscreen;
const style = {
  position: "fixed",
  ["z-index"]: "2",
  width: "100vw",
  height: "100vh",
  overflow: "scroll",
  ["overflow-x"]: "hidden",
  ["background-color"]: "#000000de",
};
