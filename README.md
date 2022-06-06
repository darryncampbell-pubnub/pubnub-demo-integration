*Please be aware that this application / sample is provided as-is for demonstration purposes without any guarantee of support*
=========================================================

# PubNub-Demo-Integration-React

> This is an **internal** PubNub tool.

NPM module designed to be used in React applications to facilitate communication between a demo app and the PubNub guided demo framework.

## Installation

This module is **not yet hosted at npmjs**, therefore install as follows:

`npm i https://github.com/darryncampbell-pubnub/pubnub-demo-integration-react`

Installation from github will grab the latest version available, to update to the most recent version on main:

`npm update`

## Interface

To send a message to the demo framework to indicate an action is completed:

```typescript
GuidedDemoIntegration.actionCompleted(
  {
    action:'Action Name', 
    blockDuplicateCalls:true, 
    debug:false
  });
```

You also need to define the action in the demo project's `features.json` file, at the root of the project:

```json
{
    "features": [
      "Action Name"
    ]
}
```

