import { View } from "@react-pdf/renderer";
import React from "react";
import GiveLayout from "./Layouts/HeaderHiddenPdf_Layout";

const HeaderHiddenPdf = ({ rootObj, api }) => {
  if (rootObj.hide) return null;
  // if(r)
  const general = api.styles.general;
  // console.log(api.state.headerLayout);
  return (
    // TODO: Return if hide is true
    <View
      style={{
        backgroundColor: api.styles.headerContainer.backgroundColor,
        paddingRight: general.paddingRight,
        paddingLeft: general.paddingLeft,
        paddingTop: "3px",
        paddingBottom: "8px",
      }}>
      <View>
        <GiveLayout
          num={api.state.headerLayout}
          api={api}
          data={rootObj.data}
        />
      </View>
    </View>
  );
};

export default HeaderHiddenPdf;
