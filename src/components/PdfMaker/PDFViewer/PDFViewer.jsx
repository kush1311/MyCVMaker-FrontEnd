// *
// *
// *
// 'View Component' Of Pdf         **********************************
// *
// *
// *

import React, { useContext, useLayoutEffect, useState } from "react";
import { Document as Doc, Page as Pg, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./PDFViewer.css";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import PDFViewPageNevigation from "./subComponents/PDFViewPageNevigation";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = (props) => {
  var w = window.innerWidth;
  const [width, height] = useWindowSize();
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const api = useContext(Context);
  const setPageNum = (i) => {
    if ((i === 1 && pageNumber < numOfPages) || (i === -1 && pageNumber > 1)) {
      setPageNumber(pageNumber + i);
    }
  };
  const onLoadSuccess = ({ numPages }) => {
    setNumOfPages(numPages);
  };
  // TODO It deosnt support IE8 or less for that use div.offsetWidth
  try {
    var div = document.getElementById("id").getBoundingClientRect();
    var height1 = Math.min(div.width * Math.sqrt(2) - 10, 0.8 * height);
  } catch (e) {
    console.log(e);
  }
  return (
    <>
      <PDFViewPageNevigation setPageNum={setPageNum} pageNumber={pageNumber} numOfPages={numOfPages} api={api} />
      <div className='my-auto p-0 d-flex justify-content-center mx-auto'>
        <Doc renderMode='canvas' onLoadSuccess={onLoadSuccess} file={props.src}>
          {/* <Doc renderMode='svg' onLoadSuccess={onLoadSuccess} file={pdfFile}> */}
          <Pg
            height={api.state.fullscreen ? height * 1.5 : height1}
            className='mx-auto border pg'
            pageNumber={pageNumber}
            loading={() => {
              return <h1>Loading</h1>;
            }}
          />
        </Doc>
      </div>
    </>
  );
};
export default PDFViewer;

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
