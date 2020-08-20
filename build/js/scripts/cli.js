"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
var patchutil_1 = require("./patchutil");
var patches_1 = require("./patches");
function help() {
    console.log("Usage: appd-react-native <install|uninstall|upgrade>");
}
function install() {
    var undoStack = [];
    function undoTempChanges() {
        undoStack.forEach(function (p) {
            try {
                patchutil_1.undoPatch(p);
            }
            catch (e) {
                console.error(e);
                console.error('[CRITICAL]: could not undo temporary modifications. You will have to fix your project files manually!');
            }
        });
    }
    try {
        patches_1.PATCHES.forEach(function (p) {
            if (patchutil_1.applyPatch(p)) {
                undoStack.push(p);
            }
        });
        console.log("Installation successful.");
    }
    catch (e) {
        console.error(e);
        console.error('[WARNING] Aborting automatic installation. Please refer to the documentation for manual instrumentation instructions.');
        undoTempChanges();
    }
}
function uninstall() {
    patches_1.PATCHES.forEach(function (p) {
        try {
            patchutil_1.undoPatch(p);
            console.log("Successfully uninstalled appdynamics agent.");
        }
        catch (e) {
            console.error(e.message);
        }
    });
}
// process.argv is: [ 'path/to/node', 'path/to/script', 'command' ]
var argv = process.argv.slice();
switch (argv[2]) {
    case 'install':
        install();
        break;
    case 'uninstall':
        uninstall();
        break;
    case 'upgrade':
        uninstall();
        install();
        break;
    default:
        help();
}
