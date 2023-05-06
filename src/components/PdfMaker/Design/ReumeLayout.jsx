import React, { useContext, useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import l from "./Layout.module.css";

// TODO: Give effect that feels like changes are completed !!

// TODO: Touchpad [Mobile, Tablet, etc..] Experience is very bad !!

export const ReumeLayout = () => {
  const api = useContext(Context);
  const [replace, setReplace] = useState(false);
  const [info, setInfo] = useState(null);
  const [pickupcolpos, setpickupcolpos] = useState(null);
  const [name, setName] = useState(null);
  const infoSet = (name, pos, pickupcolpos) => {
    setReplace(true);
    setpickupcolpos(pickupcolpos);
    setInfo(parseInt(pos));
    setName(name);
  };
  return (
    <div
      style={{ cursor: replace ? "pointer" : "default" }}
      className={(replace ? `${l.maindiv}` : "") + " p-2"}>
      {replace ? null : (
        <p> Select by clicking on any below button to change it's position </p>
      )}
      <div className='flex'>
        {replace ? (
          <button
            onClick={() => setReplace(false)}
            className='ml-auto btn btn-sm btn-danger'>
            Close
          </button>
        ) : (
          <></>
        )}
      </div>
      {!replace ? null : (
        <p> Select white box where you want to position selected element</p>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {api.state.rows.map((posArr, index) => {
          return (
            <div key={index}>
              {index === 0 && replace ? (
                <ColumnHighlighter
                  setReplace={setReplace}
                  name={name}
                  info={info}
                  index={index}
                  zerothIndex={true}
                  api={api}
                />
              ) : (
                <></>
              )}
              <div className='flex'>
                {posArr.map((pos, subIndex) => {
                  return (
                    <div key={subIndex} className='flex'>
                      {subIndex === 0 && replace ? (
                        <RowHighlighter
                          setReplace={setReplace}
                          pickupcolpos={pickupcolpos}
                          info={info}
                          name={name}
                          index={index}
                          subIndex={subIndex}
                          zerothIndex={true}
                          api={api}
                        />
                      ) : (
                        <></>
                      )}
                      <span
                        // data-pos={pos}
                        // data-pickupcolpos={index}
                        // data-name={api.cv[pos].headerName}
                        onClick={(e) =>
                          infoSet(api.cv[pos].headerName, pos, index)
                        }
                        className='my-3 mx-2 btn btn-sm btn-primary'>
                        {api.cv[pos].headerName}
                      </span>
                      {replace ? (
                        <RowHighlighter
                          setReplace={setReplace}
                          pickupcolpos={pickupcolpos}
                          info={info}
                          name={name}
                          index={index}
                          subIndex={subIndex}
                          zerothIndex={false}
                          api={api}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
              {replace ? (
                <ColumnHighlighter
                  setReplace={setReplace}
                  info={info}
                  name={name}
                  index={index}
                  zerothIndex={false}
                  api={api}
                />
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const ColumnHighlighter = ({
  index,
  zerothIndex,
  api,
  info,
  name,
  setReplace,
}) => {
  const [onHover, setOnHover] = useState(false);
  const setChange = (e) => {
    const columnpos = zerothIndex ? index : parseInt(index);
    let arr = giveNewArrayWithoutInfoIndex(api, info);
    //console.log(index);
    //console.table([...arr]);
    arr.splice(columnpos, 0, [info]);
    //console.table([...arr]);
    api.setRows(arr);
    setReplace(false);
  };
  const mouseEnter = () => {
    // //console.log("first");
    setOnHover(true);
  };
  const mouseLeave = () => {
    setOnHover(false);
  };
  return (
    <div
      contentEditable='true'
      onClick={(e) => setChange(e)}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      // style={{ backgroundColor: onHover ? "bg-blue-200" : "white" }}
      // data-columnpos={zerothIndex ? index : parseInt(index) + 1}
      className={l.highlightColumn + " my-3"}>
      <OnHover name={name} onHover={onHover} />
    </div>
  );
};
const RowHighlighter = ({
  index,
  subIndex,
  zerothIndex,
  name,
  api,
  info,
  setReplace,
  pickupcolpos,
}) => {
  const [onHover, setOnHover] = useState(false);
  const [test, setTest] = useState(index);
  // //console.log(index);
  const mouseEnter = () => {
    // //console.log("first");
    setOnHover(true);
  };
  const mouseLeave = () => {
    setOnHover(false);
  };
  const setChange = (e) => {
    const columnpos = parseInt(index);
    const rowpos = zerothIndex ? parseInt(subIndex) : parseInt(subIndex) + 1;
    let arr = giveNewArrayWithoutInfoIndex(api, info);
    arr[
      columnpos > pickupcolpos && arr.length != api.state.rows.length
        ? columnpos - 1
        : columnpos
    ].splice(rowpos, 0, info);
    api.setRows(arr);
    setReplace(false);
  };
  return (
    <div
      onClick={(e) => setChange(e)}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      // data-columnpos={parseInt(index)}
      // data-rowpos={zerothIndex ? parseInt(subIndex) : parseInt(subIndex) + 1}
      className={l.highlightRow + " my-3"}>
      <OnHover name={name} onHover={onHover} />
    </div>
  );
};
const OnHover = (props) => {
  const { name, onHover } = props;
  if (onHover) {
    return <span className='px-2 py-1 text-black rounded'>{name}</span>;
  }
  return null;
};
const giveNewArrayWithoutInfoIndex = (api, info) => {
  //console.log(info);
  let arr4 = new Array();
  api.state.rows.map((indexArr) => {
    let a = new Array();
    indexArr.map((index) => {
      if (index != info) {
        a.push(index);
      }
    });
    if (a.length != 0) {
      arr4.push(a);
    }
  });
  return arr4;
};
