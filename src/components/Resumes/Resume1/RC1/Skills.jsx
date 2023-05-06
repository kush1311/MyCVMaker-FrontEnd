import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../GlobalContextApi/GlobalContextApi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import s from "./Skills.module.css";
import HeaderName from "./MiniComponents/HeaderName";
import { List_Style_Types } from "./Custom";
import Hide from "./MiniComponents/Hide";
import { Delete } from "./MiniComponents/Delete";
import {
  border,
  deleteContainer,
  deleteSpan,
  headerContainer,
  hideContainer,
  hideSpan,
} from "../../../../constants/styles";
import { EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
//

//
//
// ! Setting width will create unusual behaviour in drag and drop   -----  Recently it wasnot showing sections being dragged beacause width was set to auto
//  Use sensor/controllers[up+down+left+right] if drag and drop dont have smooth experience

// TODO: Deleting section or subfield

export const Skills = (props) => {
  const api = useContext(Context);
  const explist = props.data;

  const dragEndHandler = (result) => {
    if (!result.destination) return;
    const items = Array.from(explist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    api.setSectionOrderAfterDragAndDrop(props.uniqueId, items);
  };
  const hideHandler = () => {
    api.skillsHideHandler(props.uniqueId);
  };
  const dataFieldHandler = (subIndex, name, e) => {
    const value = e.target.value;
    //console.log(subIndex, name, value);
    api.skillsDataFieldHandler(props.uniqueId, subIndex, name, value);
  };
  const dataFieldHideHandler = (subIndex, name, bool) => {
    //console.log(bool);
    // const bool2 = !Boolean(parseInt(e.target.dataset.ishidden));
    api.skillsDataFieldHandler(props.uniqueId, subIndex, name, !bool);
  };
  const deleteDataField = (e) => {
    api.deleteSkillsDataField(props.uniqueId, e.target.dataset.index);
  };
  const data_SubField_Change_Handler = (e, index, subIndex) => {
    const value = e.target.value;
    const name = e.target.getAttribute("name");
    api.setSkillsItemSubField(props.uniqueId, index, subIndex, name, value);
  };
  const data_SubField_Hide_Handler = (index, subIndex) => {
    api.skills_SubField_Hide_Handler(props.uniqueId, index, subIndex);
  };
  const deleteDataSubField = (e, subIndex, i) => {
    api.deleteSkillsDataSubField(props.uniqueId, subIndex, i);
  };
  const componentHideHandler = () => {
    api.hideComponent(props, props.uniqueId);
  };
  //console.log(props.data);
  return (
    <section id='skills' className={"border " + s.mainSection}>
      <div className='flex'>
        <div className='ml-auto flex'>
          <Hide clickHandler={componentHideHandler} hide={props.hide} />
          <Delete uniqueId={props.uniqueId} />
        </div>
      </div>
      <div>
        <HeaderName headerName={props.headerName} uniqueId={props.uniqueId} />
      </div>
      <div className='flex'>
        <button
          className='btn bg-blue-600 text-stone-200 ml-auto'
          onClick={() => {
            api.addSection(props.uniqueId);
          }}>
          Add Skill
        </button>
      </div>

      {api.cv === null ? (
        <></>
      ) : (
        <DragDropContext onDragEnd={dragEndHandler}>
          <Droppable droppableId='id-1'>
            {(provided, snapshot) => (
              <legend
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='mx-auto px-0 w-100 my-3'>
                {explist.map((item, subIndex) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={subIndex}
                      type='idk'>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white mx-auto my-3 text-center ${
                              s.draggable
                            } ${border + " " + headerContainer}`}>
                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  flex: "10",
                                  height: "25px",
                                  backgroundColor: "grey",
                                }}></div>
                            </div>
                            <div className='p-2'>
                              <div className='flex'>
                                <div className='flex ml-auto'>
                                  <span
                                    onClick={() => {
                                      dataFieldHideHandler(
                                        subIndex,
                                        "hide",
                                        item.hide
                                      );
                                    }}
                                    className={hideContainer}>
                                    <span className={hideSpan}>
                                      {item.hide ? <EyeOffIcon /> : <EyeIcon />}
                                    </span>
                                  </span>
                                  <span
                                    onClick={(e) => {
                                      deleteDataField(e);
                                    }}
                                    data-index={subIndex}
                                    className={deleteContainer}>
                                    <span className={deleteSpan}>
                                      <TrashIcon />
                                    </span>
                                  </span>
                                </div>
                              </div>

                              <section className={s.section}>
                                {/* ******************************* Heading */}
                                <div>
                                  <div className='form-group mt-3'>
                                    <input
                                      className={"form-control"}
                                      placeholder='Field'
                                      value={item.fieldName}
                                      type='text'
                                      onChange={(e) => {
                                        dataFieldHandler(
                                          subIndex,
                                          "fieldName",
                                          e
                                        );
                                      }}
                                      id='0'
                                    />
                                  </div>

                                  <div className='flex mt-2'>
                                    <button
                                      onClick={() =>
                                        api.addSkillsSubField(
                                          props.uniqueId,
                                          subIndex
                                        )
                                      }
                                      className='btn btn-sm bg-blue-600 text-stone-200 ml-auto'
                                      style={{ fontSize: "0.7rem" }}>
                                      Add Subfield
                                    </button>
                                  </div>
                                </div>

                                {item.items.map((o, i) => {
                                  return (
                                    <div className='flex mt-2'>
                                      <div className='form-group my-auto'>
                                        <input
                                          className={"form-control"}
                                          // className={"w-100 form-control" + s.input}
                                          placeholder='Field.... Experience..... etc...'
                                          value={o.itemName}
                                          type='text'
                                          name='itemName'
                                          key={i}
                                          onChange={(e) =>
                                            data_SubField_Change_Handler(
                                              e,
                                              subIndex,
                                              i
                                            )
                                          }
                                          id=''
                                        />
                                      </div>
                                      <div className='flex'>
                                        <span
                                          onClick={(e) => {
                                            data_SubField_Hide_Handler(
                                              subIndex,
                                              i
                                            );
                                          }}
                                          name='hide'
                                          data-ishidden={
                                            o.hide === true ? 1 : 0
                                          }
                                          className={hideContainer}>
                                          <span className={hideSpan}>
                                            {o.hide ? (
                                              <EyeOffIcon />
                                            ) : (
                                              <EyeIcon />
                                            )}
                                          </span>
                                        </span>
                                        <span
                                          onClick={(e) => {
                                            deleteDataSubField(e, subIndex, i);
                                          }}
                                          className={deleteContainer}>
                                          <span className={deleteSpan}>
                                            <TrashIcon />
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </section>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </legend>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </section>
  );
};
