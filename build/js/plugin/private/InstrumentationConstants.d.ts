/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
export declare const InstrumentationConstants: InstrumentationConstants;
/**
 * Type definition of the module exposed by the native bridge.
 *
 * This is an internal API. DO NOT USE THIS API in your app. It may change without prior notice and may not behave as
 * you'd expect.
 *
 */
export interface InstrumentationConstants {
    MAX_USER_DATA_STRING_LENGTH: number;
    BREADCRUMB_VISIBILITY_CRASHES_ONLY: number;
    BREADCRUMB_VISIBILITY_CRASHES_AND_SESSIONS: number;
    ERROR_SEVERITY_LEVEL_INFO: number;
    ERROR_SEVERITY_LEVEL_WARNING: number;
    ERROR_SEVERITY_LEVEL_CRITICAL: number;
    INTERACTION_CAPTURE_MODE_ALL: number;
    INTERACTION_CAPTURE_MODE_NONE: number;
    INTERACTION_CAPTURE_MODE_BUTTON_PRESSED: number;
    INTERACTION_CAPTURE_MODE_TEXT_FIELD_SELECTED: number;
    INTERACTION_CAPTURE_MODE_TEXT_VIEW_SELECTED: number;
    INTERACTION_CAPTURE_MODE_LIST_VIEW_ITEM_SELECTED: number;
    INTERACTION_CAPTURE_MODE_TABLE_CELL_SELECTED: number;
    LOGGING_LEVEL_VERBOSE: number;
    LOGGING_LEVEL_INFO: number;
    LOGGING_LEVEL_NONE: number;
}
