/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
import { LoggingLevel } from './LoggingLevel';
import { InteractionCaptureMode } from './InsteractionCaptureMode';
/**
 * Configuration parameters of the AppDynamics SDK.
 *
 * Most users can set up their configuration like this:
 *
 * ```js
 * Instrumentation.start({
 *      appKey: "ABC-DEF-GHI", // Replace with your actual application key
 * });
 * ```
 *
 * The other parameters let you tune advanced features of the agent. Learn more about these concepts in the
 * [official documentation](https://docs.appdynamics.com/display/PRO45/Mobile+Real+User+Monitoring).
 */
export interface AgentConfiguration {
    /**
     * Sets the application key used by the SDK.  This is a required property.
     */
    appKey: string;
    /**
     * Sets the name of this mobile application.  If not set, the application name is the
     * package name from the Android Manifest.  Most users will not need this.
     *
     * The `applicationName` may contain uppercase or lowercase letters ('A' through 'Z'), numbers,
     * and underscores ('_').
     *
     * **NOTE:** If this property is set, all data reported from this application is associated with `applicationName`,
     * and appears together in dashboards.
     */
    applicationName?: string;
    /**
     * Boolean value that indicates if automatic instrumentation is enabled.
     *
     * Setting this to `false` will disable all automatic instrumentation regardless of any code injection.
     * The following features will also be effected:
     *
     * 1. {@link interactionCaptureMode} will be set to {@link InteractionCaptureMode.None}
     * 2. Automatic Network requests from supported libraries will not be tracked.
     * 3. Any UI transition events will not be tracked.
     * 4. Screenshots (both automatic and manual) will be disabled.
     *
     * Set to `false` to disable automatic instrumentation, `true` to enable (default is enabled)
     */
    autoInstrument?: boolean;
    /**
     * Sets the URL of the collector to which the agent will report.
     *
     * This is NOT your controller URL. You likely do not need to call this method
     * unless you have an on-premise EUM Processor.
     */
    collectorURL?: string;
    /**
     * Sets the URL of the screenshot service to which the agent will upload screenshots.
     *
     * This is NOT your controller URL. You likely do not need to call this method
     * unless you have an AppDynamics managed private cloud (very rare).
     *
     * **NOTE:** If you have an on-premise EUM Processor
     *           and set the collector URL in {@link collectorURL},
     *           then you do not need to call this method
     *           because the two URLs are the same,
     *           and the agent assumes that is the case.
     */
    screenshotURL?: string;
    /**
     * Sets the regex patterns for urls which need to be filtered.
     *
     * Any urls matching one of defined patterns will not be tracked.
     * This field is optional
     */
    excludedURLPatterns?: string[];
    /**
     * Sets the logging level of the agent. Default is {@link LoggingLevel.LOGGING_LEVEL_NONE}.
     *
     * **WARNING:** Not recommended for production use.
     */
    loggingLevel?: LoggingLevel;
    /**
     * Sets whether a check is performed during initialization to check if compile time
     * instrumentation was successful. Default is enabled.
     *
     * This configuration setting **only applies to android**.
     *
     * Compile time instrumentation is required for supporting a number of features such as
     * Network Request reporting, Application Not Responding Reports, Info Points, etc.
     *
     * By default, agent will throw an exception if you attempt to start it without doing a compile time
     * instrumentation(using one of our build plugins for ant/maven/gradle). You can disable this check
     * by passing in 'false'.
     */
    compileTimeInstrumentationCheck?: boolean;
    /**
     * Sets what types of user interaction events should be captured.
     *
     * **Use of this API is not recommended as it may behave unexpectedly. Read on for more details.**
     *
     * Interaction capture may appear to behave strangely because react-native uses arbitrary OS-level widgets to
     * render react components.
     * For instance, a `Button` component from a component library may rely on react-native's `TouchableOpacity` widget,
     * which itself will be backed by a generic OS widget rather than a Button. Therefore, UI Interaction will not be
     * able to capture button clicks on that widget because it is not, technically, a button.
     *
     * **WARNING:** Using {@link InteractionCaptureMode.All} means that all currently known and to-be implemented
     * interactions are captured. This could conceivably include personal user information. If you have any
     * concerns around this, we recommend turning on only the interactions you want captured by using the
     * individual specific constants.
     *
     * @see [[InteractionCaptureMode]]
     */
    interactionCaptureMode?: InteractionCaptureMode;
    /**
     * Enables or disables screenshots.
     *
     * Default is enabled.
     *
     * If enabled, the [[Instrumentation.takeScreenshot]] method will capture screenshots,
     * and depending on the configuration in the controller, automatic screenshots can be taken.
     * You can always disable screenshots entirely from your controller.
     *
     * If disabled, the [[Instrumentation.takeScreenshot]] method will NOT capture screenshots,
     * and no automatic screenshots will be captured. You will NOT be able to enable screenshots
     * from your controller.
     *
     * Recommended for most applications to leave this option enabled, and control the screenshots
     * from the controller configuration page.
     *
     */
    screenshotsEnabled?: boolean;
    /**
     * Enables or disables JavaScript agent injection into WebViews.
     * If enabled, JavaScript agent will capture page loads in WebViews.
     *
     * Default is enabled.
     */
    jsAgentInjectionEnabled?: boolean;
    /**
     * Enables or disables JavaScript agent AJAX call reporting.
     * If enabled, JavaScript agent will capture AJAX calls in WebViews.
     *
     * Default is disabled.
     * JS Agent injection needs to be enabled for this to have an effect
     * See {@link jsAgentInjectionEnabled}
     * @param enable true to enable JS AJAX reporting, false to disable
     */
    jsAgentAjaxEnabled?: boolean;
    /**
     * Enables or disables the ANR Detection system.
     *
     * Default is disabled
     *
     * Recommended for most applications to leave this option disabled.
     * Enable it in applications that use the the standard iOS user interface components.
     */
    anrDetectionEnabled?: boolean;
}
