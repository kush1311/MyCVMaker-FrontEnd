import React, { useContext } from "react";
import { border } from "../../../../constants/styles";
import { Context } from "../../../GlobalContextApi/GlobalContextApi";

const Footer = () => {
  const api = useContext(Context);
  const changeHandler = (side, e) => {
    api.setFooter(side, e.target.value);
  };
  return (
    <>
      {/* <h6 className='text-xl'>
        {" "}
        <strong>Footer</strong>{" "}
      </h6> */}
      <section className={`bg-white mt-3 p-2 py-3 rounded ${border}`}>
        <div className='text-left form-group mx-2'>
          <label htmlFor='i1'>Item 1</label>
          <input
            onChange={(e) => changeHandler("left", e)}
            className='form-control'
            id='i1'
            value={api.state.footer.left}
          />
        </div>
        <div className='text-left form-group mx-2'>
          <label htmlFor='i2'>Item 2</label>
          <input
            onChange={(e) => changeHandler("center", e)}
            className='form-control'
            id='i2'
            value={api.state.footer.center}
          />
        </div>
        <div className='text-left form-group mx-2'>
          <label htmlFor='i3'>Item 3</label>
          <input
            onChange={(e) => changeHandler("right", e)}
            className='form-control'
            id='i3'
            value={api.state.footer.right}
          />
        </div>
      </section>
    </>
  );
};

export default Footer;
