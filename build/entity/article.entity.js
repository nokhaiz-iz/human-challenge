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
exports.Article = void 0;
var typeorm_1 = require("typeorm");
var Article = /** @class */ (function () {
    function Article() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Article.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Index)("title_index"),
        (0, typeorm_1.Column)({
            unique: true,
        }),
        __metadata("design:type", String)
    ], Article.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Index)("slug_index"),
        (0, typeorm_1.Column)({
            unique: true,
        }),
        __metadata("design:type", String)
    ], Article.prototype, "slug", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamptz" }) // Recommended
        ,
        __metadata("design:type", Date)
    ], Article.prototype, "published_at", void 0);
    Article = __decorate([
        (0, typeorm_1.Entity)("articles")
    ], Article);
    return Article;
}());
exports.Article = Article;
//# sourceMappingURL=article.entity.js.map