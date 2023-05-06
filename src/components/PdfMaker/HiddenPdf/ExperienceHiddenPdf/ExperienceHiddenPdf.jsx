import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import HeaderName from "../MiniComponents/HeaderName";

const ExperienceHiddenPdf = ({ api, rootObj }) => {
  let flag = false;
  if (rootObj.hide) return null;
  rootObj.data.map((obj, index) => {
    if (!obj.hide) {
      flag = true;
      return;
    }
  });
  if (!flag) return null;
  return (
    <View>
      <HeaderName api={api} headerName={rootObj.headerName} />
      <View>
        {rootObj.data.map((obj, index) => {
          return <ExpItem api={api} index={index} obj={obj} />;
        })}
      </View>
    </View>
  );
};
const ExpItem = ({ index, obj, api }) => {
  if (obj.hide) return null;
  return (
    <View key={index}>
      <ExpTitle api={api} title={obj.title} />
      <ExpSubTitle api={api} subTitle={obj.subTitle} />
      <ExpDescription api={api} description={obj.description} />
    </View>
  );
};
const ExpTitle = ({ title, api }) => {
  if (!title.trim()) return null;
  return (
    <Text
      style={{
        ...api.styles.title,
        marginTop: api.styles.container.title.marginTop,
        lineHeight: api.styles.general.lineHeight,
      }}>
      {title}
    </Text>
  );
};
const ExpSubTitle = ({ subTitle, api }) => {
  if (!subTitle.trim()) return null;
  return (
    <Text
      style={{
        ...api.styles.subtitle,
        marginTop: api.styles.container.title.marginTop,
      }}>
      {subTitle}
    </Text>
  );
};
const ExpDescription = ({ description, api }) => {
  if (!description.trim()) return null;
  // return <Text style={style.subtitle}>{description}</Text>;
  return (
    <Text
      style={{
        ...api.styles.text,
        marginTop: api.styles.container.title.marginTop,
      }}>
      {description}
    </Text>
  );
};

export default ExperienceHiddenPdf;
