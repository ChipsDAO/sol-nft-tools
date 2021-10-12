import { Menu } from "antd";
import { useRouter } from "next/router";
import { Divider, Select, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { GibHolders } from "../components/gib-holders";
import { GibMints } from "../components/gib-mints";
import { GibMeta } from "../components/gib-meta";
import styles from "../styles/Home.module.css";
import { ENDPOINTS } from "../util/endpoints";
import ARUpload from "../components/upload-arweave";

const { Option } = Select;

export default function Home() {
  const router = useRouter();
  const rightMenuRef = useRef();
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

  const DEFAULT =
    `${ENDPOINTS.find((e) => e.endpoint === endpoint).name} ` +
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
      duration: 2000,
    });
  };

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        className={styles.menu}
      >
        <Menu.Item style={{ position: "unset" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-horizontal-gradient-dark.svg"
            alt="Solana Logo"
            className={styles["sol-logo"]}
            style={
              {
                // width:
              }
            }
          />
        </Menu.Item>

        <Menu.Item onClick={() => setRoute("mints")} key="mints">
          Gib Mints
        </Menu.Item>
        <Menu.Item onClick={() => setRoute("meta")} key="meta">
          Gib Meta
        </Menu.Item>
        <Menu.Item onClick={() => setRoute("holders")} key="holders">
          Gib Holders
        </Menu.Item>
        <Menu.Item
          onClick={() => setRoute("ar-links")}
          style={{ marginRight: "auto" }}
          key="ar-links"
        >
          Gib AR-Links (Beta)
        </Menu.Item>

        <Menu.Item>
          <div ref={rightMenuRef}>
            <SelectNetwork />
          </div>
        </Menu.Item>
      </Menu>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2
            className={styles.title}
          >{`GIB ${selectedKeys[0].toUpperCase()}!`}</h2>
          <div className={styles["inner-container"]}>
            <Divider />
            {selectedKeys[0] === "meta" && <GibMeta endpoint={endpoint} />}
            {selectedKeys[0] === "holders" && (
              <GibHolders endpoint={endpoint} />
            )}
            {selectedKeys[0] === "mints" && <GibMints endpoint={endpoint} />}
            {selectedKeys[0] === "ar-links" && <ARUpload />}
          </div>
        </main>
        <footer className={styles.footer}>
          <span style={{width: '100%'}}>
            <span>
              Made by
              <a
                style={{display: 'block'}}
                target="_blank"
                rel="noreferrer"
                href="https://y.at/%E2%99%A0%E2%9D%A4%F0%9F%90%B0%F0%9F%90%B1"
              >
                Alice{" "}
              </a>
            </span>
          </span>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 32}}>
            <a href="https://github.com/21e8/sol-nft-tools"><i className="fab fa-github" style={{fontStyle: 'normal', fontSize: 24}}></i></a>
            <a href="https://twitter.com/0xAlice_"><i className="fab fa-twitter" style={{fontStyle: 'normal', fontSize: 24}}></i></a>
            <a href="https://discord.gg/JAU4e7Zf"><i className="fab fa-discord" style={{fontStyle: 'normal', fontSize: 24}}></i></a>
          </div>
          <span style={{width: '100%'}} className={styles["text-right"]}>
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
