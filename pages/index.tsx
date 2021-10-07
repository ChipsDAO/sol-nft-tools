import { Menu } from "antd";
import { useRouter } from "next/router";
import { Input, Form, Button, Divider, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { getMeta } from "../util/get-meta";
import { DownloadOutlined } from "@ant-design/icons";
import { getHolders } from "../util/get-holders";
import { getMints } from "../util/get-mints";
import styles from "../styles/Home.module.css";
import { ENDPOINTS } from "../util/endpoints";

const { Option } = Select;
const { TextArea } = Input;

export default function Home() {
  const [jsonVal, setJsonVal] = useState(undefined);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([
    (router.query?.mode as string) || "mints",
  ]);
  const [endpoint, setEndpoint] = useState(
    "https://solana-api.projectserum.com"
  );
  const setRoute = (route) => {
    router.push({ query: { mode: route } });
    setSelectedKeys([route]);
  };

  useEffect(() => {
    if (router.query?.mode) {
      setSelectedKeys([router.query?.mode as string]);
    }
  }, [router.query?.mode]);

  const DEFAULT = `${ENDPOINTS.find((e) => e.endpoint === endpoint).name} (${ENDPOINTS.find((e) => e.endpoint === endpoint).endpoint
    })`;

  const SelectNetwork = () => {
    return (
      <Select
        defaultValue={DEFAULT}
        onChange={(e) => setEndpoint(e as string)}
        style={{ minWidth: 200 }}
      >
        {ENDPOINTS.map((ep) => (
          <Option key={ep.name} value={ep.endpoint}>
            {ep.name} ({ep.endpoint})
          </Option>
        ))}
      </Select>
    );
  };

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

  const keyValidator = () => ({
    validator(_, value) {
      if (value?.length !== 44) {
        return Promise.reject(new Error(`Invalid key length! Is ${value?.length}, should be 44.`));
      }
      setJsonVal(value);
      return Promise.resolve(value);
    },
  })

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


  const jsonValidator = () => ({
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
  })


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
            rules={[ jsonValidator ]}
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
          className={`${styles["full-width"]} ${styles["d-flex"]} ${styles["flex-col"]}`}
        >
          <label style={{ marginBottom: "2rem" }}>
            Please gib SOL mint IDs as JSON array to get their holders.
          </label>
          <Form.Item
            name="holders"
            rules={[
              jsonValidator
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

  const copyAddress = () => {
    navigator.clipboard.writeText(
      "DSmbnj9t7CCQdAZfvYe3PNbJB7CrVXpa29iW3VkgpEEZ"
    );
    notification.open({
      message: "Copied to clipboard!",
    });
  };

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        className={`${styles.menu}`}
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
        <main className={styles.main}>
          <h1 className={styles.title}>Solana NFT Toolbox</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sol-logo.jpeg"
            alt="Solana Logo"
            className={styles["sol-logo"]}
          />
          <div className={styles["inner-container"]}>
            <Divider />
            <div style={{ textAlign: "center" }}>
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
          <span>
            Made by
            <a
              target="_blank"
              rel="noreferrer"
              href="https://y.at/%E2%99%A0%E2%9D%A4%F0%9F%90%B0%F0%9F%90%B1"
            >
              Alice{" "}
            </a>
          </span>
          <span className={styles["text-right"]}>
            Tip Address (SOL) <br />
            <span
              onClick={() => copyAddress()}
              className={styles["cursor-pointer"]}
            >
              DSmbnj9t7CCQdAZfvYe3PNbJB7CrVXpa29iW3VkgpEEZ
            </span>
          </span>
        </footer>
      </div>
    </>
  );
}
