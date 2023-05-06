import { PlusIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { Context } from "../../GlobalContextApi/GlobalContextApi";

const AddSection = () => {
  const api = useContext(Context);
  const data = api.state.addSectionComponentsInfo;
  return (
    <div className='d-flex justify-content-around mt-5'>
      <div className='fluid-container'>
        <div className='row'>
          {data.map((obj, i) => {
            return (
              <button
                key={i}
                onClick={() =>
                  api.setSideBar(
                    obj.headerName,
                    new Date().getTime().toString(),
                    obj.componentId
                  )
                }
                className='mx-3 my-3 btn btn-lg btn-primary rounded flex'>
                <span className='w-6'>
                  <PlusIcon />
                </span>
                <span className='ml-2'>{obj.headerName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddSection;
