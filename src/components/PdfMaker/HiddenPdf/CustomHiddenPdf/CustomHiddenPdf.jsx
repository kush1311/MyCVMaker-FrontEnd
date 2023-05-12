import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import { useContext } from "react";
import { Context } from "../../../GlobalContextApi/GlobalContextApi";
import HeaderName from "../MiniComponents/HeaderName";
import { ListItems } from "../SkillsHiddenPdf/SkillsHiddenPdf";

const style = StyleSheet.create({
  title: { padding: "3 15", fontWeight: "900" },
  subtitle: {
    padding: "3 15",
    fontWeight: "normal",
    fontSize: "12",
  },
});

const CustomHiddenPdf = (props) => {
  const { componentData, api } = props;
  if (componentData.hide) return null;
  //   //console.log(props);
  return (
    <View>
      <HeaderName api={api} headerName={componentData.headerName} />
      <View>
        {componentData.data.map((obj, index) => {
          return <WhichComponent api={api} obj={obj} index={index} />;
        })}
      </View>
    </View>
  );
};

const WhichComponent = (props) => {
  const { obj, api } = props;
  switch (obj.type) {
    case "title":
      return <Title api={api} obj={obj} />;
    case "subtitle":
      return <Subtitle api={api} obj={obj} />;
    case "description":
      return <Description api={api} obj={obj} />;
    case "list":
      return <List api={api} obj={obj} />;
    default:
      return <></>;
  }
};
const Title = (props) => {
  const { api } = props;
  // trim() to check if field contains only whitespaces or not
  if (props.obj.hide || !props.obj.value.trim()) return null;
  //   return <Text style={style.title}>{props.obj.value}</Text>;
  return (
    <Text
      style={{
        ...api.styles.title,
        marginTop: api.styles.container.title.marginTop,
        lineHeight: api.styles.general.lineHeight,
      }}>
      {props.obj.value}
    </Text>
  );
};
const Subtitle = (props) => {
  const { api } = props;
  if (props.obj.hide || !props.obj.value.trim()) return null;
  return (
    <Text
      style={{
        ...api.styles.subtitle,
        marginTop: api.styles.container.subtitle.marginTop,
      }}>
      {props.obj.value}
    </Text>
  );
};
const Description = (props) => {
  const { api } = props;
  if (props.obj.hide || !props.obj.value.trim()) return null;
  return (
    <Text
      style={{
        ...api.styles.text,
        marginTop: api.styles.container.text.marginTop,
      }}>
      {props.obj.value}
    </Text>
  );
};
const List = (props) => {
  const { api, obj } = props;
  if (obj.hide) return null;
  return (
    <View style={{ marginTop: api.styles.container.text.marginTop }}>
      <ListItems arr={obj.value} api={api} type={obj.styleType} />
    </View>
  );
};
// const List = (props) => {
//   const { api } = props;
//   if (props.obj.hide) return null;
//   return (
//     <View>
//       {props.obj.value.map((item, index) => {
//         if (item.hide) return null;
//         if (!item.itemName.trim()) return null;
//         return (
//           <Text
//             style={{
//               ...api.styles.general,
//               ...api.styles.text,
//             }}>
//             {item.itemName}
//           </Text>
//         );
//       })}
//     </View>
//   );
// };
export default CustomHiddenPdf;
