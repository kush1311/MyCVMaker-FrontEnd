// *
// *
// *
// 'View Component' Of Pdf         **********************************
// *
// *
// *

import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import { Document as Doc, Page as Pg, pdfjs, Outline } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./PDFViewer.css";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const ref = React.createRef();

// const Demo = () => {
//   return (
//     <div>
//       <Pdf targetRef={ref} filename='code-example.pdf'>
//         {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
//       </Pdf>
//       <div ref={ref}>
//         <h1>Hello CodeSandbox</h1>
//         <h2>Start editing to see some magic happen!</h2>
//       </div>
//     </div>
//   );
// };
var count = 0;
const PDFViewer = (props) => {
  var w = window.innerWidth;
  const [width, height] = useWindowSize();
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const api = useContext(Context);
  const setPageNum = (i) => {
    if ((i === 1 && pageNumber < numOfPages) || (i === -1 && pageNumber > 1)) {
      //console.log(pageNumber + "  " + i);
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
  } catch (e) {}
  return (
    <>
      <div className='fluid-container mb-2'>
        <div className='row'>
          <div className='col-4 text-right'>
            {pageNumber > 1 ? (
              <button
                className='btn btn-sm bg-info text-white mx-auto'
                onClick={() => {
                  setPageNum(-1);
                }}>
                Previous
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className='col-4 text-center'>
            {" "}
            <strong style={{ fontSize: "1rem" }} className='mx-auto'>
              <span style={{ color: "#007bff" }}> {pageNumber}</span>
            </strong>
          </div>
          <div className='col-2'>
            {pageNumber === numOfPages ? (
              <></>
            ) : (
              <button
                className='btn btn-sm bg-info text-white mr-auto'
                onClick={() => {
                  setPageNum(1);
                }}>
                Next
              </button>
            )}
          </div>
          <div className='col-2 text-center'>
            {api.state.fullscreen ? (
              <button
                onClick={api.toggleFullscreen}
                className='bg-danger text-white btn btn-sm mr-0'>
                Close
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
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
// const PGComp = () => {
//   <Pg
//     height={api.state.fullscreen ? height * 0.9 : height1}
//     className='mx-auto border OutLine pg'
//     pageNumber={pageNumber}
//     loading={() => {
//       return <h1>Loading</h1>;
//     }}
//   />;
// };
const Comp = ({
  api,
  height,
  height1,
  pageNumber,
  onLoadSuccess,
  file,
  PGComp,
}) => {
  //console.log(file);
  try {
    return (
      <Doc
        loading={() => {
          return <h1>Loading was here</h1>;
        }}
        onLoadSuccess={onLoadSuccess}
        file={file}>
        {/* <PGComp /> */}
      </Doc>
    );
  } catch (e) {
    //console.log(e.message);
    return <h4>Wait....</h4>;
  }
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
