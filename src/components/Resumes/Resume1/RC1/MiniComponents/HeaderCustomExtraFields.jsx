import {
  CheckIcon,
  EyeIcon,
  LinkIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import { EyeOffIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  deleteContainer,
  deleteSpan,
  hideSpan,
  hideContainer,
} from "../../../../../constants/styles";

const CustomFieldSection = (props) => {
  const { data, api } = props;
  const dataArray = data[data.length - 1];
  //   //console.log(data[data.length - 1]);
  const dragEndHandler = (result) => {
    if (!result.destination) return;
    const items = Array.from(dataArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    //console.log([...items]);
    //console.log(items);
    api.headerCustomFieldReorderAfterDragAndDrop(data, items);
    // set(items);
  };
  return (
    <>
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId='id-1'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='mx-auto px-0 w-100 my-3'>
              {dataArray.map((obj, index) => {
                return (
                  <Draggable
                    key={obj.type + index}
                    draggableId={obj.type + index}
                    index={index}
                    type='idk'>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white mx-auto my-3 text-center`}>
                          <CustomField
                            obj={obj}
                            index={index}
                            api={api}
                            data={data}
                          />
                        </div>
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
    </>
  );
};
export default CustomFieldSection;
const CustomField = ({ obj, index, api, data }) => {
  const [editLink, setEditLink] = useState(false);
  const setCustomCVFunc = (e) => {
    api.headerCustomFieldChangeHandler(data, index, e.target.value);
  };
  const hideHandler = () => {
    api.headerCustomFieldHideHandler(data, index);
  };
  const deleteHandler = () => {
    setEditLink(false);
    api.headerCustomFieldDeleteHandler(data, index);
  };
  const setLink = (e) => {
    api.headerCustomFieldLinkHandler(data, index, e.target.value);
  };

  return (
    <div className='mt-3'>
      <div className='flex form-group'>
        <div className='w-16 bg-gray-500'> </div>
        <input
          className='form-control mr-2 ml-1'
          placeholder={obj.type}
          value={obj.name}
          type='text'
          key={index}
          name='value'
          onChange={(e) => setCustomCVFunc(e)}
        />
        <span
          name='value'
          onClick={() => setEditLink(true)}
          className='btn btn-sm px-2 border'>
          <span onClick={() => setEditLink(true)} className='w-4 flex my-1'>
            <LinkIcon />
          </span>
        </span>
        <span
          name='value'
          onClick={() => hideHandler()}
          className={hideContainer}>
          <span className={hideSpan + " flex"}>
            {obj.hide ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        </span>
        <span
          name='value'
          onClick={() => deleteHandler()}
          className={deleteContainer}>
          <span className={deleteSpan}>
            <TrashIcon />
          </span>
        </span>
      </div>
      <div className='form-group bg-neutral-200'>
        {editLink ? (
          <div className='flex py-2'>
            <input
              className='form-control mr-4 ml-2 border-2 border-blue-600'
              placeholder={obj.type}
              value={obj.link}
              type='text'
              key={index}
              name='value'
              onChange={(e) => setLink(e)}
            />
            <span
              name='value'
              onClick={() => setEditLink(false)}
              className={"btn bg-blue-200 text-blue-700 flex mx-2"}>
              <span className={deleteSpan}>
                {" "}
                <CheckIcon />
                {/* <XIcon />{" "} */}
              </span>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
