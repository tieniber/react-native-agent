/*!
 * Copyright 2019. AppDynamics LLC and its affiliates.
 * All Rights Reserved.
 */
import { AgentConfiguration } from './AgentConfiguration';
import { BreadcrumbVisibility } from './BreadcrumbVisibility';
import { ErrorSeverityLevel } from './ErrorSeverityLevel';
import { SessionFrame } from './SessionFrame';
/**
 * Interact with the AppDynamics agent running in your application.
 *
 * This class provides a number of methods to interact with the AppDynamics agent including
 *
 * - Initializing the agent with the right application key
 * - Reporting custom metrics/timers
 * - Reporting info points manually
 *
 * ## Initializing the agent
 * The agent does not automatically start with your application. Using the app key shown in your
 * controller UI, you can initialize the agent. This has to be done near your application's entry
 * point before any other initialization routines in your application.
 *
 * **For example:**
 *
 * ```js
 * Instrumentation.start({
 *      appKey: "ABC-DEF-GHI", // Replace with your actual application key
 * });
 * ```
 *
 * Once initialized, further calls to {@link start} have no effect on the agent.
 *
 * ## About synchronicity
 * Because the react-native bridge is asynchronous, all of these API calls are asynchronous as well.
 * A call to any of these functions doesn't take effect instantly, but some time in the near future.
 *
 * Some methods return a Promise which resolve when the call is effective. For methods that don't return
 * a promise, it is not possible to determine exactly when a call becomes effective. This peculiarity enables
 * optimizations which allow the agent to preserve its negligible CPU footprint.
 *
 * ## Reporting custom timers and metrics
 * You can also report custom timers and metrics using the following API(s):
 *
 * - {@link reportMetric}
 * - {@link startTimer} and {@link stopTimer}
 *
 * ### Custom Metrics
 * Custom metrics allows you to report numeric values associated with a 'metric name'.
 * **For example,** to track the number of times your users clicked the *'checkout'* button,
 * you can report it as easily as follows:
 *
 * ```js
 * export default class App extends Component {
 *      render() {
 *          return <View>
 *              <TouchableHighlight title="checkout" onPress={() => this.doCheckout()}>
 *                  <Text>Checkout</Text>
 *              </TouchableHighlight>
 *          </View>
 *      }
 *
 *      doCheckout() {
 *          Instrumentation.reportMetric("Checkout Count", 1);
 *          // ...rest of the checkout logic
 *      }
 * }
 * ```
 *
 * ### Custom Timers
 * Using Custom timers, we can time events in your applications that span across multiple
 * threads/methods. **For example,** the code snippet below reports how long the checkout method took.
 *
 * ```js
 *
 * // ...
 *
 * async doCheckout() {
 *     const CHECKOUT_TIMER = "Time Spent on checkout";
 *     Instrumentation.startTimer(CHECKOUT_TIMER);
 *
 *     try {
 *         await someCheckoutService();
 *         await someOtherLongTask();
 *     } finally {
 *         Instrumentation.stopTimer(CHECKOUT_TIMER);
 *     }
 * }
 *
 * // ...
 *
 * ```
 *
 * > **Note** that {@link startTimer} and {@link stopTimer} can be called from anywhere in your app.
 *
 * ## Reporting info points
 * Info Points allows you to track execution of interesting **synchronous and asynchronous** methods in your application
 * code. This includes reporting method arguments, return value and exception that was thrown by the synchronous method,
 * or the success or error value of the promise for asynchronous methods.
 *
 * **For example,** say you want to track the following function:
 *
 * ```js
 * async function downloadImage(url) {
 *     const request = createRequest(url);
 *     const response = await request.execute();
 *     if (response.status >= 400) {
 *         throw new Error(`Bad status code: ${response.status}`);
 *     }
 *     return response.data;
 * }
 * ```
 *
 * The easiest way to add an info point to this method is using the {@link InfoPoint} decorator.
 *
 * ```js
 * class DownloadService {
 *     @InfoPoint
 *     async downloadImage(url) {
 *          const request = createRequest(url);
 *          const response = await request.execute();
 *          if (response.status >= 400) {
 *              throw new Error(`Bad status code: ${response.status}`);
 *          }
 *          return response.data;
 *     }
 * }
 * ```
 *
 * > **Note** Use `@InfoPoint({ className: 'DownloadService', fnName: 'downloadImage' })` if your code is minified.
 * > More info on {@link InfoPoint}.
 *
 * Alternatively, you can use the manual tracking api.
 *
 * ```js
 * async function downloadImage(url) {
 *      return Instrumentation.trackCall('DownloadService', 'downloadImage', [url], async () => {
 *          const request = createRequest(url);
 *          const response = await request.execute();
 *          if (response.status >= 400) {
 *              throw new Error(`Bad status code: ${response.status}`);
 *          }
 *          return response.data;
 *      });
 * }
 * ```
 *
 * This has the same effect as the decorator above.
 *
 * For more information please see {@link trackCall} and {@link InfoPoint}.
 *
 * ---
 *
 * ## Further resources
 *
 * More information about AppDynamics Mobile Real User Monitoring features can be found in
 * [the official documentation](https://docs.appdynamics.com/display/PRO45/Mobile+Real+User+Monitoring).
 */
