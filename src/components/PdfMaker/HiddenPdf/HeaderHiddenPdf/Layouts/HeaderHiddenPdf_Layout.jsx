import { Image, Text, View } from "@react-pdf/renderer";
import { CustomFields } from "../CustomFields/CustomFields";
import { axios } from "axios";

const GiveLayout = (props) => {
  const { num, api, data } = props;
  // return null;
  const propsObj = { api: api, data: data };
  if (num === 1) return <Layout1 {...propsObj} />;
  else if (num === 2) return <Layout2 {...propsObj} />;
  else if (num === 3) return <Layout3 {...propsObj} />;
  else if (num === 4) return <Layout4 {...propsObj} />;
  else if (num === 5) return <Layout5 {...propsObj} />;
  else return null;
};

export default GiveLayout;
// TODO: Image not working
const HeaderImage = ({ api }) => {
  // return null;
  if (api.state.imageConfig.hide || !api.state.imageConfig.URL) return null;
  let imgURL = api.state.imageConfig.URL;
  // TODOS: Uncomment this !!
  // if (!imgURL) return null;
  // //console.log(imgURL);
  const style = {
    width: "150px",
    marginHorizontal: "auto",
    marginVertical: "auto",
    ...api.state.styles.image,
  };

  // //console.log(api.state.styles.image);
  return (
    <>
      <Image src={imgURL} style={style} />
    </>
  );
};
const NameAndDesignation = (props) => {
  // return null;

  const { api, data } = props;
  // //console.log("Name ---------", data[0]);
  if (data[0].hide && data[1].hide) return null;
  const headerStyle = {
    lineHeight: api.styles.general.lineHeight,
    fontFamily: api.styles.general.fontFamily,
    ...api.styles.headerName,
    backgroundColor: api.styles.headerContainer.backgroundColor,
  };
  const designationStyle = {
    lineHeight: api.styles.general.lineHeight,
    fontFamily: api.styles.general.fontFamily,
    ...api.styles.designation,
    marginLeft: api.styles.headerName.marginLeft,
    marginRight: api.styles.headerName.marginRight,
    backgroundColor: api.styles.headerContainer.backgroundColor,
    color: api.styles.headerName.color,
    opacity: "0.75",
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        marginVertical: "auto",
        width: "100%",
        // flexWrap: "wrap",
        backgroundColor: api.styles.headerContainer.backgroundColor,
        padding: 0,
      }}>
      {/* <View style={{ width: "100%" }}> */}
      <Name data={{ ...data }} headerStyle={headerStyle} />
      {/* </View> */}
      {/* <View> */}
      <Designation data={data} designationStyle={designationStyle} />
      {/* </View> */}
    </View>
  );
};
const Name = (props) => {
  const { data, headerStyle } = props;
  if (data[0].hide || !data[0].name) return null;
  return (
    <Text
      style={{
        ...headerStyle,
      }}>
      {data[0].name}
    </Text>
  );
};
const Designation = (props) => {
  const { data, designationStyle } = props;
  if (data[1].hide || !data[1].name) return null;
  return (
    <Text
      style={{
        ...designationStyle,
      }}>
      {data[1].name}
    </Text>
  );
};
const Description = (props) => {
  const { api, data } = props;
  if (data[2].hide || !data[2].name) return null;

  const textStyle = {
    lineHeight: api.styles.general.lineHeight,
    fontFamily: api.styles.general.fontFamily,
    ...api.styles.description,
  };
  return (
    <View
      style={{
        marginVertical: "10px",
        paddingTop: api.styles.description.paddingTop,
        paddingBottom: api.styles.description.paddingBottom,
        paddingLeft: api.styles.description.paddingLeft,
        paddingRight: api.styles.description.paddingRight,
        backgroundColor: api.styles.headerContainer.backgroundColor,
      }}>
      <Text
        style={{
          ...textStyle,
          paddingHorizontal: 0,
          paddingVertical: 0,
          backgroundColor: api.styles.headerContainer.backgroundColor,
        }}>
        {data[2].name}
      </Text>
    </View>
  );
};
const Layout1 = (props) => {
  const { api, data } = props;
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <HeaderImage api={api} />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "5",
            padding: 0,
          }}>
          <NameAndDesignation {...props} />
          <Description {...props} />
        </View>
      </View>
      <View>
        <CustomFields api={api} dataArray={data} />
      </View>
    </View>
  );
};
const Layout2 = (props) => {
  //* It also works as Layout 4
  const { api, data } = props;
  const direction = api.state.headerLayout === 2 ? "column" : "row";
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ display: "flex", flex: "5" }}>
          <View style={{ display: "flex", flexDirection: direction }}>
            <View>
              <HeaderImage api={api} />
            </View>
            <View>
              <NameAndDesignation {...props} />
            </View>
          </View>
          <View>
            <Description {...props} />
          </View>
        </View>
        <View>
          <CustomFields api={api} dataArray={data} />
        </View>
      </View>
    </>
  );
};
const Layout3 = (props) => {
  const { api, data } = props;
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ display: "flex", flexDirection: "column", flex: "5" }}>
          <View>
            <HeaderImage api={api} />
          </View>
          <View>
            <NameAndDesignation {...props} />
          </View>
        </View>
        <View>
          <CustomFields api={api} dataArray={data} />
        </View>
      </View>
      <View>
        <Description {...props} />
      </View>
    </>
  );
};
const Layout4 = (props) => {
  const { api, data } = props;
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ display: "flex", flex: "5" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}>
            <View>
              <HeaderImage api={api} />
            </View>
            <View style={{ flex: "9" }}>
              <NameAndDesignation {...props} />
            </View>
          </View>
          <View>
            <Description {...props} />
          </View>
        </View>
        <View>
          <CustomFields api={api} dataArray={data} />
        </View>
      </View>
    </>
  );
};
const Layout5 = (props) => {
  const { api, data } = props;
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "5",
          }}>
          <View>
            <HeaderImage api={api} />
          </View>
          <View
            style={{
              flex: "9",
              // flexWrap: "wrap",
              flexDirection: "column",
            }}>
            <NameAndDesignation {...props} />
          </View>
        </View>
        <View>
          <CustomFields api={api} dataArray={data} />
        </View>
      </View>
      <View>
        <Description {...props} />
      </View>
    </>
  );
};
