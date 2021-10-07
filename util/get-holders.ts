import { jsonFormat } from 'json-format';
import { download } from './download';
import { resolveSequentially } from './resolve-sequentially';
let holders = [];
const getTokenHolder = key => {
  return fetch('https://solana-api.projectserum.com', {
    body: `{
        "jsonrpc":"2.0", 
        "id":1, 
        "method":"getProgramAccounts", 
        "params":[
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          {
            "encoding": "jsonParsed",
            "filters": [
              {
                "dataSize": 165
              },
              {
                "memcmp": {
                  "offset": 0,
                  "bytes": "${key}"
                }
              }
            ]
          }
        ]}
    `,
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(res => res.json()).then(async res => {
    res.result.forEach((r) => {
      if (r.account.data.parsed.info.tokenAmount.uiAmount > 0) {
        holders = [...holders, r.account.data.parsed.info.owner]
      }
    })
  })
};

export const getHolders = (mintIds: string[], setCounter) => {
  return resolveSequentially(mintIds, getTokenHolder, setCounter).then(() => {
    download(`token-holders-${Date.now()}.json`, jsonFormat(holders, {
      type: "space",
      size: 2,
    }));
    holders.forEach(() => holders.unshift());
  });
}