import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Input, Form, Button, Divider } from "antd";
import { useState } from "react";
import { getMeta } from './get-meta';
import { DownloadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { TextArea } = Input;
export default function Home() {
  const [jsonVal, setJsonVal] = useState(undefined);
  const [form] = Form.useForm();
  return (
    <div className={styles.container}>
      <Head>
        <title>GIB META!</title>
        <meta name="description" content="grab metadata from SOL NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Gib-Meta</h1>
          <Divider/>
          <p>
          Gib-Meta serves one purpose: To gib you metadata from Solana Mint IDs.
          It will return an object with resolved arweave metadata as well as the metadata associated with the token itself.
          </p>
          <Divider/>

          <Form
            form={form}
            name="mintIds"
            initialValues={{
              mintIds: [],
            }}
            scrollToFirstError
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <label style={{marginBottom: '2rem'}}>Please SOL mint ids as JSON array to get their metadata</label>
            <Form.Item
              name="mintIds"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    console.log(value);
                    try {
                      const val = JSON.parse(value);
                      if (!val.length) {
                        return Promise.reject(new Error("Mus have at least one item!"))
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
              <TextArea rows={4} className={styles.card} />
            </Form.Item>


            <Button type="primary" shape="round" disabled={!jsonVal || !jsonVal.length} icon={<DownloadOutlined />} size="large" style={{margin: '0 auto', display: 'block'}} onClick={() => {
              getMeta(jsonVal).catch(e => alert(e))
            }}>
              Gib Meta!
              </Button>
          </Form>
      </main>

      <footer className={styles.footer}>
            <span>  Made by <a target="_blank" rel="noreferrer" href="https://twitter.com/0xAlice_">Alice</a></span>
      </footer>
    </div>
  );
}
