/*
 * Copyright (c) AppDynamics, Inc., and its affiliates
 * 2018
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY CODE OF APPDYNAMICS, INC.
 * The copyright notice above does not evidence any actual or intended publication of such source code
 */
package com.appdynamics.eum.reactnative;

import android.util.Log;

import com.appdynamics.eumagent.runtime.*;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.*;

public class InstrumentationModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private Map<String, CallTracker> trackers = new HashMap<>();
    private Map<String, SessionFrame> sessionFrames = new HashMap<>();

    public InstrumentationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("BREADCRUMB_VISIBILITY_CRASHES_AND_SESSIONS", BreadcrumbVisibility.CRASHES_AND_SESSIONS);
        constants.put("BREADCRUMB_VISIBILITY_CRASHES_ONLY", BreadcrumbVisibility.CRASHES_ONLY);
        constants.put("ERROR_SEVERITY_LEVEL_CRITICAL", ErrorSeverityLevel.CRITICAL);
        constants.put("ERROR_SEVERITY_LEVEL_INFO", ErrorSeverityLevel.INFO);
        constants.put("ERROR_SEVERITY_LEVEL_WARNING", ErrorSeverityLevel.WARNING);
        constants.put("INTERACTION_CAPTURE_MODE_ALL", InteractionCaptureMode.All);
        constants.put("INTERACTION_CAPTURE_MODE_BUTTON_PRESSED", InteractionCaptureMode.ButtonPressed);
        constants.put("INTERACTION_CAPTURE_MODE_LIST_VIEW_ITEM_SELECTED", InteractionCaptureMode.ListViewItemSelected);
        constants.put("INTERACTION_CAPTURE_MODE_NONE", InteractionCaptureMode.None);
        constants.put("INTERACTION_CAPTURE_MODE_TABLE_CELL_SELECTED", InteractionCaptureMode.None);
        constants.put("INTERACTION_CAPTURE_MODE_TEXT_FIELD_SELECTED", InteractionCaptureMode.EditTextSelected);
        constants.put("INTERACTION_CAPTURE_MODE_TEXT_VIEW_SELECTED", InteractionCaptureMode.None);
        constants.put("LOGGING_LEVEL_INFO", Instrumentation.LOGGING_LEVEL_INFO);
        constants.put("LOGGING_LEVEL_NONE", Instrumentation.LOGGING_LEVEL_NONE);
        constants.put("LOGGING_LEVEL_VERBOSE", Instrumentation.LOGGING_LEVEL_VERBOSE);
        constants.put("MAX_USER_DATA_STRING_LENGTH", Instrumentation.MAX_USER_DATA_STRING_LENGTH);
        return constants;
    }

    @Override
    public String getName() {
        return "appd_private_Instrumentation";
    }

    @ReactMethod
    public void start(ReadableMap properties, String hybridAgentType, String hybridAgentVersion, Callback cb) {
        if (!properties.hasKey("appKey") || !properties.getType("appKey").equals(ReadableType.String)) {
            Log.e(getClass().getName(), "Could not start AppDynamics instrumentation: Invalid or missing appKey");
            return;
        }

        final AgentConfiguration.Builder builder = AgentConfiguration.builder()
                .withAppKey(properties.getString("appKey"))
                .withContext(reactContext);


        if (properties.hasKey("applicationName") && properties.getType("applicationName").equals(ReadableType.String)) {
            builder.withApplicationName(properties.getString("applicationName"));
        }
        if (properties.hasKey("autoInstrument") && properties.getType("autoInstrument").equals(ReadableType.Boolean)) {
            builder.withAutoInstrument(properties.getBoolean("autoInstrument"));
        }
        if (properties.hasKey("collectorURL") && properties.getType("collectorURL").equals(ReadableType.String)) {
            builder.withCollectorURL(properties.getString("collectorURL"));
        }
        if (properties.hasKey("screenshotURL") && properties.getType("screenshotURL").equals(ReadableType.String)) {
            builder.withScreenshotURL(properties.getString("screenshotURL"));
        }
        if (properties.hasKey("screenshotsEnabled") && properties.getType("screenshotsEnabled").equals(ReadableType.Boolean)) {
            builder.withScreenshotsEnabled(properties.getBoolean("screenshotsEnabled"));
        }
        if (properties.hasKey("excludedURLPatterns") && properties.getType("excludedURLPatterns").equals(ReadableType.Array)) {
            builder.withExcludedUrlPatterns(deserializeStringSet(properties.getArray("excludedURLPatterns")));
        }
        if (properties.hasKey("loggingLevel") && properties.getType("loggingLevel").equals(ReadableType.Number)) {
            builder.withLoggingLevel(properties.getInt("loggingLevel"));
        }
        if (properties.hasKey("compileTimeInstrumentationCheck") && properties.getType("compileTimeInstrumentationCheck").equals(ReadableType.Boolean)) {
            builder.withCompileTimeInstrumentationCheck(properties.getBoolean("compileTimeInstrumentationCheck"));
        }
        if (properties.hasKey("interactionCaptureMode") && properties.getType("interactionCaptureMode").equals(ReadableType.Number)) {
            builder.withInteractionCaptureMode(properties.getInt("interactionCaptureMode"));
        }
        if (properties.hasKey("jsAgentInjectionEnabled") && properties.getType("jsAgentInjectionEnabled").equals(ReadableType.Boolean)) {
            builder.withJSAgentInjectionEnabled(properties.getBoolean("jsAgentInjectionEnabled"));
        }
        if (properties.hasKey("jsAgentAjaxEnabled") && properties.getType("jsAgentAjaxEnabled").equals(ReadableType.Boolean)) {
            builder.withJSAgentAjaxEnabled(properties.getBoolean("jsAgentAjaxEnabled"));
        }

        try {
            Instrumentation.startFromHybrid(builder.build(), hybridAgentType, hybridAgentVersion);
            cb.invoke();
        } catch (RuntimeException e) {
            cb.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void changeAppKey(String appKey, Callback cb) {
        try {
            Instrumentation.changeAppKey(appKey);
            cb.invoke();
        } catch (RuntimeException e) {
            cb.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void reportMetric(String name, Double value) {
        Instrumentation.reportMetric(name, value.longValue());
    }

    @ReactMethod
    public void reportError(ReadableMap error, int severityLevel) {
        Instrumentation.reportError(new Throwable(error.getString("message")), severityLevel);
    }

    @ReactMethod
    public void startTimer(String name) {
        Instrumentation.startTimer(name);
    }

    @ReactMethod
    public void stopTimer(String name) {
        Instrumentation.stopTimer(name);
    }

    @ReactMethod
    public void beginCall(String callId, String className, String methodName, ReadableArray args, Boolean isStaticMethod) {
        Object[] parsedArgs = deserializeArray(args);
        CallTracker callTracker = Instrumentation.beginCall(isStaticMethod, className, methodName, parsedArgs);
        trackers.put(callId, callTracker);
    }

    @ReactMethod
    public void endCallWithSuccess(String callId, ReadableMap data) {
        CallTracker callTracker = trackers.get(callId);
        if (callTracker != null) {
            trackers.remove(callId);
            callTracker.reportCallEndedWithReturnValue(deserializeMap(data).get("result"));
        }
    }

    @ReactMethod
    public void endCallWithError(String callId, ReadableMap error) {
        CallTracker callTracker = trackers.get(callId);
        if (callTracker != null) {
            trackers.remove(callId);
            callTracker.reportCallEndedWithException(new Exception(error.getString("message") + "\n" + error.getString("stack")));
        }
    }

    @ReactMethod
    public void leaveBreadcrumb(String breadcrumb, Integer mode) {
        if (mode == null) {
            Instrumentation.leaveBreadcrumb(breadcrumb);
        } else {
            Instrumentation.leaveBreadcrumb(breadcrumb, mode);
        }
    }

    @ReactMethod
    public void unblockScreenshots(Callback cb) {
        Instrumentation.unblockScreenshots();
        cb.invoke();
    }

    @ReactMethod
    public void blockScreenshots(Callback cb) {
        Instrumentation.blockScreenshots();
        cb.invoke();
    }

    @ReactMethod
    public void screenshotsBlocked(Callback cb) {
        cb.invoke(Instrumentation.screenshotsBlocked());
    }

    @ReactMethod
    public void takeScreenshot() {
        Instrumentation.takeScreenshot();
    }

    @ReactMethod
    public void setUserData(String key, String value) {
        Instrumentation.setUserData(key, value);
    }

    @ReactMethod
    public void removeUserData(String key) {
        Instrumentation.setUserData(key, null);
    }

    @ReactMethod
    public void setUserDataInteger(String key, String valueStr) {
        Instrumentation.setUserDataLong(key, parseLong(valueStr));
    }

    @ReactMethod
    public void removeUserDataInteger(String key) {
        Instrumentation.setUserDataLong(key, null);
    }

    @ReactMethod
    public void setUserDataDouble(String key, Double value) {
        Instrumentation.setUserDataDouble(key, value);
    }

    @ReactMethod
    public void removeUserDataDouble(String key) {
        Instrumentation.setUserDataDouble(key, null);
    }

    @ReactMethod
    public void setUserDataBoolean(String key, Boolean value) {
        Instrumentation.setUserDataBoolean(key, value);
    }

    @ReactMethod
    public void removeUserDataBoolean(String key) {
        Instrumentation.setUserDataBoolean(key, null);
    }

    @ReactMethod
    public void setUserDataDate(String key, String valueStr) {
        Instrumentation.setUserDataDate(key, new Date(parseLong(valueStr)));
    }

    @ReactMethod
    public void removeUserDataDate(String key) {
        Instrumentation.setUserDataDate(key, null);
    }

    @ReactMethod
    public void startNextSession() {
        Instrumentation.startNextSession();
    }

    @ReactMethod
    public void startSessionFrame(String id, String sessionFrameName) {
        SessionFrame sessionFrame = Instrumentation.startSessionFrame(sessionFrameName);
        sessionFrames.put(id, sessionFrame);
    }

    @ReactMethod
    public void updateSessionFrameName(String id, String name) {
        SessionFrame sessionFrame = sessionFrames.get(id);
        if (sessionFrame == null) {
            return;
        }
        sessionFrame.updateName(name);
    }

    @ReactMethod
    public void endSessionFrame(String id) {
        SessionFrame sessionFrame = sessionFrames.get(id);
        if (sessionFrame == null) {
            return;
        }
        sessionFrame.end();
        sessionFrames.remove(id);
    }

    /*
     * We do all of this because React doesn't allow passing Long values over the bridge
     */
    private static Long parseLong(String valueStr) {
        if (valueStr == null) {
            return null;
        } else {
            return Long.parseLong(valueStr, 10);
        }
    }

    private static Set<String> unwrapStringArray(ReadableArray source) {
        if (source == null) {
            return null;
        }
        Set<String> builder = new HashSet<>(source.size());
        for (int i = 0; i < source.size(); i++) {
            builder.add(source.getString(i));
        }
        return builder;
    }

    private static Set<String> deserializeStringSet(ReadableArray readableArray) {
        Set<String> ret = new HashSet<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            switch (type) {
                case String:
                    ret.add(readableArray.getString(i));
                    break;
            }
        }
        return ret;
    }

    private static Object[] deserializeArray(ReadableArray readableArray) {

        Object[] ret = new Object[readableArray.size()];

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);

            switch (type) {
                case Null:
                    ret[i] = null;
                    break;
                case Boolean:
                    ret[i] = readableArray.getBoolean(i);
                    break;
                case Number:
                    ret[i] = readableArray.getDouble(i);
                    break;
                case String:
                    ret[i] = readableArray.getString(i);
                    break;
                // Note: skipping nested structures for now because it could create an infinite recursion
//                case Map:
//                    ret[i] = deserializeMap(readableArray.getMap(i));
//                    break;
//                case Array:
//                    ret[i] = deserializeArray(readableArray.getArray(i));
//                    break;
            }
        }

        return ret;
    }

    private static Map<String, Object> deserializeMap(ReadableMap readableMap) {
        Map<String, Object> ret = new HashMap<>();

        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);

            switch (type) {
                case Null:
                    ret.put(key, null);
                    break;
                case Boolean:
                    ret.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    ret.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    ret.put(key, readableMap.getString(key));
                    break;
                // Note: skipping nested structures for now because it could create an infinite recursion
//                case Array:
//                    ret.put(key, deserializeArray(readableMap.getArray(key)));
//                    break;
//                case Map:
//                    ret.put(key, deserializeMap(readableMap.getMap(key)));
//                    break;
            }
        }

        return ret;
    }
}
