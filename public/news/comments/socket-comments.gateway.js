"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketCommentsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const cookie = __importStar(require("cookie"));
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const comments_entity_1 = require("./comments.entity");
let SocketCommentsGateway = class SocketCommentsGateway {
    constructor() {
        this.logger = new common_1.Logger('AppGateway');
    }
    async handleMessage(client, comment) {
        const cookies = cookie.parse(client.handshake.headers.cookie);
        const { idNews } = cookies;
        client.join(idNews);
        this.server.to(idNews).emit('newComment', comment);
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketCommentsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('addComment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, comments_entity_1.CommentsEntity]),
    __metadata("design:returntype", Promise)
], SocketCommentsGateway.prototype, "handleMessage", null);
SocketCommentsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], SocketCommentsGateway);
exports.SocketCommentsGateway = SocketCommentsGateway;
//# sourceMappingURL=socket-comments.gateway.js.map