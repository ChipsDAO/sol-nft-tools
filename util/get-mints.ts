import { PublicKey } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';
import jsonFormat from 'json-format';
import * as anchor from "@project-serum/anchor";
import { download } from './download';


class Creator {
  address: PublicKey;
  verified: boolean;
  share: number;

  constructor(args: { address: PublicKey; verified: boolean; share: number }) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}

enum MetadataKey {
  Uninitialized = 0,
  MetadataV1 = 4,
  EditionV1 = 1,
  MasterEditionV1 = 2,
  MasterEditionV2 = 6,
  EditionMarker = 7,
}

class Data {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Creator[] | null;
  constructor(args: {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
  }) {
    this.name = args.name;
    this.symbol = args.symbol;
    this.uri = args.uri;
    this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
    this.creators = args.creators;
  }
}

class Metadata {
  key: MetadataKey;
  updateAuthority: PublicKey;
  mint: PublicKey;
  data: Data;
  primarySaleHappened: boolean;
  isMutable: boolean;
  masterEdition?: PublicKey;
  edition?: PublicKey;
  constructor(args: {
    updateAuthority: PublicKey;
    mint: PublicKey;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    masterEdition?: PublicKey;
  }) {
    this.key = MetadataKey.MetadataV1;
    this.updateAuthority = args.updateAuthority;
    this.mint = args.mint;
    this.data = args.data;
    this.primarySaleHappened = args.primarySaleHappened;
    this.isMutable = args.isMutable;
  }
}


const METADATA_SCHEMA = new Map<any, any>([
  [
    Data,
    {
      kind: "struct",
      fields: [
        ["name", "string"],
        ["symbol", "string"],
        ["uri", "string"],
        ["sellerFeeBasisPoints", "u16"],
        ["creators", { kind: "option", type: [Creator] }],
      ],
    },
  ],
  [
    Creator,
    {
      kind: "struct",
      fields: [
        ["address", [32]],
        ["verified", "u8"],
        ["share", "u8"],
      ],
    },
  ],
  [
    Metadata,
    {
      kind: "struct",
      fields: [
        ["key", "u8"],
        ["updateAuthority", [32]],
        ["mint", [32]],
        ["data", Data],
        ["primarySaleHappened", "u8"],
        ["isMutable", "u8"],
      ],
    },
  ],
]);


let holders = {};
const getMintsForToken = url => key => {
  return fetch(url, {
    body: `{
        "jsonrpc":"2.0", 
        "id": ${Date.now()}, 
        "method":"getProgramAccounts", 
        "params":[
          "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          {
            "encoding": "jsonParsed",
            "filters": [
              {
                "memcmp": {
                  "offset": 326,
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
  }).then(res => res.json());
};

export const getMints = async (creatorId: string, url: string) => {
  const connection = new anchor.web3.Connection(url);
  const a = await connection.getProgramAccounts(
    new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
    {
      encoding: 'base64',
      filters: [
        {
          "memcmp": {
            "offset": 326,
            "bytes": creatorId
          }
        }
      ]
    }
  )
  const deserialized = a.map(b=> deserializeUnchecked(METADATA_SCHEMA, Metadata, b.account.data));
  download(
    "mints-creatorId-" + Date.now() + ".json",
    jsonFormat(deserialized.map(g => new PublicKey(g.mint).toBase58()), {
      type: "space",
      size: 2,
    })
  );
}