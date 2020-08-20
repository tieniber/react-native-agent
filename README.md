# AppDynamics agent for react-native

Brings full support for the [AppDynamics](https://www.appdynamics.com/) mobile RUM (Real User Monitoring) to react-native applications.

## What does this module do?

This module injects the native AppDynamics agents into your application and offers a JavaScript bridge to the `Instrumentation` management interface.

## <a name="setup"></a> Setup

### Step 0: Eject your app

**Make sure your app is "ejected"**. The agent needs a proper application to instrument. It won't work in expo!  
See [ReactNative Eject Explained](https://stackoverflow.com/a/45252151/2246678) for more info.

### Step 1: Install the npm package

    yarn add @appdynamics/react-native-agent
    react-native link @appdynamics/react-native-agent

### Step 2: Instrument your application

    node node_modules/@appdynamics/react-native-agent/bin/cli.js install

The command above will modify your build configuration to enable build-time instrumentation of your app. It assumes you've
kept the default project structure created with the react-native cli tools. This command may fail if you have made heavy modifications
to your android and iOS projects. If so, please refer to the [manual installation](#manual-installation) section of this manual.

### Step 3: (iOS only) Add the required libraries

Open the ios project with xcode, select your project in the project navigator, go to the _Build Phases_ tab, under _Link Binary With Libraries_ click _add_ and chose `libsqlite3.tbd`.

_note: This requirement will be removed in a future release._

### Step 4: (android only) Add permissions

Add the following permissions to your app's `AndroidManifest.xml` (which should be located under `android/app/src/main/`).

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.your.application">

    // Add the following:
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    
    // ...
</manifest>
```

> ℹ️ We need these permissions to allow the agent to limit its activity when resources are scarce.



## Usage

First, log into your AppDynamics account, and create a new mobile application. Chose either Android or iOS, it doesn't matter.
You will obtain an **application key** which you will need for the next step.

Start the agent like so:

```ts
import { Instrumentation } from '@appdynamics/react-native-agent';

Instrumentation.start({
    appKey: 'YOUR-APP-KEY-HERE'
});
```

> **info**: You should initialize the agent as soon as possible, ideally in your `index.js` file.

## Documentation

[Read the full API documentation here](https://docs.appdynamics.com/javadocs/react-native-agent/0/latest/) to learn how to customize the instrumentation.


## <a name="manual-installation"></a> Manual installation

**Most users don't have to do these steps.** In most cases, you can use the cli as described in the [setup](#setup) section.
If that didn't work, then follow these steps.

For android, add the following line to your `android/build.gradle`:

    apply from: '../node_modules/@appdynamics/react-native-agent/android/adeum.gradle'

Make sure the file `settings.gradle` contains a reference to the appdynamics agent module as shown below. This is should have been added automatically by the command `react-native link`.

    include ':@appdynamics_react-native-agent'
    project(':@appdynamics_react-native-agent').projectDir = new File(rootProject.projectDir, '../node_modules/@appdynamics/react-native-agent/android')

Also, `android/app/build.gradle` should contain a reference to the appdynamics agent module.

    dependencies {
        implementation project(':@appdynamics_react-native-agent')
        // ...
    }

For iOS, link the appdynamics agent module like any other native module. Make sure to add `libsqlite3` to your project as explained in the [setup](#setup) section.
