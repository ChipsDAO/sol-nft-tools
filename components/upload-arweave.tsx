import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { useCallback, useEffect, useState } from "react";
import { Divider, Button, Card, notification, Spin } from "antd";
import { FileUpload } from "./file-upload";
import { DownloadOutlined } from "@ant-design/icons";
import { download } from "../util/download";
import jsonFormat from "json-format";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const uploadToArweave = async (transaction) => {
  const uploader = await arweave.transactions.getUploader(transaction);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
  }
};

const fileToBuffer = (
  file: File
): Promise<{ buffer: ArrayBuffer; file: File }> => {
  return new Promise((resolve) => {
    var reader = new FileReader();

    reader.onload = function (readerEvt) {
      var buffer = readerEvt.target.result;

      resolve({
        buffer: buffer as ArrayBuffer,
        file,
      });
    };

    reader.readAsArrayBuffer(file);
  });
};
export const generateArweaveWallet = async () => {
  const key = await arweave.wallets.generate();
  localStorage.setItem("arweave-key", JSON.stringify(key));
  return key;
};

export const getKeyForJwk = (jwk) => arweave.wallets.jwkToAddress(jwk);

export default function ARUpload() {
  const [jwk, setJwk] = useState<JWKInterface>();
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState("none");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generate = () =>
      generateArweaveWallet().then(async (jwk) => {
        setJwk(jwk);
        const a = await getKeyForJwk(jwk);
        setAddress(a);
      });

    const previousKey = localStorage.getItem("arweave-key");
    if (previousKey) {
      if (!address) {
        try {
          const k = JSON.parse(previousKey);
          setJwk(k);
          getKeyForJwk(k).then((a) => {
            setAddress(a);
          });
        } catch (e) {
          console.log(e);
          generate();
        }
      }
    } else {
      generate();
    }
  }, [address, jwk]);

  const upload = useCallback(async () => {
    setLoading(true);
    const res = await Promise.all(
      files.map(async (f) => {
        const transaction = await arweave.createTransaction(
          { data: f.buffer },
          jwk
        );
        transaction.addTag("Content-Type", f.file.type);
        await arweave.transactions.sign(transaction, jwk);
        await uploadToArweave(transaction);
        return {
          link: `https://arweave.net/${transaction.id}`,
          name: f.file.name,
        };
      })
    );

    setLoading(false);
    download(`AR-upload-${Date.now()}.json`, jsonFormat(res));
  }, [files, jwk]);

  const downloadKey = useCallback(() => {
    if (!jwk || !address) {
      return
    }
    download(`AR-${address}.json`, jsonFormat(jwk));
  }, [address, jwk])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (address) {
        const balance = await arweave.wallets.getBalance(address);
        setBalance(arweave.ar.winstonToAr(balance));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [address, balance]);

  const handleFiles = useCallback(async (_files: File[]) => {
    const loaded = await Promise.all(_files.map((f) => fileToBuffer(f)));
    setFiles(loaded);
  }, []);

  return (
    <>
      <p>
        Gib AR-Links lets you upload files to arweave. Please make sure to use
        files smaller than 250mb.
      </p>
      <p>
        Send some AR to this wallet to start uploading. You can download and
        empty the wallet later. You can get AR on{" "}
        <a href="https://binance.com" target="_blank" rel="noopener noreferrer">
          Binance
        </a>
      </p>
      <Divider />

      <div>
        <Card
          extra={
            <>
              <CopyToClipboard
                text={address}
                onCopy={() =>
                  notification.open({ message: "Copied to clipboard!" })
                }
              >
                <a style={{ marginRight: "1rem" }}>Copy Address</a>
              </CopyToClipboard>
              <a
                onClick={downloadKey}
              >
                Download Wallet
              </a>
            </>
          }
          title="Wallet"
        >
          <p>Address: {address}</p>
          <p>
            Balance:{" "}
            {balance === "none" ? (
              <Spin style={{ marginLeft: "1rem" }} />
            ) : (
              balance
            )}
          </p>
          <Divider />
          <FileUpload setFiles={handleFiles} />
        </Card>
      </div>

      <br />

      <Button
        type="primary"
        loading={loading}
        shape="round"
        disabled={!files.length}
        icon={<DownloadOutlined />}
        size="large"
        style={{ margin: "0 auto", display: "block" }}
        onClick={upload}
      >
        {loading ? "Uploading..." : "Gib AR Links!"}
      </Button>
      <br />
    </>
  );
}
