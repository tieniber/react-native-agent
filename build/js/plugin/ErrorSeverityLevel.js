"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
var InstrumentationConstants_1 = require("./private/InstrumentationConstants");
/**
 * ErrorSeverityLevel defines the severity levels you can use while reporting {@link Error}s
 * using {@link Instrumentation.reportError}.
 */
var ErrorSeverityLevel;
(function (ErrorSeverityLevel) {
    /**
     * An error happened, but it did not cause a problem.
     */
    ErrorSeverityLevel[ErrorSeverityLevel["INFO"] = InstrumentationConstants_1.InstrumentationConstants.ERROR_SEVERITY_LEVEL_INFO] = "INFO";
    /**
     * An error happened but the app recovered gracefully.
     */
    ErrorSeverityLevel[ErrorSeverityLevel["WARNING"] = InstrumentationConstants_1.InstrumentationConstants.ERROR_SEVERITY_LEVEL_WARNING] = "WARNING";
    /**
     * An error happened and caused problems to the app.
     */
    ErrorSeverityLevel[ErrorSeverityLevel["CRITICAL"] = InstrumentationConstants_1.InstrumentationConstants.ERROR_SEVERITY_LEVEL_CRITICAL] = "CRITICAL";
})(ErrorSeverityLevel = exports.ErrorSeverityLevel || (exports.ErrorSeverityLevel = {}));
