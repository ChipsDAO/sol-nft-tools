"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = exports.programIds = exports.findProgramAddress = exports.METADATA_SCHEMA = exports.Edition = exports.EditionMarker = exports.MasterEditionV2 = exports.MasterEditionV1 = exports.SYSTEM = exports.METAPLEX_ID = exports.AUCTION_ID = exports.VAULT_ID = exports.METADATA_PROGRAM_ID = exports.MEMO_ID = exports.BPF_UPGRADE_LOADER_ID = exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = exports.WRAPPED_SOL_MINT = exports.toPublicKey = exports.LazyAccountInfoProxy = exports.Metadata = exports.Data = exports.MetadataKey = exports.Creator = exports.METADATA_PREFIX = void 0;
var bs58_1 = require("bs58");
var borsh_1 = require("borsh");
var web3_js_1 = require("@solana/web3.js");
var anchor = require("@project-serum/anchor");
const jsonFormat = require('json-format');
exports.METADATA_PREFIX = 'metadata';
var Creator = /** @class */ (function () {
    function Creator(args) {
        this.address = args.address;
        this.verified = args.verified;
        this.share = args.share;
    }
    return Creator;
}());
exports.Creator = Creator;
var MetadataKey;
(function (MetadataKey) {
    MetadataKey[MetadataKey["Uninitialized"] = 0] = "Uninitialized";
    MetadataKey[MetadataKey["MetadataV1"] = 4] = "MetadataV1";
    MetadataKey[MetadataKey["EditionV1"] = 1] = "EditionV1";
    MetadataKey[MetadataKey["MasterEditionV1"] = 2] = "MasterEditionV1";
    MetadataKey[MetadataKey["MasterEditionV2"] = 6] = "MasterEditionV2";
    MetadataKey[MetadataKey["EditionMarker"] = 7] = "EditionMarker";
})(MetadataKey = exports.MetadataKey || (exports.MetadataKey = {}));
var Data = /** @class */ (function () {
    function Data(args) {
        this.name = args.name;
        this.symbol = args.symbol;
        this.uri = args.uri;
        this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
        this.creators = args.creators;
    }
    return Data;
}());
exports.Data = Data;
var Metadata = /** @class */ (function () {
    function Metadata(args) {
        this.key = MetadataKey.MetadataV1;
        this.updateAuthority = args.updateAuthority;
        this.mint = args.mint;
        this.data = args.data;
        this.primarySaleHappened = args.primarySaleHappened;
        this.isMutable = args.isMutable;
    }
    return Metadata;
}());
exports.Metadata = Metadata;
var LazyAccountInfoProxy = /** @class */ (function () {
    function LazyAccountInfoProxy() {
        this.executable = false;
        this.owner = '';
        this.lamports = 0;
    }
    Object.defineProperty(LazyAccountInfoProxy.prototype, "data", {
        get: function () {
            //
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    return LazyAccountInfoProxy;
}());
exports.LazyAccountInfoProxy = LazyAccountInfoProxy;
var PubKeysInternedMap = new Map();
exports.toPublicKey = function (key) {
    if (typeof key !== 'string') {
        return key;
    }
    var result = PubKeysInternedMap.get(key);
    if (!result) {
        result = new web3_js_1.PublicKey(key);
        PubKeysInternedMap.set(key, result);
    }
    return result;
};
exports.WRAPPED_SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3_js_1.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
exports.BPF_UPGRADE_LOADER_ID = new web3_js_1.PublicKey('BPFLoaderUpgradeab1e11111111111111111111111');
exports.MEMO_ID = new web3_js_1.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
exports.METADATA_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
exports.VAULT_ID = 'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn';
exports.AUCTION_ID = 'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8';
exports.METAPLEX_ID = 'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98';
exports.SYSTEM = new web3_js_1.PublicKey('11111111111111111111111111111111');
var MasterEditionV1 = /** @class */ (function () {
    function MasterEditionV1(args) {
        this.key = MetadataKey.MasterEditionV1;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
        this.printingMint = args.printingMint;
        this.oneTimePrintingAuthorizationMint =
            args.oneTimePrintingAuthorizationMint;
    }
    return MasterEditionV1;
}());
exports.MasterEditionV1 = MasterEditionV1;
var MasterEditionV2 = /** @class */ (function () {
    function MasterEditionV2(args) {
        this.key = MetadataKey.MasterEditionV2;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
    }
    return MasterEditionV2;
}());
exports.MasterEditionV2 = MasterEditionV2;
var EditionMarker = /** @class */ (function () {
    function EditionMarker(args) {
        this.key = MetadataKey.EditionMarker;
        this.ledger = args.ledger;
    }
    return EditionMarker;
}());
exports.EditionMarker = EditionMarker;
var Edition = /** @class */ (function () {
    function Edition(args) {
        this.key = MetadataKey.EditionV1;
        this.parent = args.parent;
        this.edition = args.edition;
    }
    return Edition;
}());
exports.Edition = Edition;
exports.METADATA_SCHEMA = new Map([
    [
        MasterEditionV1,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['supply', 'u64'],
                ['maxSupply', { kind: 'option', type: 'u64' }],
                ['printingMint', 'pubkey'],
                ['oneTimePrintingAuthorizationMint', [32]],
            ],
        },
    ],
    [
        MasterEditionV2,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['supply', 'u64'],
                ['maxSupply', { kind: 'option', type: 'u64' }],
            ],
        },
    ],
    [
        Edition,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['parent', [32]],
                ['edition', 'u64'],
            ],
        },
    ],
    [
        Data,
        {
            kind: 'struct',
            fields: [
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
                ['sellerFeeBasisPoints', 'u16'],
                ['creators', { kind: 'option', type: [Creator] }],
            ],
        },
    ],
    [
        Creator,
        {
            kind: 'struct',
            fields: [
                ['address', [32]],
                ['verified', 'u8'],
                ['share', 'u8'],
            ],
        },
    ],
    [
        Metadata,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['updateAuthority', [32]],
                ['mint', [32]],
                ['data', Data],
                ['primarySaleHappened', 'u8'],
                ['isMutable', 'u8'],
            ],
        },
    ],
    [
        EditionMarker,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['ledger', [31]],
            ],
        },
    ],
]);
exports.findProgramAddress = function (seeds, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var key, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = 'pda-' +
                    seeds.reduce(function (agg, item) { return agg + item.toString('hex'); }, '') +
                    programId.toString();
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress(seeds, programId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, [result[0].toBase58(), result[1]]];
        }
    });
}); };
exports.programIds = function () {
    return {
        token: exports.TOKEN_PROGRAM_ID,
        associatedToken: exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        bpf_upgrade_loader: exports.BPF_UPGRADE_LOADER_ID,
        system: exports.SYSTEM,
        metadata: exports.METADATA_PROGRAM_ID,
        memo: exports.MEMO_ID,
        vault: exports.VAULT_ID,
        auction: exports.AUCTION_ID,
        metaplex: exports.METAPLEX_ID,
    };
};
var decodeMetadata = function (buffer) {
    var metadata = borsh_1.deserializeUnchecked(exports.METADATA_SCHEMA, Metadata, buffer);
    metadata.data.name = metadata.data.name.replace(/\0/g, '');
    metadata.data.symbol = metadata.data.symbol.replace(/\0/g, '');
    metadata.data.uri = metadata.data.uri.replace(/\0/g, '');
    metadata.data.name = metadata.data.name.replace(/\0/g, '');
    return metadata;
};
var extendBorsh = function () {
    borsh_1.BinaryReader.prototype.readPubkey = function () {
        var reader = this;
        var array = reader.readFixedArray(32);
        return new web3_js_1.PublicKey(array);
    };
    borsh_1.BinaryWriter.prototype.writePubkey = function (value) {
        var writer = this;
        writer.writeFixedArray(value.toBuffer());
    };
    borsh_1.BinaryReader.prototype.readPubkeyAsString = function () {
        var reader = this;
        var array = reader.readFixedArray(32);
        return bs58_1.default.encode(array);
    };
    borsh_1.BinaryWriter.prototype.writePubkeyAsString = function (value) {
        var writer = this;
        writer.writeFixedArray(bs58_1.default.decode(value));
    };
};
extendBorsh();
function getMetadata(pubkey, url) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata, metadataPromise, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchMetadataFromPDA(pubkey, url)];
                case 1:
                    metadataPromise = _a.sent();
                    if (metadataPromise && metadataPromise.data.length > 0) {
                        metadata = decodeMetadata(metadataPromise.data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, metadata];
            }
        });
    });
}
exports.getMetadata = getMetadata;
function getMetadataKey(tokenMint) {
    return __awaiter(this, void 0, Promise, function () {
        var PROGRAM_IDS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PROGRAM_IDS = exports.programIds();
                    return [4 /*yield*/, exports.findProgramAddress([
                            Buffer.from(exports.METADATA_PREFIX),
                            exports.toPublicKey(PROGRAM_IDS.metadata).toBuffer(),
                            exports.toPublicKey(tokenMint).toBuffer(),
                        ], exports.toPublicKey(PROGRAM_IDS.metadata))];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
function fetchMetadataFromPDA(pubkey, url) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, metadataKey, metadataInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = new anchor.web3.Connection(url);
                    return [4 /*yield*/, getMetadataKey(pubkey.toBase58())];
                case 1:
                    metadataKey = _a.sent();
                    return [4 /*yield*/, connection.getAccountInfo(exports.toPublicKey(metadataKey))];
                case 2:
                    metadataInfo = _a.sent();
                    return [2 /*return*/, metadataInfo];
            }
        });
    });
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
var mints = [];
var gen = function (key) {
    return getMetadata(new anchor.web3.PublicKey(key), anchor.web3.clusterApiUrl('mainnet-beta')).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
        var meta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(res.data.uri).then(function (res) { return res.json(); })];
                case 1:
                    meta = _a.sent();
                    console.log(res.data.creators[0]);
                    mints.push({ tokenData: __assign(__assign({}, res.data), { creators: res.data.creators.map(function (d) {
                                return {
                                    share: d.share,
                                    address: new web3_js_1.PublicKey(d.address).toBase58(),
                                    verified: !!d.verified
                                };
                            }) }), metadata: meta, mint: key });
                    return [2 /*return*/, new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve(undefined);
                            }, 150);
                        })];
            }
        });
    }); });
};
var resolveSequentially = function (files) {
    return files.reduce(function (p, file) {
        return p.then(function () { return gen(file); });
    }, Promise.resolve()); // initial
};
module.exports.getMeta = function (tokens) { return resolveSequentially(tokens).then(function () {
    download("mint-data-" + Date.now(), jsonFormat(mints, {
      type: 'space',
      size: 2
    }
  ));
}); };
