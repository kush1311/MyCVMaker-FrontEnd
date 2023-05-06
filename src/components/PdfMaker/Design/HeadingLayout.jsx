import { useContext } from "react";
import { Context } from "../../GlobalContextApi/GlobalContextApi";

const layoutClass = (selected) => {
  if (selected) return "p-3 border-2 border-blue-600 bg-white";
  return "p-3 border-2 bg-white hover:border-blue-600 hover:cursor:pointer";
};
const layoutBackgroundClass = "bg-slate-300";

const HeadingLayout = (props) => {
  const api = useContext(Context);
  const clickHandler = (number) => {
    api.setHeadingLayout(number);
  };
  const propsObj = { api: api, clickHandler: clickHandler };
  const { data } = props;
  return (
    <>
      <div>
        <div
          style={{ fontSize: "0.5rem" }}
          className='grid gap-2 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'>
          <Layout1 {...propsObj} />
          <Layout2 {...propsObj} />
          <Layout3 {...propsObj} />
          <Layout4 {...propsObj} />
          <Layout5 {...propsObj} />
          <Layout6 {...propsObj} />
          <Layout7 {...propsObj} />
          <Layout8 {...propsObj} />
          <Layout9 {...propsObj} />
        </div>
      </div>
    </>
  );
};
export default HeadingLayout;
const LayoutImage = () => {
  return (
    <div
      className={`h-10 w-10 rounded-full mx-auto my-auto flex ${layoutBackgroundClass}`}></div>
  );
};
const LayoutPlaceholder = ({ className, childClassName }) => {
  return (
    <div
      style={{ minHeight: "5px" }}
      className={`flex text-center m-0 w-full h-full ${layoutBackgroundClass} ${className}`}>
      <strong className={`my-auto ${childClassName}`}>AAA</strong>
    </div>
  );
};

const Layout1 = ({ clickHandler, api }) => {
  const num = 1;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div className='my-2 col-span-3 flex'>
          <LayoutPlaceholder
            childClassName='mx-auto'
            className='my-0 py-0 h-5'
          />
        </div>
      </div>
    </div>
  );
};
const Layout2 = ({ clickHandler, api }) => {
  const num = 2;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div className='my-2 col-span-3 flex border-y-2 border-black'>
          <LayoutPlaceholder
            childClassName='mx-auto'
            className='my-0 py-0 h-5'
          />
        </div>
      </div>
    </div>
  );
};
const Layout3 = ({ clickHandler, api }) => {
  const num = 3;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div className='my-2 flex border-y-2 border-black'>
          <LayoutPlaceholder
            childClassName='mx-auto'
            className='my-0 py-0 h-5'
          />
        </div>
      </div>
    </div>
  );
};
const Layout4 = ({ clickHandler, api }) => {
  const num = 4;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div></div>
        <div className='my-2 flex border-y-2 border-black'>
          <LayoutPlaceholder
            childClassName='mx-auto'
            className='my-0 py-0 h-5'
          />
        </div>
      </div>
    </div>
  );
};
const Layout5 = ({ clickHandler, api }) => {
  const num = 5;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div></div>
        <div></div>
        <div className='my-2 flex border-y-2 border-black'>
          <LayoutPlaceholder
            childClassName='mx-auto'
            className='my-0 py-0 h-5'
          />
        </div>
      </div>
    </div>
  );
};
const Layout6 = ({ clickHandler, api }) => {
  const num = 6;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div className='my-2 col-span-3 flex border-b-2 border-black'>
          <LayoutPlaceholder
            childClassName='mx-auto'
            className='my-0 py-0 h-5 bg-slate-100 bg-stone-100'
          />
        </div>
      </div>
    </div>
  );
};
const Layout7 = ({ clickHandler, api }) => {
  const num = 7;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div className='my-2 col-span-3 flex border-b-2 border-black'>
          <LayoutPlaceholder
            childClassName='mr-auto ml-0 pl-0'
            className='mr-auto my-0 py-0 h-5 pl-0 bg-slate-100 bg-stone-100'
          />
        </div>
      </div>
    </div>
  );
};
const Layout8 = ({ clickHandler, api }) => {
  const num = 8;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div className='my-2 col-span-3 flex'>
          <LayoutPlaceholder
            childClassName='mr-auto ml-0 pb-1 border-b-2 border-black'
            className='mr-auto my-0 py-0 h-5 pl-0 bg-slate-100 bg-stone-100'
          />
        </div>
      </div>
    </div>
  );
};
const Layout9 = ({ clickHandler, api }) => {
  const num = 9;
  const selected = api.state.headingLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='bg-stone-100 p-3 grid grid-cols-3'>
        <div className='my-2 col-span-3 flex'>
          <LayoutPlaceholder
            childClassName='mr-auto ml-0 pb-1'
            className='mr-auto my-0 py-0 h-5 pl-0 bg-slate-100 bg-stone-100'
          />
        </div>
      </div>
    </div>
  );
};
