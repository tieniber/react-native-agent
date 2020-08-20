"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
var InstrumentationConstants_1 = require("./private/InstrumentationConstants");
var LoggingLevel;
(function (LoggingLevel) {
    LoggingLevel[LoggingLevel["VERBOSE"] = InstrumentationConstants_1.InstrumentationConstants.LOGGING_LEVEL_VERBOSE] = "VERBOSE";
    LoggingLevel[LoggingLevel["INFO"] = InstrumentationConstants_1.InstrumentationConstants.LOGGING_LEVEL_INFO] = "INFO";
    LoggingLevel[LoggingLevel["NONE"] = InstrumentationConstants_1.InstrumentationConstants.LOGGING_LEVEL_NONE] = "NONE";
})(LoggingLevel = exports.LoggingLevel || (exports.LoggingLevel = {}));
