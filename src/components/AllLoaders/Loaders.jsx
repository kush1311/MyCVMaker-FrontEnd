import React from "react";

export const Loader = (props) => {
  const { color, size } = props;
  const loaderColor = color ? color : "text-white";
  const loaderSize = size ? size : "1";
  return (
    <div
    style={{width: `${loaderSize}rem`, height: `${loaderSize}rem`}}
      className={`spinner-border spinner-border-sm text-black ${
        loaderColor + " " + loaderSize
      }`}
      role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="h-screen flex"><Loader color='text-sky-600 mx-auto my-auto' size='5' /></div>
  )
}

