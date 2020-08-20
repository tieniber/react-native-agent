/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
export interface Patch {
    /**
     * A human-readable representation of the patch.
     */
    name: string;
    /**
     * The file to patch.
     */
    target: string;
    /**
     * A regexp matching some text preceding the patch location.
     * THE REGEXP MUST HAVE THE GLOBAL (g) FLAG SET!
     */
    anchor: RegExp;
    /**
     * The payload to add to the file. It must be unique within the file.
     */
    payload: string;
}
/**
 * Applies a patch to a given file.
 * @return true if the patch was applied, false if it was skipped.
 * @throws Error if there was a problem applying the patch
 */
export declare function applyPatch(patch: Patch): boolean;
export declare function undoPatch(patch: Patch): void;