export declare class Instrumentation {
    /**
     * Maximum length for userdata parameters.
     *
     * @see {@link setUserData}, {@link setUserDataBoolean}, {@link setUserDataInteger}, {@link setUserDataDate}, {@link setUserDataDouble}
     */
    static readonly MAX_USER_DATA_STRING_LENGTH: number;
    /**
     * Initialize the agent with the given configuration (and pass in hybrid Agent Info).
     *
     * @param agentConfiguration The agent configuration to use.
     * @return A promise which resolves on successful agent initialization and fails otherwise.
     */
    static start(config: AgentConfiguration): Promise<void>;
    /**
     * Change the app key. Older beacons/reports will be discarded when app key is changed.
     *
     * **NOTE:** Invoking this method has no effect unless the agent was already initialized by
     * calling one of the start methods.
     *
     * @param appKey The new application key to use for reporting beacons.
     * @return A promise which fails on an illegal appKey parameter.
     */
    static changeAppKey(appKey: string): Promise<void>;
    /**
     * Reports metric value for the given name.
     *
     * The name should contain only alphanumeric characters and spaces.
     *
     * Illegal characters shall be replaced by their ASCII hex value.
     *
     * **WARNING:** The native agent expects a 64-bit signed integer. However, JavaScript numbers are never represented
     * as such. The maximum and minimum integers which can be represented with exact accuracy are materialized by
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER | MAX_SAFE_INTEGER}
     * and
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER | MIN_SAFE_INTEGER}.
     *
     * Any value that falls outside of this range will be reported with a different metric name, containing the word "INVALID"
     *
     * @param name The name of the metric key.
     * @param value The value reported for the given key. Must be an integer between {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER | MAX_SAFE_INTEGER}
     * and
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER | MIN_SAFE_INTEGER}.
     *
     */
    static reportMetric(name: string, value: number): void;
    /**
     * Reports an error that was caught.
     *
     * This can be called in catch blocks to report interesting errors that you want to track.
     *
     * Valid severity levels:
     *
     * - {@link ErrorSeverityLevel.INFO}
     * - {@link ErrorSeverityLevel.WARNING}
     * - {@link ErrorSeverityLevel.CRITICAL}
     *
     * @param error the error to report
     * @param severityLevel the error severity level
     */
    static reportError(error: Error, severityLevel: ErrorSeverityLevel): void;
    /**
     * Starts a global timer with the given name.
     *
     * The name should contain only alphanumeric characters and spaces.
     *
     * Illegal characters shall be replaced by their ASCII hex value.
     *
     * @param name The name of the timer.
     */
    static startTimer(name: string): void;
    /**
     * Stops a global timer with the given name and reports it to the cloud.
     *
     * The name should contain only alphanumeric characters and spaces.
     *
     * Illegal characters shall be replaced by their ASCII hex value.
     *
     * @param name The name of the timer.
     */
    static stopTimer(name: string): void;
    /**
     * Starts next session and ends the current session.
     *
     * The session started using this API may be ended by inactivity timeout set
     * in the Application Configuration, before the next call to this API.
     */
    static startNextSession(): void;
    /**
     * Starts a Session Frame.
     *
     * @param sessionFrameName The name of the session frame that will appear in the UI.
     *
     * @return A {@link SessionFrame} object is returned which should be retained for further operations.
     */
    static startSessionFrame(sessionFrameName: string): SessionFrame;
    /**
     * Reports that an info point has started.
     *
     * The {@link InfoPoint} decorator provides an easier way to add info points to your app.
     * Consider using that as a first resort.
     *
     * See the example provided in the documentation fro {@link Instrumentation}.
     */
    static trackCall<T>(className: string, methodName: string, args: any[], executionCallback: () => T): T;
    static trackCall<T>(className: string, methodName: string, args: any[], executionCallback: () => Promise<T>): Promise<T>;
    /**
     * Leaves a breadcrumb that will appear in a crash report and, optionally, session.
     *
     * Call this when something interesting happens in your application. The breadcrumb will
     * be included in different reports depending on the `mode`.
     * Each crash report displays the most recent 99 breadcrumbs.
     *
     * If you would like it to appear also in sessions, use {@link BreadcrumbVisibility.CRASHES_AND_SESSIONS}.
     *
     * @param breadcrumb The string to include in the crash report and sessions. If it's
     * longer than 2048 characters, it will be truncated.
     * If it's empty, no breadcrumb will be recorded.
     * @param mode A mode from {@link BreadcrumbVisibility}.  If invalid, defaults to {@link BreadcrumbVisibility.CRASHES_ONLY}
     */
    static leaveBreadcrumb(breadcrumb: string, mode?: BreadcrumbVisibility): void;
    /**
     * Unblocks screenshot capture if it is currently blocked. Otherwise, this has no effect.
     *
     * If screenshots are disabled through {@link AgentConfiguration.screenshotsEnabled}
     * or through the controller UI, this method has no effect.
     *
     * If screenshots are set to manual mode in the controller UI, this method unblocks for
     * manual mode only.
     *
     * **WARNING (1):** This will unblock capture for the entire app.
     * **WARNING (2):** Use the returned promise to determine when screenshots have effectively been unblocked.
     *
     * The user is expected to manage any possible nesting issues that may
     * occur if blocking and unblocking occur in different code paths.
     *
     * @return A promise which resolves when screenshots are effectively unblocked.
     *
     * See {@link blockScreenshots}
     */
    static unblockScreenshots(): Promise<void>;
    /**
     * Blocks screenshot capture if it is currently unblocked. Otherwise, this has no effect..
     *
     * If screenshots are disabled through {@link AgentConfiguration.screenshotsEnabled}
     * or through the controller UI, this method has no effect.
     *
     * **WARNING (1):**  This will block capture for the entire app.
     * **WARNING (2):** Use the returned promise to determine when screenshots have effectively been blocked.
     *
     * The user is expected to manage any possible nesting issues that may
     * occur if blocking and unblocking occur in different code paths.
     *
     * @return A promise which resolves when screenshots are effectively blocked.
     *
     * See {@link unblockScreenshots}
     */
    static blockScreenshots(): Promise<void>;
    /**
     * See {@link blockScreenshots}.
     *
     * @return boolean whether screenshot capture is blocked
     */
    static screenshotsBlocked(): Promise<boolean>;
    /**
     * Asynchronously takes a screenshot of the current screen.
     *
     * If screenshots are disabled through {@link AgentConfiguration.screenshotsEnabled}
     * or through the controller UI, this method does nothing.
     *
     * This will capture everything, including personal information, so you must be cautious of
     * when to take the screenshot.
     *
     * These screenshots will show up in the Sessions screen for this user.
     *
     * The screenshots are taken on a background thread, compressed, and only non-redundant parts
     * are uploaded, so it is safe to take many of these without impacting performance of your
     * application.
     */
    static takeScreenshot(): void;
    /**
     * Sets a key-value pair identifier that will be included in all snapshots.
     * The identifier can be used to add any data you wish.
     *
     * The `key` must be unique across your application.
     * The `key` namespace is distinct for each user data type.
     * Re-using the same `key` overwrites the previous `value`.
     * The `key` is limited to {@link MAX_USER_DATA_STRING_LENGTH} characters.
     *
     * A `value` of `null` will clear the data.
     * The `value` is limited to {@link MAX_USER_DATA_STRING_LENGTH} characters.
     *
     * This information is not persisted across application runs.  Once the application is destroyed,
     * the user data is cleared.
     *
     * @param key       Your unique key.
     * @param value     Your value.
     */
    static setUserData(key: string, value: string | null | undefined): void;
    /**
     * Removes a key-value pair set with {@link setUserData}.
     * The identifier can be used to add any data you wish.
     *
     * @param key       Key of the entry to remove.
     */
    static removeUserData(key: string): void;
    /**
     * Sets a key-value pair identifier that will be included in all snapshots.
     * The identifier can be used to add any data you wish.
     *
     * The `key` must be unique across your application.
     * The `key` namespace is distinct for each user data type.
     * Re-using the same `key` overwrites the previous `value`.
     * The `key` is limited to {@link MAX_USER_DATA_STRING_LENGTH} characters.
     *
     * **WARNING:** The JavaScript exact integer numbers are limited to the range [-(2^53 - 1) ; 2^53 - 1] as defined
     * by
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER | MAX_SAFE_INTEGER}
     * and
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER | MIN_SAFE_INTEGER}.
     * Numbers will be truncated to this range!
     *
     * A `value` of `null` will clear the data.
     *
     * This information is not persisted across application runs.  Once the application is destroyed,
     * the user data is cleared.
     *
     * @param key       Your unique key.
     * @param value     Your value.
     */
    static setUserDataInteger(key: string, value: number | null | undefined): void;
    /**
     * Removes a key-value pair set with {@link setUserDataInteger}.
     * The identifier can be used to add any data you wish.
     *
     * @param key       Key of the entry to remove.
     */
    static removeUserDataInteger(key: string): void;
    /**
     * Sets a key-value pair identifier that will be included in all snapshots.
     * The identifier can be used to add any data you wish.
     *
     * The `key` must be unique across your application.
     * The `key` namespace is distinct for each user data type.
     * Re-using the same `key` overwrites the previous `value`.
     * The `key` is limited to {@link MAX_USER_DATA_STRING_LENGTH} characters.
     *
     * A `value` of `null` will clear the data.
     *
     * This information is not persisted across application runs.  Once the application is destroyed,
     * the user data is cleared.
     *
     * @param key       Your unique key.
     * @param value     Your value.
     */
    static setUserDataBoolean(key: string, value: boolean | null | undefined): void;
    /**
     * Removes a key-value pair set with {@link setUserDataBoolean}.
     * The identifier can be used to add any data you wish.
     *
     * @param key       Key of the entry to remove.
     */
    static removeUserDataBoolean(key: string): void;
    /**
     * Sets a key-value pair identifier that will be included in all snapshots.
     * The identifier can be used to add any data you wish.
     *
     * The `key` must be unique across your application.
     * The `key` namespace is distinct for each user data type.
     * Re-using the same `key` overwrites the previous `value`.
     * The `key` is limited to {@link MAX_USER_DATA_STRING_LENGTH} characters.
     *
     * A `value` of `null` will clear the data.
     *
     * The `value` has to be finite. Attempting to set infinite or NaN value, will clear the data.
     *
     * This information is not persisted across application runs.  Once the application is destroyed,
     * the user data is cleared.
     *
     * @param key       Your unique key.
     * @param value     Your value.
     */
    static setUserDataDouble(key: string, value: number | null | undefined): void;
    /**
     * Removes a key-value pair set with {@link setUserDataDouble}.
     * The identifier can be used to add any data you wish.
     *
     * @param key       Key of the entry to remove.
     */
    static removeUserDataDouble(key: string): void;
    /**
     * Sets a key-value pair identifier that will be included in all snapshots.
     * The identifier can be used to add any data you wish.
     *
     * The `key` must be unique across your application.
     * The `key` namespace is distinct for each user data type.
     * Re-using the same `key` overwrites the previous `value`.
     * The `key` is limited to {@link MAX_USER_DATA_STRING_LENGTH} characters.
     *
     * A `value` of `null` will clear the data.
     *
     * This information is not persisted across application runs.  Once the application is destroyed,
     * the user data is cleared.
     *
     * @param key       Your unique key.
     * @param value     Your value.
     */
    static setUserDataDate(key: string, value: Date | null | undefined): void;
    /**
     * Removes a key-value pair set with {@link setUserDataInteger}.
     * The identifier can be used to add any data you wish.
     *
     * @param key       Key of the entry to remove.
     */
    static removeUserDataDate(key: string): void;
}
