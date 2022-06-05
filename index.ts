'use strict'

import qs from 'qs';

/**
 * Indicate to the demo framework that the specified action has been completed
 */
export function actionCompleted(action: string) {
    const pub = 'pub-c-c8d024f7-d239-47c3-9a7b-002f346c1849'
    const sub = 'sub-c-95fe09e0-64bb-4087-ab39-7b14659aab47'
    var identifier;

    var queryString = new URL(window.location.href).search.substring(1);
    var parsed = qs.parse(queryString);
    if (parsed === null || !('identifier' in parsed))
    {
        console.log('Guided Demo Integration Error: Failed to detect identifier in URL query string');
        return;
    }
    else
    {
        identifier = parsed['identifier'];
    }

    //console.log('Action ID: ' + identifier + '. Action completed: ' + action);

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

}
