"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
let CommentsService = class CommentsService {
    constructor() {
        this.comments = {};
    }
    async create(idNews, comment, userId) {
        var _a;
        if (!((_a = this.comments) === null || _a === void 0 ? void 0 : _a[idNews])) {
            this.comments[idNews] = [];
        }
        return this.comments[idNews].push({
            comment,
            id: idNews,
            userId: userId,
        });
    }
    async findAll(idNews) {
        var _a;
        return (_a = this.comments) === null || _a === void 0 ? void 0 : _a[idNews];
    }
    async remove(idNews, idComment) {
        var _a;
        const index = (_a = this.comments) === null || _a === void 0 ? void 0 : _a[idNews].findIndex((x) => x.id === idComment);
        if (index !== -1) {
            this.comments[idNews].splice(index, 1);
            return true;
        }
        return false;
    }
    async removeAll(idNews) {
        var _a;
        return (_a = this.comments) === null || _a === void 0 ? true : delete _a[idNews];
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)()
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map