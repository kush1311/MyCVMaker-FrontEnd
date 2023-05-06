import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../GlobalContextApi/GlobalContextApi";
import d from "./Design.module.css";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import Layout from "./Layout";
import { border } from "../../../constants/styles";
// Use https://www.npmjs.com/package/react-transition-group to smoothen in-out and display

const Capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const Design = (props) => {
  const api = useContext(Context);
  const styles = api.styles;
  const [hideArray, setHideArray] = useState([
    { hide: false },
    { hide: true },
    { hide: true },
  ]);
  const [val, reRender] = useState(false);
  const object = { styles, api };
  const ComponentArr = [
    { Component: Header, name: "Header" },
    { Component: Other, name: "Other" },
    { Component: Layout, name: "Layout" },
  ];
  return (
    <div>
      {ComponentArr.map((Obj, index) => {
        return (
          <>
            <section
              key={index}
              className={`text-left my-4 bg-white ${border}`}>
              <h6
                onClick={() => {
                  hideArray[index].hide = !hideArray[index].hide;
                  reRender(!val);
                }}
                className={`py-2 px-3 text-black cursor-pointer bg-white text-xl`}>
                {Obj.name}
                <span
                  style={{ float: "right", cursor: "pointer" }}
                  className='ml-auto'>
                  {hideArray[index].hide ? (
                    <ChevronDownIcon className='w-4' />
                  ) : (
                    <ChevronUpIcon className='w-4' />
                  )}
                </span>
              </h6>
              <div className={`p-3 ${hideArray[index].hide ? d.hide : d.show}`}>
                <Obj.Component {...object} />
              </div>
            </section>
          </>
        );
      })}
    </div>
  );
};
// General font-family, color
let buttonClassName = "py-1 px-2 text-white mx-1 rounded mt-1 ";
const giveClassName = (api, str) => {
  let className = new String(buttonClassName);
  className = className.concat(api === str ? "bg-blue-600" : "bg-slate-500");
  return className;
};
// ##############################################################

