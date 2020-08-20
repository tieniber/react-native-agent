interface InfoPointData {
    className?: string;
    fnName?: string;
}
/**
 * Annotate methods you wish to be reported as InfoPoint to eum-cloud.
 *
 * Consider the following critical method which you wish to be reported as InfoPoint to eum-cloud.
 *
 * ```js
 * public infoPointMethod(arg1, arg2, value) {
 *     console.log("Executing infoPointMethod!");
 * }
 * ```
 *
 * ### Adding annotations to report info points automatically.
 * For convenience purpose, you can simply annotate your methods without having to modify the code
 * to manually report InfoPoints.
 *
 * ```js
 * @InfoPoint
 * public infoPointMethod(arg1, arg2, value) {
 *     console.log("Executing infoPointMethod!");
 * }
 * ```
 *
 * Your method will automatically report info points to the eum cloud.
 *
 * **Warning:** If your code gets minified, the info point will report useless class and function names. You can either
 * turn off minification for the annotated symbols, or you can manually specify the symbol names.
 *
 * To **manually specify** symbol names, pass a parameter to the `InfoPoint` decorator like this.
 *
 * ```js
 * @InfoPoint({ className: 'MyClass', fnName: 'infoPointMethod' })
 * public infoPointMethod(arg1, arg2, value) {
 *     console.log("Executing infoPointMethod!");
 * }
 * ```
 * Alternatively, you can **exclude classes and functions from minification** in the following way.
 *
 * - Install the npm package `metro-minify-terser`
 * - Add this to your `metro.config.js` configuration file:
 *
 * ```js
 * transformer: {
 *  minifierPath: 'metro-minify-terser',
 *  minifierConfig: {
 *     // see: https://www.npmjs.com/package/terser
 *     keep_fnames: true,
 *     module: true
 *  }
 * }
 * ```
 *
 * @see {@link Instrumentation.trackCall}
 */
export declare function InfoPoint(target: unknown, propertyKey: string, descriptor: PropertyDescriptor): void;
export declare function InfoPoint(manualData?: InfoPointData): (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
