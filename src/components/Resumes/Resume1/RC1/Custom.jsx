import React, { useContext } from "react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Context } from "../../../GlobalContextApi/GlobalContextApi";
import HeaderName from "./MiniComponents/HeaderName";
import { Hide as Hide2 } from "./MiniComponents/Hide";
import { Delete as Delete2 } from "./MiniComponents/Delete";
import {
  border,
  deleteContainer,
  deleteSpan,
  headerContainer,
  hideContainer,
  hideSpan,
} from "../../../../constants/styles";
import {
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";

// **
// **
// **

// todo: Hide toggling of entire component
const Custom = (props) => {
  const api = useContext(Context);
  const { data, uniqueId } = props;

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(data, result.source.index, result.destination.index);
    api.customReorderAfterDragAndDrop(items, uniqueId);
  };

  const dataFieldChangeHandler = (e, index) => {
    api.customDataFieldValueHandler(props.data, index, e.target.value);
  };
  const dataFieldHideHandler = (index) => {
    api.customDataFieldHideHandler(props.data, index);
  };
  const dataFieldDeleteHandler = (index) => {
    api.customDataFieldDeleteHandler(props.data, index);
  };
  const componentHideHandler = () => {
    api.hideComponent(props, props.uniqueId);
  };
  return (
    <div>
      <div className='flex'>
        <div className='ml-auto flex'>
          <span
            onClick={componentHideHandler}
            className={hideContainer + " bg-white border-2 border-blue-300"}
            hide={props.hide}>
            <span className={hideSpan + " w-6"}>
              {props.hide ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </span>
          <Delete2 uniqueId={props.uniqueId} />
        </div>
      </div>
      <HeaderName headerName={props.headerName} uniqueId={props.uniqueId} />
      <br />

      <AddElementDiv uniqueId={props.uniqueId} api={api} />

      {/* TODO: -----  Make it draggable */}
      <form>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='id-1'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='mx-auto px-0 my-3'>
                {props.data.map((obj, index) => {
                  // //console.log(obj);
                  const propsObj = {
                    api,
                    dataFieldChangeHandler,
                    dataFieldHideHandler,
                    dataFieldDeleteHandler,
                    index,
                    obj,
                  };
                  //console.log(obj);
                  if (!obj || obj.field === "From" || obj.field === "To")
                    return null;
                  return (
                    <Draggable
                      key={obj.type + index}
                      draggableId={obj.type + index}
                      index={index}
                      type='idk'>
                      {(provided, snapshot) => {
                        return (
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}>
                              <div
                                className={headerContainer + " mt-3 " + border}>
                                <div
                                  className='w-100 bg-secondary'
                                  style={{
                                    height: "20px",
                                    outline: "1px solid grey",
                                  }}
                                  {...provided.dragHandleProps}></div>
                                <div className='mt-1 p-2'>
                                  <WhichComponent
                                    propsObj={propsObj}
                                    obj={obj}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </form>
    </div>
  );
};
const WhichComponent = (props) => {
  const { obj, propsObj } = props;
  switch (obj.type) {
    case "title":
      let o1 = { ...propsObj, Component: Title };
      return <WithField {...o1} />;
    case "subtitle":
      let o2 = { ...propsObj, Component: Subtitle };
      return <WithField {...o2} />;
    case "description":
      let o3 = { ...propsObj, Component: Description };
      return <WithField {...o3} />;
    case "list":
      let o4 = { ...propsObj, Component: List };
      return <WithField {...o4} />;
    default:
      return null;
  }
};
const style = {
  outline: "1px solid #80bdff",
};

const AddElementDiv = (props) => {
  const { api, uniqueId } = props;
  const clickHandler = (name) => {
    api.customAddField(name, uniqueId);
  };
  return (
    <div className='fluid-container'>
      <div className='flex flex-wrap'>
        {api.state.customFieldFormats.map((obj, index) => {
          return (
            <div className='mx-1 mt-3'>
              <span
                onClick={() => clickHandler(obj.name)}
                className='btn btn-sm btn-primary flex'>
                <span className='flex w-4 mr-1'>
                  <PlusIcon />
                </span>
                {obj.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const WithField = (props) => {
  return (
    <div className='form-floating text-left'>
      <props.Component {...props} />
    </div>
  );
};
const Hide = (props) => {
  return (
    <span
      onClick={() => props.dataFieldHideHandler(props.index)}
      className={hideContainer}>
      <span className={hideSpan}>
        {props.obj.hide ? <EyeOffIcon /> : <EyeIcon />}
      </span>
    </span>
  );
};
const Delete = (props) => {
  return (
    <span
      onClick={() => props.dataFieldDeleteHandler(props.index)}
      className={deleteContainer}>
      <span className={deleteSpan}>
        <TrashIcon />
      </span>
    </span>
  );
};
const ListHide = (props) => {
  const { obj, index, api } = props;
  return (
    <span
      onClick={() => api.customDataListFieldHideHandler(obj.value, index)}
      className={hideContainer}>
      <span className={hideSpan}>
        {obj.value[index].hide ? <EyeOffIcon /> : <EyeIcon />}
      </span>
    </span>
  );
};
const ListDelete = (props) => {
  const { obj, index, api } = props;
  return (
    <span
      onClick={() => api.customDataListFieldDeleteHandler(obj.value, index)}
      className={deleteContainer}>
      <span className={deleteSpan}>
        <TrashIcon />
      </span>
    </span>
  );
};
const Title = (props) => {
  const { obj, index } = props;
  return (
    <>
      <label className='pl-1' htmlFor='val'>
        Title
      </label>
      <div style={{ display: "flex" }}>
        <input
          value={obj.value}
          onChange={(e) => props.dataFieldChangeHandler(e, index)}
          style={style}
          id='val'
          className='form-control'
          type='text'
        />
        <Hide {...props} />
        <Delete {...props} />
      </div>
    </>
  );
};
const Subtitle = (props) => {
  const { obj, index } = props;
  return (
    <>
      <label className='pl-1' htmlFor='val'>
        Subtitle
      </label>
      <div style={{ display: "flex" }}>
        <input
          value={obj.value}
          onChange={(e) => props.dataFieldChangeHandler(e, index)}
          style={style}
          id='val'
          className='form-control'
          type='text'
        />
        <Hide {...props} />
        <Delete {...props} />
      </div>
    </>
  );
};
const Description = (props) => {
  const { obj, index } = props;
  return (
    <>
      <div className='flex justify-content-between mb-2'>
        <label className='pl-1' htmlFor='val'>
          Description
        </label>
        <div className='flex'>
          <Hide {...props} />
          <Delete {...props} />
        </div>
      </div>
      <textarea
        value={obj.value}
        onChange={(e) => props.dataFieldChangeHandler(e, index)}
        style={style}
        id='val'
        className='form-control'
        type='text'
        rows={5}
      />
    </>
  );
};
const List = (props) => {
  const { obj, api } = props;
  const changeHandler = (e, index) => {
    api.customDataListFieldValueHandler(obj.value, index, e.target.value);
  };
  const clickHandler = (str) => {
    api.customListItemStyleType(obj, str);
  };
  const propsObject = { ...props, clickHandler: clickHandler };
  return (
    <div className='p-2'>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          onClick={() => api.customAddListField(obj.value)}
          className='btn btn-sm btn-primary my-auto'>
          Add List-Item
        </span>
        <div className='flex my-auto'>
          <Hide {...props} />
          <Delete {...props} />
        </div>
      </div>
      <div>
        <List_Style_Types {...propsObject} />
      </div>
      {obj.value.map((obj, index) => {
        const o = { ...props, index };
        return (
          <div className='my-2' style={{ display: "flex" }}>
            <input
              onChange={(e) => changeHandler(e, index)}
              value={obj.itemName}
              style={style}
              className='form-control'
              type='text'
            />
            <ListHide {...o} />
            <ListDelete {...o} />
          </div>
        );
      })}
    </div>
  );
};
let buttonClassName =
  "py-1 px-2 text-white mx-1 rounded mt-1 hover:cursor-pointer ";
const giveClassName = (api, str) => {
  let className = new String(buttonClassName);
  className = className.concat(api === str ? "bg-fuchsia-600" : "bg-slate-500");
  return className;
};
export const List_Style_Types = (props) => {
  const { obj, api, clickHandler } = props;
  const type = obj.styleType;

  return (
    <div className='flex flex-wrap col-span-3'>
      <span
        className={giveClassName(type, "bubble")}
        onClick={() => clickHandler("bubble")}>
        Bubble
      </span>
      <span
        className={giveClassName(type, "listSimple")}
        onClick={() => clickHandler("listSimple")}>
        List-Simple
      </span>
      <span
        className={giveClassName(type, "listBullet")}
        onClick={() => clickHandler("listBullet")}>
        List-Bullet
      </span>
      <span
        className={giveClassName(type, "listArrow")}
        onClick={() => clickHandler("listArrow")}>
        List-Arrow
      </span>
      <span
        className={giveClassName(type, "adjacent")}
        onClick={() => clickHandler("adjacent")}>
        Adjacent
      </span>
      <span
        className={giveClassName(type, "adjacentBullet")}
        onClick={() => clickHandler("adjacentBullet")}>
        Adjacent-Bullet
      </span>
      <span
        className={giveClassName(type, "adjacentDivider")}
        onClick={() => clickHandler("adjacentDivider")}>
        Adjacent-Divider
      </span>
    </div>
  );
};
export default Custom;
