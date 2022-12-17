"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesEntity = void 0;
const news_entity_1 = require("../news/news.entity");
const typeorm_1 = require("typeorm");
let CategoriesEntity = class CategoriesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoriesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], CategoriesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => news_entity_1.NewsEntity, (news) => news.category),
    __metadata("design:type", Array)
], CategoriesEntity.prototype, "news", void 0);
CategoriesEntity = __decorate([
    (0, typeorm_1.Entity)('categories')
], CategoriesEntity);
exports.CategoriesEntity = CategoriesEntity;
//# sourceMappingURL=categories.entity.js.map