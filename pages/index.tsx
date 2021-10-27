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

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
        className={styles.menu}
      >
        <Menu.Item >
          <a href="https://pentacle.xyz" target="_blank" rel="noreferrer noopener">
            <img src="https://pentacle.ai/pentacle-logo-LH.svg" style={{width:180}} alt="" />
          </a>
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
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/penta-fun/sol-nft-tools/"
          >
            <i
              className="fab fa-github"
              style={{ fontStyle: "normal", fontSize: 24 }}
            ></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/pentaclexyz"
          >
            <i
              className="fab fa-twitter"
              style={{ fontStyle: "normal", fontSize: 24 }}
            ></i>
          </a>
        </div>
      </footer>
    </div>
  </>
  );
}
