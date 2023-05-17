import React from "react";

export const Loader = (props) => {
  const { color, size } = props;
  const lcolor = color ? color : "text-white";
  const lsize = size ? size : "spinner-border-white";
  return (
    <div
      className={`spinner-border spinner-border-sm text-black ${
        lcolor + " " + lsize
      }`}
      role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};