const Header = (props) => {
  const { styles, api } = props;
  const [num, setNum] = useState(0);
  const object = { styles, api, num };
  const btnStyle =
    "text-black px-2 py-1 bg-blue-100 border-2 border-blue-700 text-center rounded hover:cursor-pointer";
  const selectedStyle = "bg-blue-700 border-blue-900 text-white";
  const clickHandler = (num) => {
    setNum(num);
  };
  return (
    <div className='grid grid-cols-3 gap-2'>
      <span
        onClick={() => clickHandler(6)}
        className={`${btnStyle} ${num === 6 ? selectedStyle : ""}`}>
        General
      </span>
      <span
        onClick={() => clickHandler(1)}
        className={`${btnStyle} ${num === 1 ? selectedStyle : ""}`}>
        Name
      </span>
      <span
        onClick={() => clickHandler(2)}
        className={`${btnStyle} ${num === 2 ? selectedStyle : ""}`}>
        Designation
      </span>
      <span
        onClick={() => clickHandler(3)}
        className={`${btnStyle} ${num === 3 ? selectedStyle : ""}`}>
        Description
      </span>
      <span
        onClick={() => clickHandler(4)}
        className={`${btnStyle} ${num === 4 ? selectedStyle : ""}`}>
        Image
      </span>
      <span
        onClick={() => clickHandler(5)}
        className={`${btnStyle} ${num === 5 ? selectedStyle : ""}`}>
        List Items
      </span>

      <div className='col-span-3'>
        <hr />
        <br />
        <DisplayComponent1 {...object} />
      </div>
    </div>
  );
};
const DisplayComponent1 = (props) => {
  const { api, styles, num } = props;
  const obj = { api, styles };
  switch (num) {
    case 1:
      return <HeaderName {...obj} />;
    case 2:
      return <Designation {...obj} />;
    case 3:
      return <Description {...obj} />;
    case 4:
      return <Image {...obj} />;
    case 5:
      return <ListItem {...obj} />;
    case 6:
      return <General2 {...obj} />;
    default:
      return (
        <strong className='justify-self-center'>
          * Please select section to design it
        </strong>
      );
  }
};
const HeaderName = (props) => {
  const { api, styles } = props;
  const style = styles.headerName;
  const object = { style, api };
  return (
    <>
      <TextAlignWithMargin {...object} />
      <br />
      <FontFamily {...object} />
      <br />
      <FontStyle {...object} />
      <br />
      <FontSize {...object} />
      <br />
      <FontColor {...object} />
    </>
  );
};
const Designation = (props) => {
  const { api, styles } = props;
  const style = styles.designation;
  const object = { style, api };
  return (
    <>
      <FontFamily {...object} />
      <br />
      <FontStyle {...object} />
      <br />
      <FontSize {...object} />
      <br />
    </>
  );
};
const Description = (props) => {
  const { api, styles } = props;
  const style = styles.description;
  const object = { style, api };
  return (
    <>
      <TextAlign {...object} />
      <br />
      <FontFamily {...object} />
      <br />
      <FontStyle {...object} />
      <br />
      <FontSize {...object} />
      <br />
      <FontColor {...object} />
      <br />
      <HorizontalPadding {...object} />
      <br />
      <VerticalPadding {...object} />
    </>
  );
};
const Image = (props) => {
  const { api, styles } = props;
  const style = styles.image;
  const object = { style, api, image: true };
  return (
    <>
      <TextAlignWithMargin {...object} />
      {/* TODO: @Phase2 */}
      {/* <BorderRadius {...object} />
      <br /> */}
      {/* <Border {...object} />
      {/* <br /> */}
      {/* <BorderColor {...object} />
      <br />
      <BorderWidth {...object} />  */}
    </>
  );
};
const ListItem = (props) => {
  const { api, styles } = props;
  const style = styles.listItem;
  const object = { style, api, listItem: true };
  return (
    <>
      <ListItemStyle {...object} />
      <br />
      {api.state.headerListItemConfig.style === "bubble" ? (
        <ConditionalDesign2 object={object} />
      ) : null}
      <ShowIconOrNot {...object} />
      <br />
      <FontSize {...object} />
      <br />
      <FontColor {...object} />
      {/* <br />
      <HorizontalMargin {...object} /> */}
      <br />
    </>
  );
};
const ConditionalDesign2 = ({ object }) => {
  return (
    <>
      <BackgroundColor {...object} />
      <br />
      <BorderColor {...object} />
    </>
  );
};
const ListItemStyle = (props) => {
  const { api } = props;
  const property = api.state.headerListItemConfig;
  const clickHandler = (str) => {
    api.styleHandler(property, "style", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Item Style' />
      <button
        className={giveClassName(property.style, "bubble")}
        onClick={() => clickHandler("bubble")}>
        Bubble
      </button>
      <button
        className={giveClassName(property.style, "plain")}
        onClick={() => clickHandler("plain")}>
        Plain
      </button>
    </div>
  );
};
const ShowIconOrNot = (props) => {
  const { api } = props;
  const property = api.state.headerListItemConfig;
  const clickHandler = (e) => {
    api.styleHandler(property, "showIcons", e.target.checked);
  };
  //console.log(property.showIcons);
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Icons' />
      <input
        type={"checkbox"}
        value={property.showIcons}
        checked={property.showIcons}
        onClick={(e) => clickHandler(e)}
        className='my-auto'
      />
    </div>
  );
};
const General2 = (props) => {
  const { api, styles } = props;
  const style = styles.headerContainer;
  const object = { style, api };
  return (
    <>
      <BackgroundColor {...object} />
      <br />
    </>
  );
};
// ##############################################################

export const btnStyle =
  "text-black px-2 py-1 bg-blue-100 border-2 border-blue-700 text-center rounded hover:cursor-pointer";
