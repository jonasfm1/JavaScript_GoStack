"use strict";
//INTERFACE: USADA PARA DEFINIR O TIPO DE UM CONJUTO DE INFORMACOES GERALMENTE OBJETO
Object.defineProperty(exports, "__esModule", { value: true });
function CreateUser(_a) {
    var _b = _a.name, name = _b === void 0 ? '' : _b, email = _a.email, password = _a.password;
    var user = {
        name: name,
        email: email,
        password: password,
    };
    return user;
}
exports.default = CreateUser;
