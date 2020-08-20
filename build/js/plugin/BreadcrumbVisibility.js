"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
var InstrumentationConstants_1 = require("./private/InstrumentationConstants");
var BreadcrumbVisibility;
(function (BreadcrumbVisibility) {
    BreadcrumbVisibility[BreadcrumbVisibility["CRASHES_ONLY"] = InstrumentationConstants_1.InstrumentationConstants.BREADCRUMB_VISIBILITY_CRASHES_ONLY] = "CRASHES_ONLY";
    BreadcrumbVisibility[BreadcrumbVisibility["CRASHES_AND_SESSIONS"] = InstrumentationConstants_1.InstrumentationConstants.BREADCRUMB_VISIBILITY_CRASHES_AND_SESSIONS] = "CRASHES_AND_SESSIONS";
})(BreadcrumbVisibility = exports.BreadcrumbVisibility || (exports.BreadcrumbVisibility = {}));
