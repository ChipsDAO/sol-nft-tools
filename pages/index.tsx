import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Menu } from "antd";
import { useRouter } from "next/router";

import { Input, Form, Button, Divider } from "antd";
import { useState } from "react";
import { getMeta } from "../util/get-meta";
import { DownloadOutlined } from "@ant-design/icons";
import { getHolders } from "../util/get-holders";

const { TextArea } = Input;
export default function Home() {
  const [jsonVal, setJsonVal] = useState(undefined);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(["meta"]);
  const setRoute = (route) => {
    router.push({ query: { mode: route } });
    setSelectedKeys([route]);
  };

  const GibMeta = () => {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Solana NFT Toolbox</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sol-logo.jpeg" alt="Solana Logo" />
        <Divider />
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
            rules={[
              () => ({
                validator(_, value) {
                  console.log(value);
                  try {
                    const val = JSON.parse(value);
                    if (!val.length) {
                      return Promise.reject(
                        new Error("Must have at least one item!")
                      );
                    }
                    setJsonVal(val);
                    Promise.resolve(val);
                  } catch {
                    return Promise.reject(new Error("Invalid JSON!"));
                  }
                },
              }),
            ]}
          >
            <TextArea
              rows={4}
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
            onClick={() => {
              setLoading(true);
              getMeta(jsonVal, setCounter)
                .then(() => {
                  setLoading(false);
                })
                .catch((e) => {
                  alert(e);
                  setLoading(false);
                });
            }}
          >
            {loading ? `${counter} / ${jsonVal?.length}` : "Gib Meta!"}
          </Button>
        </Form>
      </main>
    );
  };

  const GibHolders = () => {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Solana NFT Toolbox</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sol-logo.jpeg" alt="Solana Logo" />
        <Divider />
        <p>
          Gib-Holders serves one purpose: To gib you holders from Solana Mint IDs.
          It will return an object with holders, mints and amounts.
        </p>
        <Divider />

        <Form
          form={form}
          name="holders"
          initialValues={{
            holders: [],
          }}
          scrollToFirstError
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label style={{ marginBottom: "2rem" }}>
            Please gib SOL mint IDs as JSON array to get their holders.
          </label>
          <Form.Item
            name="holders"
            rules={[
              () => ({
                validator(_, value) {
                  console.log(value);
                  try {
                    const val = JSON.parse(value);
                    if (!val.length) {
                      return Promise.reject(
                        new Error("Must have at least one item!")
                      );
                    }
                    setJsonVal(val);
                    Promise.resolve(val);
                  } catch {
                    return Promise.reject(new Error("Invalid JSON!"));
                  }
                },
              }),
            ]}
          >
            <TextArea
              rows={4}
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
            onClick={() => {
              setLoading(true);
              getHolders(jsonVal, setCounter)
                .then(() => {
                  setLoading(false);
                })
                .catch((e) => {
                  alert(e);
                  setLoading(false);
                });
            }}
          >
            {loading ? `${counter} / ${jsonVal?.length}` : "Gib Holders!"}
          </Button>
        </Form>
      </main>
    );
  }

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        style={{ justifyContent: "center" }}
      >
        <Menu.Item onClick={() => setRoute("meta")} key="meta">
          Gib Meta
        </Menu.Item>
        <Menu.Item onClick={() => setRoute("holders")} key="holders">
          Gib Holders
        </Menu.Item>
      </Menu>
      <div className={styles.container}>
        <Head>
          <title>Solana NFT Toolbox</title>
          <meta name="description" content="grab metadata from SOL NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {selectedKeys[0] === 'meta' &&  <GibMeta />}
        {selectedKeys[0] === 'holders' &&  <GibHolders />}

        <footer className={styles.footer}>
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <span style={{ display: "inline-block" }}>
              Made by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/0xAlice_"
              >
                Alice
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