export const selectedStyle = "bg-blue-700 border-blue-900 text-white";
const Other = (props) => {
  const { styles, api } = props;
  const [num, setNum] = useState(0);
  const object = { styles, api, num };
  const clickHandler = (num) => {
    setNum(num);
  };
  return (
    <div className='grid grid-cols-3 gap-2'>
      <span
        onClick={() => clickHandler(1)}
        className={`${btnStyle} ${num === 1 ? selectedStyle : ""}`}>
        General
      </span>
      <span
        onClick={() => clickHandler(2)}
        className={`${btnStyle} ${num === 2 ? selectedStyle : ""}`}>
        Heading
      </span>
      <span
        onClick={() => clickHandler(3)}
        className={`${btnStyle} ${num === 3 ? selectedStyle : ""}`}>
        Title
      </span>
      <span
        onClick={() => clickHandler(4)}
        className={`${btnStyle} ${num === 4 ? selectedStyle : ""}`}>
        Subtitle
      </span>
      <span
        onClick={() => clickHandler(5)}
        className={`${btnStyle} ${num === 5 ? selectedStyle : ""}`}>
        Text
      </span>
      <span
        onClick={() => clickHandler(6)}
        className={`${btnStyle} ${num === 6 ? selectedStyle : ""}`}>
        List-Item
      </span>
      <div className='col-span-3'>
        <hr />
        <br />
        <DisplayComponent2 {...object} />
      </div>
    </div>
  );
};
const DisplayComponent2 = (props) => {
  const { api, styles, num } = props;
  const obj = { api, styles };
  switch (num) {
    case 1:
      return <General {...obj} />;
    case 2:
      return <Heading {...obj} />;
    case 3:
      return <Title {...obj} />;
    case 4:
      return <Subtitle {...obj} />;
    case 5:
      return <Text {...obj} />;
    case 6:
      return <SkillsListItem {...obj} />;
    default:
      return (
        <strong className='justify-self-center'>
          * Please select section to design it
        </strong>
      );
  }
};
const ConditionalDesign = ({ object }) => {
  return (
    <>
      {/* <BackgroundColor {...object} />
      <br /> */}
      <FontColor {...object} />
    </>
  );
};
const General = (props) => {
  const { styles, api } = props;
  const style = styles.general;
  const object = { style, api };
  return (
    <>
      <LineHeight {...object} />
      <br />
      <LetterSpacing {...object} />
      <br />
      <FontFamily {...object} />
      <br />
      <HorizontalPadding {...object} />
      {/* <br /> */}
      {/* <VerticalPadding {...object} /> */}
      {/* <br />
      <BackgroundColor {...object} /> */}
    </>
  );
};
const Heading = (props) => {
  const { styles, api } = props;
  const style = styles.header;
  const object = { style, api };
  return (
    <>
      {/* <TextAlign {...object} />
      <br /> */}
      <FontFamily {...object} />
      <br />
      <FontStyle {...object} />
      <br />
      <FontSize {...object} />
      <br />
      <FontColor {...object} />
      <br />
      <BackgroundColor {...object} />
      <br />
      {/* <Border {...object} />
      <br /> */}
      {/* <BorderColor {...object} />
      <br /> */}
    </>
  );
};
const Title = (props) => {
  const { styles, api } = props;
  const style = styles.title;
  const object = { style, api };
  return (
    <>
      <TextAlign {...object} />
      <br />
      <FontFamily {...object} />
      <br />
      <FontStyle {...object} />
      <br />
      <FontSize {...object} />
      <br />
      <FontColor {...object} />
      <br />
    </>
  );
};
const Subtitle = (props) => {
  const { styles, api } = props;
  const style = styles.subtitle;
  const object = { style, api };
  return (
    <>
      <TextAlign {...object} />
      <br />
      <FontFamily {...object} />
      <br />
      <FontStyle {...object} />
      <br />
      <FontSize {...object} />
      <br />
      <FontColor {...object} />
      <br />
    </>
  );
};
const Text = (props) => {
  const { styles, api } = props;
  const style = styles.text;
  const object = { style, api };
  return (
    <>
      <TextAlign {...object} />
      <br />
      <FontFamily {...object} />
      <br />
      <FontStyle {...object} />
      <br />
      <FontSize {...object} />
      <br />
      <FontColor {...object} />
      <br />
    </>
  );
};
const SkillsListItem = (props) => {
  const { api, styles } = props;
  const style = styles.skills;
  const object = { style, api, listItem: true };
  return (
    <>
      <SkillsListItemStyle {...object} />
      <br />
      {api.state.skillsItemConfig.style === "bubble" ? (
        <ConditionalDesign object={object} />
      ) : null}
      <br />
    </>
  );
};
const SkillsListItemStyle = (props) => {
  const { api, style } = props;
  const property = api.state.skillsItemConfig;
  const clickHandler = (str) => {
    api.skillsStyleHandler(str);
  };
  return (
    <div className='grid grid-cols-4'>
      <div>
        <PropertyTitle titleName='Item Style' />
      </div>
      <div className='flex flex-wrap col-span-3'>
        <button
          className={giveClassName(property.style, "bubble")}
          onClick={() => clickHandler("bubble")}>
          Bubble
        </button>
        <button
          className={giveClassName(property.style, "listSimple")}
          onClick={() => clickHandler("listSimple")}>
          List-Simple
        </button>
        <button
          className={giveClassName(property.style, "listBullet")}
          onClick={() => clickHandler("listBullet")}>
          List-Bullet
        </button>
        <button
          className={giveClassName(property.style, "listArrow")}
          onClick={() => clickHandler("listArrow")}>
          List-Arrow
        </button>
        <button
          className={giveClassName(property.style, "adjacent")}
          onClick={() => clickHandler("adjacent")}>
          Adjacent
        </button>
        <button
          className={giveClassName(property.style, "adjacentBullet")}
          onClick={() => clickHandler("adjacentBullet")}>
          Adjacent-Bullet
        </button>
        <button
          className={giveClassName(property.style, "adjacentDivider")}
          onClick={() => clickHandler("adjacentDivider")}>
          Adjacent-Divider
        </button>
      </div>
    </div>
  );
};
const PropertyTitle = ({ titleName }) => {
  return (
    <span style={{ wordBreak: "keep-all !important" }} className='mr-3 py-auto'>
      <strong>{titleName} </strong>
    </span>
  );
};
const TextAlign = (props) => {
  const { style, api } = props;
  const property = style.textAlign;
  const clickHandler = (str) => {
    api.styleHandler(style, "textAlign", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Text-Align' />
      {["justify", "center", "right"].map((str, index) => {
        return (
          <span
            onClick={() => clickHandler(str)}
            style={{ cursor: "pointer" }}
            className={`"btn btn-sm mx-1 " + ${
              str === property ? "btn-primary" : "btn-secondary"
            }`}>
            {str === "justify" ? Capitalize("Left") : Capitalize(str)}
          </span>
        );
      })}
    </div>
  );
};
const FontFamily = (props) => {
  const { style, api } = props;
  const property = style.fontFamily;
  const clickHandler = (str) => {
    api.styleHandler(style, "fontFamily", str);
  };
  const giveClassName = (str) => {
    let className = new String(buttonClassName);
    className = className.concat(
      property == str ? "bg-blue-600" : "bg-slate-500"
    );
    return className;
  };
  const fontsArr = ["Calibri", "Times_New_Roman"];
  return (
    <div className='flex'>
      <PropertyTitle titleName='Font-Family' />
      <button
        onClick={() => clickHandler(null)}
        className={giveClassName(null)}>
        Default
      </button>
      {fontsArr.map((font, i) => {
        return (
          <button
            onClick={() => clickHandler(font)}
            className={giveClassName(font)}>
            {font}
          </button>
        );
      })}
    </div>
  );
};
// ! cannot do bold || italic in default font family use other as default family
const FontStyle = (props) => {
  return (
    <>
      <FontItalic {...props} />
      <br />
      <FontBold {...props} />
    </>
  );
};
const FontItalic = (props) => {
  const { style, api } = props;
  const property = style.fontStyle;
  const clickHandler = (str) => {
    //console.log("CLicked  " + str);
    api.styleHandler(style, "fontStyle", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Italic' />
      <button
        className={giveClassName(style.fontStyle, "italic")}
        onClick={() => clickHandler("italic")}>
        Yes
      </button>
      <button
        className={giveClassName(style.fontStyle, null)}
        onClick={() => clickHandler(null)}>
        No
      </button>
    </div>
  );
};
const FontBold = (props) => {
  const { style, api } = props;
  const property = style.fontWeight;
  const clickHandler = (str) => {
    api.styleHandler(style, "fontWeight", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Bold' />
      <button
        className={giveClassName(style.fontWeight, "bold")}
        onClick={() => clickHandler("bold")}>
        Yes
      </button>
      <button
        className={giveClassName(style.fontWeight, null)}
        onClick={() => clickHandler(null)}>
        No
      </button>
    </div>
  );
};
const FontSize = (props) => {
  const { style, api, listItem } = props;
  const property = style.fontSize;
  const changeHandler = (str) => {
    // TODO: Fix this : If size is 11 of designation in headerLayout 1 then it comes adjacent to header name
    api.styleHandler(style, "fontSize", str === "11" ? "10" : str);
  };
  const maxValue = listItem ? "25" : "50";
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Font-Size' />
      <input
        style={{ width: "75%" }}
        className='mx-auto'
        onChange={(e) => changeHandler(e.target.value.toString())}
        type='range'
        min='5'
        max={maxValue}
        step={1}
        value={property}
      />
      {property}
    </div>
  );
};
const colorArr = [
  "ffffff",
  "000000",
  "CBD5E1",
  "1E293B",
  "B92626",
  "EA580C",
  "F53A0B",
  "B45309",
  "65A30D",
  "16A3A4",
  "0596BE",
  "FF5805",
  "FF5805",
  "00ABB8",
  "007BC8",
  "006ADB",
  "C2009E",
  "C20067",
  "C20032",
  "16A30A",
  "00AB11",
  "C200DB",
  "C2000F",
];
const EditorsChoiceColor = (props) => {
  const { colorHandler, colorArr } = props;
  return (
    <>
      {colorArr.map((hex, i) => {
        const hexcode = "#" + hex;
        return (
          <span
            className='mx-1 my-1 rounded-full border-2 border-slate-300'
            style={{
              backgroundColor: hexcode,
              height: "40px",
              minWidth: "40px",
            }}
            onClick={() => colorHandler(hexcode)}
            key={i}></span>
        );
      })}
    </>
  );
};
const FontColor = (props) => {
  const { style, api } = props;
  const property = style.color;
  const colorHandler = (str) => {
    api.styleHandler(style, "color", str);
  };
  return (
    <>
      <div>
        <PropertyTitle titleName='Font-Color' />
        <input
          className='ml-5'
          onChange={(e) => colorHandler(e.target.value.toString())}
          type='color'
          id='favcolor'
          name='favcolor'
          value={property}
        />
      </div>
      <div className='flex flex-wrap'>
        <EditorsChoiceColor colorArr={colorArr} colorHandler={colorHandler} />
      </div>
    </>
  );
};
const BackgroundColor = (props) => {
  const { style, api } = props;
  const property = style.backgroundColor;
  const colorHandler = (str) => {
    api.styleHandler(style, "backgroundColor", str);
  };
  return (
    <>
      <div className='my-3'>
        <div className='flex'>
          <PropertyTitle titleName='Background-Color' />
          <input
            className='ml-5'
            onChange={(e) => colorHandler(e.target.value.toString())}
            type='color'
            id='favcolor'
            name='favcolor'
            value={property}
          />
          <span className='my-auto ml-2' style={{ fontSize: "0.7rem" }}>
            Select Custom Color
          </span>
        </div>
        <div className='flex flex-wrap'>
          <EditorsChoiceColor colorArr={colorArr} colorHandler={colorHandler} />
        </div>
      </div>
    </>
  );
};
const Border = (props) => {
  const { style, api, image } = props;
  const property = style.borderWidth;
  const changeHandler = (str) => {
    if (image) {
      api.styleHandler(style, "padding", str);
    }
    api.styleHandler(style, "borderWidth", str);
  };
  return (
    <div style={{ display: "flex" }} className='my-3'>
      <PropertyTitle titleName='Border' />
      <div className='pl-3'>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => changeHandler(2)}
          className={`"btn btn-sm mx-2 ${
            !(property === 0) ? "btn-primary" : "btn-secondary"
          }`}>
          Yes
        </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => changeHandler(0)}
          className={`"btn btn-sm mx-2 ${
            property === 0 ? "btn-primary" : "btn-secondary"
          }`}>
          No
        </span>
      </div>
    </div>
  );
};
const BorderColor = (props) => {
  const { style, api } = props;
  if (style.borderWidth === 0) return null;
  const property = style.borderColor;
  const changeHandler = (str) => {
    api.styleHandler(style, "borderColor", str);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }} className='my-3'>
      <div style={{ display: "flex" }}>
        <PropertyTitle titleName='Border-Color' />
        <input
          className='ml-5'
          onChange={(e) => changeHandler(e.target.value.toString())}
          type='color'
          id='favcolor'
          name='favcolor'
          value={property}
        />
        {property}
      </div>
      <div className='flex flex-wrap'>
        <EditorsChoiceColor colorArr={colorArr} colorHandler={changeHandler} />
      </div>
    </div>
  );
};
const BorderRadius = (props) => {
  const { style, api } = props;
  let property = style.borderRadius;
  property = property.slice(0, property.length - 1);
  if (!property) property = 0;
  const changeHandler = (str) => {
    api.styleHandler(style, "borderRadius", str);
  };
  const r = 100000000;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <PropertyTitle titleName='Border-Radius' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString() * r + "%")}
        type='range'
        min='0'
        max='100'
        step={1}
        value={property / r}
      />
      {property}
      <div>
        <div
          style={{
            height: "100px",
            width: "100px",
            borderRadius: property + "%",
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
          }}
          className='bg-red-200'></div>
      </div>
    </div>
  );
};
const BorderWidth = (props) => {
  const { style, api, image } = props;
  if (style.borderWidth === 0) return null;
  const property = style.borderWidth;
  const changeHandler = (str) => {
    if (image) {
      api.styleHandler(style, "padding", str);
    }
    api.styleHandler(style, "borderWidth", str);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <PropertyTitle titleName='Border-Width' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString())}
        type='range'
        min='1'
        max='10'
        step={1}
        value={property}
      />
      {property}
    </div>
  );
};
const MarginVertical = (props) => {
  const { style, api } = props;
  const property = style.marginTop;
  const changeHandler = (str) => {
    api.styleHandler(style, "marginVertical", str);
    // api.styleHandler(style, "marginBottom", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Vertical - margin' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString())}
        type='range'
        min='0'
        max='15'
        step={1}
        value={property}
      />
      {property}
    </div>
  );
};
const LineHeight = (props) => {
  const { style, api } = props;
  const property = style.lineHeight;
  const changeHandler = (str) => {
    api.styleHandler(style, "lineHeight", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Line-Height' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString())}
        type='range'
        min='1'
        max='4'
        step={0.1}
        value={property}
      />
      {property}
    </div>
  );
};
const LetterSpacing = (props) => {
  const { style, api } = props;
  const property = style.letterSpacing;
  let propertyValue = "";
  property.split("").map((c, i) => {
    if (c == "p" || c == "x") return;
    propertyValue = propertyValue + c;
  });
  const changeHandler = (str) => {
    api.styleHandler(style, "letterSpacing", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Letter-Spacing' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString() + "px")}
        type='range'
        min='-5'
        max='9'
        step={0.1}
        value={propertyValue}
      />
      {propertyValue}
    </div>
  );
};
const HorizontalPadding = (props) => {
  const { style, api } = props;
  const property = style.paddingRight;
  const changeHandler = (str) => {
    api.styleHandler(style, "paddingRight", str);
    api.styleHandler(style, "paddingLeft", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Horizontal - Padding' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString())}
        type='range'
        min='0'
        max='50'
        step={1}
        value={property}
      />
      {property}
    </div>
  );
};
const VerticalPadding = (props) => {
  const { style, api } = props;
  const property = style.paddingTop;
  const changeHandler = (str) => {
    api.styleHandler(style, "paddingTop", str);
    api.styleHandler(style, "paddingBottom", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Vertical - Padding' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString())}
        type='range'
        min='0'
        max='50'
        step={1}
        value={property}
      />
      {property}
    </div>
  );
};
const HorizontalMargin = (props) => {
  const { style, api } = props;
  const property = style.marginHorizontal;
  const changeHandler = (str) => {
    api.styleHandler(style, "marginHorizontal", str);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Horizontal - margin' />
      <input
        style={{ width: "75%" }}
        className='ml-2 mr-3'
        onChange={(e) => changeHandler(e.target.value.toString())}
        type='range'
        min='0'
        max='50'
        step={1}
        value={property}
      />
      {property}
    </div>
  );
};
const TextAlignWithMargin = (props) => {
  const { style, api } = props;
  const ml = style.marginLeft;
  const mr = style.marginRight;
  //console.log(ml);
  const bool1 = ml === 0 && mr === "auto";
  const bool2 = ml === "auto" && mr === "auto";
  const bool3 = ml === "auto" && mr === 0;
  const clickHandler = (marginLeft, marginRight) => {
    api.styleHandler(style, "marginLeft", marginLeft);
    api.styleHandler(style, "marginRight", marginRight);
  };
  return (
    <div style={{ display: "flex" }}>
      <PropertyTitle titleName='Align' />
      <span
        onClick={() => clickHandler(0, "auto")}
        style={{ cursor: "pointer" }}
        className={`"btn btn-sm mx-1 " + ${
          bool1 ? "btn-primary" : "btn-secondary"
        }`}>
        Left
      </span>
      <span
        onClick={() => clickHandler("auto", "auto")}
        style={{ cursor: "pointer" }}
        className={`"btn btn-sm mx-1 " + ${
          bool2 ? "btn-primary" : "btn-secondary"
        }`}>
        Center
      </span>
      <span
        onClick={() => clickHandler("auto", 0)}
        style={{ cursor: "pointer" }}
        className={`"btn btn-sm mx-1 " + ${
          bool3 ? "btn-primary" : "btn-secondary"
        }`}>
        Right
      </span>
    </div>
  );
};

export default Design;
