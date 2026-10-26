"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const news_controller_1 = require("../news/news.controller");
const news_service_1 = require("../news/news.service");
const news_entity_1 = require("../news/news.entity");
const comments_module_1 = require("../news/comments/comments.module");
const comments_service_1 = require("../news/comments/comments.service");
const comments_controller_1 = require("../news/comments/comments.controller");
const mail_module_1 = require("../mail/mail.module");
const user_service_1 = require("../user/user.service");
const user_module_1 = require("../user/user.module");
const user_controller_1 = require("../user/user.controller");
const user_entity_1 = require("../user/user.entity");
const categories_service_1 = require("../categories/categories.service");
const categories_entity_1 = require("./categories.entity");
let CategoriesModule = class CategoriesModule {
};
CategoriesModule = __decorate([
    (0, common_1.Module)({
        controllers: [news_controller_1.NewsController, comments_controller_1.CommentsController, user_controller_1.UserController],
        providers: [news_service_1.NewsService, comments_service_1.CommentsService, categories_service_1.CategoriesService, user_service_1.UserService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([news_entity_1.NewsEntity]),
            typeorm_1.TypeOrmModule.forFeature([categories_entity_1.CategoriesEntity]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UsersEntity]),
            (0, common_1.forwardRef)(() => comments_module_1.CommentsModule),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;
//# sourceMappingURL=categories.module.js.map