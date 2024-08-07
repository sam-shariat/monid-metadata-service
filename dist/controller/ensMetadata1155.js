"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensMetadata1155 = void 0;
var assert_1 = require("assert");
var ethers_1 = require("ethers");
var base_1 = require("../base");
var config_1 = require("../config");
var contract_1 = require("../service/contract");
var domain_1 = require("../service/domain");
var metadata_1 = require("../service/metadata");
var network_1 = __importDefault(require("../service/network"));
var namehash_1 = require("../utils/namehash");
function ensMetadata1155(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var identifier, contractAddress, networkName, _a, provider, SUBGRAPH_URL, last_request_date, tokenId, version, result, error_1, errCode, registry, _namehash, isRecordExist, contract, isNameWrapped, _b, url, unknownMetadata, error_2;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // #swagger.description = 'ENS NFT metadata'
                    // #swagger.parameters['networkName'] = { schema: { $ref: '#/definitions/networkName' } }
                    // #swagger.parameters['{}'] = { name: 'contractAddress', description: 'Contract address which stores the NFT indicated by the tokenId', schema: { $ref: '#/definitions/contractAddress' } }
                    // #swagger.parameters['tokenId'] = { type: 'string', description: 'Labelhash(v1) /Namehash(v2) of your ENS name.\n\nMore: https://docs.ens.domains/contract-api-reference/name-processing#hashing-names', schema: { $ref: '#/definitions/tokenId' } }
                    res.setTimeout(config_1.RESPONSE_TIMEOUT, function () {
                        res.status(504).json({ message: 'Timeout' });
                        return;
                    });
                    identifier = req.params.tokenId;
                    contractAddress = process.env.ADDRESS_NAME_WRAPPER || '0x955357E06046C91186cf4571f4dD729157bFBCfB';
                    networkName = 'arbitrumSepolia';
                    _a = (0, network_1.default)(networkName), provider = _a.provider, SUBGRAPH_URL = _a.SUBGRAPH_URL;
                    last_request_date = Date.now();
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 11]);
                    return [4 /*yield*/, (0, contract_1.checkContract)(provider, contractAddress, identifier)];
                case 2:
                    (_c = _d.sent(), tokenId = _c.tokenId, version = _c.version);
                    return [4 /*yield*/, (0, domain_1.getDomain)(provider, networkName, SUBGRAPH_URL, contractAddress, tokenId, version, false)];
                case 3:
                    result = _d.sent();
                    // add timestamp of the request date
                    result.last_request_date = last_request_date;
                    /* #swagger.responses[200] = {
                      description: 'Metadata object',
                      schema: { $ref: '#/definitions/ENSMetadata' }
                    } */
                    res.json(result);
                    return [2 /*return*/];
                case 4:
                    error_1 = _d.sent();
                    errCode = ((error_1 === null || error_1 === void 0 ? void 0 : error_1.code) && Number(error_1.code)) || 500;
                    /* #swagger.responses[500] = {
                             description: 'Internal Server Error'
                    } */
                    /* #swagger.responses[501] = {
                           description: 'Unsupported network'
                    } */
                    if (error_1 instanceof base_1.ContractMismatchError ||
                        error_1 instanceof base_1.ExpiredNameError ||
                        error_1 instanceof base_1.NamehashMismatchError ||
                        error_1 instanceof base_1.UnsupportedNetwork) {
                        if (!res.headersSent) {
                            res.status(errCode).json({
                                message: error_1.message,
                            });
                            return [2 /*return*/];
                        }
                    }
                    if (!(error_1 instanceof base_1.SubgraphRecordNotFound)) return [3 /*break*/, 10];
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 9, , 10]);
                    registry = new ethers_1.Contract(config_1.ADDRESS_ETH_REGISTRY, config_1.ETH_REGISTRY_ABI, provider);
                    if (!tokenId || (version === null || version === void 0 ? void 0 : version.valueOf()) === undefined) {
                        throw 'Missing parameters to construct namehash';
                    }
                    _namehash = (0, namehash_1.constructEthNameHash)(tokenId, version);
                    return [4 /*yield*/, registry.recordExists(_namehash)];
                case 6:
                    isRecordExist = _d.sent();
                    (0, assert_1.strict)(isRecordExist, 'ENS name does not exist');
                    if (!(version == base_1.Version.v2)) return [3 /*break*/, 8];
                    contract = new ethers_1.Contract(contractAddress, config_1.NAMEWRAPPER_ABI, provider);
                    return [4 /*yield*/, contract.isWrapped(_namehash)];
                case 7:
                    isNameWrapped = _d.sent();
                    (0, assert_1.strict)(isNameWrapped, 'Name is not wrapped');
                    _d.label = 8;
                case 8:
                    _b = new metadata_1.Metadata({
                        name: 'unknown.name',
                        description: 'Unknown ENS name',
                        created_date: 1580346653000,
                        tokenId: '',
                        version: base_1.Version.v1,
                        // add timestamp of the request date
                        last_request_date: last_request_date,
                    }), url = _b.url, unknownMetadata = __rest(_b, ["url"]);
                    res.status(200).json({
                        message: unknownMetadata,
                    });
                    return [2 /*return*/];
                case 9:
                    error_2 = _d.sent();
                    return [3 /*break*/, 10];
                case 10:
                    /* #swagger.responses[404] = {
                      description: 'No results found'
                    } */
                    if (!res.headersSent) {
                        res.status(404).json({
                            message: 'No results found.',
                        });
                    }
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.ensMetadata1155 = ensMetadata1155;
