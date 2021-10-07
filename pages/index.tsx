import { Menu } from "antd";
import { useRouter } from "next/router";
import { Divider, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { GibHolders } from '../components/gib-holders';
import { GibMints } from '../components/gib-mints';
import { GibMeta } from '../components/gib-meta';
import styles from "../styles/Home.module.css";
import { ENDPOINTS } from "../util/endpoints";

const { Option } = Select;

export default function Home() {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([
    (router.query?.mode as string) || 'mints',
  ]);
  const [endpoint, setEndpoint] = useState(
    'https://solana-api.projectserum.com'
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

  const DEFAULT = `${ENDPOINTS.find((e) => e.endpoint === endpoint).name} ` +
    `(${ENDPOINTS.find((e) => e.endpoint === endpoint).endpoint})`;

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


  const copyAddress = () => {
    navigator.clipboard.writeText(
      "DSmbnj9t7CCQdAZfvYe3PNbJB7CrVXpa29iW3VkgpEEZ"
    );
    notification.open({
      message: "Copied to clipboard!",
      duration: 2000
    });
  };

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        className={styles.menu}
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
            {selectedKeys[0] === "meta" && <GibMeta endpoint={endpoint} />}
            {selectedKeys[0] === "holders" && <GibHolders endpoint={endpoint} />}
            {selectedKeys[0] === "mints" && <GibMints endpoint={endpoint} />}
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
