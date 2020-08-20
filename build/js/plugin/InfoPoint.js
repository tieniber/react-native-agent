"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
var Instrumentation_1 = require("./Instrumentation");
/**
 * Maximum length for class names returned by
 */
var MAX_CLASS_NAME_LENGTH = 80;
function InfoPoint(manualDataOrTarget, propertyKey, descriptor) {
    // Shorthand syntax: @InfoPoint
    if (propertyKey != undefined && descriptor != undefined) {
        return decorator(manualDataOrTarget, propertyKey, descriptor);
    }
    // Long-hand syntax: @InfoPoint(...manualData)
    var manualData = manualDataOrTarget;
    var defaultClassName = manualData ? manualData.className : undefined;
    var defaultFnName = manualData ? manualData.fnName : undefined;
    function decorator(target, propertyKey, descriptor) {
        var previousFn = descriptor.value;
        if (!isFunction(previousFn)) {
            console.warn('InfoPoint can only be applied to a function.');
            return;
        }
        descriptor.value = function () {
            var _this = this;
            var className = defaultClassName ? defaultClassName : guessClassName(target, this).substr(0, MAX_CLASS_NAME_LENGTH);
            var fnName = defaultFnName ? defaultFnName : propertyKey;
            var args = Array.prototype.slice.apply(arguments);
            return Instrumentation_1.Instrumentation.trackCall(className, fnName, args, function () { return previousFn.apply(_this, args); });
        };
    }
    return decorator;
}
exports.InfoPoint = InfoPoint;
function guessClassName(target, ctx) {
    if (typeof target === 'object' && target != null && 'constructor' in target && 'name' in target.constructor) {
        return target.constructor.name;
    }
    if (typeof ctx === 'object') {
        if (ctx == null) {
            return '[null]';
        }
        if ('constructor' in ctx) {
            if ('name' in ctx.constructor) {
                return ctx.constructor.name;
            }
        }
        return ctx.toString();
    }
    else if (ctx === undefined) {
        return '[undefined]';
    }
    return "" + ctx;
}
function isFunction(t) {
    return typeof t === 'function';
}
