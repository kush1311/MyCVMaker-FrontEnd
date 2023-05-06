import { Text } from "@react-pdf/renderer";
import React from "react";

const BulletPoint = () => {
  return (
    <Text
      style={{
        width: 10,
        fontSize: 16,
      }}>
      •
    </Text>
  );
};

export default BulletPoint;
