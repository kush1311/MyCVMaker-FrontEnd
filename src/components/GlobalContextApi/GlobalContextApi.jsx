import React, { Component } from "react";
// import { Layout } from "../PdfMaker/Design/ReumeLayout";
import WithComponentId from "../PdfMaker/WithComponentId";
import Custom from "../Resumes/Resume1/RC1/Custom";
import { Experience } from "../Resumes/Resume1/RC1/Experience";
import { Header } from "../Resumes/Resume1/RC1/Header";
import { Skills } from "../Resumes/Resume1/RC1/Skills";
import clone from "just-clone";
import Design from "../PdfMaker/Design/Design";
import Footer from "./../Resumes/Resume1/RC1/Footer";
import { Redirect } from "react-router-dom";

const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

export { Context, Provider, Consumer };
const giveUniqueId = () => {
  return new Date().getTime().toString();
};
class GlobalContextApi extends Component {
  state = {
    rerender: 0,
    imageConfig: {
      URL: "https://res.cloudinary.com/dzre1jnob/image/upload/v1647106483/e179qsl9ghvrux0e3q8p.png",
      hide: true,
    },
    editor: <Header />,
    styles: {
      headerName: {
        fontStyle: null,
        fontWeight: null,
        fontSize: 45,
        color: "#000000",
        paddingLeft: 0,
        paddingTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
      },
      designation: {
        fontStyle: null,
        fontWeight: null,
        fontSize: 20,
        paddingLeft: 0,
        paddingTop: 5,
        marginLeft: 0,
        marginRight: "auto",
      },
      description: {
        textAlign: "justify",
        fontSize: 12,
        fontStyle: null,
        fontWeight: null,
        color: "#000000",
        paddingRight: "0",
        paddingLeft: "0",
        paddingTop: "1",
        paddingBottom: "1",
      },
      image: {
        // borderWidth: "5px",
        // borderColor: "#000000",
        // borderStyle: "solid",
        // borderRadius: "",
        marginLeft: 0,
        marginRight: "auto",
        padding: 10,
        paddingLeft: 0,
      },
      listItem: {
        fontSize: 15,
        color: "#000000",
        borderColor: "#000000",
        backgroundColor: "#e3e3e3",
        // marginHorizontal: "10",
      },
      headerContainer: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 3,
        paddingVertical: 3,
      },
      subContainer: {
        flexGrow: "1",
        flexShrink: "1",
      },
      container: {
        heading: {
          marginTop: "15px",
        },
        title: {
          marginTop: "10px",
        },
        subtitle: {
          marginTop: "10px",
        },
        text: {
          marginTop: "5px",
        },
      },
      general: {
        lineHeight: "1.2",
        letterSpacing: "0",
        fontFamily: "Calibri",
        paddingRight: "20px",
        paddingLeft: "20px",
        backgroundColor: "#ffffff",
      },
      header: {
        textAlign: "justify",
        fontSize: 20,
        fontStyle: null,
        fontWeight: null,
        color: "#007BC8",
        backgroundColor: "#e3e3e3",
        borderWidth: 2,
        //! Remove Border - Color
        borderColor: "#000000",
        paddingRight: "3",
        paddingLeft: "3",
        //
        paddingTop: "0",
        paddingBottom: "0",
      },
      title: {
        textAlign: "justify",
        fontSize: 20,
        fontStyle: null,
        fontWeight: null,
        color: "#000000",
      },
      subtitle: {
        textAlign: "justify",
        fontSize: 16,
        fontStyle: null,
        fontWeight: null,
        color: "#000000",
      },
      text: {
        textAlign: "justify",
        fontSize: 12,
        fontStyle: null,
        fontWeight: null,
        color: "#000000",
      },
      skills: {
        backgroundColor: "#ffffff",
        color: "#000000",
      },
    },
    headerListItemConfig: {
      style: "plain", // bubble or plain
      showIcons: true,
    },
    skillsItemConfig: {
      style: "plain",
    },

