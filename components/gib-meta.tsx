import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Divider, Form, Button, Input, notification } from 'antd';
import { jsonValidator } from '../util/validators';
import styles from "../styles/Home.module.css";
import { getMeta } from '../util/get-meta';

const { TextArea } = Input;

export const GibMeta = ({endpoint}) => {
  const [form] = Form.useForm();
  const [jsonVal, setJsonVal] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const fetchMeta = () => {
    notification.open({
      message: "Downloading your data.",
      key: "downloading",
      duration: 0,
    });

    setLoading(true);
    getMeta(jsonVal, setCounter, endpoint)
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      })
      .finally(() => {
        notification.close("downloading");
      });
  };
  return (
    <>
      <p>
        Gib-Meta serves one purpose: To gib you metadata from Solana Mint IDs.
        It will return an object with resolved arweave metadata as well as the
        metadata associated with the token itself.
      </p>
      <Divider />

      <Form
        form={form}
        name="mintIds"
        initialValues={{
          mintIds: [],
        }}
        scrollToFirstError
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label style={{ marginBottom: "2rem" }}>
          Please gib SOL mint IDs as JSON array to get their metadata
        </label>
        <Form.Item
          name="mintIds"
          rules={[ jsonValidator(setJsonVal) ]}
        >
          <TextArea
            rows={4}
            className={`${styles.card} ${styles["full-width"]}`}
          />
        </Form.Item>

        <Button
          type="primary"
          loading={loading}
          shape="round"
          disabled={!jsonVal || !jsonVal.length}
          icon={<DownloadOutlined />}
          size="large"
          style={{ margin: "0 auto", display: "block" }}
          onClick={() => fetchMeta()}
        >
          {loading ? `${counter} / ${jsonVal?.length}` : "Gib Meta!"}
        </Button>
      </Form>
    </>
  );
};