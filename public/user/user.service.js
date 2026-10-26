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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("../utils/crypto");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const role_enum_1 = require("../auth/role/role.enum");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(user) {
        const userEntity = new user_entity_1.UsersEntity();
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.email = user.email;
        userEntity.role = user.role;
        userEntity.password = await (0, crypto_1.hash)(user.password);
        return await this.usersRepository.save(userEntity);
    }
    async findById(id) {
        return await this.usersRepository.findOne({ where: { id: id } });
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email: email } });
    }
    async setModerator(idUser) {
        const _user = await this.findById(idUser);
        if (!_user) {
            throw new common_1.UnauthorizedException();
        }
        _user.role = role_enum_1.Role.Moderator;
        return this.usersRepository.save(_user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map