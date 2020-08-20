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
export declare class InteractionCaptureMode {
    readonly mask: number;
    /**
     * Do not track any user interactions.
     */
    static readonly None: InteractionCaptureMode;
    /**
     * Track all the interactions agent support.
     */
    static readonly All: InteractionCaptureMode;
    /**
     * Track button presses.
     */
    static readonly ButtonPressed: InteractionCaptureMode;
    /**
     * Track text field selection.
     */
    static readonly TextFieldSelected: InteractionCaptureMode;
    /**
     * Track text view selection. (iOS only)
     */
    static readonly TextViewSelected: InteractionCaptureMode;
    /**
     * Track List Item clicks and focus changes for `android.widget.AbsListView` and its subclasses. (android only)
     */
    static readonly ListViewItemSelected: InteractionCaptureMode;
    /**
     * Track table cell selection. (iOS only)
     */
    static readonly TableCellSelected: InteractionCaptureMode;
    private constructor();
    /**
     * Combines multiple modes together. This does not mutate the object.
     *
     * @param modes Other modes to combine with this mode.
     * @return The combination of this mode with the modes passed in argument.
     */
    with(...modes: InteractionCaptureMode[]): InteractionCaptureMode;
    /**
     * Excludes modes together from this mode. This does not mutate the object.
     *
     * @param modes Other modes to exclude from this mode.
     * @return The current set of modes minus the modes passed in argument.
     */
    without(...modes: InteractionCaptureMode[]): InteractionCaptureMode;
}
