import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Divider, Form, Button, Input, notification } from "antd";
import { keyValidator } from "../util/validators";
import { getMints } from "../util/get-mints";

const { TextArea } = Input;
export const GibMints = ({endpoint}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [jsonVal, setJsonVal] = useState(undefined);
    const fetchMints = () => {
      notification.open({
        message: "Downloading your data.",
        key: "downloading",
        duration: 0,
      });
      setLoading(true);
      getMints(jsonVal, endpoint)
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
          Gib-Mints serves one purpose: To gib you mints from Solana address.
        </p>
        <Divider />

        <Form
          form={form}
          name="mintIds"
          initialValues={{
            mintIds: [],
          }}
          scrollToFirstError
          className={`${styles["full-width"]} ${styles["d-flex"]} ${styles["flex-col"]}`}
        >
          <label style={{ marginBottom: "2rem" }}>
            Please gib SOL address to get all mints
          </label>
          <Form.Item
            name="mintIds"
            rules={[
              keyValidator
            ]}
          >
            <TextArea
              rows={1}
              className={styles.card}
              style={{ width: "100%" }}
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
            onClick={() => fetchMints()}
          >
            {loading ? 'Getting Mints..' : "Gib Mints!"}
          </Button>
        </Form>
      </>
    );
  };