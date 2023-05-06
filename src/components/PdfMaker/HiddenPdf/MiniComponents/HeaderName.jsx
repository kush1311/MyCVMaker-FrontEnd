import { StyleSheet, Text, View } from "@react-pdf/renderer";
//
//
//
//

const HeaderName = (props) => {
  if (!props.headerName.trim()) return null;
  const header = props.api.styles.header;
  const general = props.api.styles.general;
  const style = StyleSheet.create({
    headerStyle: {
      ...header,
      letterSpacing: general.letterSpacing,
      marginTop: "10",
      marginBottom: "10",
      // Heading shouldnot have line height
      lineHeight: "1",
    },
  });
  const obj = { ...props, ...style };
  return (
    <View
      style={{
        padding: 0,
        marginTop: props.api.styles.container.heading.marginTop,
      }}>
      <WichComponent {...obj} />
    </View>
  );
};
const WichComponent = (props) => {
  const { api } = props;
  const num = api.state.headingLayout;
  const name = props.headerName;
  const headertext =
    name.substring(0, 2) === "%!" && name.length > 10 ? "" : name;
  if (!headertext) return null;
  let obj = { ...props, headertext: headertext };
  switch (num) {
    case 1:
      return <Layout1 {...obj} />;
    case 2:
      return <Layout2 {...obj} />;
    case 3:
      return <Layout3 {...obj} />;
    case 4:
      return <Layout3 {...obj} />;
    case 5:
      return <Layout3 {...obj} />;
    case 6:
      return <Layout6 {...obj} />;
    case 7:
      return <Layout7 {...obj} />;
    case 8:
      return <Layout8 {...obj} />;
    case 9:
      return <Layout9 {...obj} />;
    default:
      break;
  }
};
const Layout1 = (props) => {
  const { api, headerStyle, headertext } = props;

  return (
    <View
      style={{
        display: "flex",
        paddingVertical: "6",
        marginVertical: "0",
        margin: "0",
        backgroundColor: headerStyle.backgroundColor,
      }}>
      <View style={{ padding: "0", margin: "0" }}>
        <Text
          style={{
            ...headerStyle,
            border: 0,
            textAlign: "center",
            margin: 0,
            paddingVertical: 0,
          }}>
          {headertext}
        </Text>
      </View>
    </View>
  );
};
const Layout2 = (props) => {
  const { api, headerStyle, headertext } = props;
  return (
    <View
      style={{
        borderWidth: headerStyle.borderWidth,
        borderColor: headerStyle.color,
        borderLeft: "0",
        borderRight: "0",
        paddingVertical: 5,
        borderWidth: 2,
        backgroundColor: headerStyle.backgroundColor,
      }}>
      <Text
        style={{
          ...headerStyle,
          borderLeft: "0",
          borderRight: "0",
          textAlign: "center",
          // backgroundColor: headerStyle.color,
          border: 0,
          padding: 0,
          margin: 0,
        }}>
        {headertext}
      </Text>
    </View>
  );
};
const giveContainerStyle = (num, style) => {
  const commonStyle = {
    backroundColor: style.backroundColor,
    borderWidth: style.borderWidth,
    borderColor: style.borderColor,
    borderLeft: "0",
    borderRight: "0",
    borderColor: style.color,
    paddingVertical: "5px",
  };
  const rightSide = { marginLeft: "auto" };
  const leftSide = { marginRight: "auto" };
  const middle = { marginHorizontal: "auto" };
  switch (num) {
    case 3:
      return { ...commonStyle, ...leftSide };
    case 4:
      return { ...commonStyle, ...middle };
    case 5:
      return { ...commonStyle, ...rightSide };
    default:
      return {};
  }
};
const Layout3 = (props) => {
  const { api, headerStyle, headertext } = props;
  const style = api.styles.header;
  const containerStyle = giveContainerStyle(api.state.headingLayout, style);
  return (
    <View
      style={{
        // marginVertical: "10px",
        display: "flex",
        // marginHorizontal: "10px",
      }}>
      <View style={containerStyle}>
        <Text
          style={{
            fontSize: style.fontSize,
            fontStyle: style.fontStyle,
            fontWeight: style.fontWeight,
            color: style.color,
            marginRight: "auto",
            paddingHorizontal: "20px",
            display: "flex",
          }}>
          {headertext}
        </Text>
      </View>
    </View>
  );
};
const Layout6 = (props) => {
  const { api, headerStyle, headertext } = props;
  return (
    <View>
      <Text
        style={{
          ...headerStyle,
          border: 0,
          borderBottom: 2,
          backgroundColor: api.styles.general.backgroundColor,
          textAlign: "center",
          paddingBottom: "5",
          borderBottomColor: headerStyle.color,
        }}>
        {headertext}
      </Text>
    </View>
  );
};
const Layout7 = (props) => {
  const { api, headerStyle, headertext } = props;
  return (
    <View>
      <Text
        style={{
          ...headerStyle,
          border: 0,
          borderBottom: 2,
          backgroundColor: api.styles.general.backgroundColor,
          textAlign: "justify",
          paddingBottom: "5",
          paddingLeft: 0,
          marginLeft: 0,
          borderBottomColor: headerStyle.color,
        }}>
        {headertext}
      </Text>
    </View>
  );
};
const Layout8 = (props) => {
  const { api, headerStyle, headertext } = props;
  return (
    <View style={{ display: "flex", padding: 0 }}>
      <View style={{ display: "flex" }}>
        <Text
          style={{
            ...headerStyle,
            border: 0,
            borderBottom: 2,
            borderBottomColor: headerStyle.color,
            backgroundColor: api.styles.general.backgroundColor,
            textAlign: "justify",
            paddingBottom: "5",
            paddingLeft: 0,
            marginLeft: 0,
            marginRight: "auto",
          }}>
          {headertext}
        </Text>
      </View>
    </View>
  );
};
const Layout9 = (props) => {
  const { api, headerStyle, headertext } = props;
  return (
    <View style={{ display: "flex", padding: 0 }}>
      <View style={{ display: "flex" }}>
        <Text
          style={{
            ...headerStyle,
            border: 0,
            // borderBottom: 2,
            // borderBottomColor: headerStyle.color,
            backgroundColor: api.styles.general.backgroundColor,
            // backgroundColor: "red",
            textAlign: "justify",
            paddingLeft: 0,
            marginLeft: 0,
            marginBottom: "7px",
            marginRight: "auto",
          }}>
          {headertext}
        </Text>
      </View>
    </View>
  );
};
export default HeaderName;
