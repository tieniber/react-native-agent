#import "ADEUMReactNative.h"
#import <React/RCTConvert.h>
#import <ADEUMInstrumentation/ADEumInstrumentation.h>

@implementation RCTConvert (ADEumInteractionCaptureMode)
    RCT_ENUM_CONVERTER(ADEumInteractionCaptureMode, (@{
        @"INTERACTION_CAPTURE_MODE_NONE" : @(ADEumInteractionCaptureModeNone),
        @"INTERACTION_CAPTURE_MODE_BUTTON_PRESSED" : @(ADEumInteractionCaptureModeButtonPressed),
        @"INTERACTION_CAPTURE_MODE_TABLE_CELL_SELECTED" : @(ADEumInteractionCaptureModeTableCellSelected),
        @"INTERACTION_CAPTURE_MODE_TEXT_FIELD_SELECTED" : @(ADEumInteractionCaptureModeTextFieldSelected),
        @"INTERACTION_CAPTURE_MODE_TEXT_VIEW_SELECTED" : @(ADEUmInteractionCaptureModeTextViewSelected),
        @"INTERACTION_CAPTURE_MODE_ALL" : @(ADEumInteractionCaptureModeAll)
        }), ADEumInteractionCaptureModeNone, integerValue)
@end

@implementation RCTConvert (ADEumBreadcrumbVisibility)
    RCT_ENUM_CONVERTER(ADEumBreadcrumbVisibility, (@{
        @"BREADCRUMB_VISIBILITY_CRASHES_ONLY" : @(ADEumBreadcrumbVisibilityCrashesOnly),
        @"BREADCRUMB_VISIBILITY_CRASHES_AND_SESSIONS" : @(ADEumBreadcrumbVisibilityCrashesAndSessions)
        }), ADEumBreadcrumbVisibilityCrashesOnly, integerValue)
@end

@implementation RCTConvert (ADEumErrorSeverityLevel)
    RCT_ENUM_CONVERTER(ADEumErrorSeverityLevel, (@{
        @"ERROR_SEVERITY_LEVEL_INFO" : @(ADEumErrorSeverityLevelInfo),
        @"ERROR_SEVERITY_LEVEL_WARNING" : @(ADEumErrorSeverityLevelWarning),
        @"ERROR_SEVERITY_LEVEL_CRITICAL" : @(ADEumErrorSeverityLevelCritical)
        }), ADEumErrorSeverityLevelInfo, integerValue)
@end

@implementation RCTConvert (ADEumLoggingLevel)
    RCT_ENUM_CONVERTER(ADEumLoggingLevel, (@{
        @"LOGGING_LEVEL_INFO" : @(ADEumLoggingLevelInfo),
        @"LOGGING_LEVEL_NONE" : @(ADEumLoggingLevelOff),
        @"LOGGING_LEVEL_VERBOSE" : @(ADEumLoggingLevelAll)
        }), ADEumLoggingLevelInfo, integerValue)
@end

@implementation ADEUMReactNative {
    NSMutableDictionary *callTrackers;
    NSMutableDictionary *sessionFrames;
}

RCT_EXPORT_MODULE(appd_private_Instrumentation)

- (instancetype)init {
    if (self = [super init]) {
        callTrackers = [NSMutableDictionary dictionary];
        sessionFrames = [NSMutableDictionary dictionary];
    }
    return self;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSDictionary *)constantsToExport
{
    return @{
             @"BREADCRUMB_VISIBILITY_CRASHES_AND_SESSIONS": @(ADEumBreadcrumbVisibilityCrashesAndSessions),
             @"BREADCRUMB_VISIBILITY_CRASHES_ONLY": @(ADEumBreadcrumbVisibilityCrashesOnly),
             @"ERROR_SEVERITY_LEVEL_CRITICAL": @(ADEumErrorSeverityLevelCritical),
             @"ERROR_SEVERITY_LEVEL_INFO": @(ADEumErrorSeverityLevelInfo),
             @"ERROR_SEVERITY_LEVEL_WARNING": @(ADEumErrorSeverityLevelWarning),
             @"INTERACTION_CAPTURE_MODE_ALL": @(ADEumInteractionCaptureModeAll),
             @"INTERACTION_CAPTURE_MODE_BUTTON_PRESSED": @(ADEumInteractionCaptureModeButtonPressed),
             @"INTERACTION_CAPTURE_MODE_LIST_VIEW_ITEM_SELECTED": @(ADEumInteractionCaptureModeNone),
             @"INTERACTION_CAPTURE_MODE_NONE": @(ADEumInteractionCaptureModeNone),
             @"INTERACTION_CAPTURE_MODE_TABLE_CELL_SELECTED": @(ADEumInteractionCaptureModeTableCellSelected),
             @"INTERACTION_CAPTURE_MODE_TEXT_FIELD_SELECTED": @(ADEumInteractionCaptureModeTextFieldSelected),
             @"INTERACTION_CAPTURE_MODE_TEXT_VIEW_SELECTED": @(ADEUmInteractionCaptureModeTextViewSelected),
             @"LOGGING_LEVEL_INFO": @(ADEumLoggingLevelInfo),
             @"LOGGING_LEVEL_NONE": @(ADEumLoggingLevelOff),
             @"LOGGING_LEVEL_VERBOSE": @(ADEumLoggingLevelAll),
             // The iOS SDK doesn't expose `maxUserDataKeyValueLengthInChars` so we have to hardcode it below.
             @"MAX_USER_DATA_STRING_LENGTH": @(2048) 
    };
}