    cv: null,
    // rows: [[0], [2], [1], [3]],
    rows: null,
    componentId: {
      headerComponent: Header,
      skillsComponent: Skills,
      experienceComponent: Experience,
      customComponent: Custom,
    },
    dataFormatOfComponent: {
      headerComponent: {
        customField: { name: "", link: "", type: "", hide: false },
      },
      skillsComponent: {
        fieldName: "",
        items: [
          {
            itemName: "",
            hide: false,
          },
        ],
        id: "0",
        fieldNameLink: "",
        hide: false,
      },
      experienceComponent: {
        title: "",
        subTitle: "",
        description: "",
        id: "",
        hide: false,
        titleLink: "",
      },
      customComponent: {
        value: "",
        type: "title",
        hide: false,
      },
    },
    customFieldFormats: [
      // todo:  phase 2  =>  Add date-range in
      {
        name: "Title",
        field: {
          value: "",
          type: "title",
          hide: false,
        },
      },
      {
        name: "Subtitle",
        field: {
          value: "",
          type: "subtitle",
          hide: false,
        },
      },
      {
        name: "Description",
        field: {
          value: "",
          type: "description",
          hide: false,
        },
      },
      {
        name: "List",
        field: {
          value: [
            { itemName: "", hide: false },
            { itemName: "", hide: false },
            { itemName: "", hide: false },
          ],
          type: "list",
          styleType: "listSimple",
          hide: false,
        },
      },
    ],
    footer: { left: "", center: " ", right: "" },
    fullscreen: false,
    headerLayout: 1,
    headerCustomFieldLayout: 2,
    headingLayout: 9,
    pleaseLoginModalShowed: false,
    isUserLoggedIn: null,
    networkError: false,
    disableSaveButton: false,
    disableLogoutButton: false,
    removeLogoutButton: false,
    userId: null,
    resumeIdArray: [],
    currentResumeId: null,
    // Too help with updated and non updated databases differentiation
    version: 0,
  };
  print = () => {
    // //console.log(this.state.cv);
    const rId = localStorage.getItem("%ru!I#d");
    const uId = localStorage.getItem("%su!I#d");
    const store = localStorage.getItem("store");
    if (
      !rId &&
      !uId &&
      store &&
      this.state.cv &&
      this.state.cv.length &&
      this.state.rows &&
      this.state.rows.length
    ) {
      this.updateLocalStorage();
    }
  };
  // Style Handlers
  styleHandler = (obj, key, value) => {
    obj[key] = value;
    this.reRender();
  };
  // Footer Handling
  setFooter = (side, value) => {
    const footer = this.state.footer;
    this.setState({ footer: { ...footer, [side]: value } });
  };
  // Setting HeaderLayout
  setHeaderLayout = (number) => {
    this.setState({
      headerLayout: parseInt(number),
    });
  };
  // Setting HeadingLayout
  setHeadingLayout = (number) => {
    this.setState({
      headingLayout: parseInt(number),
    });
  };
  // Update Resume
  updateCV = (obj) => {
    let o = clone(obj.cv);
    this.setState({
      cv: o,
    });
    // console.log(obj);
    setTimeout(() => {
      this.setState({
        imageConfig: clone(obj.imageConfig),
        styles: clone(obj.styles),
        rows: clone(obj.rows),
        footer: clone(obj.footer),
        skillsItemConfig: clone(obj.skillsItemConfig),
        headerListItemConfig: clone(obj.headerListItemConfig),
        version: obj.version,
        headerLayout: obj.headerLayout,
        headerCustomFieldLayout: obj.headerCustomFieldLayout,
        headingLayout: obj.headingLayout,
      });
    }, 700);
  };
  updateLocalStorage = () => {
    let obj = {
      cv: clone(this.state.cv),
      imageConfig: clone(this.state.imageConfig),
      styles: clone(this.state.styles),
      rows: clone(this.state.rows),
      footer: clone(this.state.footer),
      skillsItemConfig: clone(this.state.skillsItemConfig),
      headerListItemConfig: clone(this.state.headerListItemConfig),
      headerLayout: this.state.headerLayout,
      headerCustomFieldLayout: this.state.headerCustomFieldLayout,
      headingLayout: this.state.headingLayout,
      version: this.state.version,
    };
    localStorage.setItem("store", JSON.stringify(obj));
  };
  // Set image URL
  setImageURL = (url) => {
    this.state.imageConfig.URL = url;
    this.reRender();
  };
  // Skills-Style Handler
  skillsStyleHandler = (name) => {
    let obj = clone(this.state.skillsItemConfig);
    obj.style = name;
    this.setState({
      skillsItemConfig: obj,
    });
  };
  // Setting HeaderCustomFieldLayout
  setHeaderCustomFieldLayout = (number) => {
    this.setState({
      headerCustomFieldLayout: parseInt(number),
    });
  };
  // Adding Header_ExtraField
  addHeaderExtraField = (name) => {
    let obj = this.findByUniqueId("header");
    let fieldObj = clone(
      this.state.dataFormatOfComponent.headerComponent.customField
    );
    fieldObj.type = name;
    obj.data[3].push(fieldObj);
    this.reRender();
  };
  // Hide Components
  hideComponent = (obj, uniqueId) => {
    // //console.table(obj);
    let index = this.findIndexByUniqueId(uniqueId);
    //console.log(index);
    let o = clone(obj);
    o.hide = !o.hide;
    this.state.cv[index] = o;
    this.reRender();
  };
  // Delete Component
  deleteComponent = (uniqueId) => {
    if (uniqueId === "header") return;
    const index = this.findIndexByUniqueId(uniqueId);
    //console.log(index);
    let arr = clone(this.state.cv);
    arr.splice(index, 1);
    // Handle Rows State
    let newRows = [];
    for (let i = 0; i < this.state.rows.length; i++) {
      let newArr = [];
      for (let j = 0; j < this.state.rows[i].length; j++) {
        if (parseInt(this.state.rows[i][j]) !== parseInt(index)) {
          let tempInt =
            this.state.rows[i][j] > parseInt(index)
              ? this.state.rows[i][j] - 1
              : this.state.rows[i][j];
          //console.log(tempInt, parseInt(index));
          newArr.push(tempInt);
        }
      }
      if (parseInt(newArr.length) !== 0) newRows.push(newArr);
    }
    //console.log(newRows);
    let rootObj = arr[parseInt(index) - 1];
    this.setState({
      cv: clone(arr),
      rows: newRows,
      editor: (
        <WithComponentId
          Component={this.state.componentId[rootObj.componentId]}
          data={rootObj.data}
          uniqueId={rootObj.uniqueId}
          headerName={rootObj.headerName}
        />
      ),
    });
  };
  // Setting HeaderName of all CV members
  setCVFSectionHeaderName = (value, uniqueId) => {
    let object = this.findByUniqueId(uniqueId);
    object.headerName = value;
    if (!object.headerName.trim()) {
      let s = new Date().getTime();
      s = "%!" + s;
      //console.log(s);
      object.headerName = s;
    }
    this.reRender();
  };
  // // Image Handler
  // setCVImage = (fileObj) => {
  //   let obj = clone(this.state.imageConfig);
  //   let i = URL.createObjectURL(fileObj);
  //   obj.URL = i;
  //   this.setState({
  //     imageConfig: obj,
  //   });
  // };
  imageHideHandler = () => {
    let obj = clone(this.state.imageConfig);
    obj.hide = !obj.hide;
    this.setState({ imageConfig: obj });
  };
  toggleFullscreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  };
  findByUniqueId = (uniqueId) => {
    let o = {};
    this.state.cv.map((obj) => {
      if (obj.uniqueId === uniqueId) {
        o = obj;
        return;
      }
    });
    return o;
  };
  setEditor = (boolean, componentId, data, uniqueId, headerName) => {
    if (!boolean) {
      // Here componentId wil be component itself
      return this.setState({
        editor: componentId,
      });
    }
    this.setState({
      editor: (
        <WithComponentId
          Component={this.state.componentId[componentId]}
          data={data}
          uniqueId={uniqueId}
          headerName={headerName}
        />
      ),
    });
  };
  setSideBar = (headerName, uniqueId, componentId) => {
    const data =
      componentId === "customComponent"
        ? [clone(this.state.dataFormatOfComponent[componentId])]
        : [clone(this.state.dataFormatOfComponent[componentId])];
    // : [clone(){ ...this.state.dataFormatOfComponent[componentId] }];
    this.setState((prevState) => ({
      cv: [
        ...prevState.cv,
        {
          data: clone(data),
          uniqueId,
          headerName,
          componentId,
          hide: false,
        },
      ],
      rows: [...prevState.rows, [prevState.cv.length]],
    }));
  };
  setSectionOrderAfterDragAndDrop = (uniqueId, newOrderedData) => {
    var arr = new Array();
    this.state.cv.map((obj) => {
      if (obj.uniqueId === uniqueId) {
        let ob = { ...obj };
        let newArr = [...newOrderedData];
        ob["data"] = newArr;
        arr.push({ ...ob });
      } else {
        arr.push({ ...obj });
      }
    });
    this.setState({
      cv: arr,
    });
  };
  addSection = (uniqueId) => {
    let obj = this.findByUniqueId(uniqueId);
    const o = clone(this.state.dataFormatOfComponent[obj.componentId]);
    o.id = giveUniqueId();
    obj.data.push({ ...o });
    // To force rerender
    this.setState({});
  };
  setRows = (arr) => {
    this.setState({
      rows: arr,
    });
  };
  // SKills Component Handler
  skillsHideHandler = (uniqueId) => {
    let obj = this.findByUniqueId(uniqueId);
    obj.hide = !obj.hide;
    this.reRender();
  };
  skillsDataFieldHandler = (uniqueId, subIndex, key, value) => {
    let object = this.findByUniqueId(uniqueId);
    object.data[subIndex][key] = value;
    this.setState({
      cv: this.state.cv,
    });
  };
  setSkillsItemSubField = (uniqueId, index, subIndex, key, value) => {
    let object = this.findByUniqueId(uniqueId);
    object.data[index].items[subIndex][key] = value;
    this.reRender();
  };
  skills_SubField_Hide_Handler = (uniqueId, index, subIndex) => {
    let object = this.findByUniqueId(uniqueId);
    object.data[index].items[subIndex]["hide"] =
      !object.data[index].items[subIndex]["hide"];
    this.reRender();
  };
  addSkillsSubField = (uniqueId, index) => {
    let object = this.findByUniqueId(uniqueId);
    let o = clone(this.state.dataFormatOfComponent[object.componentId]);
    object.data[index].items = [...object.data[index].items, ...o.items];
    this.reRender();
  };
  deleteSkillsDataField = (uniqueId, index) => {
    let obj = this.findByUniqueId(uniqueId);
    obj.data.splice(index, 1);
    this.reRender();
  };
  deleteSkillsDataSubField = (uniqueId, index, subIndex) => {
    try {
      let obj = this.findByUniqueId(uniqueId);
      //console.log(index, subIndex);
      //console.log(obj);
      //console.log(obj.data);
      //console.log(obj.data[index]);
      obj.data[index].items.splice(subIndex, 1);
      this.reRender();
    } catch (error) {
      //console.log(error);
    }
  };
  // Setting Header Component ********************************************************
  setCVHeaderFields = (uniqueId, index, value, toggleHide) => {
    let object = this.findByUniqueId(uniqueId);
    const field = toggleHide ? "hide" : "name";
    object.data[index][field] = value;
    this.reRender();
  };
  headerCustomFieldChangeHandler = (dataArray, index, value) => {
    dataArray[dataArray.length - 1][index].name = value;
    this.reRender();
  };
  headerCustomFieldHideHandler = (dataArray, index) => {
    dataArray[dataArray.length - 1][index].hide =
      !dataArray[dataArray.length - 1][index].hide;
    this.reRender();
  };
  headerCustomFieldDeleteHandler = (dataArray, index) => {
    dataArray[dataArray.length - 1].splice(index, 1);
    this.reRender();
  };
  headerCustomFieldLinkHandler = (dataArray, index, value) => {
    dataArray[dataArray.length - 1][index].link = value;
    this.reRender();
  };
  headerCustomFieldReorderAfterDragAndDrop = (data, newOrderArray) => {
    data[data.length - 1] = newOrderArray;
    this.reRender();
  };

  // Setting Experience Component
  setExperienceDataField = (uniqueId, key, value, index) => {
    let object = this.findByUniqueId(uniqueId);
    object.data[index][key] = value;
    this.setState({
      rerender: 0,
    });
  };
  experienceFieldDeleteHandler = (uniqueId, index) => {
    let obj = this.findByUniqueId(uniqueId);
    obj.data.splice(index, 1);
    this.setState({
      rerender: 0,
    });
  };
  // Custom Component handling
  customDataFieldValueHandler = (dataArray, index, value) => {
    dataArray[index].value = value;
    this.reRender();
  };
  customDataFieldHideHandler = (dataArray, index) => {
    dataArray[index].hide = !dataArray[index].hide;
    this.reRender();
  };
  customDataFieldDeleteHandler = (dataArray, index) => {
    dataArray.splice(index, 1);
    this.reRender();
  };
  customDataListFieldValueHandler = (valueArray, index, value) => {
    valueArray[index].itemName = value;
    this.reRender();
  };
  customDataListFieldHideHandler = (valueArray, index) => {
    valueArray[index].hide = !valueArray[index].hide;
    this.reRender();
  };
  customDataListFieldDeleteHandler = (valueArray, index) => {
    valueArray.splice(index, 1);
    this.reRender();
  };
  customAddField = (name, uniqueId) => {
    let o;
    this.state.customFieldFormats.map((obj) => {
      if (obj.name === name) {
        o = clone(obj.field);
        return;
      }
    });
    let object = this.findByUniqueId(uniqueId);
    object.data.push(o);
    this.reRender();
  };
  customAddListField = (valueArray) => {
    let newItem = { itemName: "", hide: false };
    valueArray.push(newItem);
    this.reRender();
  };
  customListItemStyleType = (obj, value) => {
    obj.styleType = value;
    this.reRender();
  };
  customReorderAfterDragAndDrop = (dataArray, uniqueId) => {
    let obj = this.findByUniqueId(uniqueId);
    obj.data = dataArray;
    this.reRender();
  };
  reRender = () => {
    this.setState({
      rerender: 0,
    });
  };
  findIndexByUniqueId = (uniqueId) => {
    let count = 0;
    let index = 0;
    this.state.cv.map((obj) => {
      if (obj.uniqueId === uniqueId) {
        index = count;
        return;
      } else count = count + 1;
    });
    return index;
  };
  handlePleaseLoginModalShowed = (booleanValue) => {
    this.setState({
      pleaseLoginModalShowed: booleanValue,
    })
  }
  handleIsUserLoggedIn = (booleanValue) => {
    this.setState({
      isUserLoggedIn: booleanValue,
    })
  }
  handleNetworkError = (booleanValue) => {
    this.setState({
      networkError: booleanValue,
    })
  }
  handleSaveButtonVisibility = (booleanValue) => {
    this.setState({
      disableSaveButton: booleanValue,
    })
  }
  handleLogoutVisibility = (action, booleanValue) => {
    if (action === 'DISABLE') {
      this.setState({
        disableLogoutButton: booleanValue,
      })
    } else {
      this.setState({
        removeLogoutButton: booleanValue,
      })
    }
  }
  handleSetUserId = (userId) => {
    this.setState({
      userId: userId,
    })
  }
  handleSetResumeIdArray = (resumeIdArray) => {
    this.setState({
      resumeIdArray: resumeIdArray,
    })
  }
  handleSetCurrentResumeId = (currentResumeId) => {
  this.setState({
    currentResumeId: currentResumeId,
  })
}
  componentDidMount() {
    if (this.state.cv && this.state.cv[0]) {
      this.setEditor(true, "headerComponent", this.state.cv[0].data, "header");
    }
  }
  render() {
    this.print();
    return (
      <Provider
        value={{
          state: this.state,
          styles: this.state.styles,
          cv: this.state.cv,
          componentId: this.state.componentId,
          isUserLoggedIn: this.state.isUserLoggedIn,
          networkError: this.state.networkError,
          pleaseLoginModalShowed: this.state.pleaseLoginModalShowed,
          disableSaveButton: this.state.disableSaveButton,
          disableLogoutButton: this.state.disableLogoutButton,
          removeLogoutButton: this.state.removeLogoutButton,
          userId: this.state.userId,
          resumeIdArray: this.state.resumeIdArray,
          currentResumeId: this.state.currentResumeId,
          setHeadingLayout: this.setHeadingLayout,
          skillsStyleHandler: this.skillsStyleHandler,
          setFooter: this.setFooter,
          updateCV: this.updateCV,
          setImageURL: this.setImageURL,
          skillsDataFieldHandler: this.skillsDataFieldHandler,
          setHeaderLayout: this.setHeaderLayout,
          setHeaderCustomFieldLayout: this.setHeaderCustomFieldLayout,
          addHeaderExtraField: this.addHeaderExtraField,
          hideComponent: this.hideComponent,
          deleteComponent: this.deleteComponent,
          setEditor: this.setEditor,
          setSideBar: this.setSideBar,
          setSectionOrderAfterDragAndDrop: this.setSectionOrderAfterDragAndDrop,
          addSection: this.addSection,
          toggleFullscreen: this.toggleFullscreen,
          setRows: this.setRows,
          setSkillsItemSubField: this.setSkillsItemSubField,
          skills_SubField_Hide_Handler: this.skills_SubField_Hide_Handler,
          addSkillsSubField: this.addSkillsSubField,
          setCVHeaderFields: this.setCVHeaderFields,
          setCVImage: this.setCVImage,
          imageHideHandler: this.imageHideHandler,
          setCVFSectionHeaderName: this.setCVFSectionHeaderName,
          findByUniqueId: this.findByUniqueId,
          setExperienceDataField: this.setExperienceDataField,
          experienceFieldDeleteHandler: this.experienceFieldDeleteHandler,
          deleteSkillsDataSubField: this.deleteSkillsDataSubField,
          deleteSkillsDataField: this.deleteSkillsDataField,
          customDataFieldValueHandler: this.customDataFieldValueHandler,
          customDataFieldHideHandler: this.customDataFieldHideHandler,
          customDataListFieldHideHandler: this.customDataListFieldHideHandler,
          customDataListFieldValueHandler: this.customDataListFieldValueHandler,
          headerCustomFieldHideHandler: this.headerCustomFieldHideHandler,
          headerCustomFieldDeleteHandler: this.headerCustomFieldDeleteHandler,
          headerCustomFieldLinkHandler: this.headerCustomFieldLinkHandler,
          headerCustomFieldReorderAfterDragAndDrop:
            this.headerCustomFieldReorderAfterDragAndDrop,
          headerCustomFieldChangeHandler: this.headerCustomFieldChangeHandler,
          customDataFieldDeleteHandler: this.customDataFieldDeleteHandler,
          customAddField: this.customAddField,
          customReorderAfterDragAndDrop: this.customReorderAfterDragAndDrop,
          customDataListFieldDeleteHandler:
            this.customDataListFieldDeleteHandler,
          customAddListField: this.customAddListField,
          customListItemStyleType: this.customListItemStyleType,
          styleHandler: this.styleHandler,
          skillsHideHandler: this.skillsHideHandler,
          handlePleaseLoginModalShowed: this.handlePleaseLoginModalShowed,
          handleIsUserLoggedIn: this.handleIsUserLoggedIn,
          handleNetworkError: this.handleNetworkError,
          handleSaveButtonVisibility: this.handleSaveButtonVisibility,
          handleLogoutVisibility: this.handleLogoutVisibility,
          handleSetUserId: this.handleSetUserId,
          handleSetResumeIdArray: this.handleSetResumeIdArray,
          handleSetCurrentResumeId: this.handleSetCurrentResumeId,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}
export default GlobalContextApi;
