'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports["default"] = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Indicate to the demo framework that the specified action has been completed
 * @param action The feature to be set
 * @param blockDuplicateCalls Sets a sessionStorage flag so the message is only sent once (saves hammering the keys)
 * @param debug Extra debug info
 */
var actionCompleted = function(args) {
    const pub = 'pub-c-c8d024f7-d239-47c3-9a7b-002f346c1849';
    const sub = 'sub-c-95fe09e0-64bb-4087-ab39-7b14659aab47';
    let identifier = "";
    let action = args.action;
    let blockDuplicateCalls = args.blockDuplicateCalls;
    let debug = args.debug;
    let queryString = new URL(window.location.href).search.substring(1);
    const urlParamsArray = queryString.split('&');
    for (let i = 0; i < urlParamsArray.length; i++) {
        if (urlParamsArray[i].startsWith('identifier') && urlParamsArray[i].includes('=')) {
            let identifierPair = urlParamsArray[i].split('=');
            identifier = identifierPair[1];
        }
    }
    if (identifier === "") {
        console.log('Guided Demo Integration Error: Failed to detect identifier in URL query string');
        return;
    }
    if (blockDuplicateCalls) {
        //  Read the id from session storage and only send the message if the message was not previous sent
        let sessionStorageKey = "Demo_" + identifier + action;
        let storedId = sessionStorage.getItem(sessionStorageKey);
        if (storedId == null) {
            if (debug)
                console.log('Setting session key to avoid duplicate future messages being sent. Action: ' + action + '. Identifier: ' + identifier);
                sessionStorage.setItem(sessionStorageKey, "set");
        }
        else {
            //  This is a duplicate message, do not send it
            if (debug)
                console.log('Message blocked as it is a duplicate. Action: ' + action + '. Identifier: ' + identifier);
            return;
        }
    }
    if (debug)
        console.log('Sending message. Action: ' + action + '. Identifier: ' + identifier);
    const url = `https://ps.pndsn.com/publish/${pub}/${sub}/0/demo/myCallback/${encodeURIComponent(JSON.stringify({ id: identifier, feature: action }))}?store=0&uuid=${identifier}`;
    fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
        }
        return response;
    })
        .then(data => {
        //  Successfully set demo action with demo server
        //console.log("Guided Demo Integration success", url, data)
    })
        .catch(e => {
        console.log('Guided Demo Integration: ', e);
    });
    return;
}
exports.actionCompleted = actionCompleted;

//  Credit: https://stackoverflow.com/questions/18862256/how-to-detect-emoji-using-javascript
/**
 * Test for Emoji in a string
 * @param testString String to search for emoji
 * @param debug Extra debug info
 * @returns Whether or not the test string contains emoji
 */
function containsEmoji(args) {
    let testString = args.testString;
    let debug = args.debug;
    var hasEmoji = /\p{Extended_Pictographic}/u.test(testString);
    if (debug)
        console.log('Has Emoji?: ' + hasEmoji);
    return hasEmoji;
}
exports.containsEmoji = containsEmoji;