RCT_EXPORT_METHOD(start:(NSDictionary *)config hybridAgentType:(NSString *)hybridAgentType hybridAgentVersion:(NSString *)hybridAgentVersion callback:(RCTResponseSenderBlock)callback)
{
    NSString* appKey = [RCTConvert NSString:config[@"appKey"]];
    ADEumAgentConfiguration *adeumConfig = [[ADEumAgentConfiguration alloc] initWithAppKey:appKey];
    if ([config objectForKey:@"applicationName"]) {
        adeumConfig.applicationName = [RCTConvert NSString:config[@"applicationName"]];
    }
    if ([config objectForKey:@"autoInstrument"]) {
        adeumConfig.enableAutoInstrument = [RCTConvert BOOL:config[@"autoInstrument"]];
    }
    if ([config objectForKey:@"collectorURL"]) {
        adeumConfig.collectorURL = [RCTConvert NSString:config[@"collectorURL"]];
    }
    if ([config objectForKey:@"screenshotURL"]) {
        adeumConfig.screenshotURL = [RCTConvert NSString:config[@"screenshotURL"]];
    }
    if ([config objectForKey:@"loggingLevel"]) {
        adeumConfig.loggingLevel = [RCTConvert NSInteger:config[@"loggingLevel"]];
    }
    if ([config objectForKey:@"excludedURLPatterns"]) {
        adeumConfig.excludedUrlPatterns = [RCTConvert NSStringArray:config[@"excludedURLPatterns"]];
    }
    if ([config objectForKey:@"interactionCaptureMode"]) {
        adeumConfig.interactionCaptureMode = [RCTConvert NSInteger:config[@"interactionCaptureMode"]];
    }
    if ([config objectForKey:@"screenshotsEnabled"]) {
        adeumConfig.screenshotsEnabled = [RCTConvert BOOL:config[@"screenshotsEnabled"]];
    }
    if ([config objectForKey:@"jsAgentInjectionEnabled"]){
        adeumConfig.jsAgentEnabled = [RCTConvert BOOL:config[@"jsAgentInjectionEnabled"]];
    }
    if ([config objectForKey:@"jsAgentAjaxEnabled"]) {
        adeumConfig.jsAgentAjaxEnabled = [RCTConvert BOOL:config[@"jsAgentAjaxEnabled"]];
    }
    if ([config objectForKey:@"anrDetectionEnabled"]) {
        adeumConfig.anrDetectionEnabled = [RCTConvert BOOL:config[@"anrDetectionEnabled"]];
    }
    // The following config settings are not exposed to the JS interface:
    // reachabilityHostName
    // enableLogging
    // collectorChannel
    // crashReportCallback
    // sqlBeaconCacheEnabled
    // anrDetectionEnabled
    // crashReportingEnabled
    // networkRequestCallback
    [ADEumInstrumentation initWithConfiguration:adeumConfig a:hybridAgentType b:hybridAgentVersion];
    callback(@[[NSNull null]]);
}

RCT_EXPORT_METHOD(leaveBreadcrumb:(NSString *)breadcrumb)
{
    [ADEumInstrumentation leaveBreadcrumb:breadcrumb];
}

RCT_EXPORT_METHOD(leaveBreadcrumb:(NSString *)breadcrumb mode:(ADEumBreadcrumbVisibility)mode)
{
    [ADEumInstrumentation leaveBreadcrumb:breadcrumb mode:mode];
}

RCT_EXPORT_METHOD(reportError:(NSDictionary *)error severity:(ADEumErrorSeverityLevel)severity)
{
    NSError *err = [NSError errorWithDomain:@"Manual error report"
                                       code:0
                                   userInfo:@{
                                                @"message": [RCTConvert NSString:error[@"message"]],
                                                @"stack": [RCTConvert NSString:error[@"stack"]]
                                            }];
    [ADEumInstrumentation reportError:err withSeverity:severity];
}

RCT_EXPORT_METHOD(changeAppKey:(NSString *)appKey callback:(RCTResponseSenderBlock)callback)
{
    [ADEumInstrumentation changeAppKey:appKey];
    callback(@[[NSNull null]]);
}

RCT_EXPORT_METHOD(reportMetric:(NSString *)name value:(NSInteger)value)
{
    [ADEumInstrumentation reportMetricWithName:name value:value];
}

RCT_EXPORT_METHOD(startTimer:(NSString *)name)
{
    [ADEumInstrumentation startTimerWithName:name];
}

