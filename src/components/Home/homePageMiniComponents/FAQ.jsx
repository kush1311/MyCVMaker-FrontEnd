import { useState } from "react";
import {
    ChevronDownIcon,
    ChevronUpIcon,
  } from "@heroicons/react/outline";

const DropdownArrow = ({ flag }) => {
    return (
      <span className='flex w-6 ml-auto'>
        {" "}
        {flag ? <ChevronUpIcon /> : <ChevronDownIcon />}{" "}
      </span>
    );
  };

export const FAQ = () => {
    const [q1, setQ1] = useState(false);
    const [q2, setQ2] = useState(false);
  
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
      </article>
    );
  };
  