"use strict";
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
/**
 * Applies a patch to a given file.
 * @return true if the patch was applied, false if it was skipped.
 * @throws Error if there was a problem applying the patch
 */
function applyPatch(patch) {
    var fileContents = readTarget(patch.target);
    if (fileContents.indexOf(patch.payload) >= 0) {
        console.log("Skipping patch \"" + patch.name + "\" because it is already applied.");
        return false;
    }
    var injectionLocation = indexOfInjection(fileContents, patch.anchor);
    if (injectionLocation === undefined) {
        throw new Error("Could not locate patch anchor for " + patch.name + "!");
    }
    var updated = fileContents.substr(0, injectionLocation) + patch.payload + fileContents.substr(injectionLocation);
    writeTarget(patch.target, updated);
    return true;
}
exports.applyPatch = applyPatch;
function undoPatch(patch) {
    var fileContents = readTarget(patch.target);
    var index = fileContents.indexOf(patch.payload);
    if (index < 0) {
        throw new Error("Could not find the patch of " + patch.name + "!");
    }
    var updated = fileContents.substr(0, index) + fileContents.substr(index + patch.payload.length);
    writeTarget(patch.target, updated);
}
exports.undoPatch = undoPatch;
function readTarget(target) {
    return fs.readFileSync(target).toString();
}
function writeTarget(target, newContents) {
    return fs.writeFileSync(target, newContents);
}
/**
 * Finds the index at which to insert the patch.
 *
 * @return The string index where to insert the patch, or undefined if it failed to find the location.
 */
function indexOfInjection(haystack, anchor) {
    var result = anchor.exec(haystack);
    if (result != null) {
        return anchor.lastIndex;
    }
    return;
}