RCT_EXPORT_METHOD(stopTimer:(NSString *)name)
{
    [ADEumInstrumentation stopTimerWithName:name];
}

RCT_EXPORT_METHOD(beginCall:(NSString *)callId className:(NSString *)className methodName:(NSString *)methodName args:(NSArray *)args isStatic:(BOOL)isStatic)
{
    id tracker = [ADEumInstrumentation beginCall:className methodName:methodName withArguments:args];
    [callTrackers setObject:tracker forKey:callId];
}

RCT_EXPORT_METHOD(endCallWithSuccess:(NSString *)callId data:(NSDictionary *)data)
{
    id tracker = [callTrackers objectForKey:callId];
    if (tracker) {
        [ADEumInstrumentation endCall:tracker withValue:[data objectForKey:@"result"]];
        [callTrackers removeObjectForKey:callId];
    }
}

RCT_EXPORT_METHOD(endCallWithError:(NSString *)callId error:(NSDictionary *)error)
{
    id tracker = [callTrackers objectForKey:callId];
    if (tracker) {
        // There is no way to report a call ending in error on iOS, so we work around the problem by reporting a regular
        // endCall with a specific payload
        [ADEumInstrumentation endCall:tracker withValue:@{
            @"is_error": @(YES),
            @"message": [error objectForKey:@"message"],
            @"stackTrace": [error objectForKey:@"stack"]
        }];
        [callTrackers removeObjectForKey:callId];
    }
}

RCT_EXPORT_METHOD(unblockScreenshots:(RCTResponseSenderBlock)callback)
{
    [ADEumInstrumentation unblockScreenshots];
    callback(@[]);
}

RCT_EXPORT_METHOD(blockScreenshots:(RCTResponseSenderBlock)callback)
{
    [ADEumInstrumentation blockScreenshots];
    callback(@[]);
}

RCT_EXPORT_METHOD(screenshotsBlocked:(RCTResponseSenderBlock)callback)
{
    callback(@[[NSNumber numberWithBool:[ADEumInstrumentation screenshotsBlocked]]]);
}

RCT_EXPORT_METHOD(takeScreenshot)
{
    [ADEumInstrumentation takeScreenshot];
}

RCT_EXPORT_METHOD(setUserData:(NSString *)key value:(NSString *)value)
{
    [ADEumInstrumentation setUserData:key value:value];
}

RCT_EXPORT_METHOD(removeUserData:(NSString *)key)
{
    [ADEumInstrumentation removeUserData:key];
}

RCT_EXPORT_METHOD(setUserDataInteger:(NSString *)key valueStr:(NSString *)valueStr)
{
    int64_t value = atoll([valueStr UTF8String]);
    [ADEumInstrumentation setUserDataLong:key value:value];
}

RCT_EXPORT_METHOD(removeUserDataInteger:(NSString *)key)
{
    [ADEumInstrumentation removeUserDataLong:key];
}

RCT_EXPORT_METHOD(setUserDataDouble:(NSString *)key value:(double)value)
{
    [ADEumInstrumentation setUserDataDouble:key value:value];
}

RCT_EXPORT_METHOD(removeUserDataDouble:(NSString *)key)
{
    [ADEumInstrumentation removeUserDataDouble:key];
}

RCT_EXPORT_METHOD(setUserDataBoolean:(NSString *)key value:(BOOL)value)
{
    [ADEumInstrumentation setUserDataBoolean:key value:value];
}

RCT_EXPORT_METHOD(removeUserDataBoolean:(NSString *)key)
{
    [ADEumInstrumentation removeUserDataBoolean:key];
}

RCT_EXPORT_METHOD(setUserDataDate:(NSString *)key valueStr:(NSString *)valueStr)
{
    double value = atoll([valueStr UTF8String]);
    NSDate *date = [[NSDate date] initWithTimeIntervalSince1970:value/1000];
    [ADEumInstrumentation setUserDataDate:key value:date];
}

RCT_EXPORT_METHOD(removeUserDataDate:(NSString *)key)
{
    [ADEumInstrumentation removeUserDataDate:key];
}

RCT_EXPORT_METHOD(startNextSession)
{
    [ADEumInstrumentation startNextSession];
}

RCT_EXPORT_METHOD(startSessionFrame:(NSString *) frameId name:(NSString *)name)
{
    ADEumSessionFrame *sessionFrame = [ADEumInstrumentation startSessionFrame:name];
    [sessionFrames setObject:sessionFrame forKey:frameId];
}

RCT_EXPORT_METHOD(updateSessionFrameName:(NSString *) frameId name:(NSString *)name)
{
    ADEumSessionFrame *sessionFrame = [sessionFrames objectForKey:frameId];
    if (sessionFrame) {
        [sessionFrame updateName:name];
    }
}

RCT_EXPORT_METHOD(endSessionFrame:(NSString *) frameId)
{
    ADEumSessionFrame *sessionFrame = [sessionFrames objectForKey:frameId];
    if (sessionFrame) {
        [sessionFrame end];
        [sessionFrames removeObjectForKey:frameId];
    }
}

@end
