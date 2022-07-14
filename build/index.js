"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing dependencies
const Bot_1 = require("./Bot");
const Client_1 = require("./Client");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const client = new Client_1.CustomClient();
const bot = new Bot_1.Bot(client);
// Listen for when the client becomes ready
client.once('ready', () => {
    var _a, _b;
    // Initiates the manager and connects to all the nodes
    client.manager.init((_a = client.user) === null || _a === void 0 ? void 0 : _a.id);
    console.log(`${(_b = client.user) === null || _b === void 0 ? void 0 : _b.username} is now online!`);
});
// THIS IS REQUIRED. Send raw events to Erela.js
client.on('raw', d => client.manager.updateVoiceState(d));
bot.login();
bot.checkMessages();
mongoose_1.default.connect(process.env.MONGODB_DATABASE_URL, () => {
    console.log('Connected to DB!');
});
