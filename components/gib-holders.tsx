import { Button, Divider, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { jsonValidator } from "../util/validators";
import styles from "../styles/Home.module.css";
import { DownloadOutlined } from "@ant-design/icons";
import { getHolders } from "../util/get-holders";
const { TextArea } = Input;

export const GibHolders = ({endpoint}) => {
  const [form] = Form.useForm();
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonVal, setJsonVal] = useState(undefined);

  const fetchHolders = () => {
    notification.open({
      message: "Downloading your data.",
      key: "downloading",
      duration: 0,
    });

    setLoading(true);
    getHolders(jsonVal, setCounter, endpoint)
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
  }


  return (
    <>
      <p>
        Gib-Holders serves one purpose: To gib you holders from Solana Mint
        IDs. It will return an object with holders, mints and amounts.
      </p>
      <Divider />

      <Form
        form={form}
        name="holders"
        initialValues={{
          holders: [],
        }}
        scrollToFirstError
        className={`${styles["full-width"]} ${styles["d-flex"]} ${styles["flex-col"]}`}
      >
        <label style={{ marginBottom: "2rem" }}>
          Please gib SOL mint IDs as JSON array to get their holders.
        </label>
        <Form.Item
          name="holders"
          rules={[
            jsonValidator(setCounter)
          ]}
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
          className={`${styles["d-block"]} ${styles["m-0-auto"]}`}
          onClick={() => fetchHolders()}
        >
          {loading ? `${counter} / ${jsonVal?.length}` : "Gib Holders!"}
        </Button>
      </Form>
    </>
  );
};