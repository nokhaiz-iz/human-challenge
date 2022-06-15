"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var bcrypt = require("bycryptjs");
var User = /** @class */ (function () {
  function User() {}
  User.prototype.toJSON = function () {
    return __assign(__assign({}, this), { password: undefined });
  };
  User.prototype.HashPassword = function () {
    this.password = bcrypt.hashSync(this.password, 8);
  };
  User.prototype.checkUnencryptedPassword = function (unencryptedPassword) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  };
  __decorate(
    [
      (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
      __metadata("design:type", String),
    ],
    User.prototype,
    "id",
    void 0
  );
  __decorate(
    [
      (0, typeorm_1.Index)("username_index"),
      (0, typeorm_1.Column)({
        unique: true,
      }),
      __metadata("design:type", String),
    ],
    User.prototype,
    "username",
    void 0
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata("design:type", String)],
    User.prototype,
    "password",
    void 0
  );
  User = __decorate([(0, typeorm_1.Entity)("users")], User);
  return User;
})();
exports.User = User;
//# sourceMappingURL=user.entity.js.map
