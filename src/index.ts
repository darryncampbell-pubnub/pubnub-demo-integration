'use strict'

/**
 * Indicate to the demo framework that the specified action has been completed
 */
export function actionCompleted(action:string, debug:boolean=false) {
    const pub = 'pub-c-c8d024f7-d239-47c3-9a7b-002f346c1849'
    const sub = 'sub-c-95fe09e0-64bb-4087-ab39-7b14659aab47'
    var identifier = "";

    var queryString = new URL(window.location.href).search.substring(1);
    const urlParamsArray = queryString.split('&');
    for (let i = 0; i < urlParamsArray.length; i++)
    {
        if (urlParamsArray[i].startsWith('identifier') && urlParamsArray[i].includes('='))
        {
            let identifierPair = urlParamsArray[i].split('=');
            identifier = identifierPair[1];
        }
    }

    if (identifier === "")
    {
        console.log('Guided Demo Integration Error: Failed to detect identifier in URL query string');
        return;
    }

    if (debug)
        console.log('Action ID: ' + identifier + '. Action completed: ' + action);

    const url = `https://ps.pndsn.com/publish/${pub}/${sub}/0/demo/myCallback/${encodeURIComponent(JSON.stringify({id: identifier, feature: action}))}?store=0&uuid=${identifier}`

    fetch(url, )
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
            console.log('Guided Demo Integration: ', e)
        })
    ;
        return;
}

//  Credit: https://stackoverflow.com/questions/18862256/how-to-detect-emoji-using-javascript
export function containsEmoji(testString:string, debug:boolean=false): boolean {
    var hasEmoji = /\p{Extended_Pictographic}/u.test(testString)
    if (debug)
        console.log('Has Emoji?: ' + hasEmoji);
    return hasEmoji;
}

