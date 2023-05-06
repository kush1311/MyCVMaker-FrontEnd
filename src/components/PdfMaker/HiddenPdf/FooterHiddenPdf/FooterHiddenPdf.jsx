import { Text, View, PDFViewer, Link, StyleSheet } from "@react-pdf/renderer";

const FooterHiddenPdf = (props) => {
  const { api } = props;
  return (
    <>
      {Object.keys(api.state.footer).map((key, index) => {
        if (!api.state.footer[key]) return null;
        return (
          <Text
            key={index}
            style={{ marginHorizontal: "auto", ...api.styles.text }}>
            {api.state.footer[key]}
          </Text>
        );
      })}
    </>
  );
};

export default FooterHiddenPdf;
