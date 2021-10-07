import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { Input, Form, Button, Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { getMeta } from "../util/get-meta";
import { DownloadOutlined } from "@ant-design/icons";
import { getHolders } from "../util/get-holders";
import { clusterApiUrl } from "@solana/web3.js";
import { getMints } from "../util/get-mints";

const { Option } = Select;

export const ENDPOINTS = [
  {
    name: "Metaplex",
    endpoint: "https://api.metaplex.solana.com/",
  },
  {
    name: "Solana",
    endpoint: "https://api.mainnet-beta.solana.com",
  },
  {
    name: "Serum",
    endpoint: "https://solana-api.projectserum.com",
  },
  {
    name: "testnet",
    endpoint: clusterApiUrl("testnet"),
  },
  {
    name: "devnet",
    endpoint: clusterApiUrl("devnet"),
  },
];



const { TextArea } = Input;
export default function Home() {
  const [jsonVal, setJsonVal] = useState(undefined);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([router.query?.mode as string || 'mints']);
  const [endpoint, setEndpoint] = useState(
    "https://solana-api.projectserum.com"
  );
  const setRoute = (route) => {
    router.push({ query: { mode: route } });
    setSelectedKeys([route]);
  };

  console.log(selectedKeys)
  useEffect(() => {
    if (router.query?.mode) {
      setSelectedKeys([router.query?.mode as string])
    }
  }, [router.query?.mode])

  const DEFAULT = `${ENDPOINTS.find(e => e.endpoint === endpoint).name} (${ENDPOINTS.find(e => e.endpoint === endpoint).endpoint})`

  const SelectNetwork = () => {
    return (
      <Select defaultValue={DEFAULT} onChange={e => setEndpoint(e as string)} style={{ minWidth: 200 }}>
        {ENDPOINTS.map((ep) => (
          <Option key={ep.name} value={ep.endpoint}>
            {ep.name} ({ep.endpoint})
          </Option>
        ))}
      </Select>
    );
  };
  const GibMints = () => {
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
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label style={{ marginBottom: "2rem" }}>
            Please gib SOL address to get all mints
          </label>
          <Form.Item
            name="mintIds"
            rules={[
              () => ({
                validator(_, value) {
                  try {
                    setJsonVal(value);
                    Promise.resolve(value);
                  } catch (e) {
                    return Promise.reject(new Error("Invalid JSON!"));
                  }
                },
              }),
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
            onClick={() => {
              setLoading(true);
              getMints(jsonVal, endpoint)
                .then(() => {
                  setLoading(false);
                })
                .catch((e) => {
                  alert(e);
                  setLoading(false);
                });
            }}
          >
            {loading ? `Getting Mints..` : "Gib Mints!"}
          </Button>
        </Form>
      </>
    );
  }
  const GibMeta = () => {
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
            rules={[
              () => ({
                validator(_, value) {
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
              getMeta(jsonVal, setCounter, endpoint)
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
      </>
    );
  };

  const GibHolders = () => {
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
              getHolders(jsonVal, setCounter, endpoint)
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
      </>
    );
  };

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        style={{ justifyContent: "center" }}
      >
        <Menu.Item onClick={() => setRoute("mints")} key="mints">
          Gib Mints
        </Menu.Item>
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
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:site" content="@0xAlice_"/>
          <meta name="twitter:creator" content="@0xAlice_"/>
          <meta property="og:site_name" content="Solana NFT Toolbox"/>
          <meta name="twitter:image" content="https://sol-nft.tools/sol-logo.jpeg"/>
          <meta name="twitter:image:alt" content="Solana NFT Tools, made by @0xAlice_"/>
          <meta name="twitter:title" content="Solana NFT Toolbox"/>
          <meta name="twitter:description" content="Solana NFT Tools, made by @0xAlice_"/>
          <meta name="og:url" content="https://sol-nft.tools"/>
          <meta name="og:title" content="Solana NFT Toolbox"/>
          <meta name="og:image" content="https://sol-nft.tools/sol-logo.jpeg"/>
          <meta property="og:description" content="Solana NFT Tools, made by @0xAlice_"/>

        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Solana NFT Toolbox</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sol-logo.jpeg" alt="Solana Logo" style={{width: 240}} />
          <div style={{
            maxWidth: 800,
            margin: '0 auto'
          }}>
            <Divider />
            <div style={{textAlign: 'center'}}>
              <label>Select RPC</label>
              <br />
              <br />
              <SelectNetwork />
            </div>
            <Divider />
            {selectedKeys[0] === "meta" && <GibMeta />}
            {selectedKeys[0] === "holders" && <GibHolders />}
            {selectedKeys[0] === "mints" && <GibMints />}
          </div>
        </main>
        <footer className={styles.footer}>
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <span style={{ display: "inline-block", textAlign: 'center' }}>
              Made by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://y.at/%E2%99%A0%E2%9D%A4%F0%9F%90%B0%F0%9F%90%B1"
              >
                Alice
              </a>
              Tip Address (SOL) <br />
               DSmbnj9t7CCQdAZfvYe3PNbJB7CrVXpa29iW3VkgpEEZ
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
