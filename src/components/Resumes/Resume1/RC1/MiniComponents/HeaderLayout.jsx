import { useContext } from "react";
import { Context } from "../../../../GlobalContextApi/GlobalContextApi";

const layoutClass = (selected) => {
  if (selected) return "py-1 bg-stone-100 border-2 border-blue-600";
  return "py-1 bg-stone-100 border-2 hover:border-blue-600 hover:cursor-pointer";
};
const layoutBackgroundClass = "bg-slate-400";

const HeaderLayout = (props) => {
  const api = useContext(Context);

  const clickHandler = (number) => {
    if (number === 1) {
      api.setHeaderCustomFieldLayout(2);
    } else {
      api.setHeaderCustomFieldLayout(1);
    }
    api.setHeaderLayout(number);
  };
  const propsObj = { api: api, clickHandler: clickHandler };
  const { data } = props;
  //console.log(data);
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
        </div>
      </div>
    </>
  );
};
export default HeaderLayout;
const LayoutImage = () => {
  return (
    <div
      className={`h-10 w-10 rounded-full mx-auto my-auto flex ${layoutBackgroundClass}`}></div>
  );
};
const LayoutPlaceholder = ({ className }) => {
  return (
    <div
      style={{ minHeight: "5px" }}
      className={`m-0 w-full h-1 my-1 px-1 ${layoutBackgroundClass} ${className}`}></div>
  );
};
export { LayoutPlaceholder };
const LayoutListItem = () => {
  return (
    <div className='w-10 px-1 mx-auto'>
      <LayoutPlaceholder />
    </div>
  );
};
const LayoutName = () => {
  return (
    <div className='w-14 px-1'>
      <LayoutPlaceholder />
      <LayoutPlaceholder />
    </div>
  );
};
const LayoutDescription = () => {
  return (
    <div className='px-1 w-auto'>
      <LayoutPlaceholder />
      <LayoutPlaceholder />
      <LayoutPlaceholder />
    </div>
  );
};
const Layout1 = ({ clickHandler, api }) => {
  const selected = api.state.headerLayout === 1;
  //console.log(selected);
  return (
    <div onClick={() => clickHandler(1)} className={layoutClass(selected)}>
      <div className='flex'>
        <LayoutImage />
        <div className='flex flex-col w-3/4'>
          <LayoutName />
          <LayoutDescription />
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <LayoutListItem />
        <LayoutListItem />
        <LayoutListItem />
        <LayoutListItem />
      </div>
    </div>
  );
};
const Layout2 = ({ clickHandler, api }) => {
  const selected = api.state.headerLayout === 2;
  return (
    <div onClick={() => clickHandler(2)} className={layoutClass(selected)}>
      <div className='grid grid-cols-4'>
        <div className='col-span-3'>
          <LayoutImage />
          <div className='flex flex-col'>
            <LayoutName />
            <LayoutDescription />
          </div>
        </div>
        <div className='col-span-1 px-auto'>
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
        </div>
      </div>
    </div>
  );
};
const Layout3 = ({ clickHandler, api }) => {
  const num = 3;
  const selected = api.state.headerLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='grid grid-cols-1'>
        <div className=''>
          <div className='grid grid-cols-3'>
            <div className='col-span-2'>
              <LayoutImage />
              <LayoutName />
            </div>
            <div className='col-span-1'>
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
            </div>
          </div>
          <div>
            <LayoutDescription />
          </div>
        </div>
      </div>
    </div>
  );
};
const Layout4 = ({ clickHandler, api }) => {
  const num = 4;
  const selected = api.state.headerLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='grid grid-cols-4'>
        <div className='col-span-3'>
          <div className='grid grid-cols-2'>
            <LayoutImage />
            <div className='my-auto'>
              <LayoutName />
            </div>
          </div>
          <div>
            <LayoutDescription />
          </div>
        </div>
        <div className='col-span-1 px-auto'>
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
          <LayoutListItem />
        </div>
      </div>
    </div>
  );
};
const Layout5 = ({ clickHandler, api }) => {
  const num = 5;
  const selected = api.state.headerLayout === num;
  return (
    <div onClick={() => clickHandler(num)} className={layoutClass(selected)}>
      <div className='grid grid-cols-1'>
        <div className=''>
          <div className='grid grid-cols-3'>
            <LayoutImage />
            <div className='my-auto'>
              <LayoutName />
            </div>
            <div className='px-auto'>
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
              <LayoutListItem />
            </div>
          </div>
          <div>
            <LayoutDescription />
          </div>
        </div>
      </div>
    </div>
  );
};
