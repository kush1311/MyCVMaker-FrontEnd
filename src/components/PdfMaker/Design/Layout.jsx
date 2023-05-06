import { useContext, useState } from "react";
import HeaderLayout from "../../Resumes/Resume1/RC1/MiniComponents/HeaderLayout";
import { ReumeLayout } from "./ReumeLayout";
import { btnStyle, selectedStyle } from "./Design";
import HeadingLayout from "./HeadingLayout";
import { Context } from "../../GlobalContextApi/GlobalContextApi";

const Layout = () => {
  const api = useContext(Context);
  const [num, setNum] = useState(0);
  const object = { api, num };
  const clickHandler = (num) => {
    setNum(num);
  };
  return (
    <div className='grid grid-cols-3 gap-2'>
      <span
        onClick={() => clickHandler(1)}
        className={`${btnStyle} ${num === 1 ? selectedStyle : ""}`}>
        Resume Layout
      </span>
      <span
        onClick={() => clickHandler(2)}
        className={`${btnStyle} ${num === 2 ? selectedStyle : ""}`}>
        Header Layout
      </span>
      <span
        onClick={() => clickHandler(3)}
        className={`${btnStyle} ${num === 3 ? selectedStyle : ""}`}>
        Heading Layout
      </span>

      <div className='col-span-3'>
        <hr />
        <br />
        <DisplayComponent {...object} />
      </div>
    </div>
  );
};

const DisplayComponent = (props) => {
  const { api, num } = props;
  const obj = { api };
  switch (num) {
    case 1:
      return <ReumeLayout />;
    case 2:
      return <HeaderLayout />;
    case 3:
      return <HeadingLayout />;
    default:
      return (
        <strong className='justify-self-center'>
          * Please select section to change layout
        </strong>
      );
  }
};
export default Layout;
