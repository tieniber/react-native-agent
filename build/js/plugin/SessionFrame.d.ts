/**
 * Session Frame - Used to manually create a session frame in the Session UI.
 *                 Created by {@link Instrumentation.startSessionFrame}.
 */
export interface SessionFrame {
    /**
     * Updates the name of the session frame.
     * This is generally used when the best name for the Session Frame
     * is not known at the time of its creation.
     *
     * @param sessionFrameName The name of the session frame that will appear in the UI.
     */
    updateName(name: string): void;
    /**
     * Reports the end of the session frame.
     * The {@link SessionFrame} object will no longer be useable after this call.
     * This method is thread safe.
     */
    end(): void;
}
