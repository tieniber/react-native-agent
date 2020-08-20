"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
var InstrumentationConstants_1 = require("./private/InstrumentationConstants");
/**
 * Defines what types of user interaction events should be captured.
 *
 * Modes can be combined at will with the use of the {@link with} and {@link without} methods.
 *
 * @example
 *
 * ```js
 *
 *  Instrumentation.start({
 *
 *      // ...your other parameters here...
 *
 *      // Only enable "ButtonPressed" and "EditTextSelected" interaction modes, and disable the rest.
 *      interactionCaptureMode: InteractionCaptureMode.None.with(
 *          InteractionCaptureMode.ButtonPressed,
 *          InteractionCaptureMode.EditTextSelected
 *      )
 *  })
 * ```
 *
 * @see {@link AgentConfiguration.interactionCaptureMode}
 */
var InteractionCaptureMode = /** @class */ (function () {
    function InteractionCaptureMode(mask) {
        this.mask = mask;
    }
    /**
     * Combines multiple modes together. This does not mutate the object.
     *
     * @param modes Other modes to combine with this mode.
     * @return The combination of this mode with the modes passed in argument.
     */
    InteractionCaptureMode.prototype.with = function () {
        var modes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modes[_i] = arguments[_i];
        }
        var mask = this.mask;
        for (var _a = 0, modes_1 = modes; _a < modes_1.length; _a++) {
            var mode = modes_1[_a];
            mask |= mode.mask;
        }
        return new InteractionCaptureMode(mask);
    };
    /**
     * Excludes modes together from this mode. This does not mutate the object.
     *
     * @param modes Other modes to exclude from this mode.
     * @return The current set of modes minus the modes passed in argument.
     */
    InteractionCaptureMode.prototype.without = function () {
        var modes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modes[_i] = arguments[_i];
        }
        var mask = this.mask;
        for (var _a = 0, modes_2 = modes; _a < modes_2.length; _a++) {
            var mode = modes_2[_a];
            mask &= ~mode.mask;
        }
        return new InteractionCaptureMode(mask);
    };
    /**
     * Do not track any user interactions.
     */
    InteractionCaptureMode.None = new InteractionCaptureMode(InstrumentationConstants_1.InstrumentationConstants.INTERACTION_CAPTURE_MODE_NONE);
    /**
     * Track all the interactions agent support.
     */
    InteractionCaptureMode.All = new InteractionCaptureMode(InstrumentationConstants_1.InstrumentationConstants.INTERACTION_CAPTURE_MODE_ALL);
    /**
     * Track button presses.
     */
    InteractionCaptureMode.ButtonPressed = new InteractionCaptureMode(InstrumentationConstants_1.InstrumentationConstants.INTERACTION_CAPTURE_MODE_BUTTON_PRESSED);
    /**
     * Track text field selection.
     */
    InteractionCaptureMode.TextFieldSelected = new InteractionCaptureMode(InstrumentationConstants_1.InstrumentationConstants.INTERACTION_CAPTURE_MODE_TEXT_FIELD_SELECTED);
    /**
     * Track text view selection. (iOS only)
     */
    InteractionCaptureMode.TextViewSelected = new InteractionCaptureMode(InstrumentationConstants_1.InstrumentationConstants.INTERACTION_CAPTURE_MODE_TEXT_VIEW_SELECTED);
    /**
     * Track List Item clicks and focus changes for `android.widget.AbsListView` and its subclasses. (android only)
     */
    InteractionCaptureMode.ListViewItemSelected = new InteractionCaptureMode(InstrumentationConstants_1.InstrumentationConstants.INTERACTION_CAPTURE_MODE_LIST_VIEW_ITEM_SELECTED);
    /**
     * Track table cell selection. (iOS only)
     */
    InteractionCaptureMode.TableCellSelected = new InteractionCaptureMode(InstrumentationConstants_1.InstrumentationConstants.INTERACTION_CAPTURE_MODE_TABLE_CELL_SELECTED);
    return InteractionCaptureMode;
}());
exports.InteractionCaptureMode = InteractionCaptureMode;
