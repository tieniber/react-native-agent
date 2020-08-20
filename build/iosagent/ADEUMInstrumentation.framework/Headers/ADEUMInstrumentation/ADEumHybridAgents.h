//
//  Copyright © 2020 AppDynamics Technologies. All rights reserved.
//

#import "ADEumInstrumentation_interfaces.h" // for ADEumAgentConfiguration

#ifndef ADEumHybridAgents_h
#define ADEumHybridAgents_h

@interface ADEumInstrumentation ()

/* Private, do not use. */
+ (void)initWithConfiguration:(ADEumAgentConfiguration *)agentConfiguration a:(NSString *)a b:(NSString *)b;

@end

#endif /* ADEumHybridAgents_h */
