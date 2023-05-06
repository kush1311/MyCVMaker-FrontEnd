import { Text, Svg, Path } from "@react-pdf/renderer";
import React from "react";

const ArrowDesign = () => {
  return (
    // <Text
    //   style={{
    //     width: 10,
    //     fontSize: 16,
    //   }}>
    <Svg
      style={{
        color: "red",
        marginVertical: "auto",
        width: "12px",
        // backgroundColor: "red",
      }}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='#000'
      class='bi bi-arrow-right'
      viewBox='0 0 16 16'>
      <Path
        fill-rule='evenodd'
        d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
      />
      WW
    </Svg>
    // </Text>
  );
};

export default ArrowDesign;
