import { DocumentDownloadIcon, DownloadIcon } from "@heroicons/react/outline";
import { CloudDownloadIcon } from "@heroicons/react/solid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "../HiddenPdf";

const Down = (props) => {
  const { api, className } = props;
  // hover:bg-fuchsia-700 hover:outline-none outline-lime-600
  return (
    <button style={{ fontWeight: "inherit" }} className={className}>
      <PDFDownloadLink
        className='hover:text-white'
        style={{ textDecoration: "none" }}
        document={<MyDocument {...props} />}
        fileName={`Resume ${
          new Date().getDate() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getFullYear()
        }`}>
        {/* {({ blob, url, loading, error }) =>
          loading ? "Loading ocument..." : "Download"
        } */}
        <span style={{ fontWeight: "inherit" }} className='my-auto flex'>
          <span className='my-auto'>Download</span>

          <span className='w-5 ml-1 my-auto'>
            {" "}
            {/* <DownloadIcon />{" "} */}
            {/* <DocumentDownloadIcon /> */}
            <CloudDownloadIcon />
          </span>
        </span>
      </PDFDownloadLink>
    </button>
  );
};
export default Down;
