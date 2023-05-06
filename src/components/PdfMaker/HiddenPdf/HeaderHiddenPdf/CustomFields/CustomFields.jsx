import { SVGIcons } from "./SVGIcons";
import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Context } from "../../../../GlobalContextApi/GlobalContextApi";
import { useContext } from "react";

export const CustomFields = (props) => {
  const { api, dataArray } = props;
  if (dataArray.length === 0) return null;
  const layout = api.state.headerCustomFieldLayout;
  if (layout === 1) return <Layout1 data={dataArray[3]} api={api} />;
  else return <Layout2 data={dataArray[3]} api={api} />;
};
const SingleCustomField = (props) => {
  const { obj, api } = props;
  if (obj.hide) return null;
  const style = api.styles.listItem;
  const design = api.state.headerListItemConfig.style;
  const bgColor =
    design === "bubble"
      ? style.backgroundColor
      : api.styles.headerContainer.backgroundColor;
  const border_Width = design === "bubble" ? "2px" : "0";
  const containerStyle = {
    width: "auto",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "10px",
    paddingVertical: "4px",
    marginVertical: "4px",
    borderWidth: border_Width,
    borderRadius: "8px",
    // backgroundColor: "red",
    backgroundColor: bgColor,
    borderColor: style.borderColor,
    // marginHorizontal: style.marginHorizontal,
    marginLeft: "2px",
    marginRight: "8px",
  };
  const space = { minWidth: "5" };
  const svg = {
    marginVertical: "auto",
    marginLeft: "0 !important",
  };
  const linkStyle = StyleSheet.create({
    margin: { marginRight: "0 !important" },
  });
  const textStyle = {
    minWidth: "3",
    fontSize: style.fontSize,
    linkStyle: "none",
    color: style.color,
    textDecoration: "none",
    marginVertical: "auto",
    lineHeight: 1,
  };
  if (!obj.link.trim() && !obj.name.trim()) return null;
  if (obj.type === "Email") {
    return (
      <View style={containerStyle}>
        <Icon api={api} svg={svg} obj={obj} />
        <Text style={space}></Text>
        <Link style={textStyle} src={"mailto:" + obj.link}>
          {obj.name}
        </Link>
      </View>
    );
  }
  if (obj.type === "Phone") {
    return (
      <View style={containerStyle}>
        <Icon api={api} svg={svg} obj={obj} />
        <Text style={space}></Text>
        <Text style={textStyle}>{obj.name}</Text>
      </View>
    );
  }
  return (
    <View style={containerStyle}>
      <Icon api={api} svg={svg} obj={obj} />
      <Text style={space}></Text>
      <Link style={textStyle} href={obj.link}>
        {obj.name}
      </Link>
    </View>
  );
};
const Icon = (props) => {
  const { svg, obj, api } = props;
  if (!api.state.headerListItemConfig.showIcons) return null;
  return (
    <View style={svg}>
      <SVGIcons api={api} type={obj.type} />
    </View>
  );
};
const Layout1 = (props) => {
  const { data, api } = props;
  return (
    <View
      style={{
        display: "flex",
        // marginVertical: "auto",
      }}>
      {data.map((obj, index) => {
        return <SingleCustomField api={api} obj={obj} />;
      })}
    </View>
  );
};
const Layout2 = (props) => {
  const { data, api } = props;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        textAlign: "justify",
        marginHorizontal: "auto",
      }}>
      {data.map((obj, index) => {
        return <SingleCustomField api={api} obj={obj} />;
      })}
    </View>
  );
};
