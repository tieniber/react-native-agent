/**
 * ErrorSeverityLevel defines the severity levels you can use while reporting {@link Error}s
 * using {@link Instrumentation.reportError}.
 */
export declare enum ErrorSeverityLevel {
    /**
     * An error happened, but it did not cause a problem.
     */
    INFO,
    /**
     * An error happened but the app recovered gracefully.
     */
    WARNING,
    /**
     * An error happened and caused problems to the app.
     */
    CRITICAL
}
