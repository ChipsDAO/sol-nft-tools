import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export function FileUpload({setFiles}) {

const props = {
  name: "file",
  multiple: true,
  onChange(info) {
    setFiles(info.fileList.map(f => f.originFileObj));
  },
};

  return (
    <Dragger beforeUpload={() => false} {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
}
