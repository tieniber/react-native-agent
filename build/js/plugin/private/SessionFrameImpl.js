"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InstrumentationModule_1 = require("./InstrumentationModule");
var SessionFrameImpl = /** @class */ (function () {
    function SessionFrameImpl(id) {
        this.id = id;
    }
    SessionFrameImpl.prototype.updateName = function (name) {
        InstrumentationModule_1.InstrumentationModule.updateSessionFrameName(this.id, name);
    };
    SessionFrameImpl.prototype.end = function () {
        InstrumentationModule_1.InstrumentationModule.endSessionFrame(this.id);
    };
    return SessionFrameImpl;
}());
exports.SessionFrameImpl = SessionFrameImpl;
