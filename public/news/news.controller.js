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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments/comments.service");
const news_service_1 = require("./news.service");
const news_id_dto_1 = require("./dtos/news-id.dto");
const news_create_dto_1 = require("./dtos/news-create.dto");
const platform_express_1 = require("@nestjs/platform-express");
const HelperFileLoader_1 = require("../utils/HelperFileLoader");
const multer_1 = require("multer");
const logger_interceptor_1 = require("../common/middleware/logger.interceptor");
const mail_service_1 = require("../mail/mail.service");
const news_entity_1 = require("./news.entity");
const user_service_1 = require("../user/user.service");
const categories_service_1 = require("../categories/categories.service");
const PATH_NEWS = '/news-static/';
const helperFileLoader = new HelperFileLoader_1.HelperFileLoader();
helperFileLoader.path = PATH_NEWS;
const imageFileFilter = (req, file, callback) => {
    const fileExtension = file.originalname.split('.').reverse()[0];
    if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
        callback(new Error('Excepted image'), false);
    }
    callback(null, true);
};
let NewsController = class NewsController {
    constructor(newsService, userService, categoriesService, commentService, mailService) {
        this.newsService = newsService;
        this.userService = userService;
        this.categoriesService = categoriesService;
        this.commentService = commentService;
        this.mailService = mailService;
    }
    async getNews() {
        return this.newsService.findAll();
    }
    async findById(params) {
        return this.newsService.findById(params.id);
    }
    async remove(params) {
        this.newsService.remove(params.id);
        this.commentService.removeAll(params.id);
        return true;
    }
    uploadFile(file) {
        console.log(file);
    }
    async create(news, cover) {
        const _user = await this.userService.findById(news.authorId);
        if (!_user) {
            throw new common_1.HttpException('Не существует такого автора', common_1.HttpStatus.BAD_REQUEST);
        }
        const _category = await this.categoriesService.findById(news.categoryId);
        if (!_category) {
            throw new common_1.HttpException('Не существует такой категории', common_1.HttpStatus.BAD_REQUEST);
        }
        const _newsEntity = new news_entity_1.NewsEntity();
        if (cover === null || cover === void 0 ? void 0 : cover.filename) {
            _newsEntity.cover = PATH_NEWS + cover.filename;
        }
        _newsEntity.title = news.title;
        _newsEntity.description = news.description;
        _newsEntity.category = _category;
        const _news = await this.newsService.create(_newsEntity);
        await this.mailService.sendNewNewsForAdmins(['houghton@mail.ru'], _news);
        return _news;
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNews", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_id_dto_1.NewsIdDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_id_dto_1.NewsIdDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 1, {
        storage: (0, multer_1.diskStorage)({
            destination: helperFileLoader.destinationPath,
            filename: helperFileLoader.customFileName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('cover', 1, {
        storage: (0, multer_1.diskStorage)({
            destination: helperFileLoader.destinationPath,
            filename: helperFileLoader.customFileName,
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_create_dto_1.NewsCreateDto, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "create", null);
NewsController = __decorate([
    (0, common_1.Controller)('news'),
    (0, common_1.UseInterceptors)(logger_interceptor_1.LoggingInterceptor),
    __metadata("design:paramtypes", [news_service_1.NewsService,
        user_service_1.UserService,
        categories_service_1.CategoriesService,
        comments_service_1.CommentsService,
        mail_service_1.MailService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map