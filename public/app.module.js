"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const comments_controller_1 = require("./news/comments/comments.controller");
const comments_module_1 = require("./news/comments/comments.module");
const comments_service_1 = require("./news/comments/comments.service");
const news_module_1 = require("./news/news.module");
const user_controller_1 = require("./user/user.controller");
const user_module_1 = require("./user/user.module");
const user_service_1 = require("./user/user.service");
const mail_module_1 = require("./mail/mail.module");
const news_controller_1 = require("./news/news.controller");
const news_service_1 = require("./news/news.service");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./auth/role/roles.guard");
const user_entity_1 = require("./user/user.entity");
const news_entity_1 = require("./news/news.entity");
const categories_entity_1 = require("./categories/categories.entity");
const categories_module_1 = require("./categories/categories.module");
const categories_controller_1 = require("./categories/categories.controller");
const categories_service_1 = require("./categories/categories.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            news_module_1.NewsModule,
            user_module_1.UserModule,
            comments_module_1.CommentsModule,
            categories_module_1.CategoriesModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', './dist'),
            }),
            mail_module_1.MailModule,
            typeorm_1.TypeOrmModule.forFeature([news_entity_1.NewsEntity]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UsersEntity]),
            typeorm_1.TypeOrmModule.forFeature([categories_entity_1.CategoriesEntity]),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'pass',
                database: 'news_blog',
                entities: [],
                synchronize: false,
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            comments_controller_1.CommentsController,
            categories_controller_1.CategoriesController,
            news_controller_1.NewsController,
        ],
        providers: [
            app_service_1.AppService,
            user_service_1.UserService,
            comments_service_1.CommentsService,
            categories_service_1.CategoriesService,
            news_service_1.NewsService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map