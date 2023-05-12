import React from 'react'

function PDFViewPageNevigation({pageNumber, setPageNum, numOfPages, api}) {
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
    </>
  )
}

export default PDFViewPageNevigation;