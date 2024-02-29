"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const plugins_1 = __importDefault(require("../plugins"));
module.exports = function (Posts) {
    function toggleEndorsement(type, pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const uidStr = uid.toString();
            if (parseInt(uidStr, 10) <= 0) {
                throw new Error('[[error:not-logged-in]]');
            }
            const isEndorsing = true;
            const [postData] = yield Promise.all([
                Posts.getPostFields(pid, ['pid', 'uid']),
            ]);
            yield Posts.setPostField(pid, 'endorsed', 1);
            yield plugins_1.default.hooks.fire(`action:post.endorse`, {
                pid: pid,
                uid: uid,
                owner: postData.uid,
                current: 'endorsed',
            });
            return {
                post: postData,
                isEndorsed: isEndorsing,
            };
        });
    }
    Posts.endorse = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield toggleEndorsement('bookmark', pid, uid);
        });
    };
    Posts.unendorse = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield toggleEndorsement('unbookmark', pid, uid);
        });
    };
};
