"use strict";
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
exports.PATCHES = [
    {
        name: "AppDynamics build plugin link",
        anchor: /^((\s*\n)*(\/\/.+\n|\/\*[^]*\*\/))*/g,
        payload: "\n// Applies the AppDynamics build time instrumentation plugin.\n" +
            "// This should be placed at the top of your top-level build.gradle file.\n" +
            "apply from: '../node_modules/@appdynamics/react-native-agent/android/adeum.gradle'\n",
        target: path.join(process.cwd(), 'android/build.gradle')
    }
];
