import React, { useContext, useState } from "react";
import { Context } from "../../../GlobalContextApi/GlobalContextApi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import s from "./Skills.module.css";
import HeaderName from "./MiniComponents/HeaderName";
import Hide from "./MiniComponents/Hide";
import { Delete } from "./MiniComponents/Delete";
import { EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
import {
  border,
  deleteContainer,
  deleteSpan,
  headerContainer,
  hideContainer,
  hideSpan,
} from "../../../../constants/styles";

// *
// *
// *
// *
// *
// *
// *
// *
// ! Beautiful d-n-d not working properly with inline styling

export const Experience = (props) => {
  const api = useContext(Context);
  const explist = props.data;
  const dragEndHandler = (result) => {
    if (!result.destination) return;
    const items = Array.from(explist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    api.setSectionOrderAfterDragAndDrop(props.uniqueId, items);
  };
  const setChanges = (e) => {
    api.setExperienceDataField(
      props.uniqueId,
      e.target.name,
      e.target.value,
      e.target.dataset.index
    );
  };
  const hideHandler = (index, bool) => {
    //console.log(bool);
    api.setExperienceDataField(props.uniqueId, "hide", !bool, index);
  };
  const deleteHandler = (e) => {
    api.experienceFieldDeleteHandler(props.uniqueId, e.target.dataset.index);
  };
  const componentHideHandler = () => {
    api.hideComponent(props, props.uniqueId);
  };
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
          className='btn btn-sm bg-blue-600 text-stone-100 ml-auto'
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
                {explist.map((item, superIndex) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={superIndex}
                      type='idk'>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-white mx-auto my-3 text-center ${
                              s.draggable + " " + border + " " + headerContainer
                            }`}>
                            <div style={{ display: "flex" }}>
                              <div
                                {...provided.dragHandleProps}
                                style={{
                                  flex: "10",
                                  height: "25px",
                                  backgroundColor: "grey",
                                }}></div>
                            </div>
                            <section className={s.section}>
                              <div className='flex mt-3'>
                                <div className='ml-auto flex'>
                                  <span
                                    onClick={() =>
                                      hideHandler(superIndex, item.hide)
                                    }
                                    // data-index={superIndex}
                                    // data-ishidden={item.hide === true ? 1 : 0}
                                    className={hideContainer}>
                                    <span className={hideSpan}>
                                      {item.hide ? <EyeOffIcon /> : <EyeIcon />}
                                    </span>
                                  </span>
                                  <span
                                    onClick={(e) => deleteHandler(e)}
                                    data-index={superIndex}
                                    className={deleteContainer}>
                                    <span className={deleteSpan}>
                                      <TrashIcon />
                                    </span>
                                  </span>
                                </div>
                              </div>
                              {/* ******************************* Heading */}
                              <>
                                <ExpItems
                                  superIndex={superIndex}
                                  setChanges={setChanges}
                                  item={item}
                                />
                              </>
                            </section>
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

const ExpItems = ({ superIndex, setChanges, item }) => {
  return (
    <form className={s.fo + " p-2"}>
      <div className='text-left form-group'>
        <label htmlFor='i1'>Title</label>
        <input
          className='form-control'
          id='i1'
          value={item["title"]}
          name='title'
          data-index={superIndex}
          onChange={(e) => setChanges(e)}
        />
      </div>
      <div className='text-left form-group'>
        <label htmlFor='i2'>Subtitle</label>
        <input
          className='form-control'
          id='i2'
          value={item["subTitle"]}
          name='subTitle'
          data-index={superIndex}
          onChange={(e) => setChanges(e)}
        />
      </div>
      <div className='text-left form-group'>
        <label htmlFor='i3'>Description</label>
        <textarea
          className='form-control'
          id='i3'
          rows='4'
          value={item["description"]}
          name='description'
          data-index={superIndex}
          onChange={(e) => setChanges(e)}
        />
      </div>
    </form>
  );
};
