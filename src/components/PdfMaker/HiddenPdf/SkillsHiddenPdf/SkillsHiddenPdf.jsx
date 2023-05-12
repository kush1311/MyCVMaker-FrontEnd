import { Text, View, PDFViewer, Link, StyleSheet } from "@react-pdf/renderer";
import { React, useContext } from "react";
import { Context } from "../../../GlobalContextApi/GlobalContextApi";
import ArrowDesign from "../MiniComponents/ArrowDesign";
import BulletPoint from "../MiniComponents/BulletPoint";
import HeaderName from "../MiniComponents/HeaderName";

// todo: Align single item list to left side
const SkillsHiddenPdf = (props) => {
  if (props.componentData.hide) return null;
  const { api, componentData } = props;
  let count = 0;
  componentData.data.map((obj) => {
    if (!obj.hide) ++count;
  });
  return (
    <View>
      <HeaderName api={api} headerName={props.componentData.headerName} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: count === 1 ? "flex-start" : "space-start",
        }}>
        {props.componentData.data.map((dataObj, index) => {
          if (dataObj.hide) return;
          let flag = false;
          if (!dataObj.fieldName.trim()) {
            dataObj.items.map((item) => {
              if (!item.itemName.trim()) flag = true;
            });
          }
          if (flag) return null;
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                flex: "1",

                // flex: "1",
              }}
              key={index}>
              <SkillsFieldName api={api} dataObj={dataObj} />
              <View
                style={{
                  padding: 0,
                  marginTop: api.styles.container.text.marginTop,
                }}>
                <ListItems api={api} arr={dataObj.items} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default SkillsHiddenPdf;

const SkillsFieldName = (props) => {
  const { api, dataObj } = props;
  if (!dataObj || !dataObj.fieldName || !dataObj.fieldName.trim()) return null;
  const subtitle = api.styles.subtitle;
  const style = {
    ...subtitle,
    lineHeight: api.styles.general.marginTop,
    textDecoration: "none",
    marginTop: api.styles.container.subtitle.marginTop,
  };
  if (dataObj.fieldNameLink.trim()) {
    return (
      <Link href={dataObj.fieldNameLink} style={style}>
        <Text>{dataObj.fieldName} </Text>
      </Link>
    );
  } else {
    return <Text style={style}>{dataObj.fieldName}</Text>;
  }
};
export const ListItems = (props) => {
  const { api, type } = props;
  const key = type || api.state.skillsItemConfig.style;
  const obj = { ...props };
  switch (key) {
    case "bubble":
      return <Bubble {...obj} />;
    case "listSimple":
      return <List_Simple {...obj} />;
    case "listBullet":
      return <List_Bullet {...obj} />;
    case "listArrow":
      return <List_Arrow {...obj} />;
    case "adjacent":
      return <Adjacent {...obj} />;
    case "adjacentBullet":
      return <Adjacent_Bullet {...obj} />;
    case "adjacentDivider":
      return <Adjacent_Divider {...obj} />;
    default:
      return null;
  }
};
const Style = StyleSheet.create({
  bulletStyle: {
    padding: "3px 15px",
    paddingLeft: "0",
    margin: "2px 5px",
    display: "inline-block",
  },
  adjacent: {
    paddingHorizontal: "1px",
    paddingTop: "5px",
    paddingLeft: "0",
    paddingBottom: "0",
    marginTop: "2px 5px",
    marginHorizontal: "1px",
    marginBottom: "0",
    display: "inline-block",
    flexWrap: "wrap",
  },
  adjacentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
const Bubble = (props) => {
  if (!props.arr) return null;
  const { api } = props;
  const text = api.styles.text;
  const bubbleStyle = api.styles.skills;
  const s = {
    display: "inline-block",
    fontSize: text.fontSize,
    fontWeight: text.fontWeight,
    // color: bubbleStyle.color,
    color: bubbleStyle.color,
    borderWidth: 0,
    lineHeight: 1,
  };
  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {props.arr.map((item, index) => {
        if (item.hide || !item.itemName.trim()) {
          return null;
        }
        return (
          <View
            style={{
              borderWidth: 2,
              borderColor: bubbleStyle.color,
              borderRadius: "4px",
              padding: "8px 15px",
              margin: "5px 5px",
              marginRight: "8px",
              marginLeft: "2px",
              backgroundColor: bubbleStyle.backgroundColor,
              opacity: 0.5,
            }}>
            <Text style={{ ...s, padding: 0, opacity: 1 }}>
              {item.itemName}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const List_Simple = (props) => {
  const { api } = props;
  const text = api.styles.text;
  const s = {
    ...Style.bulletStyle,
    fontSize: text.fontSize,
    fontWeight: text.fontWeight,
    color: text.color,
  };
  return (
    <View>
      {props.arr.map((item, index) => {
        if (item.hide || !item.itemName) return;
        return (
          <Text key={index} style={{ ...s, marginLeft: "0" }}>
            {item.itemName}
          </Text>
        );
      })}
    </View>
  );
};
const List_Bullet = (props) => {
  const { api } = props;
  const text = api.styles.text;
  const s = {
    ...Style.bulletStyle,
    fontSize: text.fontSize,
    fontWeight: text.fontWeight,
    color: text.color,
  };
  return (
    <View>
      {props.arr.map((item, index) => {
        if (item.hide || !item.itemName) return;
        return (
          <Text key={index} style={s}>
            <BulletPoint /> {item.itemName}
          </Text>
        );
      })}
    </View>
  );
};
const List_Arrow = (props) => {
  const { api } = props;
  const text = api.styles.text;
  const s = {
    ...Style.bulletStyle,
    fontSize: text.fontSize,
    fontWeight: text.fontWeight,
    color: text.color,
  };
  return (
    <View>
      {props.arr.map((item, index) => {
        if (item.hide || !item.itemName) return;
        return (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ display: "flex" }}>
              <ArrowDesign />
            </View>
            <Text key={index} style={s}>
              {item.itemName}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const Adjacent = (props) => {
  const { api } = props;
  const text = api.styles.text;
  const s = {
    ...Style.adjacent,
    fontSize: text.fontSize,
    fontWeight: text.fontWeight,
    color: text.color,
  };
  return (
    <View style={Style.adjacentContainer}>
      {props.arr.map((item, index) => {
        if (item.hide || !item.itemName) return;

        return (
          <Text key={index} style={s}>
            {item.itemName}
            {index === props.arr.length - 1 ? "" : ","}
          </Text>
        );
      })}
    </View>
  );
};
const Adjacent_Bullet = (props) => {
  const { api } = props;
  const text = api.styles.text;
  const s = {
    ...Style.adjacent,
    fontSize: text.fontSize,
    fontWeight: text.fontWeight,
    color: text.color,
  };
  return (
    <View style={Style.adjacentContainer}>
      {props.arr.map((item, index) => {
        if (item.hide || !item.itemName) return;
        return (
          <Text key={index} style={s}>
            <BulletPoint /> {item.itemName}
          </Text>
        );
      })}
    </View>
  );
};
const Adjacent_Divider = (props) => {
  const { api } = props;
  const text = api.styles.text;
  const s = {
    ...Style.adjacent,
    fontSize: text.fontSize,
    fontWeight: text.fontWeight,
    color: text.color,
  };
  return (
    <View style={Style.adjacentContainer}>
      {props.arr.map((item, index) => {
        if (item.hide || !item.itemName) return;

        return (
          <Text key={index} style={s}>
            {item.itemName}
            {index === props.arr.length - 1 ? "" : "  | "}
          </Text>
        );
      })}
    </View>
  );
};
