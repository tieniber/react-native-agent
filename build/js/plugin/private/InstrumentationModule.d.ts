/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
import { LoggingLevel } from '../LoggingLevel';
export declare const InstrumentationModule: InstrumentationModule;
export interface ADError {
    message: string;
    stack: string;
}
/**
 * Type definition of the module exposed by the native bridge.
 *
 * This is an internal API. DO NOT USE THIS API in your app. It may change without prior notice and may not behave as
 * you'd expect.
 *
 */
export interface InstrumentationModule {
    beginCall(callId: string, className: string, methodName: string, args: any[], isStaticMethod: boolean): void;
    blockScreenshots(cb: () => void): void;
    changeAppKey(appKey: string, cb: (err: string) => void): void;
    endCallWithError(callId: string, error: ADError): void;
    endCallWithSuccess(callId: string, data: {
        result: any;
    }): void;
    leaveBreadcrumb(breadcrumb: string, mode?: number): void;
    reportError(err: ADError, severityLevel: number): void;
    reportMetric(name: string, value: number): void;
    screenshotsBlocked(cb: (blocked: boolean) => void): void;
    setUserData(key: string, value: string): void;
    removeUserData(key: string): void;
    setUserDataBoolean(key: string, value: boolean): void;
    removeUserDataBoolean(key: string): void;
    setUserDataDate(key: string, value: string): void;
    removeUserDataDate(key: string): void;
    setUserDataDouble(key: string, value: number): void;
    removeUserDataDouble(key: string): void;
    setUserDataInteger(key: string, value: string): void;
    removeUserDataInteger(key: string): void;
    start(config: NativeAgentConfiguration, hybridAgentType: string, hybridAgentVersion: string, cb: (err: string) => void): void;
    startNextSession(): void;
    startSessionFrame(id: string, sessionFrameName: string): void;
    updateSessionFrameName(id: string, sessionFrameName: string): void;
    endSessionFrame(id: string): void;
    startTimer(name: string): void;
    stopTimer(name: string): void;
    takeScreenshot(): void;
    unblockScreenshots(cb: () => void): void;
}
export interface NativeAgentConfiguration {
    appKey: string;
    applicationName?: string;
    autoInstrument?: boolean;
    collectorURL?: string;
    screenshotURL?: string;
    excludedURLPatterns?: string[];
    loggingLevel?: LoggingLevel;
    compileTimeInstrumentationCheck?: boolean;
    interactionCaptureMode?: number;
    screenshotsEnabled?: boolean;
    jsAgentInjectionEnabled?: boolean;
    jsAgentAjaxEnabled?: boolean;
    anrDetectionEnabled?: boolean;
}
